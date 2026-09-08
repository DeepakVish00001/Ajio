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
        CreateMap<Product, ProductDetailDto>()
            .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand!.Name))
            .ForMember(x => x.ProductCategory, o => o.MapFrom(x => x.ProductBrand!.ProductCategory!.Name))
            .ForMember(x => x.Picture, o => o.MapFrom<ProductDetailsImageUrlResolver>())
            .ForMember(l => l.Likes, o => o.MapFrom(l => l.ProductLikes.Count()));
    }
}
