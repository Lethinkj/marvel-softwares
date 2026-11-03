import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu'] })
for (const v of [{n:'desktop',w:1440,h:900},{n:'mobile',w:390,h:844}]) {
  const page = await browser.newPage()
  await page.setViewport({ width: v.w, height: v.h, isMobile: v.w<768, hasTouch: v.w<768 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise(r=>setTimeout(r,800))
  await page.evaluate(()=>{ document.querySelectorAll('div.fixed.bottom-4').forEach(e=>e.remove()); document.documentElement.style.scrollBehavior='auto'; document.querySelector('.marvel-cta').scrollIntoView({block:'center'}); })
  await new Promise(r=>setTimeout(r,1800))
  const el = await page.$('.marvel-cta')
  await el.screenshot({ path: `/tmp/opencode/cta17-${v.n}.png` })
  const c = await page.evaluate(()=>{const cv=document.querySelector('.cta-particles');return cv?{w:cv.width,h:cv.height,cw:cv.clientWidth,ch:cv.clientHeight}:null})
  console.log(v.n, JSON.stringify(c))
}
await browser.close()
