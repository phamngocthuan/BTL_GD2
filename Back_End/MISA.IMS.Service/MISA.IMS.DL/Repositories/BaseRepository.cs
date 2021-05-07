using Dapper;
using MISA.IMS.Common;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;

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
                        //Nếu là bit thì chuyển thành bool
                        /*if (fieldType == "BIT")
                        {
                            if ((UInt64)fieldValue == 0) property.SetValue(entity, false);
                            else if ((UInt64)fieldValue == 1) property.SetValue(entity, true);
                            continue;
                        }*/
                        /*  if (property.PropertyType == typeof(Gender?))
                          {
                              property.SetValue(entity, fieldValue == null ? (Gender?)null : (Gender)fieldValue);
                          }
                          else if (property.PropertyType == typeof(AttendeeStatus?))
                          {
                              property.SetValue(entity, fieldValue == null ? (AttendeeStatus?)null : (AttendeeStatus)fieldValue);
                          }*/
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

        public async  Task<IEnumerable<T>> GetAllEntity()
        {
            /*var sql = "";

            sql = $"SELECT * FROM {_tableName};";*/
            using (var _dbContext = _dapperDBContextFactory.CreateDatabaseContext(ConnectionString))
            {
               var res = _dbContext.QueryProc("Proc_GetContracts");
                return null;
            }
            /*return await GetEntitiesAsync(sql);*/
        }

        public Task<int> InsertEntity()
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateEntity()
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
