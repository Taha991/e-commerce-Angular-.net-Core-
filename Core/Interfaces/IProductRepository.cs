using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductsByIdAsync(int id);

        Task<IReadOnlyList<Product>> GetAllProductsAsync();


    }
}
