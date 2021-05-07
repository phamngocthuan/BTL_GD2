using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    
        /// <summary>
        /// Kết quả trả về qua service
        /// </summary>
        public class ServiceResult
        {

            public ServiceResult()
            {
                Success = true;
            }
            /// <summary>
            /// dữ liệu trả về
            /// </summary>
            public object Data { get; set; }

            /// <summary>
            /// Thông báo
            /// </summary>
            public string Msg { get; set; }

            /// <summary>
            /// Mã code đính kèm
            /// </summary>
            public MISACode MISACode { get; set; }

            /// <summary>
            /// True: thành công, false: thất bại
            /// </summary>
            public bool Success { get; set; }

        }
    
}
