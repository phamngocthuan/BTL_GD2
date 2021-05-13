using Dapper;
using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
                var res =  _dbContext.QueryProc("Proc_GetContracts");
                return (IEnumerable<Contract>)res;
            }

        }

        public async Task<Contract> GetByCodeAsync(object codeRequired)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                /*var res = await  _dbContext._dbConnection.QueryAsync<Contract>("Proc_GetContractByCodeRequired", new { CodeRequired = codeRequired }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                if (res.Count() > 0)
                {
                    return res;
                }
                else return null;*/

                var res = (await GetEntitiesAsync($"SELECT * FROM {_tableName} WHERE CodeRequired = @codeRequired", new { codeRequired = codeRequired.ToString() })).AsList();

                if (res.Count > 0)
                {
                    return res[0];
                }
                return null;
            }
        }

        public async Task<string> GetCodeRequired()
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var sqlText = $"SELECT CodeRequired FROM {_tableName} ORDER BY CodeRequired DESC LIMIT 1";

                var res = await _dbContext.ExecuteReaderAsync(sqlText, null);

                res.Read();
                return (string)res.GetValue(0);
            }
        }

    }
}
