using Core.Entities;

namespace Core.Entites;

public class ProductImage : BaseEntity
{
    public string? PictureUrl { get; set; }

    public int ProductId { get; set; }
    public Product? Product { get; set; }

    public bool IsPrimary { get; set; }
}

