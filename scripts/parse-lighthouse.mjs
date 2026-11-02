import fs from 'node:fs'

const reportPath = process.argv[2] || '/tmp/lighthouse-mobile.json'

if (!fs.existsSync(reportPath)) {
  console.error(`Report file not found: ${reportPath}`)
  process.exit(1)
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
const categories = report.categories || {}
const audits = report.audits || {}

console.log('=== LIGHTHOUSE AUDIT RESULTS ===')
console.log(`URL: ${report.requestedUrl}`)
console.log(`Device: ${report.configSettings?.formFactor || 'unknown'}`)
console.log('--------------------------------')
console.log(`Performance Score:    ${Math.round((categories.performance?.score || 0) * 100)} / 100`)
console.log(`Accessibility Score:  ${Math.round((categories.accessibility?.score || 0) * 100)} / 100`)
console.log(`Best Practices Score: ${Math.round((categories['best-practices']?.score || 0) * 100)} / 100`)
console.log(`SEO Score:            ${Math.round((categories.seo?.score || 0) * 100)} / 100`)
console.log('--------------------------------')
console.log(`LCP (Largest Contentful Paint): ${audits['largest-contentful-paint']?.displayValue || 'N/A'}`)
console.log(`FCP (First Contentful Paint):    ${audits['first-contentful-paint']?.displayValue || 'N/A'}`)
console.log(`TBT (Total Blocking Time):       ${audits['total-blocking-time']?.displayValue || 'N/A'}`)
console.log(`CLS (Cumulative Layout Shift):  ${audits['cumulative-layout-shift']?.displayValue || 'N/A'}`)
console.log(`Speed Index:                     ${audits['speed-index']?.displayValue || 'N/A'}`)
console.log('================================')
