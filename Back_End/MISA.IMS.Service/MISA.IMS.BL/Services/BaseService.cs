using Microsoft.AspNetCore.Mvc;
using MISA.IMS.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        public virtual Task<IEnumerable<T>> GetAllEntity()
        {
            throw new NotImplementedException();
        }

        public virtual async Task<T> GetByIdAsync(object id)
        {
            throw new NotImplementedException();
        }
    }
}
