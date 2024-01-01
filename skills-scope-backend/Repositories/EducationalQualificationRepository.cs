using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;
using skills_scope_backend.Repositories.Interfaces;

namespace skills_scope_backend.Repositories
{
    public class EducationalQualificationRepository : IEducationalQualificationRepository
    {
        private readonly string _connectionString;

        public EducationalQualificationRepository(IConfiguration configuration)
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
