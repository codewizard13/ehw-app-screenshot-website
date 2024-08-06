const { chromium, firefox, webkit } = require("playwright")

const options = {
  'target-url': 'https://learnwebcode.com/',
  'screen-folder': 'junk',
  'viewport-sizes': {
    '1080p': { width: 1920, height: 1080 }
  },
  'full-page': true
}

async function screenshots({ targetUrl = "https://reddit.com", screenFolder = 'screens' } = {}) {

  // Destructure the options with defaults assigned
  viewportSizes = options["viewport-sizes"]
  console.log(viewportSizes['1080p'])


  //To test Firefox:
  const browser = await firefox.launch()

  // const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(targetUrl)
  // await page.setViewportSize({width: 640, height: 480})
  await page.setViewportSize(viewportSizes["1080p"])
  await page.screenshot({ path: `mobile_${new Date().getTime()}.png`, fullPage: false })
  await browser.close()

}

screenshots(options)