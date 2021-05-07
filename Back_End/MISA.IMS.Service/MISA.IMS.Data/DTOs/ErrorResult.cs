using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    public class ErrorResult
    {
        /// <summary>
        /// Thông báo cho dev
        /// </summary>
        public string DevMsg { get; set; }

        /// <summary>
        /// Thông báo lỗi cho người dùng 
        /// </summary>
        public string UserMsg { get; set; }

        /// <summary>
        /// Mã định danh của lỗi
        /// </summary>
        public string ErrorCode { get; set; }

        /// <summary>
        /// Thông tin chi tiết về lỗi
        /// </summary>
        public string MoreInfo { get; set; }

        /// <summary>
        /// Mã tra cứu
        /// </summary>
        public string TraceId { get; set; }
    }
}
