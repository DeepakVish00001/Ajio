using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers;

public class PaymentsController(IUnitOfWork unit,
     IPaymentService paymentService, ILogger<PaymentsController> logger,
      IConfiguration config) : BaseApiController
{
    private readonly string _whSecret = config["StripeSettings:WhSecret"]!;
    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent(string cartId)
    {
        var cart = await paymentService.CreateOrUpdatePaymentIntent(cartId);
        if (cart == null) return BadRequest("Problem with your cart");
        return Ok(cart);
    }

    [HttpGet("delivery-methods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        var deliveryMethods = await unit.Repository<DeliveryMethod>().GetListAynce();
        return Ok(deliveryMethods);
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        //  Event? stripeEvent = null;

        try
        {
            var stripeEvent = ConstructStripeEvent(json);
            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }
            await HandlePaymentIntentSucceeded(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unexpected error occurred");
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred");
        }
    }


    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"].ToString(),
            _whSecret.Trim(),
    throwOnApiVersionMismatch: false);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to construct Stripe event");
            throw new StripeException("Invalid signature");
        }
    }


    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        logger.LogInformation(
            "PaymentIntent received: {PaymentIntentId}, Status: {Status}, AmountReceived: {AmountReceived}",
            intent.Id,
            intent.Status,
            intent.AmountReceived
        );

        if (intent.Status != "succeeded")
        {
            logger.LogWarning("Payment is not succeeded: {PaymentIntentId}", intent.Id);
            return;
        }

        var spec = new OrderSpecification(intent.Id, true);

        logger.LogInformation("Searching order for PaymentIntent: {PaymentIntentId}", intent.Id);

        var order = await unit.Repository<Order>().GetEntityWithSpec(spec);

        if (order == null)
        {
            logger.LogError(
                "Order not found for PaymentIntent {PaymentIntentId}",
                intent.Id
            );

            // Don't repeatedly retry an event when the order is genuinely absent.
            // Check order creation timing and PaymentIntentId mapping.
            return;
        }

        logger.LogInformation(
            "Order found: {OrderId}, Current status: {Status}, Total: {Total}",
            order.Id,
            order.Status,
            order.GetTotal()
        );

        var expectedAmount = (long)decimal.Round(
            order.GetTotal() * 100m,
            0,
            MidpointRounding.AwayFromZero
        );

        if (expectedAmount != intent.AmountReceived)
        {
            order.Status = OrderStatus.PaymentMismatch;

            logger.LogWarning(
                "Amount mismatch. Expected: {Expected}, Received: {Received}",
                expectedAmount,
                intent.AmountReceived
            );
        }
        else
        {
            order.Status = OrderStatus.PaymentReceived;
        }

        logger.LogInformation(
            "Saving order {OrderId} with status {Status}",
            order.Id,
            order.Status
        );

        await unit.Complete();

        logger.LogInformation(
            "Order {OrderId} successfully updated to {Status}",
            order.Id,
            order.Status
        );

    }
}