namespace skill_scope_backend.Models;
public class ExperienceQualification
{
    public int ExperienceQualificationId { get; set; }
    public int JobPostingId { get; set; }
    public int? SkillId { get; set; }
    public int YearsExperience { get; set; }
    public required string ExperienceReference { get; set; }
    public ExperienceType ExperienceType { get; set; }
}

public enum ExperienceType
{
    JobTitle, Skill
}
