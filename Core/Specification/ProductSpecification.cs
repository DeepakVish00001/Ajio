using Core.Entities;

namespace Core.Specification;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification() : base(x => !x.IsDeleted && x.IsActive)
    {
        AddInclude(p => p.ProductBrand!);
        AddInclude(p => p.ProductBrand!.ProductCategory!);
    }
    public ProductSpecification(int id) :
     base(x => x.Id == id && !x.IsDeleted && x.IsActive)
    {
        AddInclude(p => p.ProductBrand!);
        AddInclude(p => p.ProductBrand!.ProductCategory!);

    }
}
