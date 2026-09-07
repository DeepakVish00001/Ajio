using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class ProductImageUrlResolver(IConfiguration config) : IValueResolver<Product, ProductToReturnDto, string?>
{
    public string Resolve(Product source, ProductToReturnDto destination, string? destMember, ResolutionContext context)
    {
        var image = source.ProductImages.Where(x => x.IsPrimary).Select(x => x.PictureUrl)
        .FirstOrDefault();
        if (image == null) return null!;
        return config["ApiUrl"] + image;
    }
}

