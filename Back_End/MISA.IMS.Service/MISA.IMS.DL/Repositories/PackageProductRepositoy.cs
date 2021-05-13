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
    public class PackageProductRepositoy : BaseRepository<PackageProduct>, IPackageProductRepository
    {
        public PackageProductRepositoy(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {


        }
        public async  Task<IEnumerable<PackageProduct>> GetPackageProductCode(string productCode)
        {
            using( var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await  _dbContext._dbConnection.QueryAsync<PackageProduct>("Proc_GetPackageProductCodes", new { ProductCode = productCode }, commandType: CommandType.StoredProcedure);
                return res;
            }
        }
    }
}
