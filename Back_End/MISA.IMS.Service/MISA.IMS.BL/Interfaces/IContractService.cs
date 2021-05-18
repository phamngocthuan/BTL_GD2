using MISA.IMS.Data.Entities;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Interfaces
{
    public interface IContractService : IBaseService<Contract>
    {
        /// <summary>
        /// Hàm Lấy mã yêu cầu của bản ghi theo Id
        /// </summary>
        /// <param name="id">Id của đối tượng </param>
        /// <returns></returns>
        /// Created by :pnthuan (12/05/2021)
        Task<APIResult> GetByCodeAsync(object id);
    }
}
