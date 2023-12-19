using System.Data;
using Dapper;
using Npgsql;
using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
	public class LocationRepository(IConfiguration configuration) : ILocationRepository
	{
		private readonly string? _connectionString = configuration.GetConnectionString("DefaultConnection");

		public async Task<IEnumerable<Location>> GetAllLocationsAsync()
		{
			var sql = @"
				SELECT c.city_id, c.city_name, s.state_id, s.state_name, co.country_id, co.country_name
				FROM cities c
				JOIN states s ON c.state_id = s.state_id
				JOIN countries co ON s.country_id = co.country_id;";

			using IDbConnection db = new NpgsqlConnection(_connectionString);
			var locationData = await db.QueryAsync(sql);

			var locations = new List<Location>();
			foreach (var item in locationData)
			{
				var location = new Location
				{
					City = new City { CityId = item.city_id, CityName = item.city_name, StateId = item.state_id },
					State = new State { StateId = item.state_id, StateName = item.state_name, StateCode = item.state_code, CountryId = item.country_id },
					Country = new Country
					{
						CountryId = item.country_id,
						CountryName = item.country_name,
						Iso3 = item.iso3,
						Iso2 = item.iso2
					}
				};
				locations.Add(location);
			}

			return locations;
		}
	}
}
