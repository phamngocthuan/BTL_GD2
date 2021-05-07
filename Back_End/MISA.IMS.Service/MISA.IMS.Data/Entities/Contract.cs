using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    public class Contract : BaseEntity
    {
        public Guid ContractID { get; set; }

        public string ContractName { get; set; }

        public string Productname { get; set; }
    }
}
