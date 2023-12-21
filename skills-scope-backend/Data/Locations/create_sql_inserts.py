import json

def safe_sql_string(s):
    """Escape single quotes in a string for safe SQL insertion."""
    return s.replace("'", "''")

def generate_sql_inserts(json_file, output_countries, output_states, output_cities):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Countries SQL
    with open(output_countries, 'w', encoding='utf-8') as out_file:
        sql_countries = "INSERT INTO countries (country_id, country_name, iso3, iso2) VALUES "
        values_countries = [
            f"({country['id']}, '{safe_sql_string(country['name'])}', '{country['iso3']}', '{country['iso2']}')"
            for country in data
        ]
        sql_countries += ",\n".join(values_countries) + ";"
        out_file.write(sql_countries)

    # States and Cities SQL
    with open(output_states, 'w', encoding='utf-8') as states_file, \
         open(output_cities, 'w', encoding='utf-8') as cities_file:

        sql_states = "INSERT INTO states (state_id, country_id, state_name, state_code) VALUES "
        sql_cities = "INSERT INTO cities (city_id, state_id, city_name) VALUES "

        values_states = []
        values_cities = []

        for country in data:
            for state in country.get('states', []):
                values_states.append(f"({state['id']}, {country['id']}, '{safe_sql_string(state['name'])}', '{state.get('state_code', '')}')")

                for city in state.get('cities', []):
                    values_cities.append(f"({city['id']}, {state['id']}, '{safe_sql_string(city['name'])}')")

        sql_states += ",\n".join(values_states) + ";"
        sql_cities += ",\n".join(values_cities) + ";"

        states_file.write(sql_states)
        cities_file.write(sql_cities)

json_file = 'locations_cleaned.json'
output_countries = 'insert_countries.sql'
output_states = 'insert_states.sql'
output_cities = 'insert_cities.sql'
generate_sql_inserts(json_file, output_countries, output_states, output_cities)
