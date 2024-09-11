class CheckboxesPage {
    constructor(page) {
      this.page = page
      this.checkboxSelector = 'input[type="checkbox"]'  // Selector for checkboxes
    }
  
    async navigate() {
      await this.page.goto('/checkboxes')
    }
  
    async getCheckboxes() {
      // Returns all the checkboxes on the page
      return await this.page.$$(this.checkboxSelector)
    }
  
    async isChecked(checkbox) {
      // Returns whether the checkbox is checked or not
      return await checkbox.isChecked()
    }
  
    async check(checkbox) {
      // Check the checkbox if it's not already checked
      if (!(await this.isChecked(checkbox))) {
        await checkbox.check()
      }
    }
  
    async uncheck(checkbox) {
      // Uncheck the checkbox if it's checked
      if (await this.isChecked(checkbox)) {
        await checkbox.uncheck()
      }
    }
  }
  
module.exports = { CheckboxesPage }
  