CREATE TABLE job_levels (
    job_level_id SERIAL PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

INSERT INTO job_levels
(level_name)
VALUES
('Entry'),
('Junior'),
('Mid'),
('Senior'),
('Lead'),
('Principal'),
('Staff'),
('Manager'),
('Director'),
('VP');
