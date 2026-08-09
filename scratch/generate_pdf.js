const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Savio John Resume</title>
  <style>
    @page {
      size: A4;
      margin: 0.35in 0.4in;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #111111;
      line-height: 1.35;
      font-size: 10.2pt;
      background: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 8px;
    }
    .header h1 {
      font-size: 20pt;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 3px;
      text-transform: uppercase;
    }
    .header .subtitle {
      font-size: 10.5pt;
      font-weight: 500;
      color: #222222;
      margin-bottom: 4px;
    }
    .header .contact-line {
      font-size: 8.5pt;
      color: #333333;
      word-spacing: 1px;
    }
    .header .contact-line a {
      color: #0044cc;
      text-decoration: underline;
    }
    .section-title {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 9px;
      margin-bottom: 3px;
      padding-bottom: 2px;
      border-bottom: 1.5px solid #111111;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 10pt;
      margin-top: 4px;
      margin-bottom: 2px;
    }
    .exp-company {
      font-weight: 700;
    }
    .exp-date {
      font-weight: 700;
      font-size: 9.5pt;
    }
    .sub-section-title {
      font-size: 9.5pt;
      font-weight: 700;
      font-style: italic;
      margin-top: 3px;
      margin-bottom: 2px;
    }
    ul {
      padding-left: 15px;
      margin-bottom: 3px;
    }
    li {
      margin-bottom: 2px;
      font-size: 9.2pt;
      line-height: 1.3;
    }
    .project-header {
      font-size: 9.8pt;
      font-weight: 700;
      margin-top: 4px;
      margin-bottom: 1px;
    }
    .project-tech {
      font-weight: 400;
      font-style: italic;
      font-size: 9pt;
      color: #333;
    }
    .project-github {
      font-size: 8.8pt;
      margin-left: 15px;
      margin-bottom: 3px;
    }
    .project-github a {
      color: #0044cc;
      text-decoration: underline;
    }
    .skills-row {
      font-size: 9.2pt;
      margin-bottom: 3px;
      line-height: 1.35;
    }
    .skills-label {
      font-weight: 700;
    }
    .cert-item {
      font-size: 9.2pt;
      margin-bottom: 2px;
    }
    .edu-row {
      font-size: 9.5pt;
      display: flex;
      justify-content: space-between;
      margin-top: 3px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SAVIO JOHN</h1>
    <div class="subtitle">Full-Stack Software Engineer — Mobile · Web · Backend</div>
    <div class="contact-line">
      Kochi, Kerala, India &nbsp;|&nbsp; 
      <a href="mailto:savio.john.t@gmail.com">savio.john.t@gmail.com</a> &nbsp;|&nbsp; 
      +91-8248155832 &nbsp;|&nbsp; 
      <a href="https://www.linkedin.com/in/savio-john-b927821b5/">linkedin.com/in/savio-john-b927821b5/</a> &nbsp;|&nbsp; 
      <a href="https://github.com/saviojohn">github.com/saviojohn</a> &nbsp;|&nbsp; 
      <a href="https://saviojohn.github.io/portfolio">saviojohn.github.io/portfolio</a>
    </div>
  </div>

  <div class="section-title">EXPERIENCE</div>
  <div class="exp-header">
    <span class="exp-company">Software Engineer — DataEquinox</span>
    <span class="exp-date">(Dec 2023 – Present)</span>
  </div>

  <div class="sub-section-title">Mobile (Flutter)</div>
  <ul>
    <li>Built a customer-facing fintech mobile app end-to-end (Flutter, Riverpod, GoRouter, Dio) — Flutter Secure Storage-backed auth, KYC document verification, multi-currency wallets, config-driven FX/remittance transfer flows, and in-app support chat — spanning 15 feature modules on iOS and Android</li>
    <li>Implemented a real-time sync layer (Socket.IO, 14+ event types) keeping wallet balances, transaction status, and chat updated without manual refresh, plus FCM/APNs push notifications with deep-link navigation</li>
    <li>Shipped bilingual EN/JA localization (~1,232 keys/locale) with backend locale-map resolution that preserves in-progress transfer/KYC state across language switches</li>
  </ul>

  <div class="sub-section-title">Backend (FastAPI)</div>
  <ul>
    <li>Built an end-to-end Firebase Cloud Messaging pipeline (device registry, RabbitMQ workers, Redis dedupe/rate-limiting) for a FastAPI remittance backend (PostgreSQL, Alembic, Dockerized), delivering push notifications across 4 customer event types</li>
    <li>Implemented a secure forgot-password flow (OTP via AWS SES, Redis-backed sessions, rate limiting, JWT invalidation on reset), covered by 13 automated tests</li>
  </ul>

  <div class="sub-section-title">Web (Next.js / React)</div>
  <ul>
    <li>Built customer-account modules (address/profile CRUD, wishlist, dual-auth order invoices for guest and logged-in users) with Formik/Yup validated forms and Google Tag Manager e-commerce instrumentation (10+ event types) for a retail storefront</li>
    <li>Built and deployed (Firebase Hosting, GitHub Actions CI/CD) a staff/security gate-pass admin module integrating 17 REST endpoints for CRUD, filtering, pagination, and QR-based check-in/check-out workflows, with thermal-print (80mm) pass generation and Excel export</li>
    <li>Built WhatsApp template creation, campaign broadcast hardening, and Meta embedded signup onboarding for a business messaging platform supporting 25+ reseller brand configurations across 6 locales</li>
  </ul>

  <div class="section-title">PERSONAL PROJECTS</div>
  <div class="project-header">
    CogniView — AI Movie Discovery App <span class="project-tech">(React 19, Redux Toolkit, OpenAI API, TMDB API, Firebase)</span>
  </div>
  <ul>
    <li>Built a GPT-3.5-powered natural-language movie recommendation engine with parallel TMDB metadata resolution, Firebase auth, and 3-language localized UI</li>
  </ul>
  <div class="project-github">GitHub: <a href="https://github.com/saviojohn/CogniView">github.com/saviojohn/CogniView</a></div>

  <div class="project-header" style="margin-top: 3px;">
    Crypto Order Book & Market Indicators Dashboard <span class="project-tech">(Next.js 15, TypeScript, MUI 7, Recharts, Binance WebSockets)</span>
  </div>
  <ul>
    <li>Built a custom WebSocket hook streaming live top-10 bid/ask depth for BTC/ETH/XRP, with Recharts-based cumulative depth charts, a rolling spread buffer, and a buy/sell pressure indicator</li>
  </ul>
  <div class="project-github">GitHub: <a href="https://github.com/saviojohn/orderbook-market-indicators">github.com/saviojohn/orderbook-market-indicators</a></div>

  <div class="section-title">SKILLS</div>
  <div class="skills-row"><span class="skills-label">Mobile:</span> Flutter · Dart · Riverpod · Provider · GoRouter · Dio · Firebase Cloud Messaging · APNs · WebSocket / Socket.IO · Flutter Secure Storage · Config-Driven UI · iOS & Android</div>
  <div class="skills-row"><span class="skills-label">Frontend / Web:</span> React · Next.js (App & Pages Router) · TypeScript · Redux Toolkit · Recharts · Material UI (MUI) · Formik / Yup · Config-Driven UI · Google Tag Manager · QR Code Gen. & Scanning · PDF Generation (react-pdf) · WhatsApp Business API</div>
  <div class="skills-row"><span class="skills-label">Backend:</span> Python · FastAPI · Pydantic · PostgreSQL · Async SQLAlchemy · Alembic · Redis · RabbitMQ · python-socketio · Firebase Admin SDK · AWS SES (boto3) · OpenAI API</div>
  <div class="skills-row"><span class="skills-label">Tools & Practices:</span> REST API Integration · Git · Docker · CI/CD (GitHub Actions) · JWT Auth · i18n / Localization · Excel Export (SheetJS) · Unit / Widget / Golden / Integration Testing (pytest, flutter_test)</div>

  <div class="section-title">EDUCATION</div>
  <div class="edu-row">
    <span><b>Amrita Vishwa Vidyapeetham</b> — Bachelor of Computer Applications (BCA)</span>
    <span><b>2020 – 2023</b></span>
  </div>

  <div class="section-title" style="margin-top: 8px;">CERTIFICATIONS</div>
  <div class="cert-item">• JavaScript, React & Frontend System Design — NamasteDev (Akshay Saini)</div>
  <div class="cert-item">• Databases for Developers (98%) — Oracle Dev Gym · Introduction to SQL (#17733495) — DataCamp</div>
  <div class="cert-item">• Microsoft AI Classroom Series — Microsoft & NASSCOM · AWS Builders Series — Amazon Web Services</div>
</body>
</html>
`;

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '0.35in',
      bottom: '0.35in',
      left: '0.4in',
      right: '0.4in'
    },
    printBackground: true
  });
  await browser.close();

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBuffer);
  fs.writeFileSync(path.join(publicDir, 'Savio_John_Resume.pdf'), pdfBuffer);
  console.log('PDF generated successfully at public/resume.pdf');
}

generatePDF().catch(console.error);
