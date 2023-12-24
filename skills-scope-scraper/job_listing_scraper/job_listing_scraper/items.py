# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class JobListingItem(scrapy.Item):
    job_listing_id = scrapy.Field()
    title = scrapy.Field()
    company_name = scrapy.Field()
    city_name = scrapy.Field()
    state_name = scrapy.Field()
    country_name = scrapy.Field()
    posted_date = scrapy.Field()
    salary_lower_bound = scrapy.Field()
    salary_upper_bound = scrapy.Field()
    experience_level = scrapy.Field()

class CompanyItem(scrapy.Item):
    company_name = scrapy.Field()
    logo_url = scrapy.Field()
    industry = scrapy.Field()
    company_size_lower_bound = scrapy.Field()
    company_size_upper_bound = scrapy.Field()
    last_updated = scrapy.Field()

class EducationalQualificationItem(scrapy.Item):
    job_listing_id = scrapy.Field()
    education_level = scrapy.Field()
    educational_field_name = scrapy.Field()

class ExperienceQualificationItem(scrapy.Item):
    job_listing_id = scrapy.Field()
    years_experience = scrapy.Field()
    qualification = scrapy.Field()
    experience_type = scrapy.Field()
