using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;
using skill_scope_backend.Repositories.Interfaces;

namespace skill_scope_backend.Repositories
{
    public class JobLevelRepository(string connectionString) : IJobLevelRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<JobLevel?> GetByIdAsync(int jobLevelId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<JobLevel>(
                "SELECT * FROM job_levels WHERE job_level_id = @JobLevelId",
                new { JobLevelId = jobLevelId });
        }

        public async Task<IEnumerable<JobLevel>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<JobLevel>("SELECT * FROM job_levels");
        }

        public async Task<int> AddAsync(JobLevel jobLevel)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO job_levels (level_name) VALUES (@LevelName) RETURNING job_level_id";
            return await db.QuerySingleAsync<int>(sql, jobLevel);
        }

        public async Task UpdateAsync(JobLevel jobLevel)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE job_levels SET level_name = @LevelName WHERE job_level_id = @JobLevelId";
            await db.ExecuteAsync(sql, jobLevel);
        }

        public async Task DeleteAsync(int jobLevelId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM job_levels WHERE job_level_id = @JobLevelId",
                                  new { JobLevelId = jobLevelId });
        }
    }
}
