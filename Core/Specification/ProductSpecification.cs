using Core.Entities;

namespace Core.Specification;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(ProductSpecPrams specPrams)
    : base(x => !x.IsDeleted && x.IsActive &&
        (string.IsNullOrEmpty(specPrams.Search) || x.Name.ToLower().Contains(specPrams.Search)) &&
        (!specPrams.BrandId.HasValue || x.ProductBrandId == specPrams.BrandId) &&
        (!specPrams.CategoryId.HasValue || x.ProductBrand!.ProductCategoryId == specPrams.CategoryId) &&
        (!specPrams.MinPrice.HasValue || x.Price >= specPrams.MinPrice.Value) &&
        (!specPrams.MaxPrice.HasValue || x.Price <= specPrams.MaxPrice.Value)&&
        (!specPrams.MinRating.HasValue || x.ProductComments.Any(c=>
            c.Rating.HasValue && c.Rating.Value >= specPrams.MinRating.Value))
    )
    {
        AddInclude(p => p.ProductBrand!);
        AddInclude(p => p.ProductBrand!.ProductCategory!);
        AddInclude(p => p.ProductImages);
        AddInclude(l => l.ProductLikes);
        AddInclude(x => x.ProductComments);

        AddOrderBy(s => s.Name);
        ApplyPaging(specPrams.PageSize * (specPrams.PageIndex - 1), specPrams.PageSize);

        if (!string.IsNullOrEmpty(specPrams.Sort))
        {
            switch (specPrams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
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
        AddInclude(l => l.ProductLikes);
        AddInclude(x => x.ProductComments);



    }
}
