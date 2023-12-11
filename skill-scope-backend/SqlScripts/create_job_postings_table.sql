CREATE TABLE job_postings (
	job_posting_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	company_id INT NOT NULL REFERENCES companies(company_id),
	city_id VARCHAR(255),
	state_id INT REFERENCES states(state_id),
	country_id INT NOT NULL REFERENCES countries(country_id),
	posted_date DATE NOT NULL
);
CREATE INDEX fts_job_title ON job_postings USING GIN (to_tsvector('english', title));

INSERT INTO job_postings
(title, company_id, city_id, state_id, country_id, posted_date)
VALUES
