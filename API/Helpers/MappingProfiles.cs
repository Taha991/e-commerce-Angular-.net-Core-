using API.Dtos;
using AutoMapper;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()

                // showing Product names o for output 
                .ForMember(p=> p.ProductBrand , o=>o.MapFrom(s=>s.ProductBrand.Name))
                .ForMember(p => p.ProductType, o=> o.MapFrom(s => s.ProductType.Name))
                .ForMember(p => p.PictureUrl, o=> o.MapFrom<ProductUrlResolver>());


        }


    }
}
