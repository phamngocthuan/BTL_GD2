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
using System.Linq;

namespace MISA.IMS.BL.Services
{
    public class ContractService : BaseService<Contract>, IContractService
    {
        #region Fields
        private readonly IContractRepository _contractRepository;
        private readonly IConfiguration _configuration;

        #endregion

        #region Constructor
        public ContractService(
            IContractRepository contractRepository,
            IWebHostEnvironment env)
        {
            _contractRepository = contractRepository;
            _configuration = ConfigService.GetConfiguration(env);
            var conn = _configuration.GetConnectionString("MISAIMS"); // chuỗi connection string 
            _contractRepository.InitializeDatabaseContext(conn);
        }

        #endregion

        #region Methods
        /// <summary>
        /// Hàm lấy thông tin bản ghi theo ID
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(13/5/2021)
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
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }

        /// <summary>
        /// Hàm lấy tất cả bản ghi
        /// </summary>
        /// <returns></returns>
        /// Created by : PNTHUAN (11/5/2021)
        public async Task<APIResult> GetAllEntity()
        {
            var apiResult = new APIResult();
            var res = _contractRepository.GetAllEntity().Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.NoContent,
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
        
        /// <summary>
        /// Hàm filter data theo nhiều trường, lấy các trường cần lấy
        /// </summary>
        /// <param name="listRequest">Gồm các điều kiện query và các trường muốn lấy</param>
        /// <param name="status">Trạng thái bản ghi : 0 : UNSET , 1 : PENDING, 2 : REFUSE, 3 : APPROVED</param>
        /// <param name="offset">vị trí</param>
        /// <param name="limit">Giới hạn</param>
        /// <returns></returns>
        /// Created by : PNTHUAN (11/5/2021)
        public async Task<APIResult> GetEntities(ListRequest listRequest, int status, long offset, long limit)
        {
            var apiResult = new APIResult();
            var res = _contractRepository.GetEntities(listRequest, status, offset, limit).Result;
            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.NoContent,
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }


        /// <summary>
        /// Thực hiện thêm bản ghi
        /// </summary>
        /// <param name="contract">Đối tượng cần thêm</param>
        /// <returns></returns>
        /// Created by : PNTHUAN (11/5/2021)
        public async Task<APIResult> InsertAsync(Contract contract)
        {
            bool check = true;
            var apiResult = new APIResult();
            //  check Email
            //  validate data
            apiResult = validateEntity(contract);
            if( !apiResult.Success)
            {
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.Help,
                    TraceId = TracerID.Id
                };
                apiResult.MessageCode = MessageCode.Validate;
                return apiResult;
            }


            /* string codeRequired = await _contractRepository.GetCodeRequired();
                codeRequired = Regex.Replace(codeRequired, "\\d+", m => (int.Parse(m.Value) + 1).ToString(new string('0', m.Value.Length)));
             contract.CodeRequired = codeRequired;*/
            // Tạo bản ghi với ID, Mã yêu cầu ban đầu
            Contract newContract = new Contract();
            newContract.ContractID = Guid.NewGuid();
            newContract.CreatedBy = contract.CreatedBy;
            newContract.Status = contract.Status;
            newContract.CreatedDate = contract.CreatedDate;
            // Thực hiện thêm bản ghi với các trường ban đầu tránh việc nhiều người cùng chung 1 mã yêu cầu
            var res = await _contractRepository.InsertOriginalAsync(newContract);

            // Thêm mới thành công thì thực hiện việc update
            if(res > 0)
            {
                contract.ContractID = newContract.ContractID;
                // thực hiện update bản ghi
                res = await _contractRepository.UpdateAsync(contract);
            }
            if ((int)res == 0)
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.ExcuteError);
                apiResult.MessageCode = MessageCode.NoContent;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.NoContent,
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
        /// <summary>
        /// Hàm kiểm tra định dạng Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        /// Created by : PNTHUAN (15/5/2021)
        public bool checkEmail(string email)
        {
            try {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
             catch
            {
                return false;
            }
        }


        /// <summary>
        /// Hàm kiểm tra định dạng Phone Number 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        /// Created by : PNTHUAN (15/5/2021)
        /// Các dạng đúng : 
        /// (123) 456 7899
        ///    (123).456.7899
        ///    (123)-456-7899
        ///    123-456-7899
         ///   123 456 7899
         ///   1234567899
        public  bool IsPhoneNumber(string number)
        {
            return !Regex.Match(number, @"^(\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4}))$").Success;
        }

        /// <summary>
        /// Hàm xóa danh sách bảng ghi
        /// </summary>
        /// <param name="ids">Danh sách ID</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(11/5/2021)
        public async Task<APIResult> DeleteAsync(IEnumerable<string> codeRequireds)
        {
            var apiResult = new APIResult();
            // Kiểm tra mảng mã yêu cầu là rỗng hoặc không có giá trị nào
            if (codeRequireds == null || (codeRequireds.Count() == 0))
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.InstanceIsNull);
                apiResult.MessageCode = MessageCode.NotFound;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.Null,
                    ErrorCode = ErrorCode.NotFound,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.DataIsNull,
                    TraceId = TracerID.Id
                };
                return apiResult;
            }
            // trả về số lượng bản ghi bị ảnh hưởng
            var res = await _contractRepository.DeleteAsync(codeRequireds);


            if (res > 0)
            {
                
                apiResult.Message.Add(Message.ExcuteSuccess);
                apiResult.MessageCode = MessageCode.Success;
            }
            else
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.ExcuteError);
                apiResult.MessageCode = MessageCode.NotFound;
                apiResult.Data = "";
            }
            return apiResult;
        }


        /// <summary>
        /// Hàm thự hiện update bản ghi
        /// </summary>
        /// <param name="contract">Đối tượng update</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(11/5/2021)
       /* public async Task<APIResult> UpdateAsync(Contract contract)
        {
            var apiResult = new APIResult();
            // Trả về số lượng bản ghi bị tác động
            var res = await _contractRepository.UpdateAsync(contract);
            if (res > 0)
            {

                apiResult.Message.Add(Message.ExcuteSuccess);
                apiResult.MessageCode = MessageCode.Success;
            }
            else
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.ExcuteError);
                apiResult.MessageCode = MessageCode.NotFound;
                apiResult.Data = "";
            }
            return apiResult;
        }*/

        /// <summary>
        /// Hàm đếm số bản ghi theo filter
        /// </summary>
        /// <param name="listRequest"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        /// Created by : PNTHUAN(11/5/2021)
        public async Task<long> CountEntities(ListRequest listRequest, int status)
        {
            // việc đếm chỉ thực hiện sau khi đã lấy danh sách và validate ở phần lấy danh sách
            var res = await _contractRepository.CountEntities(listRequest, status);

            return res;
        }

        /// <summary>
        /// Hàm thay đổi thông tin trang thái của bản ghi
        /// </summary>
        /// <param name="codeRequired">Danh sách mã yêu cầu</param>
        /// <param name="status">Trạng thái ban đầu của bản ghi</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(12/05/2021)
        public async Task<APIResult> UpdateStatus(IEnumerable<string> codeRequireds, int status, string modifiedBy)
        {
            // Lấy thông tin bản ghi
            var apiResult = new APIResult();
            // Kiểm tra mảng mã yêu cầu là rỗng hoặc không có giá trị nào
            if (codeRequireds == null || (codeRequireds.Count() == 0))
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.InstanceIsNull);
                apiResult.MessageCode = MessageCode.NotFound;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.Null,
                    ErrorCode = ErrorCode.NotFound,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = UserMsg.DataIsNull,
                    TraceId = TracerID.Id
                };
            }
            else
            {
                /*  var check = true;
                  var status = (int)res.Status;*/
                // Hiện tại chỉ thực hiện update với bản ghi chưa gửi
                // các bản ghi với trạng thái khác cũng tương tự
                int result = 0;
                switch (status)
                {
                    case (int)StatusContract.UNSENT:
                        status = (int)StatusContract.PENDING;
                        result = await _contractRepository.UpdateStatus(codeRequireds, status, modifiedBy);
                        break;
                }
 
                if (result > 0)
                {
                    apiResult.Success = true;
                    apiResult.Message.Add(Message.ExcuteSuccess);
                    apiResult.Data = result;
                    apiResult.MessageCode = MessageCode.Success;
                }
                else
                {
                    apiResult.Success = false;
                    apiResult.Message.Add(Message.RefuseUpdate);
                    apiResult.MessageCode = MessageCode.NotFound;
                    apiResult.Data = new ErrorResult
                    {
                        DevMsg = DevMsg.Null,
                        ErrorCode = ErrorCode.NotFound,
                        MoreInfo = MoreInfo.Help,
                        UserMsg = UserMsg.DataIsNull,
                        TraceId = TracerID.Id
                    };
                }
            }
            return apiResult;
        }

        /// <summary>
        /// Hàm thực hiện cập nhật bản ghi theo Id
        /// </summary>
        /// <param name="id">id của bản ghi</param>
        /// <param name="contract">Đối tượng cần cập nhật</param>
        /// <returns></returns>
        /// Created by : pnthuan(13/05/2021)
        public async Task<APIResult> UpdateAsync(string id, Contract contract)
        {
            var apiResult = new APIResult();
            // Kiểm tra xem bản ghi đó có tồn tại không
            var res = _contractRepository.GetByIdAsync(id).Result;

            if (res == null)
            {
                apiResult.Success = false;
                apiResult.Message.Add(Message.InstanceIsNull);
                apiResult.MessageCode = MessageCode.Validate;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = Message.InstanceIsNull,
                    TraceId = TracerID.Id
                };
            }else
            // Chỉ cho update bản ghi chưa gửi và đang chờ yêu cầu
            if (res.Status == (int)StatusContract.APPROVED || res.Status == (int)StatusContract.REFUSE) {
                apiResult.Success = false;
                apiResult.Message.Add(Message.RefuseUpdate);
                apiResult.MessageCode = MessageCode.Validate;
                apiResult.Data = new ErrorResult
                {
                    DevMsg = DevMsg.No_Content,
                    ErrorCode = ErrorCode.No_Content,
                    MoreInfo = MoreInfo.Help,
                    UserMsg = Message.RefuseUpdate,
                    TraceId = TracerID.Id
                };
            }

            if(apiResult.Success)
            {
                // hiên thị lỗi
                bool check = true;
                //  check Email
                //  validate data
                if (!String.IsNullOrEmpty(contract.ContactEmailAddress))
                {
                    check = checkEmail(contract.ContactEmailAddress);
                }
                if (check && !String.IsNullOrEmpty(contract.ContactPhoneNumber))
                {
                    check = IsPhoneNumber(contract.ContactPhoneNumber);
                }

                // Không update status  : chỉ update thông tin

                // validate thành công
                int result = await _contractRepository.UpdateAsync(contract);
                if(!check  || res == null)
                {
                    apiResult.Success = false;
                    apiResult.Data = new ErrorResult
                    {
                        DevMsg = DevMsg.No_Content,
                        ErrorCode = ErrorCode.No_Content,
                        MoreInfo = MoreInfo.Help,
                        UserMsg = UserMsg.Help,
                        TraceId = TracerID.Id
                    };
                }
                if (result > 0)
                {
                    apiResult.Success = true;
                    apiResult.Message.Add(Message.Success);
                    apiResult.Data = result;
                    apiResult.MessageCode = MessageCode.Success;
                }
            }
            return apiResult;

        }

        /// <summary>
        /// Hàm validate bản ghi
        /// </summary>
        /// <param name="contract">Đối tượng validate</param>
        /// <returns></returns>
        /// Created by : pnthuan(14/05/2021)

        public  APIResult validateEntity(Contract contract)
        {
            var apiResult = new APIResult();
            
            // check Email
            try
            {
                if (!String.IsNullOrEmpty(contract.ContactEmailAddress))
                {
                    if (!checkEmail(contract.ContactEmailAddress))
                    {
                        apiResult.Message.Add(Message.ErrorValidateEmail);
                        apiResult.Success = false;
                    }
                }
                
            }
            catch
            {
                apiResult.Message.Add(Message.ErrorValidateEmail);
                apiResult.Success = false;
            }
            try
            {
                if (!String.IsNullOrEmpty(contract.ContactPhoneNumber))
                {
                    if (!IsPhoneNumber(contract.ContactPhoneNumber))
                    {
                        apiResult.Message.Add(Message.ErrorValidatePhone);
                        apiResult.Success = false;
                    }
                }

            }
            catch
            {
                apiResult.Message.Add(Message.ErrorValidatePhone);
                apiResult.Success = false;
            }
            return apiResult;
        }

        /// <summary>
        /// Hàm lấy thông tin đối tượng theo mã yêu cầu
        /// </summary>
        /// <param name="codeRequired">Mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : pnthuan(17/05/2021)
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
                    TraceId = TracerID.Id
                };
            }
            else
            {
                apiResult.Data = res;
                apiResult.Message.Add(Message.Success);
                apiResult.MessageCode = MessageCode.Success;
            }
            return apiResult;
        }
        #endregion
    }
}
