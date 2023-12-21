using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
    public interface ICityRepository
    {
        Task<City?> GetByIdAsync(int cityId);
        Task<IEnumerable<City>> GetAllAsync();
        Task AddAsync(City city);
        Task UpdateAsync(City city);
        Task DeleteAsync(int cityId);
    }
}
