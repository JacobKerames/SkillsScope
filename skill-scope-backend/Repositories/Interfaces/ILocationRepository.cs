using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetAllLocationsAsync();
    }
}
