class KeyPressesPage {
    constructor(page) {
      this.page = page
      this.resultSelector = '#result'  // Selector for the result element
      this.bodySelector = 'body'       // Selector to capture key presses
    }
  
    async navigate() {
      await this.page.goto('/key_presses')
    }
  
    async pressKey(key) {
      // Simulate pressing a key on the page
      await this.page.press(this.bodySelector, key)
    }
  
    async getResultText() {
      // Get the text from the result element that shows the last key pressed
      return await this.page.textContent(this.resultSelector)
    }
  }
  
module.exports = { KeyPressesPage }
  