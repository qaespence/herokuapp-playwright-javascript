const { test, expect } = require('@playwright/test')
const { InfiniteScrollPage } = require('../pages/infiniteScrollPage')

test.describe('Infinite Scroll Page', () => {

  // Test case 1: Verify that content is loaded dynamically after scrolling
  test('Verify dynamic content loads after scrolling', async ({ page }) => {
    const infiniteScrollPage = new InfiniteScrollPage(page)
    await infiniteScrollPage.navigate()

    // Get the initial number of content blocks
    const initialContentBlocks = await infiniteScrollPage.getNumberOfContentBlocks()
    // console.log('Initial number of content blocks:', initialContentBlocks.length)

    // Scroll to the bottom multiple times to load more content
    await infiniteScrollPage.scrollMultipleTimes(2)

    // Get the number of content blocks after scrolling
    const finalContentBlocks = await infiniteScrollPage.getNumberOfContentBlocks()
    // console.log('Final number of content blocks after scrolling:', finalContentBlocks.length)

    const assertions = []
    assertions.push(finalContentBlocks.length > initialContentBlocks.length)  // More content should have been loaded

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Verify that scrolling multiple times increases the content count
  test('Scroll multiple times and verify content count increases', async ({ page }) => {
    const infiniteScrollPage = new InfiniteScrollPage(page)
    await infiniteScrollPage.navigate()

    // Scroll multiple times
    await infiniteScrollPage.scrollMultipleTimes(2)

    // Verify that more content blocks were loaded
    const contentBlocks = await infiniteScrollPage.getNumberOfContentBlocks()

    const assertions = []
    assertions.push(contentBlocks.length > 0)  // Ensure some content has been loaded
    assertions.push(contentBlocks.length >= 2)  // Ensure at least 2 content blocks have been loaded

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Verify that no additional content is loaded without scrolling
  test('Verify no additional content is loaded without scrolling', async ({ page }) => {
    const infiniteScrollPage = new InfiniteScrollPage(page)
    await infiniteScrollPage.navigate()
  
    // Wait for the page to load and stabilize
    await page.waitForTimeout(500)
  
    // Get the initial number of content blocks
    const initialContentBlocks = await infiniteScrollPage.getNumberOfContentBlocks()
    // console.log('Initial number of content blocks:', initialContentBlocks.length)
  
    // Wait for some additional time to ensure no more content is loading
    await page.waitForTimeout(1000)
  
    // Get the number of content blocks again after waiting
    const contentBlocksAfterWait = await infiniteScrollPage.getNumberOfContentBlocks()
    // console.log('Number of content blocks after wait:', contentBlocksAfterWait.length)
  
    const assertions = []
    assertions.push(initialContentBlocks.length === contentBlocksAfterWait.length)  // No new content should have been loaded
  
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify that content loads dynamically after a long scroll
  test('Verify content loads after a long scroll', async ({ page }) => {
    const infiniteScrollPage = new InfiniteScrollPage(page)
    await infiniteScrollPage.navigate()

    // Scroll 10 times to trigger more content loading
    await infiniteScrollPage.scrollMultipleTimes(3)

    // Verify that content has increased
    const contentBlocks = await infiniteScrollPage.getNumberOfContentBlocks()

    const assertions = []
    assertions.push(contentBlocks.length > 3)  // More content should have been loaded after 10 scrolls

    expect(assertions.every(Boolean)).toBe(true)
  })
})
