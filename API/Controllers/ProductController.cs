
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public ProductController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _storeContext.Products.ToListAsync();
            return products;
        }

        [HttpGet("{id}")]
        public  async Task<ActionResult<Product>>  GetProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            return product;
        }


    }
}
