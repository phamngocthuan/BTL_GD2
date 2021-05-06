using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.IMS.Service.Controllers
{
    [Route("api/v{version:apiVersion}/records")]
    [ApiVersion("1")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        // GET: api/<RecordController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
