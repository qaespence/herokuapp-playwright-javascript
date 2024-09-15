class DisappearingElementsPage {
    constructor(page) {
      this.page = page
      this.menuItemsSelector = 'ul li a'  // Selector for menu items
    }
  
    async navigate() {
      await this.page.goto('/disappearing_elements')
    }
  
    async getMenuItems() {
      // Returns all the visible menu items on the page
      return await this.page.$$(this.menuItemsSelector)
    }
  
    async getMenuItemTexts() {
      // Get the text of all the visible menu items
      const menuItems = await this.getMenuItems()
      return Promise.all(menuItems.map(item => item.textContent()))
    }
  }
  
module.exports = { DisappearingElementsPage }
  