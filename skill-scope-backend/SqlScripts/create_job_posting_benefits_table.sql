CREATE TABLE job_posting_benefits (
    job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
    benefit_id INT NOT NULL REFERENCES benefits(benefit_id),
    PRIMARY KEY (job_posting_id, benefit_id)
);

INSERT INTO job_posting_benefits
(job_posting_id, benefit_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8);
