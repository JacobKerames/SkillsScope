namespace skill_scope_backend.Models;
public class SkillSearchDTO
{
    public required string Keyword { get; set; }
    public string? TimeFrame { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Company { get; set; }
    public string? Location { get; set; }
    public string? Level { get; set; }
}
