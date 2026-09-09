using API.Dtos;
using AutoMapper;
using Core.Entites;
using Core.Entities;

namespace API.Helpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        //get all product mapping
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand!.Name))
            .ForMember(x => x.ProductCategory, o => o.MapFrom(x => x.ProductBrand!.ProductCategory!.Name))
            .ForMember(x => x.Likes, o => o.MapFrom(x => x.ProductLikes.Count()))

            .ForMember(x => x.DiscountPercentage, o => o
                    .MapFrom(x => x.OriginalPrice > 0
                        ? Math.Round(
                            ((x.OriginalPrice - x.Price) / x.OriginalPrice) * 100,
                            2)
                        : 0))
            

            .ForMember(x=>x.Rating,o=>o
                .MapFrom(x=>x.ProductComments.Where(x=>x.Rating.HasValue)
                .Select(x=>x.Rating!.Value).DefaultIfEmpty().Average()))

            .ForMember(r => r.TotalReviews, o => o.MapFrom(r => r.ProductComments.Count()))
                
            .ForMember(x => x.ImageUrl, o => o.MapFrom<ProductImageUrlResolver>());





        //product to detail image
        CreateMap<ProductComment, ProductCommentDto>();
        CreateMap<Product, ProductDetailDto>()
            .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand!.Name))
            .ForMember(x => x.ProductCategory, o => o.MapFrom(x => x.ProductBrand!.ProductCategory!.Name))
            .ForMember(x => x.Picture, o => o.MapFrom<ProductDetailsImageUrlResolver>())

            .ForMember(x => x.StockStatus, o => o
                    .MapFrom(x => x.QuantityInStock > 0 ? "In Stock" : "Out of Stock"))

            .ForMember(x => x.DiscountPercentage,
                    o => o.MapFrom(x => x.OriginalPrice > 0
                        ? Math.Round(
                             ((x.OriginalPrice - x.Price) / x.OriginalPrice) * 100,
                             2)
                        : 0))

            .ForMember(r => r.TotalReviews, o => o.MapFrom(r => r.ProductComments.Count()))
            .ForMember(r => r.Rating, o => o
                .MapFrom(r => r.ProductComments.Where(x => x.Rating.HasValue)
                .Select(c => c.Rating!.Value).DefaultIfEmpty().Average()))

            .ForMember(l => l.Likes, o => o.MapFrom(l => l.ProductLikes.Count()))
            .ForMember(c => c.Comment, o => o.MapFrom(c => c.ProductComments))

            .ForMember(x => x.RatingBreakdown, o => o.MapFrom(x =>
                            Enumerable.Range(1, 5).ToDictionary(
                                     rating => rating,
                                     rating => x.ProductComments.Count(c => c.
                                     Rating == rating))));
            
            //wishlist mapping
            CreateMap<ProductWishlist,WishlistDto>()
                .ForMember(x=>x.UserId,o=>o.MapFrom(x=>x.UserId))
                .ForMember(x=>x.Product,o=>o.MapFrom(x=>x.Product));

    }
}
