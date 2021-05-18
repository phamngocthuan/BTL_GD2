using Dapper;
using MISA.IMS.Common;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;
using MISA.IMS.Data.DTOs;
using MISA.IMS.Common.Enumerations;

namespace MISA.IMS.DL.Repositories
{
    /// <summary>
    /// Tâng chung kết nối database
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// Created by : pnthuan(11/5/2021)
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        #region Fields
        protected readonly IDBContextFactory _dapperDBContextFactory;
         protected string _tableName;
        #endregion

        #region Properties

        protected string ConnectionString { get; set; }
        public string TableName { get => _tableName; }

        #endregion

        #region Constructors

        public BaseRepository(IDBContextFactory dapperDatabaseContextFactory)
        {
            _dapperDBContextFactory = dapperDatabaseContextFactory;
            _tableName = Utilities.GetEntityName<T>();
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy bản ghi theo Id bất đồng bộ
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<T> GetByIdAsync(object id)
        {
            var res = new List<T>();
           
            res = (await GetEntitiesAsync($"SELECT * FROM {_tableName} WHERE  {_tableName}ID = @id;", new { id = id.ToString()})).AsList();
            
            if (res.Count > 0)
            {
                return res[0];
            }
            return null;
        }
        /// <summary>
        /// Lấy tất cả bản ghi 
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public virtual async Task<IEnumerable<T>> GetEntitiesAsync(string commandText, object param = null)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                IDataReader sqlDataReader = await _dbContext.ExecuteReaderAsync(commandText, param);
                return ReadData(sqlDataReader);
            }
        }
        
        /// <summary>
        /// Khởi tạo kết dựa vào connectionString
        /// </summary>
        /// <param name="connectionString"></param>
        /// Created by : pnthuan(11/5/2021)
        public void InitializeDatabaseContext(string connectionString)
        {
            ConnectionString = connectionString;
        }

        /// <summary>
        /// Thực hiện đọc data từ DB trả về
        /// </summary>
        /// <param name="sqlDataReader"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/05/2021)
        protected IEnumerable<T> ReadData(IDataReader sqlDataReader)
        {
            var res = new List<T>();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fieldType = sqlDataReader.GetDataTypeName(i);
                    var fieldName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = entity.GetType().GetProperty(fieldName);
                    if (fieldValue != System.DBNull.Value && property != null)
                    {
                        //Cast từ string sang Guid
                        if ((property.PropertyType == typeof(Guid) || property.PropertyType == typeof(Guid?)) && fieldValue.GetType() == typeof(String))
                        {
                            property.SetValue(entity, Guid.Parse((string)fieldValue));
                        }
                        else
                        {
                            property.SetValue(entity, fieldValue);
                        }
                    }
                }
                res.Add(entity);
            }
            return res;
        }


        /// <summary>
        /// Lấy tất cả bản ghi 
        /// </summary>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public virtual async  Task<IEnumerable<T>> GetAllEntity()
        {
            /*var sql = "";

            sql = $"SELECT * FROM {_tableName};";*/
            /*List<T> res = new List<T>();
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
               res = _dbContext.QueryProc("Proc_GetContracts");
                return null;
            }*/
            /*return await GetEntitiesAsync(sql);*/
            throw new NotImplementedException();
        }


        /// <summary>
        /// Cập nhật trạng thái bản ghi
        /// </summary>
        /// <param name="codeRequireds">Danh sách mã yêu cầu</param>
        /// <param name="status">Trạng thái của tất cả bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<int> UpdateAsync(T entity)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext.ExecuteAsync($"Proc_Update{_tableName}", param: entity, commandType: CommandType.StoredProcedure);
                return res;
            }
        }
        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">Đối tượng thêm mới</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<int> InsertAsync(T entity)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext.ExecuteAsync($"Proc_Insert{_tableName}", param: entity, commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        /// <summary>
        /// Hàm thực hiện thêm mới 1 bản nháp
        /// </summary>
        /// <param name="entity">Dối tượng nháp</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/05/2021)
        public async Task<int>   InsertOriginalAsync(T entity)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext.ExecuteAsync($"Proc_Insert{_tableName}Original", param: entity, commandType: CommandType.StoredProcedure);
                return res;
            }
        }
        /// <summary>
        /// Xóa danh sách bản ghi
        /// </summary>
        /// <param name="codeRequireds">Danh sách mã yêu cầu</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<int> DeleteAsync(IEnumerable<string> codeRequireds)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                /*var param = $"{_tableName}ID";
                var res = await _dbContext.ExecuteAsync($"Proc_Delete{_tableName}", new { ContractID = id.ToString() }, commandType: CommandType.StoredProcedure);*/

                var sqlText = new StringBuilder($"DELETE FROM {_tableName} WHERE CodeRequired IN @codeRequireds;");
                var res = await _dbContext.ExecuteAsync(sqlText.ToString(), new { codeRequireds });
                return res;
            }
        }
        /// <summary>
        /// Thực hiện lấy 1 số trường của bản ghi, lọc bản ghi theo yêu cầu
        /// </summary>
        /// <param name="listRequest">Danh sách trường cần lấy, điều kiện lọc</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<IEnumerable<T>> GetEntities(ListRequest listRequest, int status, long offset, long limit)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {

                var entity = Activator.CreateInstance<T>();
                var properties = entity.GetType().GetProperties();
                var fields = new List<string>();
                var requests = new List<Request>();

                //
                if( listRequest.FieldNames != null)
                {
                    foreach (var property in properties)
                    {
                        if (listRequest.FieldNames.Contains(property.Name))
                        {
                            fields.Add(property.Name);
                        }
                    }
                }
                if( listRequest.Requests != null)
                {
                    foreach ( var request in listRequest.Requests)
                    {
                        if(entity.GetType().GetProperty(request.Key) != null)
                        {
                            requests.Add(request);
                        }
                    }
                }
                // Build 
                if(fields.Count > 0)
                {
                    // var sqlText = new StringBuilder($"SELECT * FROM {_tableName} WHERE Status = @status LIMIT @limit OFFSET @offset");
                    var sqlText = new StringBuilder("SELECT ");
                    sqlText.Append(string.Join(',', fields));
                    sqlText.Append($" FROM {_tableName} WHERE Status = @status ");
                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"status", status));
                    //
                    if (requests.Count > 0)
                    {
                        sqlText.Append("AND ");
                        foreach(var request in requests)
                        {
                            // key , value, codition
                            switch (request.Condition)
                            {
                                case Condition.Equal:
                                    sqlText.Append($"{request.Key} = @{request.Key} ");
                                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                    break;
                                case Condition.Contain:
                                    sqlText.Append($"{request.Key} LIKE CONCAT ('%',@{request.Key},'%') ");
                                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                    break;
                                case Condition.Different:
                                    sqlText.Append($"{request.Key}  != @{request.Key} ");
                                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                    break;
                                case Condition.GreaterThan: 
                                    sqlText.Append($"{request.Key} >= @{request.Key} ");
                                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                    break;
                                case Condition.LessThan: 
                                    sqlText.Append($"{request.Key} <= @{request.Key} ");
                                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                    break;

                            }
                            sqlText.Append(" AND ");
                        }
                        sqlText.Remove(sqlText.ToString().LastIndexOf(" AND "), 5);
                    }
                    sqlText.Append("ORDER BY CreatedDate DESC ");
                    sqlText.Append("LIMIT @limit OFFSET @offset");
                    
                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"limit", limit));
                    _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"offset", offset));
                    _dbContext._sqlCommand.CommandType = CommandType.Text;
                    _dbContext._sqlCommand.CommandText = sqlText.ToString();

                    await _dbContext._sqlCommand.PrepareAsync();
                    var res = await _dbContext._sqlCommand.ExecuteReaderAsync();
                    var data = ReadData(res);
                    //LIMIT @limit OFFSET @offset");
                   /* var res = (await GetEntitiesAsync(sqlText.ToString(), new { status, limit, offset })).AsList();*/
                    if (data != null)
                    {
                        return data;
                    }
                }
                return null;


            }
        }
        /// <summary>
        /// Thực hiện đếm số lượng bản ghi theo điều kiện lọc
        /// </summary>
        /// <param name="listRequest">Điều kiên lọc</param>
        /// <param name="status">Trạng thái bản ghi</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<long> CountEntities(ListRequest listRequest, int status)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {

                var entity = Activator.CreateInstance<T>();
                var properties = entity.GetType().GetProperties();
               
                var requests = new List<Request>();


                if (listRequest.Requests != null)
                {
                    foreach (var request in listRequest.Requests)
                    {
                        if (entity.GetType().GetProperty(request.Key) != null)
                        {
                            requests.Add(request);
                        }
                    }
                }
                // Build 
               
                // var sqlText = new StringBuilder($"SELECT * FROM {_tableName} WHERE Status = @status LIMIT @limit OFFSET @offset");
                var sqlText = new StringBuilder($"SELECT COUNT({_tableName}ID)");
                sqlText.Append($" FROM {_tableName} WHERE Status = @status ");
                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"status", status));
                //
                if (requests.Count > 0)
                {
                    sqlText.Append("AND ");
                    foreach (var request in requests)
                    {
                        // key , value, codition
                        switch (request.Condition)
                        {
                            case Condition.Equal:
                                sqlText.Append($"{request.Key} = @{request.Key} ");
                                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                break;
                            case Condition.Contain:
                                sqlText.Append($"{request.Key} LIKE CONCAT ('%',@{request.Key},'%') ");
                                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                break;
                            case Condition.Different:
                                sqlText.Append($"{request.Key}  != @{request.Key} ");
                                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                break;
                            case Condition.GreaterThan:
                                sqlText.Append($"{request.Key} >= @{request.Key} ");
                                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                break;
                            case Condition.LessThan:
                                sqlText.Append($"{request.Key} <= @{request.Key} ");
                                _dbContext._sqlCommand.Parameters.Add(new MySqlParameter($"{request.Key}", request.Value));
                                break;
                        }
                        sqlText.Append(" AND ");
                    }
                    sqlText.Remove(sqlText.ToString().LastIndexOf(" AND "), 5);
                }
                

                _dbContext._sqlCommand.CommandType = CommandType.Text;
                _dbContext._sqlCommand.CommandText = sqlText.ToString();

                await _dbContext._sqlCommand.PrepareAsync();
                var res = await _dbContext._sqlCommand.ExecuteReaderAsync();
                if( res != null)
                {
                    res.Read();
                    return (long)res.GetValue(0);
                }
                else
                {
                    return 0;
                }
      


            }

        }

        /// <summary>
        /// Cập nhật bản ghi 
        /// </summary>
        /// <param name="entity">Đối tượng cập nhật</param>
        /// <returns></returns>
        /// Created by : pnthuan(11/5/2021)
        public async Task<int> UpdateStatus(IEnumerable<string> codeRequireds, int status)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {

                /*var proc = new StringBuilder($"Proc_UpdateStatus");
                var res = await _dbContext._dbConnection.ExecuteAsync(proc.ToString(), new { ContractID = id, Status = status }, commandType: CommandType.StoredProcedure);
                return res;*/
                var sqlText = new StringBuilder($"UPDATE {_tableName}  c SET c.Status = @status WHERE CodeRequired IN @codeRequireds;");
                var res = await _dbContext.ExecuteAsync(sqlText.ToString(), new {status,  codeRequireds });
                return res;
            }
        }
        
        
        


        #endregion
    }
}
