namespace skill_scope_backend.Models;
public class Company
{
    public int CompanyId { get; set; }
    public string CompanyName { get; set; }
    public int? IndustryId { get; set; }
    public string? CompanyLogo { get; set; }
    public CompanySize? CompanySize { get; set; }
}

public enum CompanySize
{
    Startup, Medium, Large, Enterprise
}
