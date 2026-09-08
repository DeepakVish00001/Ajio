using Core.Entities;

namespace Core.Specification;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(string? sort,int? brandId, int? cateId) 
    : base(x => !x.IsDeleted && x.IsActive &&
        (!brandId.HasValue || x.ProductBrandId==brandId)&&
        (!cateId.HasValue || x.ProductBrand!.ProductCategoryId==cateId)
    )
    {
        AddInclude(p => p.ProductBrand!);
        AddInclude(p => p.ProductBrand!.ProductCategory!);
        AddInclude(p => p.ProductImages);
        AddOrderBy(s => s.Name);
        
        if (!string.IsNullOrEmpty(sort))
        {
            switch (sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Price);
                    break;
            }
        }
    }
    public ProductSpecification(int id) :
     base(x => x.Id == id && !x.IsDeleted && x.IsActive)
    {
        AddInclude(p => p.ProductBrand!);
        AddInclude(p => p.ProductBrand!.ProductCategory!);
        AddInclude(p => p.ProductImages);


    }
}
