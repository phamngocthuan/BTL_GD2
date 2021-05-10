using MISA.IMS.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        void InitializeDatabaseContext(string connectionString);

        Task<T> GetByIdAsync(object id);

        Task<IEnumerable<T>> GetAllEntity();
        Task<IEnumerable<T>> GetEntities(ListRequest listRequest, int status, long offset, long limit);
        Task<long> CountEntities(ListRequest listRequest, int status);

        Task<int> InsertAsync(T entity);

        Task<int> DeleteAsync(IEnumerable<string> ids);

        Task<int> UpdateAsync(T entity);
        Task<int> UpdateStatus(string id, int status);

        
    }
}
