import ijson
import json

def clean_data(input_file_path, output_file_path):
    with open(input_file_path, 'r', encoding='utf-8') as file:
        # Use ijson to iteratively parse the JSON file
        countries = ijson.items(file, 'item')

        # Open the output file
        with open(output_file_path, 'w', encoding='utf-8') as outfile:
            # Start JSON array
            outfile.write('[')

            first_country = True
            for country in countries:
                if not first_country:
                    outfile.write(',')
                first_country = False

                # Remove unnecessary fields
                for field in [
                    "numeric_code", "phone_code", "capital", "currency", "currency_name",
                    "currency_symbol", "tld", "native", "region", "region_id", "subregion",
                    "subregion_id", "nationality", "timezones", "translations", "latitude",
                    "longitude", "emoji", "emojiU"]:
                    country.pop(field, None)

                if "states" in country:
                    for state in country["states"]:
                        for field in ["type", "latitude", "longitude"]:
                            state.pop(field, None)

                        if "cities" in state:
                            for city in state["cities"]:
                                for field in ["latitude", "longitude"]:
                                    city.pop(field, None)

                # Write the cleaned country data to the file
                json.dump(country, outfile, indent=4, ensure_ascii=False)

            # End JSON array
            outfile.write(']')

input_file_path = 'locations.json'
output_file_path = 'locations_cleaned.json'
clean_data(input_file_path, output_file_path)
