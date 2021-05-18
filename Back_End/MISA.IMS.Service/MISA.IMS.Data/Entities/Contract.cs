using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    /// <summary>
    /// class yêu cầu gửi lên( tên không chuẩn)
    /// </summary>
    public class Contract : BaseEntity
    {
        /// <summary>
        /// Id của bản ghi
        /// </summary>
        public Guid ContractID { get; set; }

        /// <summary>
        /// Tên bản hợp đồng
        /// </summary>
        public string ContractName { get; set; }

        /// <summary>
        /// Mã yêu cầu
        /// </summary>

        public int CodeRequired { get; set; }
        /// <summary>
        /// Mã dự án bán hàng
        /// </summary>

        public string  CodeProjectSales { get; set; }

        /// <summary>
        /// Tên dự án bán hàng
        /// </summary>
        public string NameProjectSales { get; set; }

        /// <summary>
        /// Số bản hợp đồng
        /// </summary>
        public string NumberContract { get; set; }
        /// <summary>
        /// Mã sản phẩm
        /// </summary>
        public string ProductCode { get; set; }

        /// <summary>
        /// Mã gói sản phẩm
        /// </summary>

        public string PackageProductCode { get; set; }

        /// <summary>
        /// Trạng thái bản ghi
        /// 0: Nháp, 1 : Chờ yêu cầu, 2: từ chối, 3 : chấp nhận
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// Tiền bản hợp đồng
        /// </summary>
        public int Money { get; set; }

        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string  NameCustomer { get; set; }

        /// <summary>
        /// Tên người liên hệ
        /// </summary>
        public string  ContactName { get; set; }
        /// <summary>
        /// Email người liên hệ
        /// </summary>

        public string  ContactEmailAddress { get; set; }

        /// <summary>
        /// Số điện thoại người liên hệ
        /// </summary>
        public string  ContactPhoneNumber { get; set; }

        /// <summary>
        /// Quốc gia
        /// </summary>
        public string Nation { get; set; }

        /// <summary>
        /// Xã / phường
        /// </summary>

        public string Ward { get; set; }
        /// <summary>
        /// Quận , Huyện
        /// </summary>

        public string District { get; set; }
        /// <summary>
        /// Thành phố
        /// </summary>
        public string City { get; set; }

        public Contract()
        {
            ContractID = Guid.NewGuid(); ;
            Status = (int)StatusContract.UNSENT;
        }
    }
}
