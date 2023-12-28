import scrapy


class JobListingSpiderSpider(scrapy.Spider):
    name = "job_listing_spider"
    allowed_domains = ["indeed.com"]
    start_urls = ["https://indeed.com"]

    def parse(self, response):
        pass
