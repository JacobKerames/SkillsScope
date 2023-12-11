using Dapper;
using Npgsql;

namespace skill_scope_backend.Models;

public class BenefitRepository
{
    private readonly string _connectionString;

    public BenefitRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IEnumerable<Benefit> GetAllBenefits()
    {
        using var connection = new NpgsqlConnection(_connectionString);
        return connection.Query<Benefit>("SELECT * FROM benefits");
    }

    // Add more methods as needed for CRUD operations
}
