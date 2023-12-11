using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class JobPostingRepository(string connectionString) : IJobPostingRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<JobPosting?> GetByIdAsync(int jobPostingId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<JobPosting>(
                "SELECT * FROM job_postings WHERE job_posting_id = @JobPostingId",
                new { JobPostingId = jobPostingId });
        }

        public async Task<IEnumerable<JobPosting>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<JobPosting>("SELECT * FROM job_postings");
        }

        public async Task<int> AddAsync(JobPosting jobPosting)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO job_postings (title, company_id, city_id, state_id, country_id, posted_date) VALUES (@Title, @CompanyId, @CityId, @StateId, @CountryId, @PostedDate) RETURNING job_posting_id";
            return await db.QuerySingleAsync<int>(sql, jobPosting);
        }

        public async Task UpdateAsync(JobPosting jobPosting)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE job_postings SET title = @Title, company_id = @CompanyId, city_id = @CityId, state_id = @StateId, country_id = @CountryId, posted_date = @PostedDate WHERE job_posting_id = @JobPostingId";
            await db.ExecuteAsync(sql, jobPosting);
        }

        public async Task DeleteAsync(int jobPostingId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM job_postings WHERE job_posting_id = @JobPostingId",
                                  new { JobPostingId = jobPostingId });
        }
    }
}
