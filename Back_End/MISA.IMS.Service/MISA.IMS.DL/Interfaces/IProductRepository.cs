using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// Interface thực thế sản phẩm
    /// </summary>
    public interface IProductRepository : IBaseRepository<Product>
    {
        /// <summary>
        /// Lấy danh sách Mã sản phẩm
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<IEnumerable<string>> GetProductCodes();
    }
}
