using Microsoft.AspNetCore.Mvc;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.IMS.Service.Controllers
{
    [Route("api/requests")]
    //[ApiVersion("1")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        // GET: api/<RecordController>
        [HttpGet]
        public APIResult Get()
        {
            APIResult result = new APIResult();
            try
            {
                // đọc clientParams

                // validate ClientParams

                // xu ly du lieu

                // response
                result.Data = new string[] { "value1", "value2" };
            }
            catch (Exception ex)
            {
                result.MessageCode = 500;
            }
            return result;
        }

        // GET api/<RecordController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RecordController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RecordController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RecordController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
