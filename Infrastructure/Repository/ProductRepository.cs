using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetAllBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> GetAllProductsAsync()
        {

           return await _context.Products
                .Include(p=> p.ProductBrand)
                .Include(p => p.ProductType)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetAllTypesAsync()
        {

            return await _context.ProductTypes.ToListAsync();
        }

        public async Task<Product> GetProductsByIdAsync(int id)
        {
           return await _context.Products
                .Include(p=> p.ProductBrand)
                .Include(p => p.ProductType)
                .FirstOrDefaultAsync(p=> p.Id == id);
        }



    }
}
