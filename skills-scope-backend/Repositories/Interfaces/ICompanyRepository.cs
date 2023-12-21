using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
    public interface ICompanyRepository
    {
        Task<Company?> GetByIdAsync(int companyId);
        Task<IEnumerable<Company>> GetFilteredCompaniesAsync(string query);
        Task<IEnumerable<Company>> GetAllCompaniesAsync();
        Task<int> AddAsync(Company company);
        Task UpdateAsync(Company company);
        Task DeleteAsync(int companyId);
    }
}
