using MISA.IMS.DL.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.DL.DBContext
{
    /// <summary>
    /// class khởi tạo dbcontext
    /// </summary>
    public class DBContextFactory : IDBContextFactory
    {
        /// <summary>
        /// Khởi tạo kết nối
        /// </summary>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public IDBContext CreateDatabaseContext(string connectionString)
        {
            var context = new DBContext(new MySqlConnection(connectionString));
            return context;
        }
    }
}
