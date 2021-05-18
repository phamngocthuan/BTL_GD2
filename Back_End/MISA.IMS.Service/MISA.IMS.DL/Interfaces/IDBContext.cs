using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace MISA.IMS.DL.Interfaces
{
    /// <summary>
    /// DBcontext
    /// </summary>
    /// Created by : pnthuan(11/05/2021)
    public interface IDBContext : IDisposable
    {
        IDbConnection _dbConnection { get; set; }
        MySqlCommand _sqlCommand { get; }

        /// <summary>
        /// Lấy tham số khai báo trong strore
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/05/2021)
        MySqlParameterCollection GetParamFromStore(string commandText);

        /// <summary>
        /// Lấy bản ghi từ database  đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="transaction">đối tượng Transaction</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>reader lưu thông tin về data lấy được</returns>
        /// Created by : pnthuan(11/05/2021)

        IDataReader ExecuteReader(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Lấy bản ghi từ database bất đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="transaction">đối tượng Transaction</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>reader lưu thông tin về data lấy được</returns>
        /// Created by : pnthuan(11/05/2021)
        Task<IDataReader> ExecuteReaderAsync(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Thực thi lệnh update, sửa đổi dữ liệu đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>Trả về số bản ghi bị ảnh hưởng</returns>
        /// Created by : pnthuan(11/05/2021)
        int Execute(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Thực thi lệnh update, sửa đổi dữ liệu bất đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>Trả về số bản ghi bị ảnh hưởng</returns>
        /// Created by : pnthuan(11/05/2021)
        Task<int> ExecuteAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Thực thi sửa dổi dữ liệu đồng bộ
        /// </summary>
        /// <param name="commandText"></param>
        /// <param name="param"></param>
        /// <param name="commandTimeout"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        object ExecuteScalar(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Thực thi sửa dổi dữ liệu bất  đồng bộ
        /// </summary>
        /// <param name="commandText"></param>
        /// <param name="param"></param>
        /// <param name="commandTimeout"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        Task<object> ExecuteScalarAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        /// <summary>
        /// Thực hiện truy vấn bằng proc_procuduce
        /// </summary>
        /// <param name="procText"></param>
        /// <param name="param"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        object QueryProc(string procText, object param = null, CommandType commandType = CommandType.StoredProcedure);

    }
}
