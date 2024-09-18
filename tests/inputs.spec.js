const { test, expect } = require('@playwright/test')
const { InputsPage } = require('../pages/inputsPage')

test.describe('Inputs Page', () => {

  // Test case 1: Type a number using the keyboard
  test('Type a number using the keyboard', async ({ page }) => {
    const inputsPage = new InputsPage(page)
    await inputsPage.navigate()

    await inputsPage.typeNumberUsingKeyboard(12345)

    const inputValue = await inputsPage.getInputValue()

    const assertions = []
    assertions.push(inputValue === '12345')  // Verify the number typed is correct

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Clear the input field and verify it's empty
  test('Clear the input field and verify it is empty', async ({ page }) => {
    const inputsPage = new InputsPage(page)
    await inputsPage.navigate()

    await inputsPage.typeNumberUsingKeyboard(6789)
    await inputsPage.clearInputField()

    const inputValue = await inputsPage.getInputValue()

    const assertions = []
    assertions.push(inputValue === '')  // Verify the input field is empty

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Increment the number using the Arrow Up key
  test('Increment the number using the Arrow Up key', async ({ page }) => {
    const inputsPage = new InputsPage(page)
    await inputsPage.navigate()

    await inputsPage.typeNumberUsingKeyboard(10)
    await inputsPage.incrementNumberUsingKeyboard()

    const inputValue = await inputsPage.getInputValue()

    const assertions = []
    assertions.push(inputValue === '15')  // Verify the number was incremented by 5

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Decrement the number using the Arrow Down key
  test('Decrement the number using the Arrow Down key', async ({ page }) => {
    const inputsPage = new InputsPage(page)
    await inputsPage.navigate()

    await inputsPage.typeNumberUsingKeyboard(20)
    await inputsPage.decrementNumberUsingKeyboard()

    const inputValue = await inputsPage.getInputValue()

    const assertions = []
    assertions.push(inputValue === '15')  // Verify the number was decremented by 5

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Click on the input field and type a number
  test('Click on the input field and type a number', async ({ page }) => {
    const inputsPage = new InputsPage(page)
    await inputsPage.navigate()

    await inputsPage.clickInputField()
    await inputsPage.typeNumberUsingKeyboard(54321)

    const inputValue = await inputsPage.getInputValue()

    const assertions = []
    assertions.push(inputValue === '54321')  // Verify the number typed after clicking is correct

    expect(assertions.every(Boolean)).toBe(true)
  })
})
