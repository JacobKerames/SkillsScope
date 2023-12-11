using Microsoft.AspNetCore.Mvc;
using skill_scope_backend.Repositories;

namespace skill_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController(IJobPostingRepository jobPostingRepository) : ControllerBase
{
    private readonly IJobPostingRepository _jobPostingRepository = jobPostingRepository;

    [HttpGet("perform/{keyword}")]
    public async Task<IActionResult> Get(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var skills = await _jobPostingRepository.GetTitleSkillDesireAsync(keyword);
        return Ok(skills);
    }
}
