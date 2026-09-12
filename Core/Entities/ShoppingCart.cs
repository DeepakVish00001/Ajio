namespace Core.Entities;

public class ShoppingCart
{
    public int Id { get; set; }
    public List<CartItem> Items { get; set; }=[];
}
