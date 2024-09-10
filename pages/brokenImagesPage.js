class BrokenImagesPage {
    constructor(page) {
      this.page = page
      this.imageSelector = 'img'  // Selector for all images on the page
    }
  
    async navigate() {
      await this.page.goto('/broken_images')
    }
  
    async getAllImages() {
      // Returns all the images present on the page
      return await this.page.$$(this.imageSelector)
    }
  
    async isImageBroken(image) {
      // Checks if the image is broken by checking the naturalWidth (0 means broken)
      return await image.evaluate(img => img.naturalWidth === 0)
    }
  }
  
module.exports = { BrokenImagesPage }
  