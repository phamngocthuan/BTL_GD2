using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Common.Constants;
using MISA.IMS.Common.Enumerations;
using MISA.IMS.Core;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Data.Entities;
using MISA.IMS.Data.Response;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Services
{
    public class PackageProductService : BaseService<PackageProduct>, IPackageProductService
    {
        #region Fields
        private readonly IPackageProductRepository _packageProductRepository;
        private readonly IConfiguration _configuration;
        #endregion

        #region Constructor
        public PackageProductService(
            IPackageProductRepository packageProductRepository,
            IWebHostEnvironment env)
        {
            _packageProductRepository = packageProductRepository;
            _configuration = ConfigService.GetConfiguration(env);
            var conn = _configuration.GetConnectionString("MISAIMS"); // chuỗi connection string 
            _packageProductRepository.InitializeDatabaseContext(conn);
        }

        #endregion

        #region method
        public async Task<APIResult> GetPackageProductCode(string productCode)
        {
            var apiResult = new APIResult();
            var errorResult = new ErrorResult();
            var res = _packageProductRepository.GetPackageProductCode(productCode).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
        #endregion
    }
}
