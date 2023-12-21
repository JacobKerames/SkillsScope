CREATE TABLE countries (
	country_id INT NOT NULL PRIMARY KEY,
	country_name VARCHAR(100) NOT NULL,
	iso3 CHAR(3),
	iso2 CHAR(2)
);
CREATE INDEX fts_country_name ON countries USING GIN (to_tsvector('english', country_name));
