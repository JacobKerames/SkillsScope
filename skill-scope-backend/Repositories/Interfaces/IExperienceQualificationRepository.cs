using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface IExperienceQualificationRepository
    {
        Task<ExperienceQualification?> GetByIdAsync(int experienceQualificationId);
        Task<IEnumerable<ExperienceQualification>> GetAllAsync();
        Task<int> AddAsync(ExperienceQualification experienceQualification);
        Task UpdateAsync(ExperienceQualification experienceQualification);
        Task DeleteAsync(int experienceQualificationId);
    }
}
