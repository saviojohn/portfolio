const { chromium } = require('playwright');
const path = require('path');

async function convertPdfEmbed() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 } });
  
  const pdfPath = 'C:/Users/savio/.gemini/antigravity-ide/brain/318fd339-aea0-4440-b614-dbb7aa8bc3a5/media__1786291985196.pdf';
  
  const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin:0; padding:0; overflow:hidden; }
  body, html { width:100%; height:100%; }
  iframe { width:100%; height:100%; border:none; }
</style>
</head>
<body>
  <iframe src="file:///${pdfPath}#toolbar=0&navpanes=0&scrollbar=0"></iframe>
</body>
</html>`;

  await page.setContent(html);
  await page.waitForTimeout(2000);
  
  const outputPath = 'd:/Projects/portfolio/public/certifications/datacamp_sql.png';
  await page.screenshot({ path: outputPath });
  console.log('Successfully saved DataCamp PDF screenshot to:', outputPath);
  
  await browser.close();
}

convertPdfEmbed().catch(console.error);
