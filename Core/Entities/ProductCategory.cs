namespace Core.Entities;

public class ProductCategory : BaseEntity
{
    public required string Name { get; set; }
    public ICollection<ProductBrand> ProductBrands { get; set; } = new List<ProductBrand>();

}
