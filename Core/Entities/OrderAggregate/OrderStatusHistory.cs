namespace Core.Entities.OrderAggregate;

public class OrderStatusHistory : BaseEntity
{
    public Order Order { get; set; } = null!;

    public OrderStatus Status { get; set; }=OrderStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}