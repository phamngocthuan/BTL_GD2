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
        /// <summary>
        /// Lấy bản ghi theo Id bất đồng bộ
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// Created by PNTHUAN : (11/5/2021)
        Task<APIResult> GetByIdAsync(object id);

        /// <summary>
        /// Lấy tất cả bản ghi bất đồng bộ
        /// </summary>
        /// <returns></returns>
        /// Created by : PNTHUAN(11/5/2021)
        Task<APIResult> GetAllEntity();

        /// <summary>
        /// Lấy bản ghi theo các trường yêu cầu
        /// </summary>
        /// <param name="listRequest">các trường yêu cầu, điều kiện kèm theo</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// Created by : PNTHUAN(11/05/2021)
        Task<APIResult> GetEntities(ListRequest listRequest, int status, long offset, long limit);

        /// <summary>
        /// Đếm số lượng bản ghi theo các trường yêu cầu với điều kiện truyền vào
        /// </summary>
        /// <param name="listRequest">các trường yêu cầu, điều kiện kèm theo</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <returns></returns>
        /// Created by : PNTHUAN (12/5/2021)
        Task<long> CountEntities(ListRequest listRequest, int status);

        /// <summary>
        /// Hàm thêm mới 1 bản ghi
        /// </summary>
        /// <param name="entity">Đối tượng cần thêm mới</param>
        /// <returns></returns>
        /// Created by : PNTHUAN (11/05/2021)
        Task<APIResult> InsertAsync(T entity);


        /// <summary>
        /// Hàm Xóa nhiều bản ghi
        /// </summary>
        /// <param name="codeRequired">Danh sách mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : PNTHUAN(17/05/2021)
        Task<APIResult> DeleteAsync(IEnumerable<string> codeRequired);

        /// <summary>
        /// Hàm update bản ghi 
        /// </summary>
        /// <param name="id">Id của đối tượng</param>
        /// <param name="entity">Đối tượng update</param>
        /// <returns></returns>
        /// Created by : PNTHUAN (11/05/2021)
        Task<APIResult> UpdateAsync(string id , T entity);

        /// <summary>
        /// Hàm thay đổi trạng thái của bản ghi
        /// </summary>
        /// <param name="code">danh sách mã yêu cầu của bản ghi</param>
        /// <param name="status">Trạng thái của bản ghi</param>
        /// Created by : PNTHUAN (11/05/2021)
        /// <returns></returns>
        Task<APIResult> UpdateStatus(IEnumerable<string> code, int status);



    }
}
