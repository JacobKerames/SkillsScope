using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public class SkillRepository(string connectionString) : ISkillRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task<Skill?> GetByIdAsync(int skillId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<Skill>(
                "SELECT * FROM skills WHERE skill_id = @SkillId",
                new { SkillId = skillId });
        }

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            return await db.QueryAsync<Skill>("SELECT * FROM skills");
        }

        public async Task<int> AddAsync(Skill skill)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "INSERT INTO skills (skill_name) VALUES (@SkillName) RETURNING skill_id";
            return await db.QuerySingleAsync<int>(sql, skill);
        }

        public async Task UpdateAsync(Skill skill)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            var sql = "UPDATE skills SET skill_name = @SkillName WHERE skill_id = @SkillId";
            await db.ExecuteAsync(sql, skill);
        }

        public async Task DeleteAsync(int skillId)
        {
            using IDbConnection db = new NpgsqlConnection(_connectionString);
            await db.ExecuteAsync("DELETE FROM skills WHERE skill_id = @SkillId",
                                  new { SkillId = skillId });
        }
    }
}