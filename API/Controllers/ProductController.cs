using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public string GetProducts()
        {
            return " This is list of products";
        }

        [HttpGet("{id}")]
        public string GetProduct(int id)
        {
            return "This is the product";
        }


    }
}
