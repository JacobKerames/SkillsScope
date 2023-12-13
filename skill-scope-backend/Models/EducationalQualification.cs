namespace skill_scope_backend.Models;
public class EducationalQualification
{
    public int EducationalQualificationId { get; set; }
    public int JobPostingId { get; set; }
    public EducationLevel EducationLevel { get; set; }
    public int EducationalFieldId { get; set; }
}

public enum EducationLevel
{
    NoHighSchool, HighSchool, Certificate, SomeCollege, Associates, Bachelors, Masters, Doctorate, Professional
}
