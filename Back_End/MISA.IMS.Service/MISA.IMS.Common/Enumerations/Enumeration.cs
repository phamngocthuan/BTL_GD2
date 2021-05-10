using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Common.Enumerations
{
    /// <summary>
    /// Misacode để xác định trạng thái của dữ liệu:
    /// </summary>
    public enum MessageCode
    {
        /// <summary>
        /// Thành công
        /// </summary>
        Success = 200,
        /// <summary>
        /// Lỗi validate dữ liệu chung
        /// </summary>
        Validate = 400,

        /// <summary>
        /// Lỗi validate dữ liệu không hợp lệ
        /// </summary>
        ValidateEntity = 401,

        /// <summary>
        /// Lỗi validate dữ liệu do không đúng nghiệp vụ
        /// </summary>
        ValidateBussiness = 402,

        /// <summary>
        /// Lỗi Exception
        /// </summary>
        Exception = 500,

        

    }


    public enum StatusContract
    {
        /// <summary>
        /// Chưa gửi 
        /// </summary>
        UNSENT = 0, 
        /// <summary>
        /// Chờ gửi 
        /// </summary>
        PENDING = 1,
        /// <summary>
        /// Từ chối
        /// </summary>
        REFUSE = 2,
        /// <summary>
        /// Chấp nhận
        /// </summary>
        APPROVED  = 3
    }

    public enum Condition
    {
        /// <summary>
        /// Điều kiện bằng
        /// </summary>
        Equal = 0,
        /// <summary>
        /// Điều kiện khác 
        /// </summary>
        Different = 1,
        /// <summary>
        /// Điều kiện chứa
        /// </summary>
        Contain = 2
    }

    public static class HeaderName
    {
        public static string CreatedBy = "CreatedBy";
    }

}
