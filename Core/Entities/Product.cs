using Core.Entites;

namespace Core.Entities;

public class Product : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int QuantityInStock  { get; set; }
    public bool IsActive { get; set; } = false;
    public bool IsDeleted { get; set; } = false;


    public ProductBrand? ProductBrand { get; set; }
    public int ProductBrandId { get; set; }

    public ICollection<ProductImage> ProductImages {get; set;} = new List<ProductImage>();


}
