using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;
using skill_scope_backend.Repositories.Interfaces;

namespace skill_scope_backend.Repositories
{
    public class ExperienceQualificationRepository(string connectionString) : IExperienceQualificationRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<ExperienceQualification?> GetByIdAsync(int experienceQualificationId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<ExperienceQualification>(
                "SELECT * FROM experience_qualifications WHERE experience_qualification_id = @ExperienceQualificationId",
                new { ExperienceQualificationId = experienceQualificationId });
        }

        public async Task<IEnumerable<ExperienceQualification>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<ExperienceQualification>("SELECT * FROM experience_qualifications");
        }

        public async Task<int> AddAsync(ExperienceQualification experienceQualification)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO experience_qualifications (job_posting_id, skill_id, years_experience, experience_reference, experience_type) VALUES (@JobPostingId, @SkillId, @YearsExperience, @ExperienceReference, @ExperienceType) RETURNING experience_qualification_id";
            return await db.QuerySingleAsync<int>(sql, experienceQualification);
        }

        public async Task UpdateAsync(ExperienceQualification experienceQualification)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE experience_qualifications SET job_posting_id = @JobPostingId, skill_id = @SkillId, years_experience = @YearsExperience, experience_reference = @ExperienceReference, experience_type = @ExperienceType WHERE experience_qualification_id = @ExperienceQualificationId";
            await db.ExecuteAsync(sql, experienceQualification);
        }

        public async Task DeleteAsync(int experienceQualificationId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM experience_qualifications WHERE experience_qualification_id = @ExperienceQualificationId",
                                  new { ExperienceQualificationId = experienceQualificationId });
        }
    }
}
