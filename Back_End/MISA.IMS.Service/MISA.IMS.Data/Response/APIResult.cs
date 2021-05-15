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

        public List<string> Message { get; set; } = new List<string>();

        public object Data { get; set; }
    }
}
