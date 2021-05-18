using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.Common
{
    /// <summary>
    /// class xử lý, tính toán
    /// </summary>
    public class Utilities
    {
        /// <summary>
        /// Trả về tên của thực thể
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        /// Created by : pnthuan(12/5/2021)
        public static string GetEntityName<T>()
        {
            var entity = Activator.CreateInstance<T>();
            return entity.GetType().Name;
        }
    }
}
