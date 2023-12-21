using Microsoft.AspNetCore.Mvc;
using skills_scope_backend.Models;
using skills_scope_backend.Repositories;

namespace skills_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController(IJobPostingRepository jobPostingRepository) : ControllerBase
{
    private readonly IJobPostingRepository _jobPostingRepository = jobPostingRepository;

    [HttpGet("skills")]
    public async Task<IActionResult> GetSkills([FromQuery] SearchDTO parameters)
    {
        if (string.IsNullOrWhiteSpace(parameters.Keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var results = await _jobPostingRepository.GetTitleSkillDesireAsync(parameters);
        return Ok(results);
    }

    [HttpGet("education")]
    public async Task<IActionResult> GetEducation([FromQuery] SearchDTO parameters)
    {
        if (string.IsNullOrWhiteSpace(parameters.Keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var results = await _jobPostingRepository.GetTitleEducationDesireAsync(parameters);
        return Ok(results);
    }

    [HttpGet("experience")]
    public async Task<IActionResult> GetExperience([FromQuery] SearchDTO parameters)
    {
        if (string.IsNullOrWhiteSpace(parameters.Keyword))
        {
            return BadRequest("Search query cannot be empty.");
        }

        var results = await _jobPostingRepository.GetTitleExperienceDesireAsync(parameters);
        return Ok(results);
    }
}
