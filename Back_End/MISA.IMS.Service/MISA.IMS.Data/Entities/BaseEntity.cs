using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    /// <summary>
    /// các properties chung cho các entity
    /// </summary>
    /// Created by : PNTHUAN(5/5/2021)
    public class BaseEntity
    {
        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// Người chỉnh sửa
        /// </summary>

        public string ModifiedBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa
        /// </summary>

        public DateTime ModifiedDate { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>

        public string CreatedBy { get; set; }
    }
}
