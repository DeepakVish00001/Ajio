using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Id = "admin-id",
                Name = "Admin",
                NormalizedName = "ADMIN",
                ConcurrencyStamp = "70cfa281-8b02-4a3a-b439-0609eb26bc37"
            },
            new IdentityRole
            {
                Id = "customer-id",
                Name = "Customer",
                NormalizedName = "CUSTOMER",
                ConcurrencyStamp = "b51384ad-2f23-485c-aef4-b07cc8c2cc3b"
            }
        );
    }
}