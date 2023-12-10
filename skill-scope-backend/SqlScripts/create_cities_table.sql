CREATE TABLE cities ( 
	city_id SERIAL PRIMARY KEY,
	city_name VARCHAR(255) NOT NULL,
	state_id INT NOT NULL REFERENCES states(state_id)
);
