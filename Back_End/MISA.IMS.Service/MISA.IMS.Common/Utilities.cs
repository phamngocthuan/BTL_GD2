using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Common
{
    public class Utilities
    {
        public static string GetEntityName<T>()
        {
            var entity = Activator.CreateInstance<T>();
            return entity.GetType().Name;
        }
    }
}
