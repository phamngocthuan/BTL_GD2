using MISA.IMS.Data.Entities;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Interfaces
{
    public interface IProductService : IBaseService<Product>
    {
        /// <summary>
        /// Hàm lấy danh sách mã sản phẩm
        /// </summary>
        /// <returns></returns>
        /// Created by : PNTHUAN(13/05/2021)
        Task<APIResult> GetProductCodes();
    }
}
