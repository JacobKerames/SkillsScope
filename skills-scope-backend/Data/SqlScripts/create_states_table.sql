CREATE TABLE states (
	state_id INT NOT NULL PRIMARY KEY,
	country_id INT NOT NULL REFERENCES countries(country_id),
	state_name VARCHAR(100) NOT NULL,
	state_code VARCHAR(10)
);
CREATE INDEX fts_state_name ON states USING GIN (to_tsvector('english', state_name));
