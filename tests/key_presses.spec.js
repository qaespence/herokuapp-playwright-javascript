const { test, expect } = require('@playwright/test')
const { KeyPressesPage } = require('../pages/keyPressesPage')

test.describe('Key Presses Page', () => {

  // Test case 1: Verify the display of key press when pressing a letter key
  test('Press a letter key and verify the result', async ({ page }) => {
    const keyPressesPage = new KeyPressesPage(page)
    await keyPressesPage.navigate()

    // Press the "A" key
    await keyPressesPage.pressKey('A')

    const resultText = await keyPressesPage.getResultText()

    const assertions = []
    assertions.push(resultText.includes('You entered: A'))  // Verify the result text contains "A"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Verify the display of key press when pressing a number key
  test('Press a number key and verify the result', async ({ page }) => {
    const keyPressesPage = new KeyPressesPage(page)
    await keyPressesPage.navigate()

    // Press the "5" key
    await keyPressesPage.pressKey('5')

    const resultText = await keyPressesPage.getResultText()

    const assertions = []
    assertions.push(resultText.includes('You entered: 5'))  // Verify the result text contains "5"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Verify the display of key press when pressing a special character key
  test('Press a special character key and verify the result', async ({ page }) => {
    const keyPressesPage = new KeyPressesPage(page)
    await keyPressesPage.navigate()
  
    // Press the "@" key (expect it to be interpreted as "2")
    await keyPressesPage.pressKey('@')
  
    const resultText = await keyPressesPage.getResultText()
  
    const assertions = []
    assertions.push(resultText.includes('You entered: 2'))  // Adjust to match the actual result "2"
  
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify the display of key press when pressing a function key
  test('Press a function key and verify the result', async ({ page }) => {
    const keyPressesPage = new KeyPressesPage(page)
    await keyPressesPage.navigate()

    // Press the "F5" key
    await keyPressesPage.pressKey('F5')

    const resultText = await keyPressesPage.getResultText()

    const assertions = []
    assertions.push(resultText.includes('You entered: F5'))  // Verify the result text contains "F5"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Verify the display of key press when pressing an arrow key
  test('Press an arrow key and verify the result', async ({ page }) => {
    const keyPressesPage = new KeyPressesPage(page)
    await keyPressesPage.navigate()

    // Press the "ArrowRight" key
    await keyPressesPage.pressKey('ArrowRight')

    const resultText = await keyPressesPage.getResultText()

    const assertions = []
    assertions.push(resultText.includes('You entered: RIGHT'))  // Verify the result text contains "RIGHT"

    expect(assertions.every(Boolean)).toBe(true)
  })
})
