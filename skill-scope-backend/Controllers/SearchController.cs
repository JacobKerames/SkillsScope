using Microsoft.AspNetCore.Mvc;
using skill_scope_backend.Repositories;

namespace skill_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController(IJobPostingRepository jobPostingRepository) : ControllerBase
{
    private readonly IJobPostingRepository _jobPostingRepository = jobPostingRepository;

    [HttpGet("skills/{keyword}")]
    public async Task<IActionResult> GetSkills(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var skills = await _jobPostingRepository.GetTitleSkillDesireAsync(keyword);
        return Ok(skills);
    }

    [HttpGet("education/{keyword}")]
    public async Task<IActionResult> GetEducation(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var educationStats = await _jobPostingRepository.GetTitleEducationDesireAsync(keyword);
        return Ok(educationStats);
    }
}
