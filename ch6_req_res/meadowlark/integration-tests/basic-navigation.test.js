const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark.js')

let server = null
let port = null

//* beforeEach and afterEach function helpers from Jest. Before each test and after each test
//* beforeAll and afterAll for don't stop server every time
beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('Home page link on page About', async () => {
    jest.setTimeout(10000)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})