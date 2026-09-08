using Core.Entities;

namespace Core.Specification;

public class ProductFilterWithBrandCateSpec : BaseSpecification<Product>
{
    public ProductFilterWithBrandCateSpec(ProductSpecPrams specPrams)
    : base(x => !x.IsDeleted && x.IsActive &&
        (!specPrams.BrandId.HasValue || x.ProductBrandId == specPrams.BrandId) &&
        (!specPrams.CategoryId.HasValue || x.ProductBrand!.ProductCategoryId == specPrams.CategoryId) &&
        (!specPrams.MinPrice.HasValue || x.Price >= specPrams.MinPrice.Value) &&
        (!specPrams.MaxPrice.HasValue || x.Price <= specPrams.MaxPrice.Value)
    )
    { }

}
