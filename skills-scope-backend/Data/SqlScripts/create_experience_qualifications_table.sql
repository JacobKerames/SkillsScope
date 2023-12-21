CREATE TYPE experience_type AS ENUM ('job_title', 'skill');
CREATE TABLE experience_qualifications (
	experience_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT REFERENCES skills(skill_id),
	years_experience INT NOT NULL,
	experience_reference VARCHAR(50),
	experience_type experience_type NOT NULL
);

INSERT INTO experience_qualifications
(job_posting_id, skill_id, years_experience, experience_reference, experience_type)
VALUES
(1, NULL, 2, 'Software Engineer', 'job_title'),
(2, 1, 2, NULL, 'skill'),
(2, NULL, 2, 'Software Engineer', 'job_title'),
(3, 2, 3, NULL, 'skill'),
(4, 5, 5, NULL, 'skill'),
(5, 3, 1, NULL, 'skill'),
(5, NULL, 3, 'Data Analyst', 'job_title'),
(6, 30, 4, NULL, 'skill'),
(6, NULL, 5, 'Marketing Specialist', 'job_title'),
(7, 1, 2, NULL, 'skill'),
(8, 2, 1, NULL, 'skill'),
(9, NULL, 4, 'UI/UX Designer', 'job_title'),
(10, 3, 2, NULL, 'skill'),
(11, 30, 3, NULL, 'skill'),
(12, NULL, 5, 'Software Engineer', 'job_title'),
(13, 1, 1, NULL, 'skill'),
(14, 2, 2, NULL, 'skill'),
(15, NULL, 3, 'Data Analyst', 'job_title'),
(16, 3, 4, NULL, 'skill'),
(17, NULL, 2, 'Marketing Specialist', 'job_title'),
(18, 30, 1, NULL, 'skill'),
(19, NULL, 3, 'UI/UX Designer', 'job_title'),
(20, 1, 2, NULL, 'skill');
