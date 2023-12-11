CREATE TABLE job_postings (
	job_posting_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	company_id INT NOT NULL REFERENCES companies(company_id),
	city_id INT REFERENCES cities(city_id),
	state_id INT REFERENCES states(state_id),
	country_id INT NOT NULL REFERENCES countries(country_id),
	posted_date DATE NOT NULL
);
CREATE INDEX fts_job_title ON job_postings USING GIN (to_tsvector('english', title));

INSERT INTO job_postings
(title, company_id, city_id, state_id, country_id, posted_date)
VALUES
('Software Engineer', 1, 1, 5, 185, '2023-09-01'),
('Marketing Specialist', 2, 2, 3, 185, '2023-08-15'),
('Data Analyst', 3, 3, 2, 185, '2023-10-10'),
('Project Manager', 1, 4, 4, 185, '2023-07-20');
