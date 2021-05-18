using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    /// <summary>
    /// Thực thể Sản phẩm
    /// </summary>
    public class Product
    {
        /// <summary>
        /// Tên sản phẩm
        /// </summary>
        public string  ProductName { get; set; }
        /// <summary>
        /// Mã của sản phẩm
        /// </summary>
        public string ProductCode { get; set; }
        /// <summary>
        /// Id của sản phẩm
        /// </summary>
        public Guid ProductID { get; set; }

        public Product()
        {
            ProductID = new Guid();
        }
    }
}
