using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface ICompanyRepository
    {
        Task<Company?> GetByIdAsync(int companyId);
        Task<IEnumerable<Company>> GetAllAsync();
        Task<int> AddAsync(Company company);
        Task UpdateAsync(Company company);
        Task DeleteAsync(int companyId);
    }
}
