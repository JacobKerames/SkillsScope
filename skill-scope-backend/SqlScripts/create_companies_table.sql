CREATE TYPE company_size AS ENUM ('startup', 'medium', 'large', 'enterprise');
CREATE TABLE companies (
	company_id SERIAL PRIMARY KEY,
	company_name VARCHAR(255) NOT NULL,
	industry_id INT REFERENCES industries(industry_id),
	company_logo TEXT,
	company_size company_size
);
CREATE INDEX fts_company_name ON companies USING GIN (to_tsvector('english', company_name));
