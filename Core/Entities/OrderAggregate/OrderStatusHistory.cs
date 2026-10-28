namespace Core.Entities.OrderAggregate;

public class OrderStatusHistory : BaseEntity
{
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public OrderStatus Status { get; set; }=OrderStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}