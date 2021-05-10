using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    public class Contract : BaseEntity
    {
        public Guid ContractID { get; set; }

        public string ContractName { get; set; }

        public string CodeRequired { get; set; }

        public string  CodeProjectSales { get; set; }
        public string NameProjectSales { get; set; }
        public string NumberContract { get; set; }
        public string ProductCode { get; set; }

        public string PackageProductCode { get; set; }
        public int Status { get; set; }
        public int Money { get; set; }
        public string  NameCustomer { get; set; }
        public string  ContactName { get; set; }

        public string  ContactEmailAddress { get; set; }
        public string  ContactPhoneNumber { get; set; }
      
        public Contract()
        {
            ContractID = new Guid();
            Status = (int)StatusContract.UNSENT;
        }
    }
}
