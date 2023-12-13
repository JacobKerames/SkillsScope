CREATE TYPE education_level AS ENUM ('none', 'no_high_school', 'high_school', 'certificate', 'bootcamp', 'some_college', 'associates', 'bachelors', 'masters', 'doctorate', 'professional');
CREATE TABLE educational_qualifications (
	educational_qualification_id SERIAL PRIMARY KEY,
	job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
	education_level education_level NOT NULL,
	educational_field_id INT NOT NULL REFERENCES educational_fields(educational_field_id)
);

INSERT INTO educational_qualifications
(job_posting_id, education_level, educational_field_id)
VALUES
(1, 'bachelors', 1),
(1, 'bachelors', 2),
(1, 'bachelors', 3),
(1, 'bachelors', 4),
(1, 'bachelors', 5),
(1, 'bachelors', 6),
(1, 'bachelors', 7),
(1, 'bachelors', 8),
(1, 'bachelors', 9),
(1, 'bachelors', 10),
(2, 'bachelors', 1),
(2, 'bachelors', 2),
(2, 'bachelors', 3),
(2, 'bachelors', 4),
(2, 'bachelors', 5),
(2, 'bachelors', 6),
(2, 'bachelors', 7),
(2, 'bachelors', 8),
(2, 'bachelors', 9),
(2, 'bachelors', 10),
(3, 'bachelors', 1),
(3, 'bachelors', 2),
(3, 'bachelors', 3),
(3, 'bachelors', 4),
(3, 'bachelors', 5),
(3, 'bachelors', 6),
(3, 'bachelors', 7),
(3, 'bachelors', 8),
(3, 'bachelors', 9),
(3, 'bachelors', 10),
(4, 'bachelors', 1),
(4, 'bachelors', 2),
(4, 'bachelors', 3),
(4, 'bachelors', 4),
(4, 'bachelors', 5),
(4, 'bachelors', 6),
(4, 'bachelors', 7),
(4, 'bachelors', 8),
(4, 'bachelors', 9),
(4, 'bachelors', 10);
