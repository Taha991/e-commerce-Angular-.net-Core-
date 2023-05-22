using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Identity;
using Core.Entities.OrderAggregate;

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



            CreateMap<Core.Identity.Address, AddressDto>().ReverseMap();


            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();


            CreateMap<BasketItemDto, BasketItem>().ReverseMap();

            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();


            CreateMap<Order, OrderToReturnDto>()
                  .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
           .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
           .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
           .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
           .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());

        }


    }
}
