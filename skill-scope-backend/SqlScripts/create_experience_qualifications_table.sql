CREATE TABLE experience_qualifications (
	experience_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	years_experience INT NOT NULL,
	experience_description TEXT NOT NULL
);

INSERT INTO experience_qualifications
(job_posting_id, years_experience, experience_description)
VALUES
(1, 1, '1 year of experience in software engineering'),
(1, 2, '2 years of experience in software engineering'),
(1, 3, '3 years of experience in software engineering'),
(1, 4, '4 years of experience in software engineering'),
(1, 5, '5 years of experience in software engineering'),
(1, 6, '6 years of experience in software engineering'),
(1, 7, '7 years of experience in software engineering'),
(1, 8, '8 years of experience in software engineering'),
(1, 9, '9 years of experience in software engineering'),
(1, 10, '10 years of experience in software engineering'),
(2, 1, '1 year of experience in software engineering'),
(2, 2, '2 years of experience in software engineering'),
(2, 3, '3 years of experience in software engineering'),
(2, 4, '4 years of experience in software engineering'),
(2, 5, '5 years of experience in software engineering'),
(2, 6, '6 years of experience in software engineering'),
(2, 7, '7 years of experience in software engineering'),
(2, 8, '8 years of experience in software engineering'),
(2, 9, '9 years of experience in software engineering'),
(2, 10, '10 years of experience in software engineering'),
(3, 1, '1 year of experience in software engineering'),
(3, 2, '2 years of experience in software engineering'),
(3, 3, '3 years of experience in software engineering'),
(3, 4, '4 years of experience in software engineering'),
(3, 5, '5 years of experience in software engineering'),
(3, 6, '6 years of experience in software engineering'),
(3, 7, '7 years of experience in software engineering'),
(3, 8, '8 years of experience in software engineering'),
(3, 9, '9 years of experience in software engineering'),
(3, 10, '10 years of experience in software engineering'),
(4, 1, '1 year of experience in software engineering'),
(4, 2, '2 years of experience in software engineering'),
(4, 3, '3 years of experience in software engineering');
