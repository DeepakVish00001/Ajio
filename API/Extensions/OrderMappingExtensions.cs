using API.Dtos;
using Core.Entities.OrderAggregate;

namespace API.Extensions;

public static class OrderMappingExtensions
{
    public static OrderDto ToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            PaymentSummary = order.PaymentSummary,
            DeliveryMethod = order.DeliveryMethod.Description,
            ShippingPrice = order.DeliveryMethod.Price,
            OrderItems = order.OrderItems.Select(x => x.ToDto()).ToList(),
            Subtotal = order.Subtotal,
            Total = order.GetTotal(),
           // Status = order.Status.ToString(),
            PaymentIntentId = order.PaymentIntentId,
            OrderStatusHistories = order.StatusHistory.OrderByDescending(x => x.CreatedAt).Select(x => x.ToDtoHistory()).ToList(),
            Status = order.StatusHistory.OrderByDescending(x => x.CreatedAt)
                    .Select(x => x.Status.ToString())
                    .FirstOrDefault() ?? order.Status.ToString(),
        };
    }

    public static OrderItemDto ToDto(this OrderItem orderItem)
    {
        return new OrderItemDto
        {
            ProductId = orderItem.ItemOrdered.ProductId,
            ProductName = orderItem.ItemOrdered.ProductName,
            ImageUrl = orderItem.ItemOrdered.ImageUrl,
            Price = orderItem.Price,
            Quantity = orderItem.Quantity
        };
    }

    public static OrderStatusHistoryDto ToDtoHistory(this OrderStatusHistory statusHistory)
    {
        return new OrderStatusHistoryDto
        {
            Id = statusHistory.Id,
            OrderId = statusHistory.OrderId,
            Status = statusHistory.Status.ToString(),
            CreatedAt = statusHistory.CreatedAt
        };
    }


}