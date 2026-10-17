using API.Controllers;
using API.Dtos;
using AutoMapper;
using Core.Entites;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class WishlistController(IUnitOfWork unit, IMapper mapper) : BaseApiController
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<IReadOnlyList<WishlistDto>>> GetWishLists(string userId)
        {
            var spec = new WishlistSpecification(userId);

            var wishlists = await unit.Repository<ProductWishlist>().ListAsync(spec);

            return Ok(mapper.Map<IReadOnlyList<WishlistDto>>(wishlists));
        }
    }
}
