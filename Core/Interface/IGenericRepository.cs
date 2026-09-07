namespace Core.Interface;

public interface IGenericRepository<T>
{
    public Task<IReadOnlyList<T>> GetListAynce();
    public Task<T?> GetByIdAynce(int id);
}
