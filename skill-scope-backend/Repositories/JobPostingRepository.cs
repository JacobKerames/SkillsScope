using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class JobPostingRepository(IConfiguration configuration) : IJobPostingRepository
    {
        private readonly string? _connectionString = configuration.GetConnectionString("DefaultConnection");

        public async Task<IEnumerable<SkillDTO>> GetTitleSkillDesireAsync(string keyword)
        {
            var sql = @"
                SELECT s.skill_name AS SkillName, 
                    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
                FROM job_postings jp
                JOIN skill_qualifications sq ON jp.job_posting_id = sq.job_posting_id
                JOIN skills s ON sq.skill_id = s.skill_id
                WHERE to_tsvector('english', jp.title) @@ to_tsquery('english', @Keyword)
                GROUP BY s.skill_name";

            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var skillStats = await db.QueryAsync<SkillDTO>(sql, new { Keyword = keyword });

            return skillStats;
        }

        public async Task<IEnumerable<EducationDTO>> GetTitleEducationDesireAsync(string keyword)
        {
            var sql = @"
                SELECT eq.EducationLevel, ef.EducationalFieldName,
                    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
                FROM JobPostings jp
                JOIN EducationalQualifications eq ON jp.JobPostingId = eq.JobPostingId
                JOIN EducationalFields ef ON eq.EducationalFieldId = ef.EducationalFieldId
                WHERE CONTAINS(jp.Title, @Keyword)
                GROUP BY eq.EducationLevel, ef.EducationalFieldName";

            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var educationStats = await db.QueryAsync<EducationDTO>(sql, new { Keyword = keyword });

            return educationStats;
        }

        public async Task<IEnumerable<ExperienceDTO>> GetTitleExperienceDesireAsync(string keyword)
        {
            var sql = @"
                SELECT eq.ExperienceReference, eq.YearsExperience,
                    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
                FROM JobPostings jp
                JOIN ExperienceQualifications eq ON jp.JobPostingId = eq.JobPostingId
                WHERE CONTAINS(jp.Title, @Keyword)
                GROUP BY eq.ExperienceReference, eq.YearsExperience";

            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var experienceStats = await db.QueryAsync<ExperienceDTO>(sql, new { Keyword = keyword });

            return experienceStats;
        }

        public async Task<int> AddAsync(JobPosting jobPosting)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = @"
                INSERT INTO job_postings 
                (title, company_id, city_id, state_id, country_id, posted_date) 
                VALUES 
                (@Title, @CompanyId, @CityId, @StateId, @CountryId, @PostedDate) 
                RETURNING job_posting_id";
                
            return await db.QuerySingleAsync<int>(sql, jobPosting);
        }
    }
}
