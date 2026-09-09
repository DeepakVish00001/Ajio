using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ProductCommentConfiguration : IEntityTypeConfiguration<ProductComment>
{
    public void Configure(EntityTypeBuilder<ProductComment> builder)
    {
        builder.Property(x => x.Rating).IsRequired(false);
        builder.Property(x => x.Comment).IsRequired(false);
        builder.Property(x => x.UserId).IsRequired(false);

        builder.HasOne(p => p.Product)
               .WithMany(c => c.ProductComments)
               .HasForeignKey(p => p.ProductId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
