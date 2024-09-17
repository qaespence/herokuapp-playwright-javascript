const { test, expect } = require('@playwright/test')
const { DropdownPage } = require('../pages/dropdownPage')

test.describe('Dropdown Page', () => {

  // Test case 1: Verify default selected option
  test('Verify default selected option', async ({ page }) => {
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.navigate()

    const selectedOptionText = await dropdownPage.getSelectedOptionText()

    const assertions = []
    assertions.push(selectedOptionText === 'Please select an option')  // Verify default selected option
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Select Option 1 and verify
  test('Select Option 1 and verify', async ({ page }) => {
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.navigate()

    // Select Option 1 by its value (value = "1")
    await dropdownPage.selectOptionByValue('1')

    const assertions = []
    assertions.push(await dropdownPage.isOptionSelectedByValue('1'))  // Verify Option 1 is selected
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Select Option 2 and verify
  test('Select Option 2 and verify', async ({ page }) => {
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.navigate()

    // Select Option 2 by its value (value = "2")
    await dropdownPage.selectOptionByValue('2')

    const assertions = []
    assertions.push(await dropdownPage.isOptionSelectedByValue('2'))  // Verify Option 2 is selected
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify all available options in the dropdown
  test('Verify all available options', async ({ page }) => {
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.navigate()

    const allOptions = await dropdownPage.getAllOptions()

    const assertions = []
    assertions.push(allOptions.length === 3)  // Verify the dropdown has 3 options
    assertions.push(allOptions.includes('Please select an option'))  // Check the default option exists
    assertions.push(allOptions.includes('Option 1'))  // Check Option 1 exists
    assertions.push(allOptions.includes('Option 2'))  // Check Option 2 exists

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Select Option 1 and then Option 2 and verify each selection
  test('Select Option 1 and then Option 2 and verify each selection', async ({ page }) => {
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.navigate()

    // Select Option 1 and verify
    await dropdownPage.selectOptionByValue('1')
    const option1Selected = await dropdownPage.isOptionSelectedByValue('1')

    // Select Option 2 and verify
    await dropdownPage.selectOptionByValue('2')
    const option2Selected = await dropdownPage.isOptionSelectedByValue('2')

    const assertions = []
    assertions.push(option1Selected)  // Verify Option 1 was selected
    assertions.push(option2Selected)  // Verify Option 2 was selected

    expect(assertions.every(Boolean)).toBe(true)
  })
})
