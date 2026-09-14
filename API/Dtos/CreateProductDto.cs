using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class CreateProductDto:IValidatableObject
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater then 0")]
    public decimal Price { get; set; }
    [Range(0.01, double.MaxValue, ErrorMessage = "Original Price must be greater then 0")]
    public decimal OriginalPrice { get; set; }
    [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be at least 1")]
    public int QuantityInStock { get; set; }
    [Required]
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;

    [Required]
    public string ProductBrand { get; set; } = string.Empty;
    [Required]
    public string ProductCategory { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Price > OriginalPrice)
        {
            yield return new ValidationResult(
                "Price cannot be greater than Original Price.",
                new[]{nameof(Price)}
            );
        }
    }
}
