# Herokuapp Playwright JavaScript Automation Framework

This is a UI automation framework built using [Playwright](https://playwright.dev/) to test the web application [The Internet](https://the-internet.herokuapp.com/) and its various pages.

## Project Structure

```
herokuapp-playwright-javascript/
├── /tests/                          # Contains all test case files
│   ├── add_remove_elements.spec.js  # Test file for Add/Remove Elements page
│   ├── basic_auth.spec.js           # Test file for Basic Auth page
├── /pages/                          # Contains Page Object Model files
│   ├── addRemoveElementsPage.js     # Page Object Model for Add/Remove Elements page
│   ├── basicAuthPage.js             # Page Object Model for Basic Auth page
├── /utils/                          # Utility/helper functions (optional)
├── /reports/                        # Folder to store test reports (optional)
├── playwright.config.js             # Playwright configuration file
├── package.json                     # Node.js project configuration file
└── package-lock.json                # Node package lock file (auto-generated)
```

## Prerequisites

To get started, you need to have the following installed on your machine:

    Node.js (14.x, 16.x, or 18.x)
    npm (comes with Node.js)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/qaespence/herokuapp-playwright-javascript
cd herokuapp-playwright-javascript
```

2. Install the dependencies: Once inside the project folder, run the following command to install all necessary packages:
```bash
npm install
```
This will install Playwright and other dependencies as defined in the package.json file.

3. Install Playwright Browsers: Playwright requires browser binaries to run tests. You can install them by running:
```bash
npx playwright install
```

## Running Tests

You can run the tests using Playwright's CLI commands. By default, Playwright will run tests headlessly (without opening a browser window). You can adjust this by modifying the playwright.config.js file.

1. Run All Tests: To run all tests:

```bash
npx playwright test
```

2. Run a Specific Test File: To run a specific test file, for example, the add_remove_elements.spec.js:

```bash
npx playwright test tests/add_remove_elements.spec.js
```

3. Run Tests with the Browser Open: By default, the tests run in headless mode (without opening the browser). To run them with the browser visible:

```bash
npx playwright test --headed
```

4. Generate HTML Reports: To generate an HTML report after running tests:

```bash
npx playwright show-report
```

5. Run Tests in Debug Mode: To run tests in debug mode, where you can inspect each step:

```bash
npx playwright test --debug
```

## Configuration

Playwright Configuration: You can modify the playwright.config.js file to change global settings like browser type, base URL, viewport size, and more.

Example of a configuration file:
```js
module.exports = {
  use: {
    baseURL: 'https://the-internet.herokuapp.com',  // Base URL for all tests
    headless: true,
    viewport: { width: 1280, height: 720 },
    browserName: 'chromium',  // You can also test in 'firefox' or 'webkit'
  },
  retries: 1,
}
```

