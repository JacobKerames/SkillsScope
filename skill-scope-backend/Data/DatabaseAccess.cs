using Npgsql;
using Dapper;

namespace SkillScopeBackend.Data
{
	public class DatabaseAccess
	{
		private readonly string _connectionString;

		public DatabaseAccess(string connectionString)
		{
			_connectionString = connectionString;
		}

		public IEnumerable<T> Query<T>(string sql)
		{
			using var connection = new NpgsqlConnection(_connectionString);
			return connection.Query<T>(sql).ToList();
		}

		public void Execute(string sql)
		{
			using var connection = new NpgsqlConnection(_connectionString);
			connection.Execute(sql);
		}

		public void Update(string sql, object? param = null)
		{
			using var connection = new NpgsqlConnection(_connectionString);
			connection.Execute(sql, param);
		}

		public void Delete(string sql, object? param = null)
		{
			using var connection = new NpgsqlConnection(_connectionString);
			connection.Execute(sql, param);
		}
	}
}
