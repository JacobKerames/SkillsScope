using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetFilteredLocationsAsync(string query);
        Task<IEnumerable<Location>> GetAllLocationsAsync();
    }
}
