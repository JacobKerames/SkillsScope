using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class CityRepository(string connectionString) : ICityRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<City?> GetByIdAsync(int cityId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<City>(
                "SELECT * FROM cities WHERE city_id = @CityId",
                new { CityId = cityId });
        }

        public async Task<IEnumerable<City>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<City>("SELECT * FROM cities");
        }

        public async Task AddAsync(City city)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO cities (city_name, state_id) VALUES (@CityName, @StateId)";
            await db.ExecuteAsync(sql, city);
        }

        public async Task UpdateAsync(City city)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE cities SET city_name = @CityName, state_id = @StateId WHERE city_id = @CityId";
            await db.ExecuteAsync(sql, city);
        }

        public async Task DeleteAsync(int cityId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM cities WHERE city_id = @CityId",
                                  new { CityId = cityId });
        }
    }
}
