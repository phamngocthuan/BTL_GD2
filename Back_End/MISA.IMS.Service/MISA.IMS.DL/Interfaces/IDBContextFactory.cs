using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.DL.Interfaces
{
    public interface IDBContextFactory
    {
        IDBContext CreateDatabaseContext(string connectionString);
    }
}
