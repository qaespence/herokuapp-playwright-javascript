const { test, expect } = require('@playwright/test')
const { StatusCodesPage } = require('../pages/statusCodesPage')

test.describe('Status Codes Page', () => {

  // Test case 1: Verify that all status code links are present on the page
  test('Verify all status code links are present', async ({ page }) => {
    const statusCodesPage = new StatusCodesPage(page)
    await statusCodesPage.navigate()

    const links = await statusCodesPage.getStatusCodeLinks()
    const expectedCodes = ['200', '301', '404', '500']

    const assertions = []
    for (let i = 0; i < expectedCodes.length; i++) {
      const linkText = await links[i].textContent()
      assertions.push(linkText.trim() === expectedCodes[i])  // Verify each link contains the expected status code
    }

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Verify redirection for status code 200
  test('Verify redirection for status code 200', async ({ page }) => {
    const statusCodesPage = new StatusCodesPage(page)
    await statusCodesPage.navigate()

    // Click on the 200 status code link
    await statusCodesPage.clickStatusCodeLink(200)

    const statusCode = await statusCodesPage.getStatusCodeFromUrl()

    const assertions = []
    assertions.push(statusCode === '200')  // Verify the URL contains the correct status code

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Verify redirection for status code 301
  test('Verify redirection for status code 301', async ({ page }) => {
    const statusCodesPage = new StatusCodesPage(page)
    await statusCodesPage.navigate()

    // Click on the 301 status code link
    await statusCodesPage.clickStatusCodeLink(301)

    const statusCode = await statusCodesPage.getStatusCodeFromUrl()

    const assertions = []
    assertions.push(statusCode === '301')  // Verify the URL contains the correct status code

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify redirection for status code 404
  test('Verify redirection for status code 404', async ({ page }) => {
    const statusCodesPage = new StatusCodesPage(page)
    await statusCodesPage.navigate()

    // Click on the 404 status code link
    await statusCodesPage.clickStatusCodeLink(404)

    const statusCode = await statusCodesPage.getStatusCodeFromUrl()

    const assertions = []
    assertions.push(statusCode === '404')  // Verify the URL contains the correct status code

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Verify redirection for status code 500
  test('Verify redirection for status code 500', async ({ page }) => {
    const statusCodesPage = new StatusCodesPage(page)
    await statusCodesPage.navigate()

    // Click on the 500 status code link
    await statusCodesPage.clickStatusCodeLink(500)

    const statusCode = await statusCodesPage.getStatusCodeFromUrl()

    const assertions = []
    assertions.push(statusCode === '500')  // Verify the URL contains the correct status code

    expect(assertions.every(Boolean)).toBe(true)
  })
})
