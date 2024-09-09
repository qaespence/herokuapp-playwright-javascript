class AddRemoveElementsPage {
    constructor(page) {
      this.page = page
      this.addElementButton = 'button[onclick="addElement()"]'
      this.deleteButtons = '.added-manually'
    }
  
    async navigate() {
      await this.page.goto('/add_remove_elements/')
    }
  
    async addElement() {
      await this.page.click(this.addElementButton)
    }
  
    async deleteElement(deleteButton) {
      await deleteButton.click()
    }
  
    async getDeleteButtons() {
      return await this.page.$$(this.deleteButtons)
    }
  }
  
module.exports = { AddRemoveElementsPage }
  