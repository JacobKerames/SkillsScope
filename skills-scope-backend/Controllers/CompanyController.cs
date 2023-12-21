using Microsoft.AspNetCore.Mvc;
using skills_scope_backend.Repositories;

namespace skills_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CompanyController(ICompanyRepository companyRepository) : ControllerBase
{
    private readonly ICompanyRepository _companyRepository = companyRepository;

    [HttpGet("all-companies")]
    public async Task<IActionResult> SearchCompanies()
    {
        var companies = await _companyRepository.GetAllCompaniesAsync();
        return Ok(companies);
    }

    [HttpGet("companies")]
    public async Task<IActionResult> SearchCompanies([FromQuery] string query = "")
    {
        var companies = await _companyRepository.GetFilteredCompaniesAsync(query);
        return Ok(companies);
    }
}
