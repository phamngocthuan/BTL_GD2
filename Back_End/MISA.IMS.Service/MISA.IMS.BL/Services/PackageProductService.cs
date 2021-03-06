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

        #region Methods
        /// <summary>
        /// Hàm Lấy danh sách mã gói sản phẩm
        /// </summary>
        /// <param name="productCode">Mã sản phẩm</param>
        /// <returns></returns>
        /// Created by : pnthuan(13/05/2021)
        public async Task<APIResult> GetPackageProductCode(string productCode)
        {
            var apiResult = new APIResult();
            var errorResult = new ErrorResult();
            var res = await _packageProductRepository.GetPackageProductCode(productCode);
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = null;
                apiResult.MessageCode = MessageCode.NoContent;
                apiResult.Message = new List<string> { Message.NoContent };
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
