const { chromium } = require('playwright');
const path = require('path');

async function convertPdf() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const pdfPath = 'C:/Users/savio/.gemini/antigravity-ide/brain/318fd339-aea0-4440-b614-dbb7aa8bc3a5/media__1786291985196.pdf';
  const fileUrl = 'file:///' + pdfPath;
  
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const outputPath = 'd:/Projects/portfolio/public/certifications/datacamp_sql.png';
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log('Saved DataCamp PDF to:', outputPath);
  
  await browser.close();
}

convertPdf().catch(console.error);
