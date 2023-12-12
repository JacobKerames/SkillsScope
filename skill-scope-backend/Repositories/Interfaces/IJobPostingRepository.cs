using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public interface IJobPostingRepository
    {
        Task<IEnumerable<SkillDTO>> GetTitleSkillDesireAsync(string keyword);
        Task<IEnumerable<EducationDTO>> GetTitleEducationDesireAsync(string keyword);
        Task<IEnumerable<ExperienceDTO>> GetTitleExperienceDesireAsync(string keyword);
        Task<int> AddAsync(JobPosting jobPosting);
    }
}
