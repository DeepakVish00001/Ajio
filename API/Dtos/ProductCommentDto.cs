namespace API.Dtos;

public class ProductCommentDto
{
    public int Id { get; set; }
    public string? Comment { get; set; }
    public int? Rating { get; set; }

    public string? UserId { get; set; }
    public DateTime CreateAt { get; set; }
}
