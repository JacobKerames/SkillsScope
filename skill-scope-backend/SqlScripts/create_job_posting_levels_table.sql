CREATE TABLE job_posting_levels (
    job_posting_id INT NOT NULL REFERENCES job_postings(job_posting_id),
    level_id INT NOT NULL REFERENCES job_levels(level_id),
    PRIMARY KEY (job_posting_id, level_id)
);
