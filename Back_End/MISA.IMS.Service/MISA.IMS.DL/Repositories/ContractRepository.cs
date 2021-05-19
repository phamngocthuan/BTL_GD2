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


    /// <summary>
    /// Class thực thi giao tiếp db của thực thể contract
    /// </summary>
    public class ContractRepository : BaseRepository<Contract>, IContractRepository
    {
        #region Constructors
        public ContractRepository(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {

            
        }
        #endregion

        #region Methods

        /// <summary>
        /// Lấy tất cả bản ghi 
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public override async Task<IEnumerable<Contract>> GetAllEntity()
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res =  _dbContext.QueryProc("Proc_GetContracts");
                return (IEnumerable<Contract>)res;
            }

        }

        /// <summary>
        /// Lấy bản ghi theo mã yêu cầu
        /// </summary>
        /// <param name="codeRequired">Mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
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

                //var res = (await GetEntitiesAsync($"SELECT * FROM {_tableName} WHERE CodeRequired = @codeRequired", new { codeRequired = codeRequired.ToString() })).AsList();
               /* var res = _dbContext.QueryProc($"Proc_Get{_tableName}ByCodeRequired", new { codeRequired = codeRequired.ToString() });*/
                var res = _dbContext._dbConnection.Query<Contract>($"Proc_Get{_tableName}ByCodeRequired", new { CodeRequired = codeRequired.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                if (res != null )
                {
                    return (Contract)res;
                }
                return null;
            }
        }

        /// <summary>
        /// Lấy bản ghi theo Id bất đồng bộ
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public  override async  Task<Contract> GetByIdAsync(object id)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = _dbContext._dbConnection.Query<Contract>($"Proc_Get{_tableName}ByID", new { ContractID = id.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();

                return res;
            }
        }


        /// <summary>
        /// Lấy mã yêu cầu
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        /*public async Task<string> GetCodeRequired()
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var sqlText = $"SELECT CodeRequired FROM {_tableName} ORDER BY CodeRequired DESC LIMIT 1";

                var res = await _dbContext.ExecuteReaderAsync(sqlText, null);

                res.Read();
                return (string)res.GetValue(0);
            }
        }*/
        #endregion

    }
}
