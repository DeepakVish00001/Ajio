namespace API.Dtos;

public class ProductDetailDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int QuantityInStock { get; set; }
    public string? ProductBrand { get; set; }
    public string? ProductCategory { get; set; }
    public decimal Rating { get; set; }
    public int TotalReviews { get; set; }
    public int Likes { get; set; }

    public List<string> Picture { get; set; } = new();
    public List<ProductCommentDto> Comment { get; set; } = new();

}

