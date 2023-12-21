using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;
using skills_scope_backend.Repositories.Interfaces;

namespace skills_scope_backend.Repositories
{
    public class JobPostingLevelRepository(string connectionString) : IJobPostingLevelRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<IEnumerable<JobPostingLevel>> GetByJobPostingIdAsync(int jobPostingId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<JobPostingLevel>(
                "SELECT * FROM job_posting_levels WHERE job_posting_id = @JobPostingId",
                new { JobPostingId = jobPostingId });
        }

        public async Task<IEnumerable<JobPostingLevel>> GetByJobLevelIdAsync(int jobLevelId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<JobPostingLevel>(
                "SELECT * FROM job_posting_levels WHERE job_level_id = @JobLevelId",
                new { JobLevelId = jobLevelId });
        }

        public async Task AddAsync(JobPostingLevel jobPostingLevel)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO job_posting_levels (job_posting_id, job_level_id) VALUES (@JobPostingId, @JobLevelId)";
            await db.ExecuteAsync(sql, jobPostingLevel);
        }

        public async Task DeleteAsync(int jobPostingId, int jobLevelId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM job_posting_levels WHERE job_posting_id = @JobPostingId AND job_level_id = @JobLevelId",
                                  new { JobPostingId = jobPostingId, JobLevelId = jobLevelId });
        }
    }
}
