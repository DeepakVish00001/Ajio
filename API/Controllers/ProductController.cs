
using API.Dtos;
using API.Helpers;
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
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
         [FromQuery] ProductSpecPrams specPrams)
        {
            var spec = new ProductSpecification(specPrams);
            var countSpec = new ProductFilterWithBrandCateSpec(specPrams);


            var totalItems = await repo.CountAsync(countSpec);

            var products = await repo.ListAsync(spec);
            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(specPrams.PageIndex, specPrams.PageSize, totalItems, data));
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var spec = new ProductSpecification(id);

            var product = await repo.GetEntityWithSpec(spec);
            if (product == null) return NotFound("Sorry this product is not found");
            return mapper.Map<Product, ProductDetailDto>(product);
        }
    }
}
