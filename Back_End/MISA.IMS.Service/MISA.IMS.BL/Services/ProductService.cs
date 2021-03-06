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
    public class ProductService : BaseService<Product>, IProductService
    {
        #region Fields
        private readonly IProductRepository _productRepository;
        private readonly IConfiguration _configuration;
        #endregion

        #region Constructor
        public ProductService(
            IProductRepository productRepository,
            IWebHostEnvironment env)
        {
            _productRepository = productRepository;
            _configuration = ConfigService.GetConfiguration(env);
            var conn = _configuration.GetConnectionString("MISAIMS"); // chuỗi connection string 
            _productRepository.InitializeDatabaseContext(conn);
        }

        #endregion

        #region Methods
        /// <summary>
        /// Hàm lấy danh sách mã sản phẩm
        /// </summary>
        /// <returns></returns>
        /// Created by : PNTHUAN(13/05/2021)
        public async Task<APIResult> GetProductCodes()
        {
            var apiResult = new APIResult();
            var errorResult = new ErrorResult();
            var res = await _productRepository.GetProductCodes();
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
