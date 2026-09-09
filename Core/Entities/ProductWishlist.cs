using Core.Entities;

namespace Core.Entites;

public class ProductWishlist : BaseEntity
{
    public required string UserId { get; set; }
    public Product? Product { get; set; }
    public int ProductId { get; set; }
    
}
