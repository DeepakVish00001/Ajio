using API.Controllers;
using API.Dtos;
using AutoMapper;
using Core.Entites;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class WishlistController(IGenericRepository<ProductWishlist> repo,IMapper mapper) : BaseApiController
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<IReadOnlyList<WishlistDto>>> GetWishLists(string userId)
        {
            var spec = new WishlistSpecification(userId);

            var wishlists = await repo.ListAsync(spec);

            return Ok(mapper.Map<IReadOnlyList<WishlistDto>>(wishlists));
        }
    }
}
