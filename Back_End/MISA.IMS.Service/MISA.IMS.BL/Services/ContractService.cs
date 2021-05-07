using Microsoft.Extensions.Configuration;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using MISA.IMS.Core;
using Microsoft.AspNetCore.Mvc;

namespace MISA.IMS.BL.Services
{
    public class ContractService : BaseService<Contract>, IContractService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IConfiguration _configuration;
        public ContractService(
            IContractRepository contractRepository,
            IWebHostEnvironment env)
        {
            _contractRepository = contractRepository;
            _configuration = ConfigService.GetConfiguration(env);
            var conn = _configuration.GetConnectionString("MISAIMS"); // chuỗi connection string 
            _contractRepository.InitializeDatabaseContext(conn);
        }
        public  async Task<Contract> GetByIdAsync(object id)
        {
            var res =  _contractRepository.GetByIdAsync(id); ;
            return await res;
        }

        public async Task<IEnumerable<Contract>> GetAllEntity()
        {
            var res = _contractRepository.GetAllEntity();
            return await res;
        }
    }
}
