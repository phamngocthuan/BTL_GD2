using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Response
{
    public class APIResult
    {
        public bool Success { get; set; } = true;

        public int MessageCode { get; set; } = 200;

        public string Message { get; set; }

        public object Data { get; set; }
    }
}
