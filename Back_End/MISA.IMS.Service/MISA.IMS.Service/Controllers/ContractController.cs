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
using Microsoft.AspNetCore.Authorization;

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
        #region Methods
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {

                var apiResult = await _contractService.GetAllEntity();
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
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
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
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                var apiResult = await _contractService.GetByIdAsync(id);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
                });
            }
        }


        

        /// <summary>
        /// Lấy bản ghi theo mã yêu cầu
        /// </summary>
        /// <param name="codeRequired">mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(13/5/2021)
        [HttpGet("code")]
        public async Task<IActionResult> GetContract(
            [FromQuery(Name = "codeRequired")] string  codeRequired
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                var apiResult = await _contractService.GetByCodeAsync(codeRequired);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
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
            [FromHeader(Name = "CreatedBy")][Required] string createdBy
            )
        {
            try
            {

                if(!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                // convert sang đối tượng thêm vào và khởi tạo một số thuộc tính cần có
                // Mặc định khi thêm mới là trạng thái bản ghi là 0: Chưa gửi
                Contract contract = contractDTO.ConvertInsertContract(createdBy, 0);

                APIResult aPIResult = await _contractService.InsertAsync(contract);
                if (aPIResult.Success)
                {
                    return Ok(aPIResult);
                }
                else
                {
                    return BadRequest(aPIResult);
                }

            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
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
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
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
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult);
                }
            }
            catch (Exception ex)
            {
                
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
                });
            }
        }

        /// <summary>
        /// Hàm xóa một hoặc nhiều hợp đồng
        /// </summary>
        /// <param name="codeRequireds">Mảng mã yêu cầu</param>
        /// <returns> Trả về thông tin khi xóa thành công</returns>
        /// Error : Trả về lỗi khi gặp ngoại lệ hoặc trong quá trình xóa không tìm thấy bản ghi
        /// Created by : PNTHUAN( 11/5/2021)
        // DELETE api/<ContractController>/5
        [HttpDelete()]
        public async Task<IActionResult> DeleteContract([FromBody][Required] IEnumerable<string> codeRequireds)
        {
            try
            {

                    if (!ModelState.IsValid)
                    {
                        var apiRes = new APIResult()
                        {
                            Success = false,
                            Message = new List<string> { Resources.ErrorValidate_NotValid },
                            MessageCode = MessageCode.ValidateEntity,
                            Data = ModelState
                        };
                        return BadRequest(apiRes);
                    }
                
                
                var apiResult = await _contractService.DeleteAsync(codeRequireds);
                if(apiResult.Success)
                {
                    return Ok(apiResult);
                }else
                {
                    return StatusCode((int)apiResult.MessageCode,apiResult);
                }
                    
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
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
           /* [FromQuery] int status = (int)StatusContract.UNSENT, */
            [FromQuery] long offset = 0,
            [FromQuery] long limit = 20 
            )
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                
                // Gọi đến hàm xử lý lấy thông tin theo yêu cầu
                var apiResult = await _contractService.GetEntities(listRequest, listRequest.status, offset, limit);
                if (apiResult.Success == true)
                {
                    long totals = 0;
                    // hàm trả về tổng số bản ghi thỏa mãn yêu cầu 
                    totals = await _contractService.CountEntities(listRequest, listRequest.status);
                    apiResult.Data = new
                    {
                        data = apiResult.Data,
                        totals = totals
                    };
                    return Ok(apiResult);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, apiResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
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
        public async Task<IActionResult> RequestChangeStatusContract(
            [FromHeader(Name = "ModifiedBy")][Required] string modifiedBy,
            [FromBody][Required] IEnumerable<string> codes,
            [FromQuery][Required] int   status = (int)StatusContract.UNSENT
            

        )
        {
            try
            {
                // Kiểm tra valid request gửi lên
                if (!ModelState.IsValid)
                {
                    var apiRes = new APIResult()
                    {
                        Success = false,
                        Message = new List<string> { Resources.ErrorValidate_NotValid },
                        MessageCode = MessageCode.ValidateEntity,
                        Data = ModelState
                    };
                    return BadRequest(apiRes);
                }
                APIResult apiResult = await _contractService.UpdateStatus(codes,status , modifiedBy);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, new APIResult
                {
                    MessageCode = MessageCode.Exception,
                    Success = false,
                    Message = new List<string> { Message.Exception },
                    Data = null
                });
            }
        }
        #endregion
    }
}
