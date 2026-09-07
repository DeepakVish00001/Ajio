namespace Core.Entities;

public class ProductLike : BaseEntity
{
    public string? UserId { get; set; }
    public Product? Product { get; set; }
    public int ProductId { get; set; }
}
