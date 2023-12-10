CREATE TABLE skills (
	skill_id SERIAL PRIMARY KEY,
	skill_name VARCHAR(255) NOT NULL
);
CREATE INDEX fts_skill_name ON skills USING GIN (to_tsvector('english', skill_name));
