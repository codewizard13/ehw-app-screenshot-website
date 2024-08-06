const { chromium, firefox, webkit } = require("playwright")

const viewportSizes = {'1080p': { width: 1920, height: 1080 }}

const options = {
  'target-url': 'https://learnwebcode.com/',
  'full-page': true,
  "pagesToScreen": [
    'home', 'blog'
  ]
}

async function screenshots({
  "target-url": targetUrl = "https://reddit.com",
  "screen-folder": screenFolder = 'screens',
  "full-page": fullPage = false
} = {}) {

  // Destructure the options with defaults assigned
  targetUrlObj = (new URL(targetUrl))
  console.log(`targetUrlObj: `, targetUrlObj)
  domainName = targetUrlObj.hostname.replace("www.","")
  console.log(`domainName: `, domainName)

  screenshotName = `${screenFolder}/${domainName.split('.')[0]}_1080p_${new Date().getTime()}.png`

  console.log(viewportSizes["1080p"])
  console.log(targetUrl)


  //To test Firefox:
  const browser = await firefox.launch()

  // const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // await page.goto(options["target-url"])
  await page.goto(targetUrl)
  // await page.setViewportSize({width: 640, height: 480})
  await page.setViewportSize(viewportSizes["1080p"])
  await page.screenshot({ path: screenshotName, fullPage: fullPage })
  await browser.close()

}

screenshots({
  'target-url': 'https://hepperlehomestead.com'
})


