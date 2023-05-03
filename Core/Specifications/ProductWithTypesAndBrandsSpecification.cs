using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {

        public ProductWithTypesAndBrandsSpecification()
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }

        public ProductWithTypesAndBrandsSpecification(int id) : base(x=> x.Id == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);

        }
    }
}
