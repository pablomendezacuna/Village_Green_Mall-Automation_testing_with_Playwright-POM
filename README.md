Mall Search Automation Tool
A professional automated testing suite built with Playwright and TypeScript to validate search functionality across multiple mall environments. It supports dynamic query testing via GitHub Actions and secure authentication handling.

Key Features
Multi-Environment Testing: Automatically iterates through different mall URLs defined in a JSON fixture.

Dynamic Queries: Supports testing via a local Queries.json file or manual inputs directly through the GitHub Actions UI.

Secure Authentication: Handles Basic Auth using environment variables locally and GitHub Secrets in CI/CD, preventing hardcoded credentials.

Automated Reporting: Generates detailed HTML reports with screenshots, traces, and videos for debugging failed tests.

CI/CD Integration: Fully optimized GitHub Actions workflow with dependency caching and parallel execution.

Tech Stack
Engine: Playwright

Language: TypeScript

Design Pattern: Page Object Model (POM)

CI/CD: GitHub Actions

Environment Mgmt: dotenv

Local Setup
1. Prerequisites
Node.js (v20 or higher)

npm (Node Package Manager)

2. Installation
Clone the repository and install the dependencies:
npm install

Install Playwright Browsers:
npx playwright install --with-deps

3. Environment Variables
Create a .env file in the root directory. Do not commit this file to Git.
MALL_HTTP_USER=your_username
MALL_HTTP_PASSWORD=your_password

Usage
Running Tests Locally
To run the tests using the default queries from fixtures/Queries.json:
npx playwright test --headed

To run the tests using manual queries from your terminal (PowerShell example):
$env:MANUAL_QUERIES="pants, shoes, shirt"; npx playwright test --headed

Running Tests on GitHub Actions
Go to the Actions tab in your GitHub repository.

Select the Playwright Tests workflow from the left sidebar.

Click the Run workflow dropdown button.

(Optional) Enter manual queries separated by commas in the input field (e.g., nike, adidas, shoes). Leave it blank to use the default JSON file.

Click the Run workflow button.

Project Structure
tests/ - Contains the main test specifications (e.g., SearchQuery.spec.ts).

pages/ - Page Object Model (POM) classes (Main_Page.ts, Plp.ts) for reusability.

fixtures/ - JSON data files for malls (MyMalls.json) and default queries (Queries.json).

.github/workflows/ - CI/CD pipeline configuration (playwright.yml).

playwright.config.ts - Global Playwright configuration (timeouts, workers, reporters).

Troubleshooting
Authentication Errors (401 Unauthorized): Ensure your .env file is properly set up locally, or that MALL_USERNAME and MALL_PASSWORD exist in your GitHub Secrets.

Browsers not launching: Run "npx playwright install" again to ensure browser binaries are downloaded.

Tests failing due to timeouts: The staging environments might be slow. You can increase the global timeout in playwright.config.ts.
