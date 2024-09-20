const { test, expect } = require('@playwright/test')
const { DisappearingElementsPage } = require('../pages/disappearingElementsPage')

test.describe('Disappearing Elements Page', () => {

  // Test case: Verify all possible menu items appear at least once
  test('Verify all possible menu items appear', async ({ page }) => {
    const disappearingElementsPage = new DisappearingElementsPage(page)
    await disappearingElementsPage.navigate()

    // Possible menu items (Home, About, Contact Us, Portfolio, Gallery)
    const possibleMenuItems = ['Home', 'About', 'Contact Us', 'Portfolio', 'Gallery']

    // Store found menu items across multiple reloads
    const foundMenuItems = new Set()

    // Number of reloads to attempt
    const maxReloads = 10

    for (let i = 0; i < maxReloads; i++) {
      const menuItemTexts = await disappearingElementsPage.getMenuItemTexts()

      menuItemTexts.forEach(item => foundMenuItems.add(item.trim()))

      // Log the menu items found on this reload
      // console.log(`Reload ${i + 1}: Found items:`, [...foundMenuItems])

      // If all possible menu items are found, stop reloading early
      if (possibleMenuItems.every(item => foundMenuItems.has(item))) {
        // console.log(`All menu items found after ${i + 1} reloads`)
        break
      }

      // Reload the page to check for more items
      await page.reload()
    }

    // Final assertion after all reloads
    const assertions = []
    possibleMenuItems.forEach(item => {
      assertions.push(foundMenuItems.has(item))  // Verify that all items appeared at least once
    })

    expect(assertions.every(Boolean)).toBe(true)
  })
})
