// scrape-weather.js
const fs = require("fs/promises")
const  {chromium, firefox, webkit} = require("playwright")

async function getWeatherData(url) {
  //To test Firefox:
  const browser = await firefox.launch()
  // const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(url)

  const [temperature] = await page.locator(".myforecast-current-lrg").allInnerTexts()

  const [humidy] = await page.locator("#current_conditions_detail > table > tbody > tr:nth-child(1) > td:nth-child(2)").allInnerTexts()

  const OurObject = {
    temperature, humidy
  }

  await fs.writeFile("ourWeather.json", JSON.stringify(OurObject))
  await browser.close()
}

const sourceUrl = "https://forecast.weather.gov/MapClick.php?lat=40.7533&lon=-74.0038"

getWeatherData(sourceUrl)