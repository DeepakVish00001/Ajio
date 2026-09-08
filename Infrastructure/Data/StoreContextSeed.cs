using System.Text.Json;
using Core.Entites;
using Core.Entities;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.ProductCategories.Any())
        {
            var typeData = await File.ReadAllTextAsync("../Infrastructure/Data/StoreSeed/types.json");
            var types = JsonSerializer.Deserialize<List<ProductCategory>>(typeData);
            if (types == null || types.Count == 0) return;
            await context.ProductCategories.AddRangeAsync(types);
            await context.SaveChangesAsync();
        }
        if (!context.ProductBrands.Any())
        {
            var brandData = await File.ReadAllTextAsync("../Infrastructure/Data/StoreSeed/brands.json");
            var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData);
            if (brands == null || brands.Count == 0) return;
            await context.ProductBrands.AddRangeAsync(brands);
            await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
            var productData = await File.ReadAllTextAsync("../Infrastructure/Data/StoreSeed/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productData);
            if (products == null || products.Count == 0) return;
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
        if (!context.ProductImages.Any())
        {
            var imageData = await File.ReadAllTextAsync("../Infrastructure/Data/StoreSeed/images.json");
            var images = JsonSerializer.Deserialize<List<ProductImage>>(imageData);
            if (images == null || images.Count == 0) return;
            await context.ProductImages.AddRangeAsync(images);
            await context.SaveChangesAsync();
        }
        if (!context.ProductLikes.Any())
        {
            var likeData = await File.ReadAllTextAsync("../Infrastructure/Data/StoreSeed/likes.json");
            var likes = JsonSerializer.Deserialize<List<ProductLike>>(likeData);
            if (likes == null || likes.Count == 0) return;
            await context.ProductLikes.AddRangeAsync(likes);
            await context.SaveChangesAsync();
        }
    }
}
