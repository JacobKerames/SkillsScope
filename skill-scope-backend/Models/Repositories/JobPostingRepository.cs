using Dapper;
using Npgsql;

namespace skill_scope_backend.Models;

public class JobPostingRepository(string connectionString)
{
    private readonly string _connectionString = connectionString;

    public IEnumerable<JobPosting> GetAllJobPostings()
    {
        using var connection = new NpgsqlConnection(_connectionString);
        return connection.Query<JobPosting>("SELECT * FROM job_postings");
    }

    // Add more methods as needed for CRUD operations
}
