
using API.Dtos;
using API.Extensions;
using Core.Entities.OrderAggregate;
using Core.Interface;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Authorize(Roles = "Admin")]
    public class AdminController(IUnitOfWork unit, IPaymentService paymentService) : BaseApiController
    {
        [HttpGet("orders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrders([FromQuery] OrderSpecParams specParams)
        {
            var spec = new OrderSpecification(specParams);

            return await CreatePagedResult(unit.Repository<Order>(),
                spec, specParams.PageIndex, specParams.PageSize, o => o.ToDto());
        }

        [HttpGet("orders/{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return BadRequest("No order with the id");

            return order.ToDto();
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("orders/processing/{id:int}")]
        public async Task<ActionResult<OrderDto>> OrderProcessing(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>()
                .GetEntityWithSpec(spec);

            if (order == null)
                return NotFound("No order with the id");

            if (order.Status != OrderStatus.PaymentReceived)
                return BadRequest("Order cannot be processed");

            order.Status = OrderStatus.Processing;

            await unit.Complete();

            return Ok(order.ToDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("orders/shipping/{id:int}")]
        public async Task<ActionResult<OrderDto>> OrderShipping(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>()
                .GetEntityWithSpec(spec);

            if (order == null)
                return NotFound("No order with the id");

            if (order.Status != OrderStatus.Processing)
                return BadRequest("Order cannot be shipped");

            order.Status = OrderStatus.Shipped;

            await unit.Complete();

            return Ok(order.ToDto());
        }

        [HttpPost("orders/out-for-delivery/{id:int}")]
        public async Task<ActionResult<OrderDto>> OutForDelivery(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>()
                .GetEntityWithSpec(spec);

            if (order == null)
                return NotFound("No order with the id");

            if (order.Status != OrderStatus.Shipped)
                return BadRequest("Order cannot be out for delivery");

            order.Status = OrderStatus.OutForDelivery;

            await unit.Complete();

            return Ok(order.ToDto());
        }

        [HttpPost("orders/delivered/{id:int}")]
        public async Task<ActionResult<OrderDto>> OrderDelivered(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>()
                .GetEntityWithSpec(spec);

            if (order == null)
                return NotFound("No order with the id");

            if (order.Status != OrderStatus.OutForDelivery)
                return BadRequest("Order cannot be out for delivery");

            order.Status = OrderStatus.Delivered;

            await unit.Complete();

            return Ok(order.ToDto());
        }



        [HttpPost("orders/refund/{id:int}")]
        public async Task<ActionResult<OrderDto>> RefundOrder(int id)
        {
            var spec = new OrderSpecification(id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return BadRequest("No order with the id");

            if (order.Status == OrderStatus.Pending)
                return BadRequest("Payment not received for this order");

            var result = await paymentService.RefundPayment(order.PaymentIntentId);
            if (result == "succeeded")
            {
                order.Status = OrderStatus.Refunded;

                await unit.Complete();

                return order.ToDto();
            }

            return BadRequest("Problem refunding order");
        }


    }
}
