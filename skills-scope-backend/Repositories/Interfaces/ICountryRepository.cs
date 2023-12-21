using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories.Interfaces
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
