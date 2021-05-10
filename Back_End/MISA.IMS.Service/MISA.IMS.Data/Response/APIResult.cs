using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.Response
{
    public class APIResult
    {
        public bool Success { get; set; } = true;

        public MessageCode MessageCode { get; set; } = MessageCode.Success;

        public string Message { get; set; }

        public object Data { get; set; }
    }
}
