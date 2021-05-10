using MISA.IMS.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Data.DTOs
{
    public class Request
    {
        public string Key { get; set; }
        public string Value { get; set; }

        public Condition Condition { get; set; } = Condition.Equal;
    }
}
