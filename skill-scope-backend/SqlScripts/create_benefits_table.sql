CREATE TABLE benefits (
	benefit_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	benefit_name VARCHAR(255) NOT NULL
);
