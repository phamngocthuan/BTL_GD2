using Microsoft.AspNetCore.Mvc;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Data.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Interfaces
{
    public interface IBaseService<T>
    {
        Task<APIResult> GetByIdAsync(object id);

        Task<APIResult> GetAllEntity();
        Task<APIResult> GetEntities(ListRequest listRequest, int status, long offset, long limit);
        Task<long> CountEntities(ListRequest listRequest, int status);

        Task<APIResult> InsertAsync(T entity);

        Task<APIResult> DeleteAsync(IEnumerable<string> id);
        Task<APIResult> UpdateAsync(T entity);

        Task<APIResult> UpdateStatus(string id);



    }
}
