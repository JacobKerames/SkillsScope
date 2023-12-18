CREATE TABLE cities ( 
	city_id INT NOT NULL PRIMARY KEY,
	state_id INT NOT NULL REFERENCES states(state_id),
	city_name VARCHAR(255) NOT NULL
);
CREATE INDEX fts_city_name ON cities USING GIN (to_tsvector('english', city_name));
