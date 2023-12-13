using skill_scope_backend.Models;

namespace skill_scope_backend.Repositories.Interfaces
{
    public interface IJobLevelRepository
    {
        Task<JobLevel?> GetByIdAsync(int jobLevelId);
        Task<IEnumerable<JobLevel>> GetAllAsync();
        Task<int> AddAsync(JobLevel jobLevel);
        Task UpdateAsync(JobLevel jobLevel);
        Task DeleteAsync(int jobLevelId);
    }
}
