
/* eslint-disable */
const puppeteer = require('puppeteer');
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
describe('Mobile Search page test', () => {
  let browser, page
  beforeAll (async () => {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()
    await page.setViewport({
      width: 480,
      height: 780
    })
  })
  afterAll (() => {
    browser.close()
  })
  describe('Search autocomple should select area', async () => {
    test('should select beach and update h1 and url', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale', { waitUntil: 'networkidle2' })
      await searchFilterTypeAndSelectFirstItem(page, 'The beach')
      let url = await page.url()
      expect(url).toMatch(baseUrl + 'toronto/the-beach/homes-for-sale?neighbourhood_id=4000000297')
      const h1 = await page.$eval('h1', h => h.innerText)
      expect(h1).toMatch('The Beach')
    })
    test('should show filter text place holder', async () => {

      await page.click('#mobileFilter')
      await page.waitFor(500)
      await page.waitForFunction(() => document.querySelector('.react-components-FilterSearch-__styles__placeholderMobile'), {
        polling: 'mutation'
      });
      const filterText = await page.$eval('.react-components-FilterSearch-__styles__placeholderMobile', filter => filter.innerText)
      expect(filterText).toMatch('1 filter')
      await searchFilterTypeAndSelectFirstItem(page, 'The annex')
      await page.click('#mobileFilter')
      await page.waitFor(500)
      await page.waitForFunction(() => document.querySelector('.react-components-FilterSearch-__styles__placeholderMobile'), {
        polling: 'mutation'
      });
      const filterText2 = await page.$eval('.react-components-FilterSearch-__styles__placeholderMobile', filter => filter.innerText)
      expect(filterText2).toMatch('2 filters')
    })
  })

  describe('Search autocomple should select area', async () => {
    test('should show page 2 in pagination', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale?page=2', { waitUntil: 'networkidle2' })
      const liClasses = await page.evaluate(() => {
        const doms = document.querySelectorAll('.react-containers-layout-PaginatedList-__styles__pagination ul li')
        const liList = Array.prototype.slice.call(doms)
        return liList.map(li => li.classList)
      })
      const active = liClasses.filter(li => li[0] === 'react-containers-layout-PaginatedList-Pagination-__styles__paginationItemActive')
      expect(!!active).toBe(true)

    })
  })
  describe('pagination should work', async () => {
    test('click page 2 should add page=2 to url params', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale', { waitUntil: 'networkidle2' })
      const paginateList = await page.$$('.react-containers-layout-PaginatedList-__styles__pagination ul li')
      if(paginateList && paginateList.length > 2) {
        await Promise.all([
          paginateList[1].click(),
          page.waitForNavigation({ waitUntil: 'networkidle2' })
        ])
      }
      const liClasses = await page.evaluate(() => {
        const doms = document.querySelectorAll('.react-containers-layout-PaginatedList-__styles__pagination ul li')
        const liList = Array.prototype.slice.call(doms)
        return liList.map(li => li.classList)
      })
      const active = liClasses
        .filter(li => li[0] === 'react-containers-layout-PaginatedList-Pagination-__styles__paginationItemActive')
      await page.waitFor(100)
      expect(!!active).toBe(true)
      const url = await page.url()
      expect(url).toMatch('page=2')
    })
  })
  test('area select should remove page params', async () => {
    await page.goto(baseUrl + 'toronto/homes-for-sale?page=2', { waitUntil: 'networkidle2' })
    await page.click('#filterSearch')
    await page.focus('.react-autosuggest__container input')
    await page.type('.react-autosuggest__container input', 'the beach')
    await page.waitFor(200)
    await page.keyboard.press('ArrowDown', { delay: 100 })
    await Promise.all([
      page.keyboard.press('Enter', { delay: 200 }),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])

    const url = await page.url()
    expect(url).not.toMatch('page=2')
  })
  describe('Area selector change updates analytics', () => {
    test('Select area from toronto to missisaga update analytics', async () => {
      await page.goto(baseUrl + 'toronto/homes-for-sale?tab=analytics', { waitUntil: 'networkidle2' })
      await page.click('.react-components-AreaSelector-__headerStyles__currentCity')

      const areaList = await page.$$('.react-components-AreaSelector-__headerStyles__areaList ul li')
      const prom = areaList.map(async (area) => {
        const v = await (await area.getProperty('innerHTML')).jsonValue()
        if(v === 'Mississauga') {
          return area.click()
        }
      })
      await Promise.all([prom])
      await page.waitFor(1000)
      const title = await page.$eval('.react-containers-layout-ContentBox-__styles__graph_title', label => label.innerText)
      expect(title).toMatch('Mississauga')
    })

    test('Select area from toronto to Brampton update analytics', async () => {
      await page.click('.react-components-AreaSelector-__headerStyles__currentCity')
      const areaList = await page.$$('.react-components-AreaSelector-__headerStyles__areaList ul li')
      const prom = areaList.map(async (area) => {
        const v = await (await area.getProperty('innerHTML')).jsonValue()
        if(v === 'Brampton') {
          return Promise.all([
            area.click(),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
          ])
        }
      })
      await Promise.all(prom)
      await page.waitFor(500)
      const title = await page.$eval('.react-containers-layout-ContentBox-__styles__graph_title', label => label.innerText)
      expect(title).toMatch('Brampton')
    })
  })

  describe('search autocomplete pick up params from url', () => {
    test('should have 2 filters ', async () => {
      await page.goto('http://app.localhost:3333/toronto/the-beach/homes-for-sale?neighbourhood_id=4000000297&bedrooms=2', { waitUntil: 'networkidle2' })
      const bTitle = await page.title()
      const heading = await page.$eval('h1', h => h.innerText)
      expect(bTitle).toMatch('The Beach')
      expect(heading).toMatch('The Beach')
      await page.waitForFunction(() => document.querySelector('.react-components-FilterSearch-__styles__placeholderMobile'), {
        polling: 'mutation'
      });
      const filterText = await page.$eval('.react-components-FilterSearch-__styles__placeholderMobile', filter => filter.innerText)
      expect(filterText).toMatch('2 filters')
    })
  })

})


