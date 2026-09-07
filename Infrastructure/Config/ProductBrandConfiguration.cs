using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ProductBrandConfiguration : IEntityTypeConfiguration<ProductBrand>
{
    public void Configure(EntityTypeBuilder<ProductBrand> builder)
    {
        builder.Property(n => n.Name).IsRequired();
        builder.HasOne(c => c.ProductCategory)
            .WithMany(c => c.ProductBrands)
            .HasForeignKey(c => c.ProductCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
