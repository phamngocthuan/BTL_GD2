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

        // GET api/<ContractController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {

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
                // chỉ được update với bản nháp và chờ yêu cầu
                Contract contract = contractDTO.ConvertUpdateContract(modifiedBy, id);

                var apiResult = await _contractService.UpdateAsync(id,contract);
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


        [HttpPut("status")]
        public async Task<IActionResult> RequestChangeStatusContract([FromBody][Required] string id)
        {
            await _contractService.UpdateStatus(id);
            return Ok();
        }
        #endregion
    }
}
