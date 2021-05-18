using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// interface entity gói sản phẩm
    /// </summary>
    public interface IPackageProductRepository : IBaseRepository<PackageProduct>
    {
        /// <summary>
        /// Lấy danh sách mã gói sản phẩm theo mã sản phẩm
        /// </summary>
        /// <param name="productCode">Mã sản phẩm</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<IEnumerable<PackageProduct>> GetPackageProductCode(string productCode);
    }
}
