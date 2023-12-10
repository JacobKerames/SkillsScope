namespace skill_scope_backend.Models;
public class Benefit
{
    public int BenefitId { get; set; }
    public int JobPostingId { get; set; }
    public string BenefitName { get; set; }
}