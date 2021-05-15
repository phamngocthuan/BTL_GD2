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
        Contain = 2,
        /// <summary>
        /// Lớn hơn hoặc bằng
        /// </summary>
        GreaterThan = 3, 
        /// <summary>
        /// nhở hơn hoặc bằng
        /// </summary>
        LessThan= 4

    }

    public  static class  Message
    {
        public static string Success = "Lấy dữ liệu thành công";

        public static string Error = "Lấy dữ liệu thất bại";

        public static string Exception = "Có lỗi xảy ra. Vui lòng liên hệ MISA để được hỗ trợ";

        public static string InstanceIsNull = "Bản ghi không tồn tại";

        public static string ExcuteSuccess = "Thực thi yêu cầu thành công";

        public static string ExcuteError = "Thực thi yêu cầu thất bại";

    }
    public static class TracerID
    {
        public static string Id = "c7e07b7719a7a3489617663753f985e4";
    }
    public static class HeaderName
    {
        public static string CreatedBy = "CreatedBy";
    }

}
