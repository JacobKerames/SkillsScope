using Microsoft.AspNetCore.Mvc;

namespace skill_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController : ControllerBase
{
    [HttpPost("perform")]
    public IActionResult Post([FromBody] SearchData data)
    {
        return Ok(new { message = "Search functionality not yet implemented" });
    }
}

public class SearchData
{
    public string? Query { get; set; }
    // Other properties
}
