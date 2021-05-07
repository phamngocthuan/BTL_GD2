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

        Task<int> InsertEntity();

        Task<bool> UpdateEntity();
    }
}
