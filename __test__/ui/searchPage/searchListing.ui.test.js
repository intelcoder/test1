const puppeteer = require('puppeteer')

const testConfig = require('../testConfig.json')

const baseUrl = testConfig.baseUrl
const headless = testConfig.headless
jest.setTimeout(50000)


describe('Search page listing testing', () => {
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
  test('should open login modal on fav click', async () => {
    await page.goto(baseUrl + 'toronto', { waitUntil: 'networkidle2' })
    const listingFavIcons = await page.$$('.react-components-ListingPreview-components-FavouriteCta-__styles__favouriteNoBackground')

    if(listingFavIcons && listingFavIcons.length) {
      await listingFavIcons[0].click()
      const loginModal = await page.$('.react-containers-layout-Modals-containers-LoginModal-__styles__login_modal')
      await page.waitFor(200)
      expect(!!loginModal).toBe(true)
    }
  })
  test('.should open login modal on login cta', async () => {
    await page.goto(baseUrl + 'toronto', { waitUntil: 'networkidle2' })
    const loginCta = await page.$('.react-containers-layout-Header-components-RightMenu-components-SecondaryNav-__styles__loggedOutCta')
    expect(!!loginCta).toBe(true)
    await loginCta.click()
    await page.waitFor(200)
    const loginModal = await page.$('.react-containers-layout-Modals-containers-LoginModal-__styles__login_modal')
    expect(!!loginModal).toBe(true)
  })

  test('should show free signup modal on listing page', async () => {
    await page.goto(baseUrl + 'toronto', { waitUntil: 'networkidle2' })
    const lockedListing = await page.$('.react-components-ListingPreview-components-ImgPreview-__styles__previewHoverLocked')
    if(lockedListing) {
      await Promise.all([
        lockedListing.click(),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
      ])
      const freeSignUp = await page.$('.react-containers-pages-Listing-components-ListingHero-components-FreeSignupCard-styles-__property__freeAccountRequired')
      expect(!!freeSignUp).toBe(true)
    }
  })
})
