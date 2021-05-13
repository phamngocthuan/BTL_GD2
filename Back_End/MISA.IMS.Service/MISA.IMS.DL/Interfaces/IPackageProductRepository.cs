using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    public interface IPackageProductRepository : IBaseRepository<PackageProduct>
    {
        Task<IEnumerable<PackageProduct>> GetPackageProductCode(string productCode);
    }
}
