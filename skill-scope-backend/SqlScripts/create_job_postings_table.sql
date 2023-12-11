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
	job_level job_level
);
CREATE INDEX fts_job_title ON job_postings USING GIN (to_tsvector('english', title));

INSERT INTO job_postings 
(title, company_id, city_id, state_id, country_id, posted_date, salary_low, salary_high, currency, commute, employment_type, job_level)
VALUES 
('Software Engineer', 1, 'New York', 1, 1, '2021-01-01', 60000, 80000, 'USD', 'on_site', 'full_time', 'mid_level'),
('Marketing Manager', 2, 'San Francisco', 2, 1, '2021-02-01', 50000, 70000, 'USD', 'remote', 'contract', 'senior_level'),
('Data Analyst', 3, 'Austin', 3, 1, '2021-03-01', 55000, 75000, 'USD', 'hybrid', 'part_time', 'entry_level'),
('Product Manager', 4, 'Seattle', 4, 1, '2021-04-01', 65000, 85000, 'USD', 'remote', 'full_time', 'mid_level'),
('Software Engineer', 5, 'San Jose', 5, 1, '2021-05-01', 70000, 90000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 6, 'Los Angeles', 6, 1, '2021-06-01', 75000, 95000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 7, 'San Diego', 7, 1, '2021-07-01', 80000, 100000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 8, 'Chicago', 8, 1, '2021-08-01', 85000, 105000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 9, 'Houston', 9, 1, '2021-09-01', 90000, 110000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 10, 'Philadelphia', 10, 1, '2021-10-01', 95000, 115000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 11, 'Phoenix', 11, 1, '2021-11-01', 100000, 120000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 12, 'San Antonio', 12, 1, '2021-12-01', 105000, 125000, 'USD', 'on_site', 'full_time', 'senior_level'),
('Software Engineer', 13, 'Dallas', 13, 1, '2022-01-01', 110000, 130000, 'USD', 'on_site', 'full_time', 'senior_level');
