using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.IMS.DL.Interfaces;
using MISA.IMS.DL.DBContext;
using MISA.IMS.DL.Repositories;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.BL.Services;

namespace MISA.IMS.Service.Extensions
{

    public static class ServiceCollectionExtensions
    {
        public static void AddLifeTimeServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<DBContextFactory>();
            services.AddTransient<IDBContextFactory, DBContextFactory>();

            //Repositories
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IContractRepository, ContractRepository>();

            // Services
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped<IContractService, ContractService>();

        }
    }
}
