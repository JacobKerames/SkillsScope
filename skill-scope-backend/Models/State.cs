namespace skill_scope_backend.Models;
public class State
{
    public int StateId { get; set; }
    public string StateName { get; set; }
    public string? StateAbbr { get; set; }
    public int CountryId { get; set; }
}
