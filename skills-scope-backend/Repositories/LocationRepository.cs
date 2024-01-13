using System.Data;
using Dapper;
using Npgsql;
using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
	public class LocationRepository(string connectionString) : ILocationRepository
	{
		private readonly string _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));

		public async Task<IEnumerable<Location>> GetFilteredLocationsAsync(string query)
		{
			var sql = @"
				SELECT * FROM (
					SELECT 
						CAST(NULL AS INTEGER) AS city_id, 
						CAST(NULL AS VARCHAR) AS city_name, 
						CAST(NULL AS INTEGER) AS state_id, 
						CAST(NULL AS VARCHAR) AS state_name, 
						country_id, 
						country_name, 
						1 AS location_type_rank
					FROM countries
					UNION ALL
					SELECT 
						CAST(NULL AS INTEGER) AS city_id, 
						CAST(NULL AS VARCHAR) AS city_name, 
						state_id, 
						state_name, 
						states.country_id, 
						countries.country_name, 
						2 AS location_type_rank
					FROM states
					JOIN countries ON states.country_id = countries.country_id
					UNION ALL
					SELECT 
						city_id, 
						city_name, 
						cities.state_id, 
						states.state_name, 
						states.country_id, 
						countries.country_name, 
						3 AS location_type_rank
					FROM cities
					JOIN states ON cities.state_id = states.state_id
					JOIN countries ON states.country_id = countries.country_id
				) AS combined_locations";

			if (!string.IsNullOrEmpty(query))
			{
				sql += @"
					WHERE 
						combined_locations.country_name ILIKE @QueryPattern OR
						combined_locations.state_name || ' ' || combined_locations.country_name ILIKE @QueryPattern OR
						combined_locations.city_name || ' ' || combined_locations.state_name ILIKE @QueryPattern";
			}

			sql += @"
				ORDER BY 
					location_type_rank,
					(CASE WHEN combined_locations.country_name = 'United States' THEN 0 ELSE 1 END),
					combined_locations.country_name, 
					combined_locations.state_name, 
					combined_locations.city_name
				LIMIT 10;";

			using IDbConnection db = new NpgsqlConnection(_connectionString);
			var queryPattern = $"%{query}%";
			var locationData = await db.QueryAsync(sql, new { QueryPattern = queryPattern });

			var locations = new List<Location>();
			foreach (var item in locationData)
			{
				var location = new Location
				{
					City = item.city_id != null ? new City { CityId = item.city_id, CityName = item.city_name, StateId = item.state_id } : null,
					State = item.state_id != null ? new State { StateId = item.state_id, StateName = item.state_name, CountryId = item.country_id } : null,
					Country = item.country_id = new Country { CountryId = item.country_id, CountryName = item.country_name }
				};
				locations.Add(location);
			}
			return locations;
		}

		public async Task<IEnumerable<Location>> GetAllLocationsAsync()
		{
			var sql = @"
				SELECT * FROM (
					SELECT 
						CAST(NULL AS INTEGER) AS city_id, 
						CAST(NULL AS VARCHAR) AS city_name, 
						CAST(NULL AS INTEGER) AS state_id, 
						CAST(NULL AS VARCHAR) AS state_name, 
						country_id, 
						country_name, 
						1 AS location_type_rank
					FROM countries
					UNION ALL
					SELECT 
						CAST(NULL AS INTEGER) AS city_id, 
						CAST(NULL AS VARCHAR) AS city_name, 
						state_id, 
						state_name, 
						states.country_id, 
						countries.country_name, 
						2 AS location_type_rank
					FROM states
					JOIN countries ON states.country_id = countries.country_id
					UNION ALL
					SELECT 
						city_id, 
						city_name, 
						cities.state_id, 
						states.state_name, 
						states.country_id, 
						countries.country_name, 
						3 AS location_type_rank
					FROM cities
					JOIN states ON cities.state_id = states.state_id
					JOIN countries ON states.country_id = countries.country_id
				) AS combined_locations
				ORDER BY 
					location_type_rank,
					(CASE WHEN combined_locations.country_name = 'United States' THEN 0 ELSE 1 END),
					combined_locations.country_name, 
					combined_locations.state_name, 
					combined_locations.city_name;";

			using IDbConnection db = new NpgsqlConnection(_connectionString);
			var locationData = await db.QueryAsync(sql);

			var locations = new List<Location>();
			foreach (var item in locationData)
			{
				var location = new Location
				{
					City = item.city_id != null ? new City { CityId = item.city_id, CityName = item.city_name, StateId = item.state_id } : null,
					State = item.state_id != null ? new State { StateId = item.state_id, StateName = item.state_name, CountryId = item.country_id } : null,
					Country = item.country_id = new Country { CountryId = item.country_id, CountryName = item.country_name }
				};
				locations.Add(location);
			}
			return locations;
		}
	}
}
