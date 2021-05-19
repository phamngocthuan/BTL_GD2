using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Common.Enumerations
{
    /// <summary>
    /// Misacode để xác định trạng thái của dữ liệu:
    /// </summary>
    /// Created by : pnthuan(10/5/2021)
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

        /// <summary>
        /// Yêu cầu thành công , một tài nguyên mới được tạo
        /// </summary>
        Created = 201,

        /// <summary>
        /// Không có nội dung
        /// </summary>
        NoContent = 204,

        /// <summary>
        /// Không tìm thấy
        /// </summary>
        NotFound = 404

        

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
    /// <summary>
    /// Thông báo khi lấy dữ liệu
    /// </summary>

    public  static class  Message
    {
        public static string Success = "Lấy dữ liệu thành công";

        public static string Error = "Lấy dữ liệu thất bại";

        public static string Exception = "Có lỗi xảy ra. Vui lòng liên hệ MISA để được hỗ trợ";

        public static string InstanceIsNull = "Bản ghi không tồn tại";

        public static string ExcuteSuccess = "Thực thi yêu cầu thành công";

        public static string ExcuteError = "Thực thi yêu cầu thất bại";

        public static string RefuseUpdate = "Yêu cầu không được cập nhật";

        public static string ErrorValidateEmail = "Định dạng Email sai!";

        public static string ErrorValidatePhone = "Định dạng số điện thoại sai!"

    }

    /// <summary>
    /// Fake tracerId
    /// </summary>
    public static class TracerID
    {
        public static string Id = "c7e07b7719a7a3489617663753f985e4";
    }

    /// <summary>
    /// Header Name
    /// </summary>
    public static class HeaderName
    {
        public static string CreatedBy = "CreatedBy";
    }

}
