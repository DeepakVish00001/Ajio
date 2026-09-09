namespace API.Dtos;

public class ProductToReturnDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public decimal DiscountPercentage { get; set; }

    public int QuantityInStock { get; set; }
    public string? ProductBrand { get; set; }
    public string? ProductCategory { get; set; }
    public string? ImageUrl { get; set; }
    public int Likes { get; set; }

}
