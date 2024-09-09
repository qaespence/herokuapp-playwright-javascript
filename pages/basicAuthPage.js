class BasicAuthPage {
    constructor(page) {
      this.page = page
      this.successMessage = 'h3'  // Selector for the success message
    }
  
    async navigateWithAuth(username, password) {
      // Use built-in Playwright functionality to handle Basic Authentication
      await this.page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`)
    }
  
    async getSuccessMessage() {
      // Get the success message after successful authentication
      return await this.page.textContent(this.successMessage)
    }
  }
  
module.exports = { BasicAuthPage }
  