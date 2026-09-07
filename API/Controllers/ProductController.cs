
using API.Dtos;
using Core.Entities;
using Core.Interface;
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
            var products =await repo.GetListAynce();
            return Ok(products);
            // return products.Select(product=> new ProductToReturnDto
            // {
            //     Id = product!.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     Price = product.Price,
            //     QuantityInStock = product.QuantityInStock,
                
            //     ProductBrand = product.ProductBrand!.Name
            // }).ToList();
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var product = await repo.GetByIdAynce(id);
            if(product ==null)return NotFound("Sorry this product is not found");
            return Ok(product);
            // return new ProductToReturnDto
            // {
            //     Id = product!.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     Price = product.Price,
            //     QuantityInStock = product.QuantityInStock,
            //   //  IsActive = product.IsActive,
            //     //IsDeleted = product.IsDeleted,
            //     ProductBrand = product.ProductBrand!.Name
            // };
        }
    }
}
