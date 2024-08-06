const  {chromium, firefox, webkit} = require("playwright")

async function screenshots() {
  //To test Firefox:
  const browser = await firefox.launch()
  // const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto("https://learnwebcode.com/")
  // await page.setViewportSize({width: 640, height: 480})
  await page.setViewportSize({width: 1920, height: 1080})
  await page.screenshot({path: `mobile_${new Date().getTime()}.png`, fullPage: true})
  await browser.close()
}

screenshots()