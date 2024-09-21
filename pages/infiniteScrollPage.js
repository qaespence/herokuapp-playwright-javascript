class InfiniteScrollPage {
    constructor(page) {
      this.page = page
      this.contentSelector = '.jscroll-added'  // Selector for the dynamically added content
    }
  
    async navigate() {
      await this.page.goto('/infinite_scroll')
    }
  
    async getNumberOfContentBlocks() {
      // Returns the number of dynamically added content blocks
      return await this.page.$$(this.contentSelector)
    }
  
    async scrollToBottom() {
      // Scroll to the bottom of the page to trigger more content loading
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  
    async scrollMultipleTimes(times) {
      // Scroll to the bottom multiple times
      for (let i = 0; i < times; i++) {
        await this.scrollToBottom()
        await this.page.waitForTimeout(1000)  // Wait for content to load after each scroll
      }
    }
  }
  
module.exports = { InfiniteScrollPage }
  