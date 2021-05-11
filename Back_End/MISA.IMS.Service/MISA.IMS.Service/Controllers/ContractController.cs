using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Common.Constants;
using MISA.IMS.Common.Enumerations;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Data.Entities;
using MISA.IMS.Data.Response;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MISA.IMS.Core.Properties;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.IMS.Service.Controllers
{

    [Route("api/v{version:apiVersion}/contracts")]
    [ApiVersion("1")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        #region Fields
        private readonly IContractService _contractService;
        #endregion

        #region Constructors
        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }
        #endregion




        /// <summary>
        /// Hàm lấy tất cả bản ghi
        /// </summary>
        /// <returns>Tất cả bản ghi</returns>
        /// Created by : PNTHUAN(11/5/2021)
        #region Method 
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {

                var apiResult = await _contractService.GetAllEntity();
                if (apiResult.Success == true)
                {
                    return Ok(apiResult.Data);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
        }

        /// <summary>
        /// Hàm lấy bản ghi theo id
        /// </summary>
        /// <param name="id">id của bản ghi truyền vào<aram>
        /// <returns>Bản ghi cần lấy</returns>
        /// <returns>Error : Lỗi hoặc Exception</returns>
        /// Created by : PNTHUAN (11/5/2021)
        // GET api/<ContractController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute][Required]string id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = Resources.ErrorValidate_NotValid,
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                var apiResult = await _contractService.GetByIdAsync(id);
                if (apiResult.Success == true)
                {
                    return Ok(apiResult.Data);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
        }

        /// <summary>
        /// Hàm thêm mới bản ghi
        /// </summary>
        /// <param name="contractDTO">Bản ghi dưới dạng json</param>
        /// <param name="createdBy">Người tạo</param>
        /// <param name="status">Trạng thái bản ghi : 0 : UNSENT , 1 : PENDING , 2 : REFUSE, 3 : APPROVED</param>
        /// <returns>Thông tin khi thêm mới bản ghi</returns>
        /// <returns>Error : Lỗi  hoặc exception trong quá trình thêm mới</returns>
        /// Creted by  : PNTHUAN ( 11/5/2021)
        // POST api/<ContractController>
        [HttpPost]
        public async Task<IActionResult> InsertContract(
            [FromBody] ContractDTO contractDTO,
            [FromHeader(Name = "CreatedBy")][Required] string createdBy,
            [FromHeader(Name = "Status")] int status = 0
            )
        {
            try
            {

                if(!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = Resources.ErrorValidate_NotValid,
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                // convert sang đối tượng thêm vào và khởi tạo một số thuộc tính cần có
                Contract contract = contractDTO.ConvertInsertContract(createdBy, status);
                APIResult aPIResult = await _contractService.InsertAsync(contract);
                if (aPIResult.Success)
                {
                    return Ok(aPIResult);
                }
                else
                {
                    return BadRequest(aPIResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
        }

        /// <summary>
        /// Hàm cập nhật bản ghi theo id
        /// </summary>
        /// <param name="contractDTO">Bản ghi dưới dạng jsong</param>
        /// <param name="modifiedBy">Người chỉnh sửa</param>
        /// <param name="id">ID của bản ghi </param>
        /// <returns>Thông tin khi thực hiện update</returns>
        /// Error : return lỗi hoặc exception 
        /// Created by : PNTHUAN(11/5/2021)
        // PUT api/<ContractController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContract(
            [FromBody] ContractDTO contractDTO,
            [FromHeader(Name = "ModifiedBy")][Required] string modifiedBy,
            [FromRoute][Required] string  id
         )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = Resources.ErrorValidate_NotValid,
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                // chỉ được update với bản nháp và chờ yêu cầu
                Contract contract = contractDTO.ConvertUpdateContract(modifiedBy, id);

                var apiResult = await _contractService.UpdateAsync(id,contract);
                if (apiResult.Success == true)
                {
                    return Ok(apiResult);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
        }

        /// <summary>
        /// Hàm xóa một hoặc nhiều hợp đồng
        /// </summary>
        /// <param name="ids">Mảng id hợp đồng cần xóa</param>
        /// <returns> Trả về thông tin khi xóa thành công</returns>
        /// Error : Trả về lỗi khi gặp ngoại lệ hoặc trong quá trình xóa không tìm thấy bản ghi
        /// Created by : PNTHUAN( 11/5/2021)
        // DELETE api/<ContractController>/5
        [HttpDelete()]
        public async Task<IActionResult> DeleteContract([FromBody][Required] IEnumerable<string> ids)
        {
            try
            {

                    if (!ModelState.IsValid)
                    {
                        var apiRes = new APIResult()
                        {
                            Success = false,
                            Message = Resources.ErrorValidate_NotValid,
                            MessageCode = MessageCode.ValidateEntity,
                            Data = ModelState
                        };
                        return BadRequest(apiRes);
                    }
                
                
                var apiResult = await _contractService.DeleteAsync(ids);
                return Ok(apiResult.Message);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResult
                {
                    DevMsg = DevMsg.Error,
                    ErrorCode = ErrorCode.Exception,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                });
            }
        }

        /// <summary>
        /// Hàm lấy dữ liệu theo yêu cầu
        /// </summary>
        /// <param name="listRequest">truy vấn bao gồm : các trường cần lấy, trường cần lấy với điều kiện</param>
        /// <param name="status">Trạng thái hợp đồng</param>
        /// <param name="offset">Vị trí</param>
        /// <param name="limit">Số lượng bản ghi</param>
        /// <returns>Danh sách bản ghi theo yêu cầu</returns>
        /// Created by : PNTHUAN( 11/5/2021)
        [HttpPost("filter")]
        public async Task<IActionResult> GetContracts(
            [FromBody][Required] ListRequest listRequest,
            [FromQuery] int status = (int)StatusContract.UNSENT, 
            [FromQuery] long offset = 0,
            [FromQuery] long limit = 20 )
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = Resources.ErrorValidate_NotValid,
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                var apiResult = await _contractService.GetEntities(listRequest, status, offset, limit);
                if (apiResult.Success == true)
                {
                    long totals = 0;
                    totals = await _contractService.CountEntities(listRequest, status);
                    return Ok(new { 
                        Data = apiResult.Data,
                        Totals = totals,
                    }
                    );
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
            
        }

        /// <summary>
        /// Hàm thay đổi trạng thái bản ghi khi gửi yêu cầu
        /// </summary>
        /// <param name="id">Id của bản ghi </param>
        /// <returns></returns>
        /// Chỉ gửi yêu cầu với bản nháp
        /// Created by : PNTHUAN (11/5/2021)
        [HttpPut("status")]
        public async Task<IActionResult> RequestChangeStatusContract([FromBody][Required] string id)
        {
            try
            {
                // Kiểm tra valid request gửi lên
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = Resources.ErrorValidate_NotValid,
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                APIResult apiResult = await _contractService.UpdateStatus(id);
                if (apiResult.Success == true)
                {
                    return Ok(apiResult);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult.Data);
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
                    TraceId = "1211239b@dfj"
                });
            }
        }
        #endregion
    }
}
