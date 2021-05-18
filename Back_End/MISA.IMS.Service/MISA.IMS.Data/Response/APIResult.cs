using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Response
{
    /// <summary>
    /// Class response trả về cho client
    /// </summary>
    public class APIResult
    {
        /// <summary>
        /// Trạng thái response trả về 
        /// </summary>
        public bool Success { get; set; } = true;

        /// <summary>
        /// Mã trả về
        /// </summary>

        public MessageCode MessageCode { get; set; } = MessageCode.Success;
        /// <summary>
        /// Thông tin trả về
        /// </summary>

        public List<string> Message { get; set; } = new List<string>();

        /// <summary>
        /// Dữ liệu trả về
        /// </summary>

        public object Data { get; set; }
    }
}
