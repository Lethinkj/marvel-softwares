import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 1000))
const hits = await page.evaluate(() => {
  const out = []
  const y0 = 800, y1 = 1350
  const scan = (el, pseudo) => {
    const cs = getComputedStyle(el, pseudo)
    const bg = cs.backgroundImage || ''
    const bs = cs.boxShadow || ''
    const filt = cs.filter || ''
    const op = parseFloat(cs.opacity)
    const interesting =
      (/gradient|url\(/.test(bg) && bg !== 'none') ||
      (bs !== 'none' && bs !== '') ||
      /blur|drop-shadow/.test(filt)
    if (!interesting) return
    const r = el.getBoundingClientRect()
    const docTop = r.top + window.scrollY
    const docBottom = docTop + r.height
    if (docBottom < y0 || docTop > y1) return
    if (r.width === 0 || r.height === 0) return
    if (r.right < 300) return // only right side
    out.push({
      pseudo: pseudo || 'self',
      tag: el.tagName.toLowerCase(),
      cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 100),
      pos: cs.position, z: cs.zIndex, opacity: op,
      docTop: Math.round(docTop), docBottom: Math.round(docBottom),
      left: Math.round(r.left), right: Math.round(r.right),
      w: Math.round(r.width), h: Math.round(r.height),
      bg: bg.slice(0, 120), boxShadow: bs.slice(0, 120), filter: filt.slice(0, 80),
    })
  }
  for (const el of document.querySelectorAll('*')) {
    scan(el, null)
    scan(el, '::before')
    scan(el, '::after')
  }
  return out
})
console.log(JSON.stringify(hits, null, 2))
await browser.close()
