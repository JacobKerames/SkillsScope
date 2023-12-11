using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class SkillQualificationRepository(string connectionString) : ISkillQualificationRepository
    {
        private readonly string _connectionString = connectionString;

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
