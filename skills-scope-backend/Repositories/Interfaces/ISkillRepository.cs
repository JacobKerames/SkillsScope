using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories.Interfaces
{
    public interface ISkillRepository
    {
        Task<Skill?> GetByIdAsync(int skillId);
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<int> AddAsync(Skill skill);
        Task UpdateAsync(Skill skill);
        Task DeleteAsync(int skillId);
    }
}
