import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=2'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 90000 })
await new Promise(r => setTimeout(r, 800))
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')]
  const b = btns.find(b => ['Only Required', 'Accept All'].includes(b.textContent.trim()))
  b?.click()
})
await new Promise(r => setTimeout(r, 400))
await page.evaluate(() => document.querySelector('#contact .contact-form')?.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 1000))
await page.screenshot({ path: process.argv[2] })
const m = await page.evaluate(() => {
  const q = s => document.querySelector(s)
  const r = el => el ? Math.round(el.getBoundingClientRect().height) : null
  return { inputH: r(q('.contact-form .field-input')), textareaH: r(q('.contact-form .field-textarea')),
           labelSize: q('.contact-form .field-label') ? getComputedStyle(q('.contact-form .field-label')).fontSize : null,
           formH: r(q('.contact-form')) }
})
console.log(JSON.stringify(m))
await browser.close()
