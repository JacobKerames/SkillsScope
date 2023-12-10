CREATE TABLE skills_qualifications (
	skills_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT NOT NULL REFERENCES skills(skill_id)
);
