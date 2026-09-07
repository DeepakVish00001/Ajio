using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class ProductDetailsImageUrlResolver(IConfiguration config) : IValueResolver<Product, ProductDetailDto, List<string>>
{
   

    public List<string> Resolve(Product source, ProductDetailDto destination, List<string> destMember, ResolutionContext context)
    {
        if(source.ProductImages!=null && source.ProductImages.Any())
        {
            return source.ProductImages.Select(x=>(string?)config["ApiUrl"]+x.PictureUrl).ToList();
            
        }
        return new List<string>();
    }
}
