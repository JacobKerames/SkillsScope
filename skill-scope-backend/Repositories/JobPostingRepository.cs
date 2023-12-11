using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class JobPostingRepository(string connectionString) : IJobPostingRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<IEnumerable<SkillDTO>> GetTitleSkillDesireAsync(string keyword)
        {
            var sql = @"
                SELECT s.SkillId, s.SkillName, 
                    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
                FROM JobPostings jp
                JOIN SkillQualifications sq ON jp.JobPostingId = sq.JobPostingId
                JOIN Skills s ON sq.SkillId = s.SkillId
                WHERE CONTAINS(jp.Title, @Keyword)
                GROUP BY s.SkillId, s.SkillName";

            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var skillPercentages = await db.QueryAsync<dynamic>(sql, new { Keyword = keyword });

            return skillPercentages.Select(sp => new SkillDTO
            {
                Skill = new Skill { SkillId = sp.SkillId, SkillName = sp.SkillName },
                Percentage = sp.Percentage
            });
        }

        public async Task<int> AddAsync(JobPosting jobPosting)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO job_postings (title, company_id, city_id, state_id, country_id, posted_date) VALUES (@Title, @CompanyId, @CityId, @StateId, @CountryId, @PostedDate) RETURNING job_posting_id";
            return await db.QuerySingleAsync<int>(sql, jobPosting);
        }
    }
}
