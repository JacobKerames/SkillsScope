using skills_scope_backend.Models;

namespace skills_scope_backend.Repositories.Interfaces
{
    public interface IStateRepository
    {
        Task<State?> GetByIdAsync(int stateId);
        Task<IEnumerable<State>> GetAllAsync();
        Task<int> AddAsync(State state);
        Task UpdateAsync(State state);
        Task DeleteAsync(int stateId);
    }
}
