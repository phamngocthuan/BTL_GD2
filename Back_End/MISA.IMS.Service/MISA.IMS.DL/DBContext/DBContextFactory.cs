using MISA.IMS.DL.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.DL.DBContext
{
    public class DBContextFactory : IDBContextFactory
    {
        public IDBContext CreateDatabaseContext(string connectionString)
        {
            var context = new DBContext(new MySqlConnection(connectionString));
            return context;
        }
    }
}
