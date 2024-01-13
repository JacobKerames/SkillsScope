using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
  public class JobPostingRepository(string connectionString) : IJobPostingRepository
  {
    private readonly string _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));

    public async Task<IEnumerable<ResultDTO>> GetTitleSkillDesireAsync(SearchDTO parameters)
    {
      var sqlQuery = @"
        SELECT s.skill_name AS ResultName, 
          COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
        FROM job_postings jp
        JOIN skill_qualifications sq ON jp.job_posting_id = sq.job_posting_id
        JOIN skills s ON sq.skill_id = s.skill_id";

      var groupByClause = "GROUP BY s.skill_name";

      return await GetResultsAsync(
        parameters,
        sqlQuery,
        groupByClause
      );
    }

    public async Task<IEnumerable<ResultDTO>> GetTitleEducationDesireAsync(SearchDTO parameters)
    {
      var sqlQuery = @"
        SELECT
          INITCAP(REPLACE(eq.education_level::text, '_', ' ')) || ' in ' || ef.educational_field_name AS ResultName,
          COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
        FROM job_postings jp
        JOIN educational_qualifications eq ON jp.job_posting_id = eq.job_posting_id
        JOIN educational_fields ef ON eq.educational_field_id = ef.educational_field_id";

      var groupByClause = "GROUP BY eq.education_level, ef.educational_field_name";

      return await GetResultsAsync(
        parameters,
        sqlQuery,
        groupByClause
      );
    }

    public async Task<IEnumerable<ResultDTO>> GetTitleExperienceDesireAsync(SearchDTO parameters)
    {
      var sqlQuery = @"
        SELECT
          CASE
            WHEN eq.experience_type = 'job_title' THEN
              CASE
                WHEN eq.years_experience = 1 THEN eq.years_experience || ' year as a ' || eq.experience_reference
                ELSE eq.years_experience || ' years as a ' || eq.experience_reference
              END
            WHEN eq.experience_type = 'skill' THEN
              CASE
                WHEN eq.years_experience = 1 THEN eq.years_experience || ' year using ' || s.skill_name
                ELSE eq.years_experience || ' years using ' || s.skill_name
              END
          END AS ResultName,
          COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS Percentage
        FROM job_postings jp
        JOIN experience_qualifications eq ON jp.job_posting_id = eq.job_posting_id
        LEFT JOIN skills s ON eq.skill_id = s.skill_id";

      var groupByClause = @"
        GROUP BY eq.experience_type, eq.years_experience, eq.experience_reference, s.skill_name";

      return await GetResultsAsync(
        parameters,
        sqlQuery,
        groupByClause
      );
    }

    public async Task<IEnumerable<ResultDTO>> GetResultsAsync(SearchDTO parameters, string sqlQuery, string groupByClause)
    {
      var sql = $"{sqlQuery}";

      if (!string.IsNullOrEmpty(parameters.Level))
      {
        sql += @"
        LEFT JOIN job_posting_levels jpl ON jp.job_posting_id = jpl.job_posting_id
        LEFT JOIN job_levels jl ON jpl.level_id = jl.level_id";
      }

      sql += @"
        WHERE to_tsvector('english', jp.title) @@ plainto_tsquery('english', @Keyword)";

      if (!string.IsNullOrEmpty(parameters.TimeFrame))
      {
        TimeFrameConverter(parameters);
        sql += @"
          AND jp.posted_date >= @StartDate
          AND jp.posted_date <= @EndDate";
      }

      if (parameters.CompanyId.HasValue)
      {
        sql += " AND jp.company_id = @CompanyId";
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

      sql += $@"
        {groupByClause}
        ORDER BY Percentage DESC;";

      using IDbConnection db = new NpgsqlConnection(_connectionString);
      var results = await db.QueryAsync<ResultDTO>(sql, new
      {
        parameters.Keyword,
        parameters.StartDate,
        parameters.EndDate,
        parameters.CompanyId,
        parameters.CityId,
        parameters.StateId,
        parameters.CountryId,
        parameters.Level
      });

      return results;
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

    public static void TimeFrameConverter(SearchDTO parameters)
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
          throw new ArgumentOutOfRangeException(nameof(parameters),
            $"Unsupported time frame: {parameters.TimeFrame} in the 'TimeFrame' property of 'SearchDTO'.");
      }
    }
  }
}
