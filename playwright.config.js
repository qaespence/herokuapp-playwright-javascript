module.exports = {
    use: {
      baseURL: 'https://the-internet.herokuapp.com',  // Base URL for the site
      headless: true,
      viewport: { width: 1280, height: 720 },
      browserName: 'chromium',
    },
    retries: 1,
  };
  