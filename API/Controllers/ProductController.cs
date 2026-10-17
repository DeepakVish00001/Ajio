
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductController(
        IUnitOfWork unit, IMapper mapper) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
         [FromQuery] ProductSpecPrams specPrams)
        {
            var spec = new ProductSpecification(specPrams);
            var countSpec = new ProductFilterWithBrandCateSpec(specPrams);


            var totalItems = await unit.Repository<Product>().CountAsync(countSpec);

            var products = await unit.Repository<Product>().ListAsync(spec);
            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(specPrams.PageIndex, specPrams.PageSize, totalItems, data));
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var spec = new ProductSpecification(id);

            var product = await unit.Repository<Product>().GetEntityWithSpec(spec);
            if (product == null) return NotFound("Sorry this product is not found");
            return mapper.Map<Product, ProductDetailDto>(product);
        }

        [HttpGet("category")]
        public async Task<ActionResult<IReadOnlyList<ProductCategoryDto>>> GetCategory()
        {
            var category = await unit.Repository<ProductCategory>().GetListAynce();
            var result = category.Select(x => new ProductCategoryDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            return Ok(result);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrandDto>>> GetBrands()
        {
            var brands = await unit.Repository<ProductBrand>().GetListAynce();
            var result = brands.Select(x => new ProductBrandDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            return Ok(result);
        }
    }
}
