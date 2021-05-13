using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MISA.IMS.Service.Controllers
{
    [Route("api/v{version:apiVersion}/locations")]
    [ApiVersion("1")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        /// <summary>
        /// Lấy thông tin về location
        /// </summary>
        /// <param name="type"></param>
        /// <param name="parentLocationName"></param>
        /// <param name="grandLocationName"></param>
        /// <returns></returns>
        /// Created by : PNTHUAN(12/5/2021)
        [HttpGet("locs")]
        public async Task<IActionResult> GetLocs(
            [FromQuery] long type,
            [FromQuery] string parentLocationName,
            [FromQuery] string grandLocationName
        )
        {
            try
            {
                var baseAddress = new Uri("https://testdic.misa.vn/location/api/v1/");
                using (var httpClient = new HttpClient { BaseAddress = baseAddress })
                {
                    //Thêm header cho http client
                    /* httpClient.DefaultRequestHeaders.Add("x-api-key", CommonFunction.GetAppSettings("Location", "ApiKey"));
                     httpClient.DefaultRequestHeaders.Add("project", CommonFunction.GetAppSettings("Location", "Project"));*/
                    httpClient.DefaultRequestHeaders.Add("accept", "application/json");
                    httpClient.DefaultRequestHeaders.Add("x-api-key", "xsswwkntyds6wpkuew27m4ean35mppv5");
                    httpClient.DefaultRequestHeaders.Add("project", "rd");
                    
                    switch (type)
                    {
                        // lấy danh sách tỉnh thành/ phố
                        case 1:
                            {
                                using (var response = await httpClient.GetAsync($"locs?kind={type}&parentLocationName=Việt Nam"))
                                {
                                    var responseData = await response.Content.ReadAsStringAsync();
                                   return Ok(responseData);
                                }
                            }
                        // danh sách quận huyện
                        // Location name : tỉnh/ thành phố
                        case 2:
                            {
                                using (var response = await httpClient.GetAsync($"locs?kind={type}&parentLocationName={parentLocationName}"))
                                {
                                    var responseData = await response.Content.ReadAsStringAsync();
                                    return Ok(responseData);
                                }
                            }
                        // danh sách xã phường
                        // locationName : Quận
                        // grandLocationName : Tỉnh/Thành phố
                        case 3:
                            {
                                using (var response = await httpClient.GetAsync($"locs?kind={type}&parentLocationName={parentLocationName}&grandLocationName={grandLocationName}"))
                                {
                                    var responseData = await response.Content.ReadAsStringAsync();
                                    return Ok(responseData);
                                }
                            }
                        default: return Ok("lủng");
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
