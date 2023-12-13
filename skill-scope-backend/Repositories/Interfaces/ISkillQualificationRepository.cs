using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface ISkillQualificationRepository
    {
        Task<IEnumerable<SkillQualification>> GetByJobPostingIdAsync(int jobPostingId);
        Task<IEnumerable<SkillQualification>> GetBySkillIdAsync(int skillId);
        Task AddAsync(SkillQualification skillQualification);
        Task DeleteAsync(int jobPostingId, int skillId);
    }
}
