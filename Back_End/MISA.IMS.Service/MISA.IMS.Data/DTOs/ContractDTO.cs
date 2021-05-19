using MISA.IMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Reflection;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    /// <summary>
    /// Class nhận dữ liệu từ client gửi lên
    /// </summary>
    /// Created by: pnthuan(10/5/2021)
    public class ContractDTO
    {

        
        public string ContractName { get; set; }

        
        public int CodeRequired { get; set; }

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
        public string Nation { get; set; }

        public string Ward { get; set; }

        public string District { get; set; }
        public string City { get; set; }

        /// <summary>
        /// Hàm chuyển đổi sang đối tượng để đẩy lên database khi thêm 1 dối tượng
        /// </summary>
        /// <param name="createdBy">Người tạo</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <returns>Trả về đối tượng đẩy lên database</returns>
        /// Created by : pnthuan(11/5/2021)
        public Contract ConvertInsertContract(string createdBy,int status)
        {
            var contract = Activator.CreateInstance<Contract>(); ;
            var properties = this.GetType().GetProperties();
            // lắp các property của DTO và gắn các property có giá trị vào thực thể khởi tạo
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
            // Khởi tạo các giá trị ban đầu
            contract.Status = status;
            contract.CreatedBy = createdBy;
            contract.CreatedDate = DateTime.UtcNow;
            contract.ModifiedDate = DateTime.UtcNow;
            contract.ModifiedBy = createdBy;
            contract.ContractID = new Guid();

            return contract;
        }

        /// <summary>
        /// Hàm chuyển đổi sang đối tượng để đẩy lên database khi update 1 đối tượng
        /// </summary>
        /// <param name="modifiedBy"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public Contract ConvertUpdateContract(string modifiedBy, string id)
        {
            var contract = Activator.CreateInstance<Contract>(); ;
            var properties = this.GetType().GetProperties();
            // lắp các property của DTO và gắn các property có giá trị vào thực thể khởi tạo
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
            // Khởi tạo các giá trị ban đầu
            contract.ContractID = Guid.Parse(id);
            contract.ModifiedDate = DateTime.UtcNow;
            contract.ModifiedBy = modifiedBy;

            return contract;
        }
    }
}
