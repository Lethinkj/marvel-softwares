import puppeteer from 'puppeteer-core'
import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = 4088
const DIST_DIR = path.resolve('dist')
const SCREENSHOT_DIR = '/home/lethin/.gemini/antigravity-cli/brain/5990136c-5789-4166-895d-264d29e5af2c/screenshots'

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]
  let filePath = path.join(DIST_DIR, urlPath)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  const indexPath = path.join(DIST_DIR, 'index.html')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream(indexPath).pipe(res)
})

server.listen(PORT, async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  })

  try {
    const page = await browser.newPage()

    // Disable CSS animations/transitions for crisp screenshots
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('marvel_cookie_consent', 'accepted')
    })

    // 1. Mobile View (390x844)
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0' })
    await new Promise((r) => setTimeout(r, 600))

    // Check Mobile Technology Section
    const techSection = await page.$('#technologies')
    if (techSection) {
      await page.evaluate((el) => {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, techSection)
      await new Promise((r) => setTimeout(r, 600))
      await techSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-technology-order.png') })
      console.log('Saved mobile-technology-order.png')
    }

    // Check Mobile Projects Section - First Project Card with Visit Live button
    const projectCard = await page.$('#projects article')
    if (projectCard) {
      await page.evaluate((el) => {
        el.scrollIntoView({ behavior: 'instant', block: 'center' })
      }, projectCard)
      await new Promise((r) => setTimeout(r, 600))
      await projectCard.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-visit-live-button.png') })
      console.log('Saved mobile-visit-live-button.png')
    }

    // 2. Desktop View (1440x900)
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await new Promise((r) => setTimeout(r, 500))

    const techDesktop = await page.$('#technologies')
    if (techDesktop) {
      await page.evaluate((el) => {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, techDesktop)
      await new Promise((r) => setTimeout(r, 600))
      await techDesktop.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-technology-layout.png') })
      console.log('Saved desktop-technology-layout.png')
    }
  } catch (err) {
    console.error('Error in puppeteer test:', err)
  } finally {
    await browser.close()
    server.close()
    process.exit(0)
  }
})
