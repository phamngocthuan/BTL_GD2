using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    /// <summary>
    /// Điều kiện request gửi lên
    /// </summary>
    public class Request
    {
        /// <summary>
        /// Field
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Giá trị 
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Điều kiện
        /// </summary>
        public Condition Condition { get; set; } = Condition.Equal;
    }
}
