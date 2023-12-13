using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;
using skill_scope_backend.Repositories.Interfaces;

namespace skill_scope_backend.Repositories
{
    public class CountryRepository(string connectionString) : ICountryRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<Country?> GetByIdAsync(int countryId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<Country>(
                "SELECT * FROM countries WHERE country_id = @CountryId",
                new { CountryId = countryId });
        }

        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<Country>("SELECT * FROM countries");
        }

        public async Task<int> AddAsync(Country country)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO countries (country_name, country_alpha2_code, country_alpha3_code) VALUES (@CountryName, @CountryAlpha2Code, @CountryAlpha3Code) RETURNING country_id";
            return await db.QuerySingleAsync<int>(sql, country);
        }

        public async Task UpdateAsync(Country country)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE countries SET country_name = @CountryName, country_alpha2_code = @CountryAlpha2Code, country_alpha3_code = @CountryAlpha3Code WHERE country_id = @CountryId";
            await db.ExecuteAsync(sql, country);
        }

        public async Task DeleteAsync(int countryId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM countries WHERE country_id = @CountryId",
                                  new { CountryId = countryId });
        }
    }
}
