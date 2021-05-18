using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// interface khởi tạo dbContext
    /// </summary>
    public interface IDBContextFactory
    {
        /// <summary>
        /// Khởi tạo kết nối
        /// </summary>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        IDBContext CreateDatabaseContext(string connectionString);
    }
}
