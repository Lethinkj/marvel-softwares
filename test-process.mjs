import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('ms_entry_revealed', '1');
    localStorage.setItem('marvel_cookie_consent', 'accepted');
  });

  // Desktop 1440
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:5183/#process', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const sec = document.getElementById('process');
    if (sec) {
      sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      window.dispatchEvent(new Event('scroll'));
    }
  });
  await new Promise(r => setTimeout(r, 2200));

  let processSec = await page.$('#process');
  if (processSec) {
    await processSec.screenshot({ path: '/home/lethin/.gemini/antigravity-cli/brain/5990136c-5789-4166-895d-264d29e5af2c/screenshots/process-desktop.png' });
    console.log('Saved process-desktop.png');
  }

  // Tablet 768
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => {
    const sec = document.getElementById('process');
    if (sec) {
      sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      window.dispatchEvent(new Event('scroll'));
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  processSec = await page.$('#process');
  if (processSec) {
    await processSec.screenshot({ path: '/home/lethin/.gemini/antigravity-cli/brain/5990136c-5789-4166-895d-264d29e5af2c/screenshots/process-tablet.png' });
    console.log('Saved process-tablet.png');
  }

  // Mobile 375
  await page.setViewport({ width: 375, height: 900 });
  await page.evaluate(() => {
    const sec = document.getElementById('process');
    if (sec) {
      sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      window.dispatchEvent(new Event('scroll'));
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  processSec = await page.$('#process');
  if (processSec) {
    await processSec.screenshot({ path: '/home/lethin/.gemini/antigravity-cli/brain/5990136c-5789-4166-895d-264d29e5af2c/screenshots/process-mobile.png' });
    console.log('Saved process-mobile.png');
  }

  await browser.close();
})();
