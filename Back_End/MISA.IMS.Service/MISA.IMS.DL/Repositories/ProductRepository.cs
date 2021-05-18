using Dapper;
using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Repositories
{
    /// <summary>
    /// Class thực thi giao tiếp DB của thực thể  sản phẩm
    /// </summary>
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        #region Constructor
        public ProductRepository(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {


        }
        #endregion

        #region Method

        /// <summary>
        /// Lấy danh sách Mã sản phẩm
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<IEnumerable<string>> GetProductCodes()
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext._dbConnection.QueryAsync<string>("Proc_GetProductCodes", new { }, commandType: CommandType.StoredProcedure);
                return (IEnumerable<string>)res;
            }
        }
        #endregion
    }
}
