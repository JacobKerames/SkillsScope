CREATE TABLE benefits (
	benefit_id SERIAL PRIMARY KEY,
	benefit_name VARCHAR(255) NOT NULL
);

INSERT INTO benefits
(benefit_name)
VALUES
('Health Insurance'),
('Dental Insurance'),
('Vision Insurance'),
('Life Insurance'),
('401(k)'),
('Paid Time Off'),
('Paid Sick Days'),
('Paid Holidays');
