namespace API.Dtos;

public class OrderStatusHistoryDto
{
    public int Id { get; set; }
     public int OrderId { get; set; }

    public required string Status { get; set; }

    public DateTime CreatedAt { get; set; }
}