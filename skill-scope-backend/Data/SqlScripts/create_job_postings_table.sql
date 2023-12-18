CREATE TABLE job_postings (
	job_posting_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	company_id INT NOT NULL REFERENCES companies(company_id),
	city_id INT REFERENCES cities(city_id),
	state_id INT REFERENCES states(state_id),
	country_id INT NOT NULL REFERENCES countries(country_id),
	posted_date DATE NOT NULL
);
CREATE INDEX fts_job_title ON job_postings USING GIN (to_tsvector('english', title));

INSERT INTO job_postings 
(title, company_id, city_id, state_id, country_id, posted_date)
VALUES 
('Software Engineer', 1, 125809, 1416, 233, '2019-05-20'),
('Software Engineer', 2, 125809, 1416, 233, '2020-06-15'),
('Software Engineer', 1, 125809, 1416, 233, '2021-07-10'),
('Software Engineer', 2, 125809, 1416, 233, '2022-08-05'),
('Software Engineer', 3, 125809, 1416, 233, '2023-04-01'),
('Data Analyst', 1, 115253, 1450, 233, '2019-09-12'),
('Data Analyst', 2, 115253, 1450, 233, '2020-10-17'),
('Data Analyst', 1, 115253, 1450, 233, '2021-11-22'),
('Data Analyst', 2, 115253, 1450, 233, '2022-01-27'),
('Data Analyst', 3, 115253, 1450, 233, '2023-02-02'),
('Marketing Specialist', 1, 122795, 1452, 233, '2018-07-15'),
('Marketing Specialist', 2, 122795, 1452, 233, '2019-06-20'),
('Marketing Specialist', 1, 122795, 1452, 233, '2020-05-25'),
('Marketing Specialist', 2, 122795, 1452, 233, '2021-04-30'),
('Marketing Specialist', 3, 122795, 1452, 233, '2022-04-04'),
('UI/UX Designer', 1, 126104, 1462, 233, '2018-04-18'),
('UI/UX Designer', 2, 126104, 1462, 233, '2019-03-23'),
('UI/UX Designer', 1, 126104, 1462, 233, '2020-02-27'),
('UI/UX Designer', 2, 126104, 1462, 233, '2021-01-31'),
('UI/UX Designer', 3, 126104, 1462, 233, '2022-01-05');
