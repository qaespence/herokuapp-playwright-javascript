const { test, expect } = require('@playwright/test')
const { DisappearingElementsPage } = require('../pages/disappearingElementsPage')

test.describe('Disappearing Elements Page', () => {

  // Test case 1: Verify that all possible menu items appear at least once
  test('Verify all possible menu items appear', async ({ page }) => {
    const disappearingElementsPage = new DisappearingElementsPage(page)
    await disappearingElementsPage.navigate()

    // Possible menu items (Home, About, Contact Us, Portfolio, Gallery)
    const possibleMenuItems = ['Home', 'About', 'Contact Us', 'Portfolio', 'Gallery']

    // Loop to refresh the page and collect visible items
    const foundMenuItems = new Set()

    for (let i = 0; i < 5; i++) {
      const menuItemTexts = await disappearingElementsPage.getMenuItemTexts()

      menuItemTexts.forEach(item => foundMenuItems.add(item.trim()))

      // If all possible menu items are found, break early
      if (possibleMenuItems.every(item => foundMenuItems.has(item))) {
        break
      }

      // Refresh the page to check for new items
      await page.reload()
    }

    const assertions = []
    possibleMenuItems.forEach(item => assertions.push(foundMenuItems.has(item)))  // Verify that all items appear at least once

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Verify the presence of at least 4 menu items
  test('Verify at least 4 menu items are present', async ({ page }) => {
    const disappearingElementsPage = new DisappearingElementsPage(page)
    await disappearingElementsPage.navigate()

    const menuItems = await disappearingElementsPage.getMenuItems()

    const assertions = []
    assertions.push(menuItems.length >= 4)  // Verify that at least 4 menu items are visible

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Verify that "Gallery" menu item appears at least once
  test('Verify "Gallery" menu item appears at least once', async ({ page }) => {
    const disappearingElementsPage = new DisappearingElementsPage(page)
    await disappearingElementsPage.navigate()

    let galleryFound = false

    // Loop to reload the page multiple times to check for "Gallery" menu item
    for (let i = 0; i < 5; i++) {
      const menuItemTexts = await disappearingElementsPage.getMenuItemTexts()
      if (menuItemTexts.includes('Gallery')) {
        galleryFound = true
        break
      }

      // Reload the page to try again
      await page.reload()
    }

    const assertions = []
    assertions.push(galleryFound)  // Verify that "Gallery" appeared at least once

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify "Contact Us" menu item can be clicked if present
  test('Verify "Contact Us" menu item can be clicked', async ({ page }) => {
    const disappearingElementsPage = new DisappearingElementsPage(page)
    await disappearingElementsPage.navigate()

    let contactUsClickable = false

    // Loop to find the "Contact Us" link and click it
    for (let i = 0; i < 5; i++) {
      const menuItems = await disappearingElementsPage.getMenuItems()

      for (let item of menuItems) {
        const text = await item.textContent()
        if (text.trim() === 'Contact Us') {
          await item.click()
          contactUsClickable = true
          break
        }
      }

      if (contactUsClickable) break

      // Reload the page to try again
      await page.reload()
    }

    const assertions = []
    assertions.push(contactUsClickable)  // Verify "Contact Us" was clickable

    expect(assertions.every(Boolean)).toBe(true)
  })
})
