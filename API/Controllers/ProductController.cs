
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductController(IGenericRepository<Product> repo, IMapper mapper) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts(
         [FromQuery]   ProductSpecPrams specPrams )
        {
            var spec = new ProductSpecification(specPrams);
            var products = await repo.ListAsync(spec);
            return Ok(mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products));
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var spec = new ProductSpecification(id);

            var product = await repo.GetEntityWithSpec(spec);
            if (product == null) return NotFound("Sorry this product is not found");
            return mapper.Map<Product,ProductDetailDto>(product);
        }
    }
}
