CREATE TYPE education_level AS ENUM ('none', 'high_school', 'vocational', 'associate', 'bachelors', 'masters', 'doctorate', 'professional');
CREATE TABLE educational_qualifications (
	educational_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	education_level education_level NOT NULL,
	educational_field_id INT NOT NULL REFERENCES educational_fields(educational_field_id)
);
