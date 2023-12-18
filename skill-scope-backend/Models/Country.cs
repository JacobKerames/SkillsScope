namespace skill_scope_backend.Models;
public class Country
{
    public int CountryId { get; set; }
    public required string CountryName { get; set; }
    public required string Iso3 { get; set; }
    public required string Iso2 { get; set; }
}
