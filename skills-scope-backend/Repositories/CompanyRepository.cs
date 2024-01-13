using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
	public class CompanyRepository(string connectionString) : ICompanyRepository
	{
		private readonly string _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));

		public async Task<IEnumerable<Company>> GetFilteredCompaniesAsync(string query)
		{
			var sql = @"
				SELECT company_id, company_name
				FROM companies";

			if (!string.IsNullOrEmpty(query))
			{
				sql += "WHERE companies.company_name ILIKE @QueryPattern";
			}

			sql += @"
				ORDER BY 
					companies.company_name ASC
				LIMIT 10;";

			using IDbConnection db = new NpgsqlConnection(_connectionString);
			var queryPattern = $"%{query}%";
			var companyData = await db.QueryAsync(sql, new { QueryPattern = queryPattern });

			var companies = new List<Company>();
			foreach (var item in companyData)
			{
				var company = new Company
				{
					CompanyId = item.company_id,
					CompanyName = item.company_name
				};
				companies.Add(company);
			}

			return companies;
		}

		public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
		{
			var sql = @"
				SELECT company_id, company_name
				FROM companies";

			using IDbConnection db = new NpgsqlConnection(_connectionString);
			var companyData = await db.QueryAsync(sql);

			var companies = new List<Company>();
			foreach (var item in companyData)
			{
				var company = new Company
				{
					CompanyId = item.company_id,
					CompanyName = item.company_name
				};
				companies.Add(company);
			}

			return companies;
		}

		public async Task<Company?> GetByIdAsync(int companyId)
		{
			using IDbConnection db = new NpgsqlConnection(_connectionString);
			return await db.QueryFirstOrDefaultAsync<Company>(
				"SELECT * FROM companies WHERE company_id = @CompanyId",
				new { CompanyId = companyId });
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
