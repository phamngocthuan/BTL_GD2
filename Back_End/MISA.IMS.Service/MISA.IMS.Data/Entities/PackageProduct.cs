using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    /// <summary>
    /// Thực thể Gói sản phẩm
    /// </summary>
    public class PackageProduct
    {
        /// <summary>
        /// Id của gói sản phẩm
        /// </summary>
        public Guid PackageProductID { get; set; }
        /// <summary>
        /// Tên của gói sản phẩm
        /// </summary>

        public string PackageProductName { get; set; }
        /// <summary>
        /// Mã của sản phẩm
        /// </summary>
        public string  ProductCode { get; set; }
        /// <summary>
        /// Mã của gói sản phẩm
        /// </summary>
        public string  PackageProductCode { get; set; }

        public PackageProduct()
        {
            PackageProductID = new Guid();
        }
    }
}
