using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Core.Configuration
{
    public static class ConfigureVersion
    {
        public static IServiceCollection AddVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.AssumeDefaultVersionWhenUnspecified = true;
                config.ReportApiVersions = true;
                config.ApiVersionReader = ApiVersionReader.Combine(new HeaderApiVersionReader("X-version"), new QueryStringApiVersionReader("api-version"));
            });
            return services;
        }
    }
}
