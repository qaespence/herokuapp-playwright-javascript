const { test, expect } = require('@playwright/test')
const { DragAndDropPage } = require('../pages/dragAndDropPage')

test.describe('Drag and Drop Page', () => {

  // Test case 1: Verify initial state of boxes
  test('Verify initial state of Box A and Box B', async ({ page }) => {
    const dragAndDropPage = new DragAndDropPage(page)
    await dragAndDropPage.navigate()

    const boxAText = await dragAndDropPage.getBoxAText()
    const boxBText = await dragAndDropPage.getBoxBText()

    const assertions = []
    assertions.push(boxAText.trim() === 'A')  // Verify Box A initially contains "A"
    assertions.push(boxBText.trim() === 'B')  // Verify Box B initially contains "B"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Drag Box A to Box B and verify
  test('Drag Box A to Box B and verify their text changes', async ({ page }) => {
    const dragAndDropPage = new DragAndDropPage(page)
    await dragAndDropPage.navigate()

    // Perform the drag and drop action
    await dragAndDropPage.dragBoxAToBoxB()

    // Verify that the boxes have swapped text
    const boxATextAfterDrag = await dragAndDropPage.getBoxAText()
    const boxBTextAfterDrag = await dragAndDropPage.getBoxBText()

    const assertions = []
    assertions.push(boxATextAfterDrag.trim() === 'B')  // Box A should now contain "B"
    assertions.push(boxBTextAfterDrag.trim() === 'A')  // Box B should now contain "A"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Drag Box B to Box A and verify
  test('Drag Box B to Box A and verify their text changes', async ({ page }) => {
    const dragAndDropPage = new DragAndDropPage(page)
    await dragAndDropPage.navigate()

    // Perform the drag and drop action in reverse
    await dragAndDropPage.dragBoxAToBoxB()

    // Drag back to original state
    await dragAndDropPage.dragBoxAToBoxB()

    // Verify that the boxes have swapped text back to the original state
    const boxATextAfterDragBack = await dragAndDropPage.getBoxAText()
    const boxBTextAfterDragBack = await dragAndDropPage.getBoxBText()

    const assertions = []
    assertions.push(boxATextAfterDragBack.trim() === 'A')  // Box A should now contain "A"
    assertions.push(boxBTextAfterDragBack.trim() === 'B')  // Box B should now contain "B"

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify that dragging only affects the targeted elements
  test('Verify dragging only affects the targeted boxes', async ({ page }) => {
    const dragAndDropPage = new DragAndDropPage(page)
    await dragAndDropPage.navigate()

    // Perform the drag and drop action
    await dragAndDropPage.dragBoxAToBoxB()

    // Verify that only the dragged elements have swapped content
    const boxATextAfterDrag = await dragAndDropPage.getBoxAText()
    const boxBTextAfterDrag = await dragAndDropPage.getBoxBText()

    const assertions = []
    assertions.push(boxATextAfterDrag.trim() === 'B')  // Verify Box A has "B"
    assertions.push(boxBTextAfterDrag.trim() === 'A')  // Verify Box B has "A"

    expect(assertions.every(Boolean)).toBe(true)
  })
})
