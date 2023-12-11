using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class CompanyRepository(string connectionString) : ICompanyRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<Company?> GetByIdAsync(int companyId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<Company>(
                "SELECT * FROM companies WHERE company_id = @CompanyId",
                new { CompanyId = companyId });
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<Company>("SELECT * FROM companies");
        }

        public async Task<int> AddAsync(Company company)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO companies (company_name) VALUES (@CompanyName) RETURNING company_id";
            return await db.QuerySingleAsync<int>(sql, company);
        }

        public async Task UpdateAsync(Company company)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE companies SET company_name = @CompanyName WHERE company_id = @CompanyId";
            await db.ExecuteAsync(sql, company);
        }

        public async Task DeleteAsync(int companyId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM companies WHERE company_id = @CompanyId",
                                  new { CompanyId = companyId });
        }
    }
}
