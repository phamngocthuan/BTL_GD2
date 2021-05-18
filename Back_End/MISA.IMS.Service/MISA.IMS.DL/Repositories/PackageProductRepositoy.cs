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
    /// Class thực thi giao tiếp DB của thực thể gói sản phẩm
    /// </summary>
    public class PackageProductRepositoy : BaseRepository<PackageProduct>, IPackageProductRepository
    {
        #region Contructor
        public PackageProductRepositoy(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {


        }

        #endregion

        #region Methods

        /// <summary>
        /// Lấy danh sách mã gói sản phẩm theo mã sản phẩm
        /// </summary>
        /// <param name="productCode">Mã sản phẩm</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async  Task<IEnumerable<PackageProduct>> GetPackageProductCode(string productCode)
        {
            using( var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await  _dbContext._dbConnection.QueryAsync<PackageProduct>("Proc_GetPackageProductCodes", new { ProductCode = productCode }, commandType: CommandType.StoredProcedure);
                return res;
            }
        }
        #endregion
    }
}
