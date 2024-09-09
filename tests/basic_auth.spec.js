const { test, expect } = require('@playwright/test')
const { BasicAuthPage } = require('../pages/basicAuthPage')

test.describe('Basic Auth Page', () => {

  test('Successful login with valid credentials', async ({ page }) => {
    const basicAuthPage = new BasicAuthPage(page)

    // Navigate with valid credentials (admin/admin)
    await basicAuthPage.navigateWithAuth('admin', 'admin')

    // Verify that login is successful by checking the success message
    const successMessage = await basicAuthPage.getSuccessMessage()

    const assertions = []
    assertions.push(successMessage === 'Basic Auth')  // Verify the page heading
    expect(assertions.every(Boolean)).toBe(true)
  })

  test('Unsuccessful login with invalid credentials', async ({ page }) => {
    const basicAuthPage = new BasicAuthPage(page)

    // Navigate with invalid credentials
    await basicAuthPage.navigateWithAuth('invalidUser', 'invalidPass')

    // Verify that login fails (the page should prompt a 401 Unauthorized)
    const response = await page.goto('https://the-internet.herokuapp.com/basic_auth')
    
    const assertions = []
    assertions.push(response.status() === 401)  // Expecting HTTP 401 Unauthorized
    expect(assertions.every(Boolean)).toBe(true)
  })

  test('Failed login when canceling authentication prompt', async ({ page }) => {
    const basicAuthPage = new BasicAuthPage(page)

    // Simulate canceling the basic auth dialog (Playwright cannot simulate directly but can mimic behavior)
    try {
      await basicAuthPage.navigateWithAuth('', '')
    } catch (e) {
      const response = await page.goto('https://the-internet.herokuapp.com/basic_auth')
      
      const assertions = []
      assertions.push(response.status() === 401)  // Expecting HTTP 401 Unauthorized when cancelling
      expect(assertions.every(Boolean)).toBe(true)
    }
  })
})
