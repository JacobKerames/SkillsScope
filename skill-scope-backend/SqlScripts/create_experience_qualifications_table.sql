CREATE TABLE experience_qualifications (
	experience_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	years_experience INT NOT NULL,
	experience_description TEXT NOT NULL
);
