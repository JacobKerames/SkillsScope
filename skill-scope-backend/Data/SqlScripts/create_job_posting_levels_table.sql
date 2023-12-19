CREATE TABLE job_posting_levels (
    job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
    level_id INT NOT NULL REFERENCES job_levels(level_id),
    PRIMARY KEY (job_posting_id, level_id)
);

INSERT INTO job_posting_levels
(job_posting_id, level_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5),
(11, 1),
(12, 2),
(13, 3),
(14, 4),
(15, 5),
(16, 1),
(17, 2),
(18, 3),
(19, 4),
(20, 5);
