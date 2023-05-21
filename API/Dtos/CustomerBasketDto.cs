namespace API.Dtos
{
    public class CustomerBasketDto
    {
        public int Id { get; set; }
        public List<BasketItemDto> items { get; set; }

    }
}
