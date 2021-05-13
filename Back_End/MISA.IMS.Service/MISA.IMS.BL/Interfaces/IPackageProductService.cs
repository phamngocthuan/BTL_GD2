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
        Task<APIResult> GetPackageProductCode(string productCode);
    }
}
