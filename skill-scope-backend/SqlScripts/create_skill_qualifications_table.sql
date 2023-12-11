CREATE TABLE skill_qualifications (
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT NOT NULL REFERENCES skills(skill_id),
	PRIMARY KEY (job_posting_id, skill_id)
);

INSERT INTO skills_qualifications
(job_posting_id, skill_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4);
