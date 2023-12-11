CREATE TABLE industries (
	industry_id SERIAL PRIMARY KEY,
	industry_name VARCHAR(255) NOT NULL
);

INSERT INTO industries
(industry_name)
VALUES
('Technology'),
('Social Media'),
('E-Commerce'),
('Finance'),
('Retail'),
('Food & Beverage'),
('Entertainment'),
('Other');
