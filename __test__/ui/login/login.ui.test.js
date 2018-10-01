
const puppeteer = require('puppeteer')
const testConfig = require('../testConfig.json')

const baseUrl = testConfig.baseUrl
const headless = testConfig.headless
jest.setTimeout(60000)

const fillLoginForm = async (page, id, pwd) => {
  await page.focus('#login')
  await page.type('#login', id)
  await page.waitFor(200)
  await page.focus('#password')
  await page.type('#password', pwd)
}

describe('Large screen login modal testing', () => {
  let browser
  let page
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
  test('login should fail', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' })
    const loggedOutCta = await page.$('.react-containers-layout-Header-components-RightMenu-components-SecondaryNav-__styles__loggedOutCta')
    expect(!!loggedOutCta).toBe(true)
    await loggedOutCta.click()
    await fillLoginForm(page, 'seongjun@condos.ca', 'random')
    await page.click('.react-containers-layout-Modals-containers-LoginModal-Login-__styles__loginCtaPanel')
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
    const errorMessage = await page.$eval('.react-containers-layout-Modals-containers-LoginModal-Login-__styles__errorStyle', err => err.innerText)
    expect(errorMessage).toBe('Invalid email or password')
  })
  test('should be able to login', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' })
    const loggedOutCta = await page.$('.react-containers-layout-Header-components-RightMenu-components-SecondaryNav-__styles__loggedOutCta')
    expect(!!loggedOutCta).toBe(true)
    await loggedOutCta.click()
    await fillLoginForm(page, 'seongjun@condos.ca', '6475183846')
    await page.click('.react-containers-layout-Modals-containers-LoginModal-Login-__styles__loginCtaPanel')
    await page.waitFor(500)
    const loggedInCta = await page.$('.react-containers-layout-Header-components-RightMenu-components-SecondaryNav-__styles__loggedInCta')
    expect(!!loggedOutCta).toBe(true)
    await loggedInCta.click()
    const logout = await page.$('.logout')
    expect(!!logout).toBe(true)
    const token = await page.evaluate(() => localStorage.getItem('token'))
    expect(!!token).toBe(true)
  })
})


describe('small screen login modal testing', () => {
  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()
    await page.setViewport({
      width: 460,
      height: 1155,
    })
  })
  afterAll(() => {
    browser.close()
  })

  test('should login modal pop up', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' })
    await page.click('.react-containers-layout-Header-components-RightMenu-components-Hamburger-styles-__property__hamburgerBtn')
    await page.click('.react-containers-layout-Header-components-RightMenu-components-MainNav-__styles__mobileLogIn')
    const loginModal = await page.$('.react-containers-layout-Modals-containers-LoginModal-__styles__login_modal')
    expect(!!loginModal).toBe(true)
  })
})
