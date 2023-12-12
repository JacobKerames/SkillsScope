CREATE TYPE experience_type AS ENUM ('job_title', 'skill');
CREATE TABLE experience_qualifications (
	experience_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT REFERENCES skills(skill_id),
	years_experience INT NOT NULL,
	experience_reference VARCHAR(50) NOT NULL,
	experience_type experience_type NOT NULL
);

INSERT INTO experience_qualifications
(job_posting_id, skill_id, years_experience, experience_reference, experience_type)
VALUES
(1, NULL, 2, 'Software Engineer', 'job_title'),
(2, 1, 2, 'Python', 'skill'),
(2, NULL, 2, 'Software Engineer', 'job_title'),
(3, 2, 3, 'Java', 'skill'),
(4, 5, 5, 'C++', 'skill');
