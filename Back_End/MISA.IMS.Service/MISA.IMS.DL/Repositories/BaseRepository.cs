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
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly IDBContextFactory _dapperDBContextFactory;
         protected string _tableName;

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

        public virtual async Task<IEnumerable<T>> GetEntitiesAsync(string commandText, object param = null)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                IDataReader sqlDataReader = await _dbContext.ExecuteReaderAsync(commandText, param);
                return ReadData(sqlDataReader);
            }
        }
        public void InitializeDatabaseContext(string connectionString)
        {
            ConnectionString = connectionString;
        }
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

        public  virtual async  Task<IEnumerable<T>> GetAllEntity()
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

        public Task<int> InsertEntity()
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateAsync(T entity)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext.ExecuteAsync($"Proc_Update{_tableName}", param: entity, commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        public async Task<int> InsertAsync(T entity)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                var res = await _dbContext.ExecuteAsync($"Proc_Insert{_tableName}", param: entity, commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        public async Task<int> DeleteAsync(IEnumerable<string> ids)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
                /*var param = $"{_tableName}ID";
                var res = await _dbContext.ExecuteAsync($"Proc_Delete{_tableName}", new { ContractID = id.ToString() }, commandType: CommandType.StoredProcedure);*/

                var sqlText = new StringBuilder($"DELETE FROM {_tableName} WHERE {_tableName}ID IN @ids;");
                var res = await _dbContext.ExecuteAsync(sqlText.ToString(), new { ids });
                return res;
            }
        }

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
                            }
                            sqlText.Append(" AND ");
                        }
                    }
                    sqlText.Remove(sqlText.ToString().LastIndexOf(" AND "), 5);
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
                        }
                        sqlText.Append(" AND ");
                    }
                }
                sqlText.Remove(sqlText.ToString().LastIndexOf(" AND "), 5);

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

        public async Task<int> UpdateStatus(string id, int status)
        {
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
            
                    var proc = new StringBuilder($"Proc_UpdateStatus");
                    var res = await _dbContext._dbConnection.ExecuteAsync(proc.ToString(), new { ContractID = id, Status = status }, commandType: CommandType.StoredProcedure);
                    return res;
            }
        }

        


        #endregion
    }
}
