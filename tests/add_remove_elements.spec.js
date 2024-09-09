const { test, expect } = require('@playwright/test')
const { AddRemoveElementsPage } = require('../pages/addRemoveElementsPage')

test.describe('Add/Remove Elements Page', () => {
  
  // Test case 1: Add one element and verify
  test('Add a single element', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    await addRemovePage.addElement()
    const deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 1)  // Verify one delete button appears
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Add multiple elements and verify their count
  test('Add multiple elements and verify count', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    // Add 5 elements
    for (let i = 0; i < 5; i++) {
      await addRemovePage.addElement()
    }

    const deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 5)  // Verify that there are 5 delete buttons
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Add and remove one element
  test('Add and remove one element', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    await addRemovePage.addElement()
    let deleteButtons = await addRemovePage.getDeleteButtons()

    // Remove the element
    await addRemovePage.deleteElement(deleteButtons[0])
    deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 0)  // Verify no elements remain
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Add multiple elements and remove all
  test('Add multiple elements and remove all', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    // Add 5 elements
    for (let i = 0; i < 5; i++) {
      await addRemovePage.addElement()
    }

    let deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 5)  // Verify there are 5 elements

    // Remove all elements one by one
    for (let deleteButton of deleteButtons) {
      await addRemovePage.deleteElement(deleteButton)
    }

    deleteButtons = await addRemovePage.getDeleteButtons()
    assertions.push(deleteButtons.length === 0)  // Verify all elements are removed
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 5: Remove elements individually
  test('Add multiple elements and remove them one at a time', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    // Add 3 elements
    for (let i = 0; i < 3; i++) {
      await addRemovePage.addElement()
    }

    let deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 3)  // Verify that there are 3 elements

    // Remove the first element
    await addRemovePage.deleteElement(deleteButtons[0])

    // Verify only 2 elements remain
    deleteButtons = await addRemovePage.getDeleteButtons()
    assertions.push(deleteButtons.length === 2)

    // Remove the remaining elements one by one
    await addRemovePage.deleteElement(deleteButtons[0])
    await addRemovePage.deleteElement(deleteButtons[1])

    deleteButtons = await addRemovePage.getDeleteButtons()
    assertions.push(deleteButtons.length === 0)  // Verify no elements remain
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 6: Add and remove elements with delay
  test('Add and remove elements with delay', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    // Add 2 elements with delay
    await addRemovePage.addElement()
    await page.waitForTimeout(1000)  // Delay of 1 second
    await addRemovePage.addElement()
    await page.waitForTimeout(1000)  // Delay of 1 second

    let deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 2)  // Verify that there are 2 elements

    // Remove both elements with delays
    await addRemovePage.deleteElement(deleteButtons[0])
    await page.waitForTimeout(1000)  // Delay of 1 second
    await addRemovePage.deleteElement(deleteButtons[1])

    deleteButtons = await addRemovePage.getDeleteButtons()
    assertions.push(deleteButtons.length === 0)  // Verify both elements are removed
    
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 7: Ensure "Add Element" button remains functional after adding and removing elements
  test('Verify Add Element button is functional after adding and removing elements', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page)
    await addRemovePage.navigate()
    
    // Add and remove an element
    await addRemovePage.addElement()
    let deleteButtons = await addRemovePage.getDeleteButtons()
    await addRemovePage.deleteElement(deleteButtons[0])

    // Verify the "Add Element" button is still functional after removing the element
    await addRemovePage.addElement()
    deleteButtons = await addRemovePage.getDeleteButtons()
    
    const assertions = []
    assertions.push(deleteButtons.length === 1)  // Verify one element was added back
    
    expect(assertions.every(Boolean)).toBe(true)
  })
})
