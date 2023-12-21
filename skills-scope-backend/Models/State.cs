namespace skills_scope_backend.Models;
public class State
{
    public int StateId { get; set; }
    public required string StateName { get; set; }
    public string? StateCode { get; set; }
    public int CountryId { get; set; }
}
