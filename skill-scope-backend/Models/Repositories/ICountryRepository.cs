using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public interface ICountryRepository
    {
        Task<Country?> GetByIdAsync(int countryId);
        Task<IEnumerable<Country>> GetAllAsync();
        Task<int> AddAsync(Country country);
        Task UpdateAsync(Country country);
        Task DeleteAsync(int countryId);
    }
}
