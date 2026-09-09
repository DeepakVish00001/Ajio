namespace Core.Entities;

public class ProductComment : BaseEntity
{
    public string? Comment { get; set; }

    public int? Rating { get; set; }

    public string? UserId { get; set; }

    public Product? Product { get; set; }

    public int ProductId { get; set; }
    public DateTime CreateAt { get; set; } = DateTime.UtcNow;
}