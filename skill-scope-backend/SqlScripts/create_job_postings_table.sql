CREATE TYPE commute_type AS ENUM ('on_site', 'hybrid', 'remote');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'temporary', 'volunteer', 'internship');
CREATE TYPE job_level AS ENUM ('internship', 'entry_level', 'associate', 'mid_level', 'senior_level', 'director', 'executive');
CREATE TABLE job_postings (
	job_posting_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	company_id INT NOT NULL REFERENCES companies(company_id),
	city_id VARCHAR(255),
	state_id INT REFERENCES states(state_id),
	country_id INT NOT NULL REFERENCES countries(country_id),
	posted_date DATE NOT NULL,
	salary_low INT,
	salary_high INT,
	currency VARCHAR(3),
	commute commute_type NOT NULL DEFAULT 'on_site',
	employment_type employment_type NOT NULL DEFAULT 'full_time',
	level job_level
);
CREATE INDEX fts_job_title ON job_postings USING GIN (to_tsvector('english', title));
