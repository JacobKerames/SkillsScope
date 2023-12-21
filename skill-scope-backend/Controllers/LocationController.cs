using Microsoft.AspNetCore.Mvc;
using skill_scope_backend.Repositories;

namespace skill_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class LocationController(ILocationRepository locationRepository) : ControllerBase
{
    private readonly ILocationRepository _locationRepository = locationRepository;

    [HttpGet("all-locations")]
    public async Task<IActionResult> SearchAllLocations()
    {
        var locations = await _locationRepository.GetAllLocationsAsync();
        return Ok(locations);
    }

    [HttpGet("locations")]
    public async Task<IActionResult> SearchLocations([FromQuery] string query)
    {
        var locations = await _locationRepository.GetFilteredLocationsAsync(query);
        return Ok(locations);
    }
}
