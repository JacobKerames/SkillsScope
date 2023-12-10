namespace skill_scope_backend.Models;
public class ExperienceQualification
{
    public int ExperienceQualificationId { get; set; }
    public int JobPostingId { get; set; }
    public int YearsExperience { get; set; }
    public string ExperienceDescription { get; set; }
}
