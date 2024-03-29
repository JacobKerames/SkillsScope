CREATE TABLE skill_qualifications (
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	skill_id INT NOT NULL REFERENCES skills(skill_id),
	PRIMARY KEY (job_posting_id, skill_id)
);

INSERT INTO skill_qualifications
(job_posting_id, skill_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 2),
(2, 3),
(3, 1),
(3, 4),
(4, 3),
(4, 4),
(5, 5),
(5, 6),
(6, 7),
(6, 8),
(7, 9),
(7, 10),
(8, 11),
(8, 12),
(9, 13),
(9, 14),
(10, 15),
(10, 16),
(11, 17),
(11, 18),
(12, 19),
(12, 20);
