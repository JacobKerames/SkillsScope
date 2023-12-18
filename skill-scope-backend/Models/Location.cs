namespace skill_scope_backend.Models;
public class Location
{
    public City? City { get; set; }
    public State? State { get; set; }
    public required Country Country { get; set; }

    public override string ToString()
    {
        var parts = new List<string>();

        if (City != null)
        {
            parts.Add(City.CityName);
        }

        if (State != null)
        {
            parts.Add(State.StateName);
        }

        parts.Add(Country.CountryName);

        return string.Join(", ", parts);
    }
}
