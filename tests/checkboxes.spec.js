const { test, expect } = require('@playwright/test')
const { CheckboxesPage } = require('../pages/checkboxesPage')

test.describe('Checkboxes Page', () => {

  // Test case 1: Verify initial state of checkboxes
  test('Verify initial state of checkboxes', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page)
    await checkboxesPage.navigate()

    const checkboxes = await checkboxesPage.getCheckboxes()

    // Check the initial state of the first checkbox (unchecked) and second (checked)
    const assertions = []
    assertions.push(!(await checkboxesPage.isChecked(checkboxes[0])))  // First checkbox should be unchecked
    assertions.push(await checkboxesPage.isChecked(checkboxes[1]))     // Second checkbox should be checked

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Check the first checkbox and verify it's checked
  test('Check the first checkbox and verify', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page)
    await checkboxesPage.navigate()

    const checkboxes = await checkboxesPage.getCheckboxes()

    await checkboxesPage.check(checkboxes[0])

    const assertions = []
    assertions.push(await checkboxesPage.isChecked(checkboxes[0]))  // First checkbox should now be checked

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Uncheck the second checkbox and verify it's unchecked
  test('Uncheck the second checkbox and verify', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page)
    await checkboxesPage.navigate()

    const checkboxes = await checkboxesPage.getCheckboxes()

    await checkboxesPage.uncheck(checkboxes[1])

    const assertions = []
    assertions.push(!(await checkboxesPage.isChecked(checkboxes[1])))  // Second checkbox should now be unchecked

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Check both checkboxes and verify both are checked
  test('Check both checkboxes and verify', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page)
    await checkboxesPage.navigate()

    const checkboxes = await checkboxesPage.getCheckboxes()

    await checkboxesPage.check(checkboxes[0])
    await checkboxesPage.check(checkboxes[1])

    const assertions = []
    assertions.push(await checkboxesPage.isChecked(checkboxes[0]))  // First checkbox should be checked
    assertions.push(await checkboxesPage.isChecked(checkboxes[1]))  // Second checkbox should also be checked

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Uncheck both checkboxes and verify both are unchecked
  test('Uncheck both checkboxes and verify', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page)
    await checkboxesPage.navigate()

    const checkboxes = await checkboxesPage.getCheckboxes()

    await checkboxesPage.uncheck(checkboxes[0])
    await checkboxesPage.uncheck(checkboxes[1])

    const assertions = []
    assertions.push(!(await checkboxesPage.isChecked(checkboxes[0])))  // First checkbox should be unchecked
    assertions.push(!(await checkboxesPage.isChecked(checkboxes[1])))  // Second checkbox should also be unchecked

    expect(assertions.every(Boolean)).toBe(true)
  })
})
