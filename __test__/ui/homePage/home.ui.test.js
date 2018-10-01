const puppeteer = require('puppeteer')
const testConfig = require('../testConfig.json')

const baseUrl = testConfig.baseUrl
const headless = testConfig.headless
jest.setTimeout(20000)

const selectHomeSearchAndType = async (page, type) => {
  await page.click('.react-components-SiteSearch-__homeStyles__siteSearch .react-autosuggest__input')
  await page.focus('.react-components-SiteSearch-__homeStyles__siteSearch .react-autosuggest__container')
  await page.type('.react-autosuggest__container', type)
  await page.waitFor(200)
}
describe('Home page testing', () => {
  let browser,
    page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()
    await page.setViewport({
      width: 960,
      height: 780,
    })
  })
  afterAll(() => {
    browser.close()
  })
  describe('autocomplete test', () => {
    test('should move to search page and select the beach area', async () => {
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })
      await selectHomeSearchAndType(page, 'The Beach')
      await page.keyboard.press('ArrowDown', { delay: 1000 })
      await page.keyboard.press('Enter', { delay: 1000 })
      page.waitForNavigation({ waitUntil: 'networkidle2' })
      const h1 = await page.$eval('h1', h => h.innerText)
      expect(h1).toMatch('The Beach')
    })
    test('should show "search in other area box"', async () => {
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })
      await selectHomeSearchAndType(page, 'xxxxxxxxx')
      const text = await page.$eval('.react-components-MainAlgoAutoComplete-__styles__searchOtherAreasCta', button => button.innerText)
      expect(text).toMatch('Search In Other Areas')
    })
  })
  describe('Area selector click', () => {
    test('should update hero title', async () => {
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })
      await page.click('.react-components-AreaSelector-__headerStyles__currentCity')
      const areaList = await page.$$('.react-components-AreaSelector-__headerStyles__areaList ul li')
      const prom = areaList.map(async (area) => {
        const v = await (await area.getProperty('innerHTML')).jsonValue()
        if(v === 'Mississauga') {
          return area.click()
        }
      })
      await Promise.all(prom)
      const labels = await page.$eval('.react-containers-pages-Home-__styles__subtitle', label => label.innerText)
      expect(labels).toMatch('Mississauga')
    })
  })
})
