using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
  public class JobPostingRepository(IConfiguration configuration) : IJobPostingRepository
  {
    private readonly string? _connectionString = configuration.GetConnectionString("DefaultConnection");

    public async Task<IEnumerable<SkillDTO>> GetTitleSkillDesireAsync(SkillSearchDTO parameters)
    {
      var sql = @"
        SELECT s.skill_name AS SkillName, 
          COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
        FROM job_postings jp
        JOIN skill_qualifications sq ON jp.job_posting_id = sq.job_posting_id
        JOIN skills s ON sq.skill_id = s.skill_id
        LEFT JOIN job_posting_levels jpl ON jp.job_posting_id = jpl.job_posting_id
        LEFT JOIN job_levels jl ON jpl.level_id = jl.level_id
        WHERE to_tsvector('english', jp.title) @@ plainto_tsquery('english', @Keyword)";

      if (!string.IsNullOrEmpty(parameters.TimeFrame))
      {
        TimeFrameConverter(parameters);
        sql += @"
          AND jp.posted_date >= @StartDate
          AND jp.posted_date <= @EndDate";
      }

      if (!string.IsNullOrEmpty(parameters.Company))
      {
        sql += @"
          AND jp.company_id
          IN (
            SELECT company_id FROM companies c
            WHERE to_tsvector('english', c.company_name) @@ plainto_tsquery('english', @Company)
          )";
      }

      if (parameters.CityId.HasValue)
      {
        sql += " AND jp.city_id = @CityId";
      }

      if (parameters.StateId.HasValue)
      {
        sql += " AND jp.state_id = @StateId";
      }

      if (parameters.CountryId.HasValue)
      {
        sql += " AND jp.country_id = @CountryId";
      }

      if (!string.IsNullOrEmpty(parameters.Level))
      {
        sql += " AND LOWER(jl.level_name) = LOWER(@Level)";
      }

      sql += @"
        GROUP BY s.skill_name
        ORDER BY Percentage DESC;";

      using IDbConnection db = new NpgsqlConnection(_connectionString);
      var skillStats = await db.QueryAsync<SkillDTO>(sql, new
      {
        parameters.Keyword,
        parameters.StartDate,
        parameters.EndDate,
        Company = $"%{parameters.Company}%",
        parameters.CityId,
        parameters.StateId,
        parameters.CountryId,
        parameters.Level
      });

      return skillStats;
    }

    public static void TimeFrameConverter(SkillSearchDTO parameters)
    {
      parameters.EndDate = DateTime.Today;

      switch (parameters.TimeFrame)
      {
        case "pastMonth":
          parameters.StartDate = parameters.EndDate.Value.AddMonths(-1);
          break;
        case "pastYear":
          parameters.StartDate = parameters.EndDate.Value.AddYears(-1);
          break;
        case "pastTwoYears":
          parameters.StartDate = parameters.EndDate.Value.AddYears(-2);
          break;
        case "pastFiveYears":
          parameters.StartDate = parameters.EndDate.Value.AddYears(-5);
          break;
        default:
          // Handle default case or invalid values
          break;
      }
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
