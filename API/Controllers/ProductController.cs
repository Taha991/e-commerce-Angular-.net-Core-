
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using DTOs;
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
        private readonly IProductRepository _productRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;

        public ProductController(StoreContext storeContext  , IProductRepository productRepository ,IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<Product> productRepo , IGenericRepository<ProductType> ProductTypeRepo)
        {
            _storeContext = storeContext;
            _productRepository = productRepository;
            _productBrandRepo = productBrandRepo;
            _productRepo = productRepo;
            _productTypeRepo = ProductTypeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var spec = new ProductWithTypesAndBrandsSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public  async Task<ActionResult<Product>>  GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSPec(spec) ;
            return new ProductToReturnDto();
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }

    }
}
