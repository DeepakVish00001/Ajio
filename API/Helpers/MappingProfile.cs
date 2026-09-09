using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand!.Name))
            .ForMember(x => x.ProductCategory, o => o.MapFrom(x => x.ProductBrand!.ProductCategory!.Name))
            .ForMember(x => x.ImageUrl, o => o.MapFrom<ProductImageUrlResolver>())
            .ForMember(x => x.Likes, o => o.MapFrom(x => x.ProductLikes.Count()));




        //product to detail image
        CreateMap<ProductComment, ProductCommentDto>();
        CreateMap<Product, ProductDetailDto>()
            .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand!.Name))
            .ForMember(x => x.ProductCategory, o => o.MapFrom(x => x.ProductBrand!.ProductCategory!.Name))
            .ForMember(x => x.Picture, o => o.MapFrom<ProductDetailsImageUrlResolver>())

            .ForMember(x => x.StockStatus, o => o
                    .MapFrom(x => x.QuantityInStock > 0 ? "InStock" : "OutOfStock"))

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
            .ForMember(c => c.Comment, o => o.MapFrom(c => c.ProductComments));

    }
}
