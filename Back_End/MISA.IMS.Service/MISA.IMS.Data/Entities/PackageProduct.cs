using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Entities
{
    public class PackageProduct
    {
        public Guid PackageProductID { get; set; }

        public string PackageProductName { get; set; }
        public string  ProductCode { get; set; }
        public string  PackageProductCode { get; set; }

        public PackageProduct()
        {
            PackageProductID = new Guid();
        }
    }
}
