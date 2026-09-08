using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ProductLikeConfiguration : IEntityTypeConfiguration<ProductLike>
{
    public void Configure(EntityTypeBuilder<ProductLike> builder)
    {
        builder.HasOne(x => x.Product)
            .WithMany(l => l.ProductLikes)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
