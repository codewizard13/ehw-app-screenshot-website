const { chromium, firefox, webkit } = require("playwright")


// Get command line arguments

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('No arguments provided.');
} else {
  args.forEach(arg => {
    console.log(`Argument: ${arg}`);
  });
}

const site_url = args[0]
console.info(`site_url: ${site_url}`)


const viewportSizes = {
  'desktop-1920x1080': { width: 1920, height: 1080 },
}

const wpSelectors = {
  'topNav': 'nav li a'
}

const options = {
  'target-url': 'https://learnwebcode.com/',
  'full-page': true,
  "pagesToScreen": [
    'home', 'blog'
  ]
}

async function screenMenuPages({
  "target-url": targetUrl = "https://reddit.com",
  "screen-folder": screenFolder = 'screens',
  "full-page": fullPage = false
} = {}) {

  // Destructure the options with defaults assigned
  targetUrlObj = (new URL(targetUrl))
  domainName = targetUrlObj.hostname.replace("www.","")

  //DEBUG OUT ...
  console.log(`targetUrlObj: `, targetUrlObj)
  console.log(`domainName: `, domainName)

  // Define screenshot file path
  screenPath = `${screenFolder}/${domainName.split('.')[0]}_1080p_${new Date().getTime()}.png`

  console.log(viewportSizes["1080p"])
  console.log(targetUrl)




  //To test Firefox:
  const browser = await firefox.launch()

  // const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()


console.log(`wpSelectors.topNav`,wpSelectors.topNav)
  // Get nav links
  const [navLinks] = await page.locator(wpSelectors.topNav).allInnerTexts()
  console.log(`navLinks: `, navLinks)

  // Get page from url
  // pageName = new URL(targetUrl).pathname.split('/').at(-1).pop()
  // console.log(`pageName: `, pageName)



  // await page.goto(options["target-url"])
  await page.goto(targetUrl)
  // await page.setViewportSize({width: 640, height: 480})
  await page.setViewportSize(viewportSizes["1080p"])
  await page.screenshot({ path: screenPath, fullPage: fullPage })
  await browser.close()

}

// Run screenMenuPages()
screenMenuPages({
  // 'target-url': 'https://hepperlehomestead.com'
  'target-url': site_url
})



