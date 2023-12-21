using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories
{
    public interface IJobPostingRepository
    {
        Task<IEnumerable<ResultDTO>> GetTitleSkillDesireAsync(SearchDTO parameters);
        Task<IEnumerable<ResultDTO>> GetTitleEducationDesireAsync(SearchDTO parameters);
        Task<IEnumerable<ResultDTO>> GetTitleExperienceDesireAsync(SearchDTO parameters);
        Task<int> AddAsync(JobPosting jobPosting);
    }
}
