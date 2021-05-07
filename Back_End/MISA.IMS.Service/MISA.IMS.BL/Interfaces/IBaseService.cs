using Microsoft.AspNetCore.Mvc;
using MISA.IMS.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.BL.Interfaces
{
    public interface IBaseService<T>
    {
        Task<T> GetByIdAsync(object id);

        Task<IEnumerable<T>> GetAllEntity();
    }
}
