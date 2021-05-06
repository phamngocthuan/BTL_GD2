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
        public DateTime CreatedDate { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

        public string CreatedBy { get; set; }
    }
}
