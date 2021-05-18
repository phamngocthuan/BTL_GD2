using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// Interface kết nối DB của đối tượng request
    /// </summary>
    /// Created by : pnthuan(11/5/2021)
    public interface IContractRepository : IBaseRepository<Contract>
    {

        /// <summary>
        /// Lấy mã yêu cầu
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<string> GetCodeRequired();

        /// <summary>
        /// Lấy bản ghi theo mã yêu cầu
        /// </summary>
        /// <param name="codeRequired">Mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<Contract> GetByCodeAsync(object codeRequired);
    }
}
