namespace Core.Entities.OrderAggregate;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    Processing,
    Shipped,
    OutForDelivery,
    Delivered,
    Refunded,
    Cancelled,
    PaymentFailed,
    PaymentMismatch,


}
