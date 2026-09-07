namespace Core.Entities;

public class ProductBrand : BaseEntity
{
    public required string Name { get; set; }

    public ProductCategory? ProductCategory { get; set; }
    public int ProductCategoryId { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();
}
