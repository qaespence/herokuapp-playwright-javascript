class InputsPage {
    constructor(page) {
      this.page = page
      this.inputSelector = 'input[type="number"]'  // Selector for the input field
    }
  
    async navigate() {
      await this.page.goto('/inputs')
    }
  
    async typeNumberUsingKeyboard(value) {
      // Type a number into the input field using the keyboard
      await this.page.fill(this.inputSelector, '')
      await this.page.type(this.inputSelector, value.toString())
    }
  
    async clearInputField() {
      // Clear the input field
      await this.page.fill(this.inputSelector, '')
    }
  
    async pressArrowUp() {
      // Simulate pressing the "Arrow Up" key on the input field
      await this.page.press(this.inputSelector, 'ArrowUp')
    }
  
    async pressArrowDown() {
      // Simulate pressing the "Arrow Down" key on the input field
      await this.page.press(this.inputSelector, 'ArrowDown')
    }
  
    async getInputValue() {
      // Get the current value of the input field
      return await this.page.$eval(this.inputSelector, el => el.value)
    }
  
    async clickInputField() {
      // Click on the input field using the mouse
      await this.page.click(this.inputSelector)
    }
  
    async incrementNumberUsingKeyboard() {
      // Simulate pressing the "Arrow Up" key 5 times
      for (let i = 0; i < 5; i++) {
        await this.pressArrowUp()
      }
    }
  
    async decrementNumberUsingKeyboard() {
      // Simulate pressing the "Arrow Down" key 5 times
      for (let i = 0; i < 5; i++) {
        await this.pressArrowDown()
      }
    }
  }
  
module.exports = { InputsPage }
  