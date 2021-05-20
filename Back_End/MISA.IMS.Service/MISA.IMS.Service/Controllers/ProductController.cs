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
    [Route("api/v{version:apiVersion}/products")]
    [ApiVersion("1")]
    [ApiController]
    public class ProductController : ControllerBase
    {


        #region Fields
        private readonly IProductService _productService;
        #endregion

        #region Constructors
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        #endregion

        #region Method
        /// <summary>
        /// Hàm lấy thông tin về Mã sản phẩm
        /// </summary>
        /// <returns>Trả về danh sách mã sản phẩm</returns>
        /// Created by : PNTHUAN(12/5/2021)
        [HttpGet("code")]
       public async Task<IActionResult> GetProductCode()
        {
            try
            {

                var apiResult = await _productService.GetProductCodes();
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
