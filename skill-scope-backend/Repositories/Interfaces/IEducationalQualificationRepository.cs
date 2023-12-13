using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface IEducationalQualificationRepository
    {
        Task<EducationalQualification?> GetByIdAsync(int educationalQualificationId);
        Task<IEnumerable<EducationalQualification>> GetAllAsync();
        Task<int> AddAsync(EducationalQualification educationalQualification);
        Task UpdateAsync(EducationalQualification educationalQualification);
        Task DeleteAsync(int educationalQualificationId);
    }
}
