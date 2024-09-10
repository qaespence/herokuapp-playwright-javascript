const { test, expect } = require('@playwright/test')
const { BrokenImagesPage } = require('../pages/brokenImagesPage')

test.describe('Broken Images Page', () => {

  // Test case 1: Verify if any image is broken
  test('Verify broken images on the page', async ({ page }) => {
    const brokenImagesPage = new BrokenImagesPage(page)
    await brokenImagesPage.navigate()

    const images = await brokenImagesPage.getAllImages()

    // Check each image if it is broken
    const brokenImages = []
    for (let img of images) {
      if (await brokenImagesPage.isImageBroken(img)) {
        brokenImages.push(img)
      }
    }

    const assertions = []
    assertions.push(brokenImages.length > 0)  // At least one broken image should exist
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 2: Verify that at least one image is not broken
  test('Verify if there is at least one valid image', async ({ page }) => {
    const brokenImagesPage = new BrokenImagesPage(page)
    await brokenImagesPage.navigate()

    const images = await brokenImagesPage.getAllImages()

    const validImages = []
    for (let img of images) {
      if (!(await brokenImagesPage.isImageBroken(img))) {
        validImages.push(img)
      }
    }

    const assertions = []
    assertions.push(validImages.length > 0)  // At least one valid image should exist
    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 3: Check that all images have valid src attribute
  test('Verify all images have src attribute', async ({ page }) => {
    const brokenImagesPage = new BrokenImagesPage(page)
    await brokenImagesPage.navigate()

    const images = await brokenImagesPage.getAllImages()

    const assertions = []
    for (let img of images) {
      const src = await img.getAttribute('src')
      assertions.push(src !== null && src.trim() !== '')  // Image must have a valid src
    }

    expect(assertions.every(Boolean)).toBe(true)
  })

  // Test case 4: Verify the number of images on the page
  test('Verify number of images on the page', async ({ page }) => {
    const brokenImagesPage = new BrokenImagesPage(page)
    await brokenImagesPage.navigate()

    const images = await brokenImagesPage.getAllImages()

    const assertions = []
    assertions.push(images.length === 4)  // Expected number of images is 4
    expect(assertions.every(Boolean)).toBe(true)
  })
})
