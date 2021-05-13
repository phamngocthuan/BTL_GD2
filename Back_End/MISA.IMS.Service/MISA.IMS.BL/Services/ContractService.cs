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
using MISA.IMS.Data.Response;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Common.Constants;
using MISA.IMS.Common.Enumerations;
using System.Text.RegularExpressions;

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
        public async Task<APIResult> GetByIdAsync(object id)
        {
            var apiResult = new APIResult();
            var res = _contractRepository.GetByIdAsync(id).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message = "Lấy data thành công ";
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }

        public async Task<APIResult> GetAllEntity()
        {
            var apiResult = new APIResult();
            var errorResult = new ErrorResult();
            var res = _contractRepository.GetAllEntity().Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message = "Lấy data thành công ";
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
        public async Task<APIResult> GetEntities(ListRequest listRequest, int status, long offset, long limit)
        {
            var apiResult = new APIResult();
            var errorResult = new ErrorResult();
            var res = _contractRepository.GetEntities(listRequest, status, offset, limit).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message = "Lấy data thành công ";
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }

        public async Task<APIResult> InsertAsync(Contract contract)
        {

            var apiResult = new APIResult();
            // kiểm tra tính toàn vẹn data  các trường yêu cầu
            string codeRequired = await _contractRepository.GetCodeRequired();
            //lấy mã trên hệ thống theo yêu cầu

            codeRequired = Regex.Replace(codeRequired, "\\d+", m => (int.Parse(m.Value) + 1).ToString(new string('0', m.Value.Length)));
            contract.CodeRequired = codeRequired;
            //check Email
            // check money
            //validate data

            var res = await _contractRepository.InsertAsync(contract);
            if ((int)res == 0)
            {
                apiResult.Success = false;
                apiResult.Message = "Thêm dữ liệu thất bại";
                apiResult.MessageCode = MessageCode.Validate;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message = "Thêm dữ liệu thành công";
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }

        public async Task<APIResult> DeleteAsync(IEnumerable<string> ids)
        {
            var apiResult = new APIResult();

            var res = await _contractRepository.DeleteAsync(ids);


            if (res > 0)
            {
                apiResult.Message = "Xóa bản ghi thành công";
            }
            else
            {
                apiResult.Message = "Failed";
            }
            return apiResult;
        }

        public async Task<APIResult> UpdateAsync(Contract contract)
        {
            var apiResult = new APIResult();

            var res = await _contractRepository.UpdateAsync(contract);
            if (res > 0)
            {
                apiResult.Message = "Update bản ghi thành công";
            }
            else
            {
                apiResult.Message = "Failed";
            }
            return apiResult;
        }

        public async Task<long> CountEntities(ListRequest listRequest, int status)
        {
            var res = await _contractRepository.CountEntities(listRequest, status);

            return res;
        }

        public async Task<APIResult> UpdateStatus(string id)
        {
            // Lấy thông tin bản ghi
            var apiResult = new APIResult();
            var res = _contractRepository.GetByIdAsync(id).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Message = "Bản ghi không tồn tại";
                apiResult.MessageCode = MessageCode.Validate;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                var check = true;
                var status = (int)res.Status;
                switch ((int)res.Status)
                {
                    case (int)StatusContract.UNSENT:
                        status = (int)StatusContract.PENDING;
                        break;
                }
                int result = await _contractRepository.UpdateStatus(id, status);
                if (result > 0)
                {
                    apiResult.Success = true;
                    apiResult.Message = "Gửi yeey cầu thành công";
                    apiResult.Data = result;
                    apiResult.MessageCode = MessageCode.Success;
                }
            }
            return apiResult;
        }

        public async Task<APIResult> UpdateAsync(string id, Contract contract)
        {
            var apiResult = new APIResult();
            // Kiểm tra xem bản ghi đó có tồn tại không
            var res = _contractRepository.GetByIdAsync(id).Result;

            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Message = "Bản ghi không tồn tại";
                apiResult.MessageCode = MessageCode.Validate;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b3423|"
                };
            }
            else
            {
                // validate 1 số trường : Email, PhoneNumber

                // Không update status  : chỉ update thông tin

                // validate thành công
                int result = await _contractRepository.UpdateAsync(contract);
                if (result > 0)
                {
                    apiResult.Success = true;
                    apiResult.Message = "Gửi yêu cầu thành công";
                    apiResult.Data = result;
                    apiResult.MessageCode = MessageCode.Success;
                }
            }
            return apiResult;

        }

        public async Task<APIResult> GetByCodeAsync(object codeRequired)
        {
            var apiResult = new APIResult();
            var res = _contractRepository.GetByCodeAsync(codeRequired).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = "1211239b@dfj"
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message = "Lấy data thành công ";
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
    }
}
