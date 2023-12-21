using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories.Interfaces
{
    public interface IJobPostingLevelRepository
    {
        Task<IEnumerable<JobPostingLevel>> GetByJobPostingIdAsync(int jobPostingId);
        Task<IEnumerable<JobPostingLevel>> GetByJobLevelIdAsync(int jobLevelId);
        Task AddAsync(JobPostingLevel jobPostingLevel);
        Task DeleteAsync(int jobPostingId, int jobLevelId);
    }
}
