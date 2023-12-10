namespace skill_scope_backend.Models;
public class JobPosting
{
    public int JobPostingId { get; set; }
    public string Title { get; set; }
    public int CompanyId { get; set; }
    public string? CityId { get; set; }
    public int? StateId { get; set; }
    public int CountryId { get; set; }
    public DateTime PostedDate { get; set; }
    public int? SalaryLow { get; set; }
    public int? SalaryHigh { get; set; }
    public string? Currency { get; set; }
    public CommuteType Commute { get; set; }
    public EmploymentType EmploymentType { get; set; }
    public JobLevel Level { get; set; }
}

public enum CommuteType
{
    OnSite, Hybrid, Remote
}

public enum EmploymentType
{
    FullTime, PartTime, Contract, Temporary, Volunteer, Internship
}

public enum JobLevel
{
    Internship, EntryLevel, Associate, MidLevel, SeniorLevel, Director, Executive
}
