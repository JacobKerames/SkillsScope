using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class EducationalQualificationRepository(string connectionString) : IEducationalQualificationRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<EducationalQualification?> GetByIdAsync(int educationalQualificationId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<EducationalQualification>(
                "SELECT * FROM educational_qualifications WHERE educational_qualification_id = @EducationalQualificationId",
                new { EducationalQualificationId = educationalQualificationId });
        }

        public async Task<IEnumerable<EducationalQualification>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<EducationalQualification>("SELECT * FROM educational_qualifications");
        }

        public async Task<int> AddAsync(EducationalQualification educationalQualification)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO educational_qualifications (job_posting_id, education_level, educational_field_id) VALUES (@JobPostingId, @EducationLevel, @EducationalFieldId) RETURNING educational_qualification_id";
            return await db.QuerySingleAsync<int>(sql, educationalQualification);
        }

        public async Task UpdateAsync(EducationalQualification educationalQualification)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE educational_qualifications SET job_posting_id = @JobPostingId, education_level = @EducationLevel, educational_field_id = @EducationalFieldId WHERE educational_qualification_id = @EducationalQualificationId";
            await db.ExecuteAsync(sql, educationalQualification);
        }

        public async Task DeleteAsync(int educationalQualificationId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM educational_qualifications WHERE educational_qualification_id = @EducationalQualificationId",
                                  new { EducationalQualificationId = educationalQualificationId });
        }
    }
}
