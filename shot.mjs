import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const OUT = 'C:/Users/haris/AppData/Local/Temp/opencode/shots'
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
})

const page = await browser.newPage()
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const views = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
]

for (const v of views) {
  await page.setViewport({ width: v.width, height: v.height, isMobile: v.width < 768, hasTouch: v.width < 768 })
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 900))

  await page.screenshot({ path: `${OUT}/home-${v.name}-hero.png` })
  await page.screenshot({ path: `${OUT}/home-${v.name}-full.png`, fullPage: true })

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    heroHeight: document.querySelector('.hero-inner')?.getBoundingClientRect().height,
    viewport: window.innerHeight,
  }))
  console.log(v.name, JSON.stringify(metrics))
}

console.log('ERRORS:', errors.length ? errors : 'none')
await browser.close()
