using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
            
        }
        public BaseSpecification(Expression<Func<T, bool>> Cariteria)
        {
            Criteria = Cariteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }

        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> OrderBy { get; private set; }

        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        public int Take { get; private set; }
        public int Skip { get; private set; }

        public bool IsPagingEnabled { get; private set; }

        protected void AddIncludes(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void AddOrderBy(Expression<Func<T, object>> orderbyexpression)
        {
            OrderBy = orderbyexpression;
        }

        protected void AddOrderByDescending(Expression<Func<T, object>> orderbyDescExpression)
        {
            OrderByDescending = orderbyDescExpression;
        }

        protected void ApplyPaging (int take , int skip)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}   
