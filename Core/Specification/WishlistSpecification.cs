using Core.Entites;

namespace Core.Specification;

public class WishlistSpecification : BaseSpecification<ProductWishlist>
{
    public WishlistSpecification(string userId)
    :base(x=>x.UserId == userId)
    {
        AddInclude(x=>x.Product!);
        AddInclude(x=>x.Product!.ProductImages);
    }

}
