namespace Core.Specification;

public class ProductSpecPrams
{
    private const int MaxPageSize = 100;
    public int PageIndex { get; set; } = 1;
    private int _pageSize = 6;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }



    public int? BrandId { get; set; }
    public int? CategoryId { get; set; }
    public string? Sort { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
}
