using Microsoft.AspNetCore.Mvc;
using skill_scope_backend.Repositories;

namespace skill_scope_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CompanyController(ICompanyRepository companyRepository) : ControllerBase
{
    private readonly ICompanyRepository _companyRepository = companyRepository;

    [HttpGet("companies")]
    public async Task<IActionResult> SearchCompanies()
    {
        var companies = await _companyRepository.GetAllCompaniesAsync();
        return Ok(companies);
    }
}
