using MISA.IMS.Data.Entities;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Interfaces
{
    public interface IPackageProductService : IBaseService<PackageProduct>
    {
        /// <summary>
        /// Hàm Lấy danh sách mã gói sản phẩm
        /// </summary>
        /// <param name="productCode">Mã sản phẩm</param>
        /// <returns></returns>
        /// Created by : pnthuan(13/05/2021)
        Task<APIResult> GetPackageProductCode(string productCode);
    }
}
