using Microsoft.AspNetCore.Mvc;
using MISA.IMS.BL.Interfaces;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        public virtual Task<APIResult> GetAllEntity()
        {
            throw new NotImplementedException();
        }

        public virtual async Task<APIResult> GetByIdAsync(object id)
        {
            throw new NotImplementedException();
        }
        public virtual async Task<APIResult> DeleteAsync(IEnumerable<string> ids)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<APIResult> InsertAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Task<APIResult> UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Task<APIResult> GetEntities(ListRequest listRequest, int status, long offset, long limit)
        {
            throw new NotImplementedException();
        }

        public virtual Task<long> CountEntities(ListRequest listRequest, int status)
        {
            throw new NotImplementedException();
        }

        public Task<APIResult> UpdateStatus(string id)
        {
            throw new NotImplementedException();
        }

        
    }
}
