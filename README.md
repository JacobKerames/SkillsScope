# SkillsScope

## Description
A web application designed to help users identify the most in-demand skills, education, and experience requirements for various job titles. This project leverages a mix of modern technologies including Next.js, React, TypeScript, .NET, Python, and PostgreSQL. It scrapes job postings from Indeed, processes the data, and presents insights through a dynamic, user-friendly interface.

## Features
`Job Market Trend Analysis:` Allows users to search for job titles and discover trending skills, educational qualifications, and experience levels.

`Customizable Filters:` Users can filter results based on recency, company, location, and job level.

`Dynamic SQL Queries:` Backend built with .NET, dynamically generating SQL queries to fetch data from PostgreSQL.

`Ethical Data Scraping:` Python/Scrapy web scraper collects data from Indeed while adhering to ethical scraping practices.

`Machine Learning Integration (Planned):` Future enhancements to include ML algorithms for standardized data extraction from varied job posting formats.

## Technologies Used
`Frontend:` Next.js, React, TypeScript

`Backend:` .NET Web API

`Data Scraping:` Python, Scrapy

`Database:` PostgreSQL

`Deployment:` Azure Static Web Apps (Frontend), Azure App Service (Backend), Azure Database for PostgreSQL Flexible Server (Database)

## Getting Started
Frontend:
1. Navigate to the frontend directory: `cd skills-scope`
2. Install and update the dependencies: `npm install` and `npm update`
3. Start the local development server: `npm run dev`

Backend:
1. Navigate to the backend directory from the root: `cd skills-scope-backend`
2. Check .NET 8.0 SDK installation: `dotnet --version`
    - If not, [Download .NET SDK](https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)
3. Compile the API and install the dependencies: `dotnet build`
4. Start the backend server: `dotnet run`

Web Scraper:
1. Navigate to the web scraper from the root: `cd skills-scope-data/job_listing_scraper`
2. Check Python 3.8+ installation: `python --version`
    - If not, [Download Python](https://www.python.org/downloads/)
3. Create a virtual environment: `python -m venv venv`
    - This helps to manage dependencies separately for the project
4. Activate the virtual environment:
    - Windows: `.\venv\Scripts\activate`
    - macOS: `source venv/bin/activate`
5. Install Scrapy: `pip install scrapy`
6. Run a scraper: `scrapy crawl [spider_name]`

Database:
1. [Install PostgreSQL](https://www.postgresql.org/download/)
2. Create a local database
3. Update the connection string in `appsettings.Development.json` to match your local database settings.
4. Run the SQL scripts provided in `skills-scope-backend/Data/SqlScripts` using PostgreSQL command line or a database management tool.

## Troubleshooting Common Issues
Errors related to `npm` or `webpack` can typically be resolved with the following steps:
1. Delete the `node_modules` folder by running `rm -rf node_modules`.
2. Delete the `package-lock.json` file by running `rm -f package-lock.json`.
3. Clean the npm cache by running `npm cache clean --force`.
4. Clean the Next.js cache `rm -rf .next/cache`.
5. Reinstall all packages by running `npm install`.

<sup><sub>
&copy; 2024 Jacob Kerames<br>
</sub></sup>
