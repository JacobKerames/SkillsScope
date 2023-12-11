using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class EducationalFieldRepository(string connectionString) : IEducationalFieldRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<EducationalField?> GetByIdAsync(int educationalFieldId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<EducationalField>(
                "SELECT * FROM educational_fields WHERE educational_field_id = @EducationalFieldId",
                new { EducationalFieldId = educationalFieldId });
        }

        public async Task<IEnumerable<EducationalField>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<EducationalField>("SELECT * FROM educational_fields");
        }

        public async Task<int> AddAsync(EducationalField educationalField)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO educational_fields (educational_field_name) VALUES (@EducationalFieldName) RETURNING educational_field_id";
            return await db.QuerySingleAsync<int>(sql, educationalField);
        }

        public async Task UpdateAsync(EducationalField educationalField)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE educational_fields SET educational_field_name = @EducationalFieldName WHERE educational_field_id = @EducationalFieldId";
            await db.ExecuteAsync(sql, educationalField);
        }

        public async Task DeleteAsync(int educationalFieldId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM educational_fields WHERE educational_field_id = @EducationalFieldId",
                                  new { EducationalFieldId = educationalFieldId });
        }
    }
}
