
using API.Dtos;
using Core.Entities;
using Core.Interface;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductController(IGenericRepository<Product> repo) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductSpecification();
            var products = await repo.ListAsync(spec);
            //return Ok(products);
            return products.Select(product => new ProductToReturnDto
            {
                Id = product!.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,

                ProductBrand = product.ProductBrand!.Name,
                ProductCategory = product.ProductBrand.ProductCategory!.Name,
                ImageUrl = product.ProductImages .Where(x => !x.IsPrimary)
                .Select(x => x.PictureUrl).FirstOrDefault()
            }).ToList();
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var spec = new ProductSpecification(id);

            var product = await repo.GetEntityWithSpec(spec);
            if (product == null) return NotFound("Sorry this product is not found");
            return new ProductDetailDto
            {
                Id = product!.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,
                ProductBrand = product.ProductBrand!.Name,
                ProductCategory = product.ProductBrand.ProductCategory!.Name,
                Picture = product.ProductImages.Select(x=>x.PictureUrl).ToList()
            };
        }
    }
}
