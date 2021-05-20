using Microsoft.AspNetCore.Mvc;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Common.Constants;
using MISA.IMS.Common.Enumerations;
using MISA.IMS.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.IMS.Service.Controllers
{
    [Route("api/v{version:apiVersion}/packages")]
    [ApiVersion("1")]
    [ApiController]
    public class PackageProductController : ControllerBase
    {
        #region Fields
        private readonly IPackageProductService _packageProductService;
        #endregion

        #region Constructors
        public PackageProductController(IPackageProductService packageProductService)
        {
            _packageProductService = packageProductService;
        }
        #endregion


        #region Methods
        /// <summary>
        /// Hàm lấy thông tin về Mã gói sản phẩm theo mã sản phẩm
        /// </summary>
        /// <param name="productCode">Mã sản phẩm</param>
        /// <returns>Danh sách mã gói sản phẩm</returns>
        /// Created by : PNTHUAN (11/5/2021)
        [HttpGet]
        public async Task<IActionResult> GetPackageProductCode([FromQuery] string productCode)
        {
            try
            {

                var apiResult = await _packageProductService.GetPackageProductCode(productCode);
                if (apiResult.Success == true)
                {
                    return Ok(apiResult);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResult
                {
                    DevMsg = DevMsg.Error,
                    ErrorCode = ErrorCode.Exception,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = TracerID.Id
                });
            }
        }
        #endregion
    }
}
