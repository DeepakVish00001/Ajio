using System.Linq.Expressions;

namespace Core.Specification;

public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; set; }
    List<Expression<Func<T, object>>> Includes { get; set; }

    Expression<Func<T, object>>? OrderBy { get;}
    Expression<Func<T, object>>? OrderByDescending { get;}


}
