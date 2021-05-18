using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.IMS.Core
{
    public class ConfigService
    {
        /// <summary>
        /// Config service
        /// </summary>
        /// <param name="env"></param>
        /// <returns></returns>
        /// Crreated by : pnthuan(9/5/2021)
        public static IConfiguration GetConfiguration(IWebHostEnvironment env)
        {

            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            .AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
