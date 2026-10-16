import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const VIEWPORTS = [
  // Compact mobile
  { name: 'Compact Mobile (320x568)', width: 320, height: 568 },
  { name: 'Compact Mobile (320x640)', width: 320, height: 640 },
  { name: 'Compact Mobile (360x640)', width: 360, height: 640 },

  // Standard and large mobile
  { name: 'Standard Mobile (375x667)', width: 375, height: 667 },
  { name: 'Standard Mobile (390x844)', width: 390, height: 844 },
  { name: 'Large Mobile (414x896)', width: 414, height: 896 },
  { name: 'Large Mobile (430x932)', width: 430, height: 932 },
  { name: 'Large Mobile (480x900)', width: 480, height: 900 },

  // Small and standard tablets
  { name: 'Small Tablet (600x960)', width: 600, height: 960 },
  { name: 'Small Tablet (640x800)', width: 640, height: 800 },
  { name: 'Standard Tablet (768x1024)', width: 768, height: 1024 },
  { name: 'Standard Tablet (800x1280)', width: 800, height: 1280 },

  // Large tablets and compact laptops
  { name: 'Large Tablet (900x1200)', width: 900, height: 1200 },
  { name: 'Compact Laptop (1024x768)', width: 1024, height: 768 },
  { name: 'Compact Laptop (1152x864)', width: 1152, height: 864 },
  { name: 'Compact Laptop (1280x720)', width: 1280, height: 720 },

  // Desktop
  { name: 'Desktop (1366x768)', width: 1366, height: 768 },
  { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  { name: 'Desktop (1536x864)', width: 1536, height: 864 },
  { name: 'Desktop (1600x900)', width: 1600, height: 900 },
  { name: 'Desktop (1920x1080)', width: 1920, height: 1080 },

  // Ultrawide
  { name: 'Ultrawide (2560x1440)', width: 2560, height: 1440 },

  // Short landscape viewports
  { name: 'Phone Landscape (844x390)', width: 844, height: 390 },
  { name: 'Phone Landscape Short (640x360)', width: 640, height: 360 }
];

const ROUTES = [
  '/',
  '/services',
  '/about',
  '/projects',
  '/contact',
  '/non-existent-page' // 404 test
];

async function runQA() {
  console.log('🚀 Starting Marvel Softwares Responsive QA Automation Suite...');
  
  // 1. Launch Vite preview server
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    stdio: 'pipe'
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  let browser;
  let hasFailures = false;
  const results = [];

  try {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
    });

    for (const route of ROUTES) {
      console.log(`\n📄 Testing Route: ${route}`);
      for (const vp of VIEWPORTS) {
        await page.setViewport({
          width: vp.width,
          height: vp.height,
          isMobile: vp.width < 1024,
          hasTouch: vp.width < 1024
        });

        const url = `http://localhost:4173${route}`;
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Evaluate layout metrics
        const metrics = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasHorizontalOverflow = scrollWidth > clientWidth;

          // Find overflowing elements if any
          const overflowingElements = [];
          if (hasHorizontalOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > window.innerWidth + 1) {
                overflowingElements.push({
                  tag: el.tagName,
                  className: el.className ? String(el.className).slice(0, 50) : '',
                  right: Math.round(rect.right),
                  viewportWidth: window.innerWidth
                });
              }
            }
          }

          return {
            scrollWidth,
            clientWidth,
            hasHorizontalOverflow,
            overflowingCount: overflowingElements.length,
            overflowSample: overflowingElements.slice(0, 3)
          };
        });

        const status = !metrics.hasHorizontalOverflow ? 'PASS' : 'FAIL';
        if (metrics.hasHorizontalOverflow) {
          hasFailures = true;
        }

        results.push({
          route,
          viewport: vp.name,
          width: vp.width,
          status,
          metrics
        });

        if (status === 'FAIL') {
          console.error(`  ❌ [${status}] ${vp.name} (${vp.width}px): scrollWidth=${metrics.metrics?.scrollWidth || metrics.scrollWidth} > clientWidth=${metrics.clientWidth}`, metrics.overflowSample);
        }
      }
      console.log(`  ✅ All ${VIEWPORTS.length} viewports tested for ${route}`);
    }

    // Interactive navigation QA
    console.log('\n📱 Testing Interactive Mobile Navigation & Escape Key...');
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

    // Click mobile menu button
    const menuButton = await page.$('button[aria-label="Toggle navigation menu"]');
    if (menuButton) {
      await menuButton.click();
      await new Promise(r => setTimeout(r, 400));
      const expanded = await page.evaluate(el => el.getAttribute('aria-expanded'), menuButton);
      console.log(`  Mobile menu open state: aria-expanded="${expanded}"`);

      // Press Escape key
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 400));
      const closed = await page.evaluate(el => el.getAttribute('aria-expanded'), menuButton);
      console.log(`  Mobile menu closed with Escape: aria-expanded="${closed}"`);
    }

    console.log('\n📊 QA Suite Summary:');
    console.log(`  Total test matrix combinations: ${results.length}`);
    const passCount = results.filter(r => r.status === 'PASS').length;
    const failCount = results.filter(r => r.status === 'FAIL').length;
    console.log(`  PASSED: ${passCount}`);
    console.log(`  FAILED: ${failCount}`);
    console.log(`  Console Errors: ${consoleErrors.length}`);

    if (consoleErrors.length > 0) {
      console.error('Console errors detected:', consoleErrors);
    }

  } catch (err) {
    console.error('Error during QA execution:', err);
    hasFailures = true;
  } finally {
    if (browser) await browser.close();
    preview.kill();
    process.exit(hasFailures ? 1 : 0);
  }
}

runQA();
