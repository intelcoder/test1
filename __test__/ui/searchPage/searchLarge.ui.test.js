const puppeteer = require('puppeteer')
const testConfig = require('../testConfig.json')

const baseUrl = testConfig.baseUrl
const headless = testConfig.headless

export const searchFilterTypeAndSelectFirstItem = async (page, text) => {
  await page.click('#filterSearch')
  await page.focus('.react-autosuggest__container input')
  await page.type('.react-autosuggest__container input', text)
  await page.waitFor(200)
  await page.keyboard.press('ArrowDown', { delay: 100 })
  await Promise.all([
    page.keyboard.press('Enter', { delay: 200 }),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ])
}
jest.setTimeout(50000)

describe('Search page testing', () => {
  let browser,
    page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()
    await page.setViewport({
      width: 1200,
      height: 1155,
    })
  })
  afterAll(() => {
    browser.close()
  })

  describe('Title and h1 is correct', () => {
    beforeAll(async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale', { waitUntil: 'networkidle2' })
    })
    test('Title == Toronto Homes For Sale & Rent ', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale', { waitUntil: 'networkidle2' })
      const title = await page.title()
      expect(title).toMatch('Toronto Homes For Sale & Rent ')
    })
    test('h1 tag contains Toronto Homes For Sale', async () => {
      const h1 = await page.$eval('h1', h => h.innerText)
      expect(h1).toMatch('Toronto Homes For Sale')
    })
  })

  describe('Search autocomple should select area', async () => {
    test('should select beach and annex area', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale', { waitUntil: 'networkidle2' })
      await searchFilterTypeAndSelectFirstItem(page, 'the beach')
      let url = await page.url()
      expect(url).toMatch('toronto/the-beach/homes-for-sale?neighbourhood_id=4000000297')
      await searchFilterTypeAndSelectFirstItem(page, 'the annex')
      url = await page.url()
      expect(url).toMatch(baseUrl + decodeURIComponent('toronto/homes-for-sale?neighbourhood_id=4000000297%2C4000000343'))
    })

    test('map driven toggle should deselect areas', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale?neighbourhood_id=4000000297%2C4000000343', { waitUntil: 'networkidle2' })
      await Promise.all([
        page.click('#mapDrivenSelector'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
      ])
      const url = await page.url()
      expect(url).not.toMatch('neighbourhgood_id')
      expect(url).toMatch('map_bounds')
    })
  })

  describe('Analytics selected area matches', () => {
    test('should have 5 area tabs', async () => {
      await page.goto(baseUrl + 'north-york/homes-for-sale?bedrooms=2&neighbourhood_id=4000000259,4000000287,4000000286,4000000288&tab=analytics', { waitUntil: 'networkidle2' })
      await page.mainFrame().waitForSelector('.react-containers-pages-Search-__styles__tabWrapActive .tabs-title')
      const titles = await page.$$('.react-containers-pages-Search-__styles__tabWrapActive .tabs-title')
      expect(titles.length).toBe(5)
    })
    test('should have correct tab titles', async () => {
      await page.goto(baseUrl + 'north-york/homes-for-sale?bedrooms=2&neighbourhood_id=4000000259,4000000287&tab=analytics', { waitUntil: 'networkidle2' })
      await page.waitFor(200)
      await page.mainFrame().waitForSelector('.react-containers-pages-Search-__styles__tabWrapActive .tabs-title')
      const titles = await page.evaluate(() => {
        const titleDoms = document.querySelectorAll('.react-containers-pages-Search-__styles__tabWrapActive .tabs-title')
        return Array.prototype.slice.call(titleDoms).map(title => title.textContent)
      })
      expect(titles).toHaveLength(3)
      expect(titles).toEqual(expect.arrayContaining(['Banbury-Don Millsicon-arrow', 'Parkwoodsicon-arrow', 'North Yorkicon-arrow']))
    })
  })
})


// jest.setTimeout(100000)
// describe('area selector test', () => {
//   let browser, page
//   beforeAll (async () => {
//     browser = await puppeteer.launch({ headless })
//     page = await browser.newPage()
//     await page.setViewport({
//       width: 1200,
//       height: 1155
//     })
//   })
//   test('selecting area select should change url, header', async (done) => {
//     await page.goto('http://app.localhost:3333/toronto/homes-for-sale', { waitUntil: 'networkidle2' })
//     await page.click('.react-components-AreaSelector-__headerStyles__currentCity')
//     const areaList = await page.$$('.react-components-AreaSelector-__headerStyles__areaList ul li')
//     areaList.forEach(async (li, index) => {
//       await page.waitFor(index * 2000)
//       await Promise.all([
//         li.click(),
//         page.waitForNavigation({ waitUntil: 'networkidle2' })
//       ])
//       const heading = await page.$eval('h1', h => h.innerText)
//       const currentArea =
//         await page.$eval('.react-components-AreaSelector-__headerStyles__currentCity', h => h.innerText)
//       expect(heading.toLowerCase()).toMatch(currentArea.toLowerCase())
//       await Promise.all([
//         page.click('.react-components-AreaSelector-__headerStyles__currentCity'),
//         page.waitForNavigation({ waitUntil: 'networkidle2' })
//       ])
//     })
//     setTimeout(() => {
//       browser.close()
//       done()
//     }, areaList.length * 2500)
//   })
// })
