import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=2'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 90000 })
await new Promise(r => setTimeout(r, 1000))
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')]
  const b = btns.find(b => ['Only Required', 'Accept All'].includes(b.textContent.trim()))
  b?.click()
})
await new Promise(r => setTimeout(r, 300))
// scroll in steps so lazy content + observers settle
await page.evaluate(async () => {
  const el = document.querySelector('#contact')
  const target = el.getBoundingClientRect().top + window.scrollY - 60
  const step = 600
  for (let y = 0; y < target; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) }
  window.scrollTo(0, target)
})
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: process.argv[2] })
const m = await page.evaluate(() => {
  const q = s => document.querySelector(s)
  const el = q('.contact-form .field-input')
  const cs = getComputedStyle(el)
  return { inputH: Math.round(el.getBoundingClientRect().height), minH: cs.minHeight,
           textareaH: Math.round(q('.contact-form .field-textarea').getBoundingClientRect().height),
           formH: Math.round(q('.contact-form').getBoundingClientRect().height) }
})
console.log(JSON.stringify(m))
await browser.close()
