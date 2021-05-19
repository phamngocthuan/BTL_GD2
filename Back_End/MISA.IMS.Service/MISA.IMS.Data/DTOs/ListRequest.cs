using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    /// <summary>
    /// class chứa các điều kiện mà client gửi lên
    /// </summary>
    public class ListRequest
    {
        /// <summary>
        /// Trường cần lấy
        /// </summary>
        public List<string> FieldNames { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<Request> Requests { get; set; }

        /// <summary>
        /// Trạng thái của bản ghi cần lấy
        /// </summary>
        public int status { set; get; } = (int)StatusContract.UNSENT;
    }
}
