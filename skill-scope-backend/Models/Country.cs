namespace skill_scope_backend.Models;
public class Country
{
    public int CountryId { get; set; }
    public required string CountryName { get; set; }
    public string? CountryAlpha2Code { get; set; }
    public string? CountryAlpha3Code { get; set; }
}
