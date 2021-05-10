using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    public class Product
    {
        public string  ProductName { get; set; }
        public string ProductCode { get; set; }
        public Guid ProductID { get; set; }

        public Product()
        {
            ProductID = new Guid();
        }
    }
}
