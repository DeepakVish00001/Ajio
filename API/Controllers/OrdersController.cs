using API.Dtos;
using API.Extensions;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(ICartService cartService,
    IUnitOfWork unit, IPaymentService paymentService,
     ILogger<OrdersController> logger) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
        {
            var email = User.GetEmail();

            var cart = await cartService.GetCartAsync(dto.CartId);
            if (cart == null) return BadRequest("Cart not found");

            if (cart.PaymentIntentId == null) return BadRequest("No payment intent for this order");

            var items = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var productItem = await unit.Repository<Product>().GetByIdAynce(item.ProductId);

                if (productItem == null) return BadRequest("Problem with the order");

                var itemOrderd = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    ImageUrl = item.ImageUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrderd,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
            }

            var deliveryMethods = await unit.Repository<DeliveryMethod>().GetByIdAynce(dto.DeliveryMethodId);
            if (deliveryMethods == null) return BadRequest("No delivery method selected");

            var order = new Order
            {
                OrderItems = items,
                DeliveryMethod = deliveryMethods,
                ShippingAddress = dto.ShippingAddress,
                Subtotal = items.Sum(x => x.Price * x.Quantity),
                PaymentSummary = dto.PaymentSummary,
                PaymentIntentId = cart.PaymentIntentId,
                BuyerEmail = email
            };

            unit.Repository<Order>().Add(order);

            logger.LogInformation(
     "Creating order for PaymentIntent: {PaymentIntentId}",
     order.PaymentIntentId
 );

            if (await unit.Complete())
            {
                logger.LogInformation(
                    "Order {OrderId} saved successfully for PaymentIntent {PaymentIntentId}",
                    order.Id,
                    order.PaymentIntentId
                );

                return order;
            }
            return BadRequest("Problem creating order");
        }



        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrderForUser()
        {
            var spec = new OrderSpecification(User.GetEmail());

            var orders = await unit.Repository<Order>().ListAsync(spec);

            var orderToRecturn = orders.Select(o => o.ToDto()).ToList();

            return Ok(orderToRecturn);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var spec = new OrderSpecification(User.GetEmail(), id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);


            if (order == null) return NotFound();

            return Ok(order.ToDto());
        }

        [HttpPost("orders/cancel/{id:int}")]
        public async Task<ActionResult<OrderDto>> CancledOrder(int id)
        {
            var spec = new OrderSpecification(User.GetEmail(), id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null)
                return BadRequest("No order with the id");


            if (order.Status == OrderStatus.Cancelled)
                return BadRequest("Order is alredy cancelled");

            if (order.Status == OrderStatus.Refunded)
                return BadRequest("Order is alredy refunded");

            if (order.Status == OrderStatus.Pending)
            {
                order.Status = OrderStatus.Cancelled;
            }
            else
            {
                var result = await paymentService.RefundPayment(order.PaymentIntentId);
                if (result != "succeeded")
                    return BadRequest("Problem refunding order");

                order.Status = OrderStatus.Refunded;
            }
            await unit.Complete();
            return Ok(order.ToDto());

        }
    }
}
