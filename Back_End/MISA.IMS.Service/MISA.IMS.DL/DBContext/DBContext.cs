using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Threading.Tasks;
using MISA.IMS.DL.Interfaces;
using MISA.IMS.Data.Entities;

namespace MISA.IMS.DL.DBContext
{

    /// <summary>
    /// Đối tượng kết nối với Database 
    /// </summary>
    /// Created by : pnthuan(12/5/2021)
    public class DBContext : IDBContext, IDisposable
    {
        #region Properties
        public IDbConnection _dbConnection { get; set; }
        public MySqlCommand _sqlCommand { get; set; }
        #endregion

        #region Constructors
        public DBContext(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();
        }

        public DBContext(string connectionString)
        {
            _dbConnection = new MySqlConnection(connectionString);
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();

        }

        public DBContext()
        {
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();

        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy tham số khai báo trong strore
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/05/2021)
        public MySqlParameterCollection GetParamFromStore(string commandText)
        {
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlCommand.CommandText = commandText;
            MySqlCommandBuilder.DeriveParameters(_sqlCommand);
            return _sqlCommand.Parameters;
        }

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
        public IDataReader ExecuteReader(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            var reader = _dbConnection.ExecuteReader(commandText, param, transaction, commandTimeout, commandType);
            return reader;
        }

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
        public async Task<IDataReader> ExecuteReaderAsync(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            return await _dbConnection.ExecuteReaderAsync(commandText, param, transaction, commandTimeout, commandType);
        }

        /// <summary>
        /// Thực thi lệnh update, sửa đổi dữ liệu đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>Trả về số bản ghi bị ảnh hưởng</returns>
        /// Created by : pnthuan(11/05/2021)
        public int Execute(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.Execute(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }

        /// <summary>
        /// Thực thi lệnh update, sửa đổi dữ liệu bất đồng bộ
        /// </summary>
        /// <param name="commandText">Lệnh Sql</param>
        /// <param name="param">Tham số khai báo</param>
        /// <param name="commandTimeout">Thời gian cho request</param>
        /// <param name="commandType">Kiểu comand( kiểu text hoặc storad proceduce)</param>
        /// <returns>Trả về số bản ghi bị ảnh hưởng</returns>
        /// Created by : pnthuan(11/05/2021)
        public async Task<int> ExecuteAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = await _dbConnection.ExecuteAsync(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }

        /// <summary>
        /// Thực thi sửa dổi dữ liệu đồng bộ
        /// </summary>
        /// <param name="commandText"></param>
        /// <param name="param"></param>
        /// <param name="commandTimeout"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        public object ExecuteScalar(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.ExecuteScalar(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }
        /// <summary>
        /// Thực thi sửa dổi dữ liệu bất  đồng bộ
        /// </summary>
        /// <param name="commandText"></param>
        /// <param name="param"></param>
        /// <param name="commandTimeout"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        public object QueryProc(string procText, object param = null, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.Query<Contract>(procText, param, commandType : commandType);
                transac.Commit();
                return result;
            }
        }
        /// <summary>
        /// Thực hiện truy vấn bằng proc_procuduce
        /// </summary>
        /// <param name="procText"></param>
        /// <param name="param"></param>
        /// <param name="commandType"></param>
        /// <returns>Trả về object bị thay đổi</returns>
        /// Created by : pnthuan(11/05/2021)
        public async Task<object> ExecuteScalarAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = await _dbConnection.ExecuteScalarAsync(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }

        /// <summary>
        /// Đóng kết nối với DB
        /// </summary>
        public void Dispose()
        {
            _dbConnection.Close();
            _dbConnection.Dispose();
        }

        #endregion
    }
}
