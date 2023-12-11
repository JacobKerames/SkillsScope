using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories
{
    public interface IJobPostingRepository
    {
        Task<JobPosting?> GetByIdAsync(int jobPostingId);
        Task<IEnumerable<JobPosting>> GetAllAsync();
        Task<int> AddAsync(JobPosting jobPosting);
        Task UpdateAsync(JobPosting jobPosting);
        Task DeleteAsync(int jobPostingId);
    }
}
