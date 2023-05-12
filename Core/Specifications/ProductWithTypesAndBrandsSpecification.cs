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

        public ProductWithTypesAndBrandsSpecification(ProductSpecParams productParams)
            : base(x =>
             (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
           )
            )
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex- 1) , productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case  "priceAsc":
                        AddOrderBy(p=> p.Price);
                        break;
 
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;  


                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }
        }

        public ProductWithTypesAndBrandsSpecification(int id) : base(x=> x.Id == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);

        }
    }
}
