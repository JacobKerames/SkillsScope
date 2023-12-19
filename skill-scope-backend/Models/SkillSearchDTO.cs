namespace skill_scope_backend.Models;
public class SkillSearchDTO
{
    public required string Keyword { get; set; }
    public string? TimeFrame { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? CompanyId { get; set; }
    public int? CityId { get; set; }
    public int? StateId { get; set; }
    public int? CountryId { get; set; }
    public string? Level { get; set; }
}
