using Core.Specification;

namespace Core.Interface;

public interface IGenericRepository<T>
{
    public Task<IReadOnlyList<T>> GetListAynce();
    public Task<T?> GetByIdAynce(int id);

    public Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    public Task<T?> GetEntityWithSpec(ISpecification<T> spec);
}
