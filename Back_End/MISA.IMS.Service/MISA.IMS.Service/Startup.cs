using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MISA.IMS.Core;
using MISA.IMS.Core.Configuration;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Service.Extensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.IMS.Service
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            Configuration = ConfigService.GetConfiguration(env);
        }
        readonly string AllowedOrigins = "AllowedOrigins";
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowedOrigins,
                                  builder =>
                                  {
                                      builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                                  });
            });
            services.AddControllers();
            services.AddVersioning();
            services.AddLifeTimeServices(Configuration);
            /*services.AddMvc()
                .ConfigureApiBehaviorOptions(options => {
                    //options.SuppressModelStateInvalidFilter = true;
                    options.InvalidModelStateResponseFactory = actionContext =>
                    {
                        var modelState = actionContext.ModelState.Values;
                        return new BadRequestObjectResult(FormatOutput(modelState));
                    };
                }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            }*/
            services.AddMvc()
            .ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors(AllowedOrigins);

            app.UseExceptionHandler(a => a.Run(async context =>
            {
                var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                var exception = exceptionHandlerPathFeature.Error;

                var errorResult = new ErrorResult()
                {
                    DevMsg = exception.Message,
                };
                errorResult.UserMsg = "C?? l???i x???y ra vui l??ng li??n h??? MISA ????? ???????c h??? tr???.";
                var result = JsonConvert.SerializeObject(errorResult);
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(result);
            }));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
