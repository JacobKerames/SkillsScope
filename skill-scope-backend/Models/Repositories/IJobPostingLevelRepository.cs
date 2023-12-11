using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public interface IJobPostingLevelRepository
    {
        Task<IEnumerable<JobPostingLevel>> GetByJobPostingIdAsync(int jobPostingId);
        Task<IEnumerable<JobPostingLevel>> GetByJobLevelIdAsync(int jobLevelId);
        Task AddAsync(JobPostingLevel jobPostingLevel);
        Task DeleteAsync(int jobPostingId, int jobLevelId);
    }
}
