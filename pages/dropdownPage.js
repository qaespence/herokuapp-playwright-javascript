class DropdownPage {
    constructor(page) {
      this.page = page
      this.dropdownSelector = '#dropdown'  // Selector for the dropdown element
    }
  
    async navigate() {
      await this.page.goto('/dropdown')
    }
  
    async selectOptionByValue(value) {
      // Select an option by its value
      await this.page.selectOption(this.dropdownSelector, value)
    }
  
    async getSelectedOptionText() {
      // Get the text of the currently selected option
      const dropdown = await this.page.$(this.dropdownSelector)
      return await dropdown.$eval('option:checked', option => option.textContent)
    }
  
    async getAllOptions() {
      // Get the text of all options in the dropdown
      const dropdown = await this.page.$(this.dropdownSelector)
      return await dropdown.$$eval('option', options => options.map(option => option.textContent.trim()))
    }
  
    async isOptionSelectedByValue(value) {
      // Check if a specific option is selected by its value
      const selectedValue = await this.page.$eval(this.dropdownSelector, dropdown => dropdown.value)
      return selectedValue === value
    }
  }
  
module.exports = { DropdownPage }
  