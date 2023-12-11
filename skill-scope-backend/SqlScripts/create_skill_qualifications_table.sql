CREATE TABLE skill_qualifications (
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT NOT NULL REFERENCES skills(skill_id),
	PRIMARY KEY (job_posting_id, skill_id)
);

INSERT INTO skills_qualifications
(job_posting_id, skill_id)
VALUES
