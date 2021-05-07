using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Common.Constants;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.IMS.Service.Controllers
{

    [Route("api/v{version:apiVersion}/contracts")]
    [ApiVersion("1")]
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
                
                var res = _contractService.GetAllEntity();
                if(res == null)
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResult
                    {
                        DevMsg = DevMsg.No_Content,
                        ErrorCode = ErrorCode.No_Content,
                        MoreInfo = MoreInfo.Help,
                        UserMsg = UserMsg.Help,
                        TraceId = "1211239b@dfj"
                    });
                }

                return Ok(_contractService.GetAllEntity());
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
                return Ok(_contractService.GetByIdAsync(id));
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
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ContractController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ContractController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        #endregion
    }
}
