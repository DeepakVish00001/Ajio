using Core.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure;

public class ProductWishlistConfiguration : IEntityTypeConfiguration<ProductWishlist>
{
    public void Configure(EntityTypeBuilder<ProductWishlist> builder)
    {
        builder.Property(x => x.UserId).IsRequired();
        builder.Property(x => x.ProductId).IsRequired();

        builder.HasOne(p => p.Product)
                .WithMany(w => w.ProductWishlists)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

        // Same user same product ko
        // multiple times wishlist nahi kar sakta

        builder.HasIndex(x => new { x.UserId, x.ProductId }).IsUnique();
    }
}
