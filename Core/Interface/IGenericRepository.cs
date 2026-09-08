using Core.Specification;

namespace Core.Interface;

public interface IGenericRepository<T>
{
    Task<IReadOnlyList<T>> GetListAynce();
    Task<T?> GetByIdAynce(int id);

    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<T?> GetEntityWithSpec(ISpecification<T> spec);

    Task<int> CountAsync(ISpecification<T> spec);
}
