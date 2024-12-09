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

// Parse site url from args
const site_url = args[0]

// const today = getDateTime()['EN-12'];
const nowDateTime = getDateTime();

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
  domainName = targetUrlObj.hostname.replace("www.", "")


  const dt_pretty = nowDateTime["EN-24-DT-Friendly"]
  console.log(`dt_pretty: ${dt_pretty}\n`)

  // Define screenshot file path
  screenPath = `${screenFolder}/${domainName.split('.')[0]}_${dt_pretty}_SIZEPLACEHOLDER.png`

  
  //DEBUG OUT ...
  console.log(`DEBUGGING VALUES OUT:\n\n*************************\n`)
  console.log(`targetUrlObj: `, targetUrlObj)
  console.log(`domainName: `, domainName)
  console.info(`site_url: ${site_url}`)
  console.log(`nowDateTime:`, nowDateTime)
  console.log(`END DEBUGGING *****\n`)


  //To test Firefox:
  // const browser = await firefox.launch()

  // Testing Chrome
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()


  console.log(`wpSelectors.topNav`, wpSelectors.topNav)
  // Get nav links
  const [navLinks] = await page.locator(wpSelectors.topNav).allInnerTexts()
  console.log(`navLinks: `, navLinks)

  // Get page from url
  // pageName = new URL(targetUrl).pathname.split('/').at(-1).pop()
  // console.log(`pageName: `, pageName)



  // await page.goto(options["target-url"])
  await page.goto(targetUrl)
  // await page.setViewportSize({width: 640, height: 480})
  await page.setViewportSize(viewportSizes["desktop-1920x1080"])
  await page.screenshot({ path: screenPath, fullPage: fullPage })
  await browser.close()

}
// END FUNC screenMenuPages()

// Run screenMenuPages()
screenMenuPages({
  // 'target-url': 'https://hepperlehomestead.com'
  'target-url': site_url
})



/////////////////////// HELPER FUNCTIONS //////////////////////


function getDateTime(dt_fmt = 'US-12') {

  let out_obj = {};
  let date_obj = {};
  let time_obj = {};
  let cur_dt = new Date();

  // Date
  let yr2 = cur_dt.getFullYear().toString().substring(2);
  let yr4 = cur_dt.getFullYear();
  let mo2 = String(cur_dt.getMonth() + 1).padStart(2, 0);
  let dy2 = String(cur_dt.getDate()).padStart(2, 0);
  let date_mmddyy = `${mo2}/${dy2}/${yr2}`;
  let dow_name = Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(cur_dt);
  let mo_long = cur_dt.toLocaleString('default', { month: 'long' });
  let date_full = `${dow_name}, ${mo_long} ${dy2}, ${cur_dt.getFullYear()}`;
  let sql_date = `${yr4}-${mo2}-${dy2}`

  date_obj = {
    yr2, mo2, dy2, date_mmddyy, dow_name, mo_long, date_full, sql_date
  }

  // Time
  let hrs = cur_dt.getHours(); // gets 24 hr val
  let AmOrPm = hrs >= 12 ? 'PM' : 'AM';

  hrs = (hrs % 12) || 12;
  let hrs_pad = hrs.toString().padStart(2, 0);

  let mins = cur_dt.getMinutes();
  let fmt_12hr = `${hrs}:${mins} ${AmOrPm}`;
  let fmt_12hr_pad = `${hrs}:${mins} ${AmOrPm}`;
  let numOnly_24hr = `${hrs}${mins}`

  time_obj = {
    hrs, AmOrPm, mins, fmt_12hr, fmt_12hr_pad, numOnly_24hr
  }


  out_obj.dt = cur_dt;
  out_obj['EN-12'] = {};
  out_obj['EN-12'].date = date_obj;
  out_obj['EN-12'].time = time_obj;
  out_obj['EN-24-DT-Friendly'] = `${sql_date}_${numOnly_24hr}`

  return out_obj;
}
