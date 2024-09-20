class StatusCodesPage {
    constructor(page) {
      this.page = page
      this.statusCodeLinksSelector = 'ul li a'  // Selector for the status code links
    }
  
    async navigate() {
      await this.page.goto('/status_codes')
    }
  
    async getStatusCodeLinks() {
      // Returns all the status code links available on the page
      return await this.page.$$(this.statusCodeLinksSelector)
    }
  
    async clickStatusCodeLink(code) {
      // Click on the status code link based on the text (e.g., '200', '301', etc.)
      const links = await this.getStatusCodeLinks()
      for (let link of links) {
        const linkText = await link.textContent()
        if (linkText.trim() === code.toString()) {
          await link.click()
          break
        }
      }
    }
  
    async getCurrentUrl() {
      // Get the current URL of the page
      return await this.page.url()
    }
  
    async getStatusCodeFromUrl() {
      // Extract the status code from the URL (e.g., /status_codes/200)
      const currentUrl = await this.getCurrentUrl()
      return currentUrl.split('/').pop()
    }
  }
  
module.exports = { StatusCodesPage }
  