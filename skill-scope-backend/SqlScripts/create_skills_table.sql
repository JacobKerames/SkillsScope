CREATE TABLE skills (
	skill_id SERIAL PRIMARY KEY,
	skill_name VARCHAR(255) NOT NULL
);
CREATE INDEX fts_skill_name ON skills USING GIN (to_tsvector('english', skill_name));

INSERT INTO skills
(skill_name)
VALUES
('Python'),
('Java'),
('JavaScript'),
('C#'),
('C++'),
('PHP'),
('SQL'),
('TypeScript'),
('C'),
('Ruby'),
('Go'),
('Swift'),
('Kotlin'),
('R'),
('VBA'),
('Objective-C'),
('Scala'),
('Rust'),
('Dart'),
('Elixir'),
('Clojure'),
('Haskell'),
('Julia'),
('Perl'),
('Groovy'),
('Lua'),
('Erlang'),
('Fortran'),
('Assembly'),
('MATLAB'),
('PL/SQL'),
('Visual Basic');
