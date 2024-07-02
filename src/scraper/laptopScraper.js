const puppeteer = require('puppeteer')
const fs = require('fs')
const connectDB = require('../config/db')
const Laptop = require('../api/models/laptop')

const scrapeProducts = async () => {
  let browser
  let products = []
  try {
    console.log('Connecting to DB...')
    await connectDB()
    console.log('Connected to DB.')

    const url = 'https://www.amazon.es/'

    console.log('Launching browser...')
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    })
    console.log('Browser launched.')

    const page = await browser.newPage()
    console.log('Navigating to URL...')
    await page.goto(url)
    console.log('URL loaded.')

    await page.waitForSelector('#twotabsearchtextbox')
    await page.type('#twotabsearchtextbox', 'laptop')
    await page.click('#nav-search-submit-button')

    let hasNextPage = true

    while (hasNextPage) {
      console.log('Scraping page...')
      try {
        await page.waitForSelector('.s-pagination-next', {
          visible: true,
          timeout: 5000
        })

        const titles = await page.$$eval('h2 span.a-text-normal', (nodes) =>
          nodes.map((n) => n.innerText)
        )

        const prices = await page.$$eval(
          'span.a-price[data-a-color="base"] span.a-offscreen',
          (nodes) => nodes.map((n) => n.innerText)
        )

        const images = await page.$$eval('img.s-image', (nodes) =>
          nodes.map((n) => n.src)
        )

        for (let i = 0; i < titles.length; i++) {
          products.push({
            title: titles[i] || 'No title',
            price: prices[i] || 'No price',
            image: images[i] || 'No image'
          })
        }

        const nextPageButton = await page.$('.s-pagination-next')
        if (await nextPageButton.evaluate((node) => node.disabled)) {
          console.log('No more pages to navigate.')
          hasNextPage = false
        } else {
          console.log('Navigating to next page...')
          await nextPageButton.click()
        }
      } catch (error) {
        console.error(`Failed to scrape page: ${error}`)
        hasNextPage = false
      }
    }

    // Guardar en MongoDB
    for (const product of products) {
      const productSchema = new Laptop(product)
      try {
        console.log(`Saving ${productSchema.title} to the database...`)
        await productSchema.save()
        console.log(`Successfully saved ${productSchema.title} to the database`)
      } catch (error) {
        console.error(`Failed to save ${productSchema.title} to the database`)
      }
    }
  } catch (error) {
    console.error(`Failed to scrape products: ${error}`)
  } finally {
    // Guardar en products.json
    console.log('Saving products to products.json...')
    fs.writeFileSync(
      'products.json',
      JSON.stringify(products, null, 2),
      'utf-8'
    )
    console.log('All products saved to products.json')

    if (browser) {
      console.log('Closing browser...')
      await browser.close()
      console.log('Browser closed.')
    }
  }
}

scrapeProducts()
