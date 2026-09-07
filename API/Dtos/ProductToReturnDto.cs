namespace API.Dtos;

public class ProductToReturnDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int QuantityInStock { get; set; }
   // public bool IsActive { get; set; } = true;
    //public bool IsDeleted { get; set; } = false;
    public string? ProductBrand { get; set; }

}
