using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
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
    }
}
