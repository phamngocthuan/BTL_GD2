using MISA.IMS.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// Tâng chung kết nối database
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// Created by : pnthuan(11/5/2021)
    public interface IBaseRepository<T> where T : class
    {
        /// <summary>
        /// Khởi tạo kết dựa vào connectionString
        /// </summary>
        /// <param name="connectionString"></param>
        /// Created by : pnthuan(11/5/2021)
        void InitializeDatabaseContext(string connectionString);

        /// <summary>
        /// Lấy bản ghi theo Id bất đồng bộ
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)

        Task<T> GetByIdAsync(object id);

        /// <summary>
        /// Lấy tất cả bản ghi 
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<IEnumerable<T>> GetAllEntity();

        /// <summary>
        /// Thực hiện lấy 1 số trường của bản ghi, lọc bản ghi theo yêu cầu
        /// </summary>
        /// <param name="listRequest">Danh sách trường cần lấy, điều kiện lọc</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<IEnumerable<T>> GetEntities(ListRequest listRequest, int status, long offset, long limit);
        /// <summary>
        /// Thực hiện đếm số lượng bản ghi theo điều kiện lọc
        /// </summary>
        /// <param name="listRequest">Điều kiên lọc</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<long> CountEntities(ListRequest listRequest, int status);
        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">Đối tượng thêm mới</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)

        Task<int> InsertAsync(T entity);

        /// <summary>
        /// Xóa danh sách bản ghi
        /// </summary>
        /// <param name="codeRequireds">Danh sách mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<int> DeleteAsync(IEnumerable<string> codeRequireds);

        /// <summary>
        /// Cập nhật bản ghi 
        /// </summary>
        /// <param name="entity">Đối tượng cập nhật</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<int> UpdateAsync(T entity);
        /// <summary>
        /// Cập nhật trạng thái bản ghi
        /// </summary>
        /// <param name="codeRequireds">Danh sách mã yêu cầu</param>
        /// <param name="status">Trạng thái của tất cả bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        Task<int> UpdateStatus(IEnumerable<string> codeRequireds, int status);

        /// <summary>
        /// Hàm thực hiện thêm mới 1 bản nháp
        /// </summary>
        /// <param name="entity">Dối tượng nháp</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/05/2021)
        Task<int> InsertOriginalAsync(T entity);


    }
}
