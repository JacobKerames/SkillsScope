using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;
using skills_scope_backend.Repositories.Interfaces;

namespace skills_scope_backend.Repositories
{
    public class SkillQualificationRepository : ISkillQualificationRepository
    {
        private readonly string _connectionString;

        public SkillQualificationRepository(IConfiguration configuration)
        {
            // Retrieve the connection string
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Check for null and handle it appropriately
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Database connection string 'DefaultConnection' not found.");
            }

            _connectionString = connectionString;
        }

        public async Task<IEnumerable<SkillQualification>> GetByJobPostingIdAsync(int jobPostingId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<SkillQualification>(
                "SELECT * FROM skill_qualifications WHERE job_posting_id = @JobPostingId",
                new { JobPostingId = jobPostingId });
        }

        public async Task<IEnumerable<SkillQualification>> GetBySkillIdAsync(int skillId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<SkillQualification>(
                "SELECT * FROM skill_qualifications WHERE skill_id = @SkillId",
                new { SkillId = skillId });
        }

        public async Task AddAsync(SkillQualification skillQualification)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO skill_qualifications (job_posting_id, skill_id) VALUES (@JobPostingId, @SkillId)";
            await db.ExecuteAsync(sql, skillQualification);
        }

        public async Task DeleteAsync(int jobPostingId, int skillId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM skill_qualifications WHERE job_posting_id = @JobPostingId AND skill_id = @SkillId",
                                  new { JobPostingId = jobPostingId, SkillId = skillId });
        }
    }
}
