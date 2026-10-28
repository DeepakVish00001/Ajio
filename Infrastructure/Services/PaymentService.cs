using Core.Entities;
using Core.Interface;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly IUnitOfWork unit;
    private readonly ICartService cartService;

    public PaymentService(IUnitOfWork unit,
    IConfiguration config,
    ICartService cartService)
    {
        this.unit = unit;
        this.cartService = cartService;
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
    }
    public async Task<ShoppingCart?> CreateOrUpdatePaymentIntent(string cartId)
    {


        var cart = await cartService.GetCartAsync(cartId);
        if (cart == null) return null;

        var shippingPrice = 0m;

        if (cart.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await unit.Repository<DeliveryMethod>().GetByIdAynce((int)cart.DeliveryMethodId);
            if (deliveryMethod == null) return null;
            shippingPrice = deliveryMethod.Price;
        }

        foreach (var item in cart.Items)
        {
            var productItem = await unit.Repository<Core.Entities.Product>().GetByIdAynce(item.ProductId);

            if (productItem == null) return null;

            if (item.Price != productItem.Price)
            {
                item.Price = productItem.Price;
            }
        }

        var service = new PaymentIntentService();
        PaymentIntent? intent = null;

        if (string.IsNullOrEmpty(cart.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.Items.Sum(x => x.Quantity * (x.Price * 100))
                    + (long)shippingPrice * 100,
                Currency = "INR",
                AllowedPaymentMethodTypes = ["card"],
                Description = $"Shopping order payment for cart {cart.Id}"
            };
            intent = await service.CreateAsync(options);
            cart.PaymentIntentId = intent.Id;
            cart.ClientSecret = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)cart.Items.Sum(x => x.Quantity * (x.Price * 100))
                    + (long)shippingPrice * 100,
                //  Currency = "INR",
                //  AllowedPaymentMethodTypes = ["card"],
                //  Description = $"Shopping order payment for cart {cart.Id}"
            };
            intent = await service.UpdateAsync(cart.PaymentIntentId, options);
        }

        await cartService.SetCartAsync(cart);
        return cart;
    }

    public async Task<string> RefundPayment(string PaymentIntentId)
    {
        var refundOptions = new RefundCreateOptions
        {
            PaymentIntent = PaymentIntentId
        };

        var refundService=new RefundService();
        var result = await refundService.CreateAsync(refundOptions);

        return result.Status;
    }
}
