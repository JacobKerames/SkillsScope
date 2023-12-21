namespace skills_scope_backend.Models;
public class Country
{
    public int CountryId { get; set; }
    public required string CountryName { get; set; }
    public string? Iso3 { get; set; }
    public string? Iso2 { get; set; }
}
