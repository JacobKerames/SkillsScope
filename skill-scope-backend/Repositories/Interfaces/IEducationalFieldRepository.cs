using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface IEducationalFieldRepository
    {
        Task<EducationalField?> GetByIdAsync(int educationalFieldId);
        Task<IEnumerable<EducationalField>> GetAllAsync();
        Task<int> AddAsync(EducationalField educationalField);
        Task UpdateAsync(EducationalField educationalField);
        Task DeleteAsync(int educationalFieldId);
    }
}
