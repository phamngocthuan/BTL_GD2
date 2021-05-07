using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Repositories
{
    public class ContractRepository : BaseRepository<Contract>, IContractRepository
    {
        public ContractRepository(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {

            
        }
        public override async Task<IEnumerable<Contract>> GetAllEntity()
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = _dbContext.QueryProc("Proc_GetContracts");
                return (IEnumerable<Contract>)res;
            }

        }
    }
}
