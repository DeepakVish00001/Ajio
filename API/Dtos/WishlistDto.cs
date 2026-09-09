using Core.Entities;

namespace API.Dtos;

public class WishlistDto
{
    public required string UserId { get; set; }
    public ProductToReturnDto  Product { get; set; }=null!;

}
