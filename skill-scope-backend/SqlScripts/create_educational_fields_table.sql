CREATE TABLE educational_fields (
	educational_field_id SERIAL PRIMARY KEY,
	educational_field VARCHAR(255) NOT NULL
);
CREATE INDEX fts_educational_field ON educational_fields USING GIN (to_tsvector('english', educational_field));
