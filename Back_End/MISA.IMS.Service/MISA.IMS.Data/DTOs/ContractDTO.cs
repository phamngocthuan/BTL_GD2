using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Reflection;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    public class ContractDTO
    {

        public string ContractName { get; set; }

        
        public string CodeRequired { get; set; }

        public string CodeProjectSales { get; set; }
        public string NameProjectSales { get; set; }
        public string NumberContract { get; set; }


        public string ProductCode { get; set; }

        public string PackageProductCode { get; set; }
        public int Status { get; set; } = 0;
        public int Money { get; set; }
        public string NameCustomer { get; set; }
        public string ContactName { get; set; }

        [EmailAddress]
        public string ContactEmailAddress { get; set; }

        [Phone]
        public string ContactPhoneNumber { get; set; }

        public Contract ConvertInsertContract(string createdBy,int status)
        {
            var contract = Activator.CreateInstance<Contract>(); ;
            var properties = this.GetType().GetProperties();
            foreach(var property in properties)
            {

                var value = property.GetValue(this,null);
                if(value != null)
                {
                    var prop = contract.GetType().GetProperty(property.Name, BindingFlags.Public | BindingFlags.Instance);
                    if (null != prop && prop.CanWrite)
                    {
                        prop.SetValue(contract, value, null);
                    }
                }
                
            }
            contract.Status = status;
            contract.CreatedBy = createdBy;
            contract.CreatedDate = DateTime.UtcNow;
            contract.ModifiedDate = DateTime.UtcNow;
            contract.ModifiedBy = createdBy;
            contract.ContractID = new Guid();

            return contract;
        }

        public Contract ConvertUpdateContract(string modifiedBy, string id)
        {
            var contract = Activator.CreateInstance<Contract>(); ;
            var properties = this.GetType().GetProperties();
            foreach (var property in properties)
            {

                var value = property.GetValue(this, null);
                if (value != null)
                {
                    var prop = contract.GetType().GetProperty(property.Name, BindingFlags.Public | BindingFlags.Instance);
                    if (null != prop && prop.CanWrite)
                    {
                        prop.SetValue(contract, value, null);
                    }
                }

            }
            contract.ContractID = Guid.Parse(id);
            contract.ModifiedDate = DateTime.UtcNow;
            contract.ModifiedBy = modifiedBy;

            return contract;
        }
    }
}
