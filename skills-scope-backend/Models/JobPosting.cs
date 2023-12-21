namespace skills_scope_backend.Models;
public class JobPosting
{
    public int JobPostingId { get; set; }
    public required string Title { get; set; }
    public int CompanyId { get; set; }
    public string? CityId { get; set; }
    public int? StateId { get; set; }
    public int CountryId { get; set; }
    public DateTime PostedDate { get; set; }
}
