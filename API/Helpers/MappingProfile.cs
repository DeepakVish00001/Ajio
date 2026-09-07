using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfile:Profile
{
    public MappingProfile()
    {
        CreateMap<Product,ProductToReturnDto>()
            .ForMember(x=>x.ProductBrand,o=>o.MapFrom(x=>x.ProductBrand!.Name))
            .ForMember(x=>x.ProductCategory,o=>o.MapFrom(x=>x.ProductBrand!.ProductCategory!.Name))
            .ForMember(i=>i.ImageUrl,o=>
            o.MapFrom(i=>i.ProductImages.Where(x=>!x.IsPrimary)
            .Select(x=>x.PictureUrl).FirstOrDefault()));

        //product to detail image
        CreateMap<Product,ProductDetailDto>()
            .ForMember(x=>x.ProductBrand, o=>o.MapFrom(x=>x.ProductBrand!.Name))
            .ForMember(x=>x.ProductCategory,o=>o.MapFrom(x=>x.ProductBrand!.ProductCategory!.Name))
            .ForMember(i=>i.Picture,o=>
            o.MapFrom(x=>x.ProductImages.Select(x=>x.PictureUrl).ToList()));
    }
}
