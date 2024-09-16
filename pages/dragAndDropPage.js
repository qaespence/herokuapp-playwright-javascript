class DragAndDropPage {
    constructor(page) {
      this.page = page
      this.boxA = '#column-a'  // Selector for Box A
      this.boxB = '#column-b'  // Selector for Box B
    }
  
    async navigate() {
      await this.page.goto('/drag_and_drop')
    }
  
    async getBoxAText() {
      // Get the text inside Box A
      return await this.page.textContent(this.boxA)
    }
  
    async getBoxBText() {
      // Get the text inside Box B
      return await this.page.textContent(this.boxB)
    }
  
    async dragBoxAToBoxB() {
      // Simulate drag-and-drop using the HTML5 drag-and-drop API
      await this.page.evaluate(() => {
        const boxA = document.querySelector('#column-a')
        const boxB = document.querySelector('#column-b')
  
        const dataTransfer = new DataTransfer()
  
        // Dispatch drag events for Box A
        boxA.dispatchEvent(new DragEvent('dragstart', { dataTransfer }))
        boxB.dispatchEvent(new DragEvent('dragenter', { dataTransfer }))
        boxB.dispatchEvent(new DragEvent('dragover', { dataTransfer }))
        boxB.dispatchEvent(new DragEvent('drop', { dataTransfer }))
        boxA.dispatchEvent(new DragEvent('dragend', { dataTransfer }))
      })
    }
  }
  
  module.exports = { DragAndDropPage }
  