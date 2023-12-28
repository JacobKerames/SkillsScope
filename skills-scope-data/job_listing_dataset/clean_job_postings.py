import json

def process_json_object(obj):
    if obj is None:
        return None
    
    try:
        # Extract fields and check if they are not None
        title = obj.get('json', {}).get('schemaOrg', {}).get('title')
        company_name = obj.get('json', {}).get('schemaOrg', {}).get('hiringOrganization', {}).get('name')
        date_posted = obj.get('json', {}).get('schemaOrg', {}).get('datePosted')
        address = obj.get('json', {}).get('schemaOrg', {}).get('jobLocation', {}).get('address', {})
        city = address.get('addressLocality')
        state = address.get('addressRegion')
        country_data = address.get('addressCountry')
        logo_url = obj.get('json', {}).get('schemaOrg', {}).get('hiringOrganization', {}).get('logo')
        description = obj.get('text')

        if isinstance(country_data, dict):
            country = country_data.get('name')
        else:
            country = country_data

        # Check if any required field is None
        if not all([title, company_name, date_posted, city, state, country]):
            return None

        return {
            'title': title,
            'company_name': company_name,
            'date_posted': date_posted,
            'city': city,
            'state': state,
            'country': country,
            'logo_url': logo_url,
            'description': description,
        }
    except AttributeError as e:
        return None

def process_large_json(file_path, output_file_path):
    with open(file_path, 'rb') as file:
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            for line in file:
                try:
                    obj = json.loads(line)
                    cleaned_record = process_json_object(obj)
                    if cleaned_record is not None:
                        output_file.write(json.dumps(cleaned_record) + '\n')
                except json.JSONDecodeError as e:
                    print(f"Error processing line: {e}")
                    continue

# Replace with your actual file paths
process_large_json('techmap-jobs-dump-2021-09.json', 'processed_job_postings.json')
