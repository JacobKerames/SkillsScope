using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class StateRepository(string connectionString) : IStateRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<State?> GetByIdAsync(int stateId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<State>(
                "SELECT * FROM states WHERE state_id = @StateId",
                new { StateId = stateId });
        }

        public async Task<IEnumerable<State>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<State>("SELECT * FROM states");
        }

        public async Task<int> AddAsync(State state)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO states (state_name, state_abbr, country_id) VALUES (@StateName, @StateAbbr, @CountryId) RETURNING state_id";
            return await db.QuerySingleAsync<int>(sql, state);
        }

        public async Task UpdateAsync(State state)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE states SET state_name = @StateName, state_abbr = @StateAbbr, country_id = @CountryId WHERE state_id = @StateId";
            await db.ExecuteAsync(sql, state);
        }

        public async Task DeleteAsync(int stateId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM states WHERE state_id = @StateId",
                                  new { StateId = stateId });
        }
    }
}
