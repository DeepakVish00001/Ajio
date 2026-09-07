
using API.Dtos;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var products =await context.Products
            .Include(p => p.ProductBrand)
            .Where(p=>!p.IsDeleted && p.IsActive)
            .ToListAsync();
            return products.Select(product=> new ProductToReturnDto
            {
                Id = product!.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,
                
                ProductBrand = product.ProductBrand!.Name
            }).ToList();
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var product = await context.Products
                    .Include(p => p.ProductBrand)
                    .FirstOrDefaultAsync(x =>  x.Id == id && x.IsActive && !x.IsDeleted);
            if(product ==null)return NotFound("Sorry this product is not found");
            return new ProductToReturnDto
            {
                Id = product!.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,
              //  IsActive = product.IsActive,
                //IsDeleted = product.IsDeleted,
                ProductBrand = product.ProductBrand!.Name
            };
        }
    }
}
