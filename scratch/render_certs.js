const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const certs = [
  {
    filename: 'datacamp_sql.png',
    width: 1200,
    height: 675,
    html: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 675px; font-family: 'Helvetica Neue', Arial, sans-serif; background: #05192d; display: flex; overflow: hidden; }
  .sidebar { width: 300px; height: 100%; background: #05192d; display: flex; align-items: center; justify-content: center; position: relative; }
  .dc-logo { width: 140px; height: 140px; }
  .main { flex: 1; height: 100%; background: #fcfbfa; padding: 60px 70px; display: flex; flex-direction: column; justify-content: space-between; position: relative; color: #111827; }
  .bg-watermark { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px; pointer-events: none; }
  .meta-num { font-size: 13px; font-weight: 600; color: #6b7280; letter-spacing: 1px; }
  .header-title { font-size: 26px; font-weight: 800; letter-spacing: 2px; color: #111827; text-transform: uppercase; text-align: right; }
  .top-row { display: flex; justify-content: space-between; align-items: center; }
  .center-content { margin-top: 20px; }
  .sub-label { font-size: 13px; font-weight: 700; color: #7c3aed; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
  .recipient-name { font-size: 42px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
  .course-title { font-size: 46px; font-weight: 800; color: #0f172a; margin-top: 6px; }
  .bottom-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; }
  .date-box { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; }
  .date-val { font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px; }
  .brand-footer { display: flex; align-items: center; gap: 8px; font-size: 22px; font-weight: 800; color: #05192d; }
  .sig-box { text-align: right; }
  .sig-line { width: 180px; height: 2px; background: #000; margin-bottom: 6px; }
  .sig-name { font-size: 13px; font-weight: 700; color: #374151; }
</style>
</head>
<body>
  <div class="sidebar">
    <svg class="dc-logo" viewBox="0 0 100 100" fill="none">
      <path d="M20 20 L50 45 L20 70 Z M50 45 L80 20 L80 90 L50 65 Z" fill="#00e676"/>
    </svg>
  </div>
  <div class="main">
    <div class="bg-watermark"></div>
    <div class="top-row">
      <div class="meta-num">#17,733,495</div>
      <div class="header-title">Statement of Accomplishment</div>
    </div>
    <div class="center-content">
      <div class="sub-label">Has been awarded to</div>
      <div class="recipient-name">Savio John</div>
      <div class="sub-label">For successfully completing</div>
      <div class="course-title">Introduction to SQL</div>
    </div>
    <div class="bottom-row">
      <div class="date-box">
        COMPLETED ON
        <div class="date-val">FEB 28, 2021</div>
      </div>
      <div class="brand-footer">
        <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
          <path d="M20 20 L50 45 L20 70 Z M50 45 L80 20 L80 90 L50 65 Z" fill="#05192d"/>
        </svg>
        datacamp
      </div>
      <div class="sig-box">
        <svg width="140" height="40" viewBox="0 0 200 60">
          <path d="M10 40 Q 50 10 90 35 T 150 20 T 180 40" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <div class="sig-name">Jonathan Cornelissen, CEO</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    filename: 'microsoft_ai.png',
    width: 1200,
    height: 840,
    html: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 840px; font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; padding: 60px 80px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
  .top-header { display: flex; justify-content: space-between; align-items: center; }
  .ms-logo { display: flex; align-items: center; gap: 14px; }
  .ms-grid { width: 36px; height: 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
  .ms-box-1 { background: #f25022; }
  .ms-box-2 { background: #7fba00; }
  .ms-box-3 { background: #00a4ef; }
  .ms-box-4 { background: #ffb900; }
  .ms-text { font-size: 26px; font-weight: 600; color: #505050; }
  .partner-logos { display: flex; align-items: center; gap: 24px; font-size: 14px; font-weight: 700; color: #444; }
  .center-body { text-align: center; margin-top: 40px; }
  .title-decoration { font-size: 38px; font-weight: 700; color: #1e3a8a; letter-spacing: 4px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 20px; }
  .title-decoration::before, .title-decoration::after { content: ''; width: 80px; height: 2px; background: #1e3a8a; }
  .name-label { font-size: 14px; font-weight: 600; color: #6b7280; letter-spacing: 2px; text-transform: uppercase; margin-top: 36px; }
  .recipient-name { font-size: 40px; font-weight: 800; color: #111827; margin: 12px 0 28px; text-transform: uppercase; }
  .part-label { font-size: 14px; font-weight: 600; color: #6b7280; letter-spacing: 1.5px; text-transform: uppercase; }
  .course-name { font-size: 34px; font-weight: 800; color: #dc2626; margin-top: 10px; }
  .bottom-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; z-index: 2; }
  .issue-date { font-size: 14px; color: #374151; border-bottom: 1px solid #111; padding-bottom: 4px; width: 140px; }
  .issue-label { font-size: 12px; color: #6b7280; margin-top: 6px; }
  .sig-col { text-align: center; }
  .sig-name { font-size: 15px; font-weight: 700; color: #111827; }
  .sig-title { font-size: 12px; color: #6b7280; }
  .bottom-swoosh { position: absolute; bottom: 0; left: 0; width: 100%; height: 120px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #0f172a 100%); clip-path: polygon(0 40%, 100% 80%, 100% 100%, 0% 100%); z-index: 1; }
</style>
</head>
<body>
  <div class="top-header">
    <div class="ms-logo">
      <div class="ms-grid">
        <div class="ms-box-1"></div><div class="ms-box-2"></div>
        <div class="ms-box-3"></div><div class="ms-box-4"></div>
      </div>
      <div class="ms-text">Microsoft</div>
    </div>
    <div class="partner-logos">
      <span>futureskills</span>
      <span style="color:#dc2626; font-size:18px;">NASSCOM</span>
      <span>futureskills prime</span>
    </div>
  </div>

  <div class="center-body">
    <div class="title-decoration">CERTIFICATE</div>
    <div class="recipient-name">SAVIO JOHN</div>
    <div class="part-label">PARTICIPATED IN</div>
    <div class="course-name">Microsoft AI Classroom Series</div>
  </div>

  <div class="bottom-row">
    <div>
      <div class="issue-date">29-01-2021</div>
      <div class="issue-label">Date of issue</div>
    </div>
    <div class="sig-col">
      <svg width="140" height="35" viewBox="0 0 200 50"><path d="M10 35 C40 10, 80 45, 120 15 S170 40, 190 20" stroke="#111" stroke-width="2" fill="none"/></svg>
      <div class="sig-name">Rohini Srivathsa</div>
      <div class="sig-title">National Technology Officer<br/>Microsoft India</div>
    </div>
    <div class="sig-col">
      <svg width="140" height="35" viewBox="0 0 200 50"><path d="M10 25 C50 5, 90 40, 130 10 S160 35, 190 15" stroke="#111" stroke-width="2" fill="none"/></svg>
      <div class="sig-name">Amit Aggarwal</div>
      <div class="sig-title">CEO IT ITeS SSC<br/>NASSCOM</div>
    </div>
  </div>
  <div class="bottom-swoosh"></div>
</body>
</html>`
  },
  {
    filename: 'aws_builders.png',
    width: 1200,
    height: 840,
    html: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 840px; font-family: 'Amazon Ember', Arial, sans-serif; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
  .top-banner { height: 260px; background: linear-gradient(125deg, #d97706 0%, #dc2626 30%, #2563eb 70%, #059669 100%); padding: 40px 60px; color: #ffffff; position: relative; }
  .aws-logo-row { font-size: 32px; font-weight: 900; letter-spacing: -1px; }
  .banner-title { font-size: 52px; font-weight: 800; margin-top: 16px; }
  .banner-sub { font-size: 24px; font-weight: 400; opacity: 0.9; margin-top: 6px; }
  .main-body { flex: 1; padding: 60px 80px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #ffffff; }
  .cert-title { font-size: 38px; font-weight: 800; color: #ea580c; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; }
  .award-label { font-size: 16px; font-weight: 700; color: #374151; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
  .recipient-name { font-size: 44px; font-weight: 800; color: #111827; margin-bottom: 12px; }
  .name-underline { width: 600px; height: 2px; background: #111827; margin-bottom: 30px; }
  .date-label { font-size: 18px; font-weight: 700; color: #111827; letter-spacing: 1px; text-transform: uppercase; }
</style>
</head>
<body>
  <div class="top-banner">
    <div class="aws-logo-row">aws</div>
    <div class="banner-title">Builders Online Series</div>
    <div class="banner-sub">Your quick start to AWS</div>
  </div>
  <div class="main-body">
    <div class="cert-title">Certificate of Attendance</div>
    <div class="award-label">This certificate is awarded to</div>
    <div class="recipient-name">Savio John</div>
    <div class="name-underline"></div>
    <div class="date-label">ON 21 JANUARY, 2021</div>
  </div>
</body>
</html>`
  },
  {
    filename: 'oracle_devgym.png',
    width: 1200,
    height: 840,
    html: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 840px; font-family: Arial, sans-serif; background: #ffffff; padding: 40px; overflow: hidden; }
  .border-box { width: 100%; height: 100%; border: 4px solid #dc2626; padding: 50px 70px; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
  .oracle-header { display: flex; align-items: center; }
  .oracle-badge { background: #dc2626; color: #ffffff; padding: 12px 24px; font-size: 22px; font-weight: 800; letter-spacing: 1px; border-radius: 2px; }
  .oracle-badge span { font-weight: 400; margin-left: 8px; font-size: 18px; }
  .cert-body { text-align: center; margin-top: 20px; }
  .cert-title { font-size: 44px; font-weight: 500; color: #111827; margin-bottom: 24px; font-family: Georgia, serif; }
  .pres-label { font-size: 16px; color: #4b5563; margin-bottom: 12px; }
  .recipient-name { font-size: 38px; font-weight: 700; color: #111827; margin-bottom: 20px; }
  .grade-text { font-size: 18px; color: #111827; margin-bottom: 12px; }
  .course-title { font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px; }
  .teacher-name { font-size: 16px; color: #374151; }
  .bottom-bar { background: #e5e7eb; border-radius: 40px; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; margin-top: 40px; position: relative; }
  .founder-info { font-size: 14px; font-weight: 700; color: #1f2937; }
  .founder-title { font-size: 12px; color: #6b7280; font-weight: 400; }
  .weight-badge { position: absolute; right: -10px; top: -15px; width: 85px; height: 85px; background: #dc2626; border-radius: 50%; border: 4px solid #ffffff; display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
  <div class="border-box">
    <div class="oracle-header">
      <div class="oracle-badge">ORACLE<span>Dev Gym</span></div>
    </div>
    <div class="cert-body">
      <div class="cert-title">Certificate of Excellence</div>
      <div class="pres-label">is presented to</div>
      <div class="recipient-name">Savio John</div>
      <div class="grade-text">for receiving a grade of 98% in</div>
      <div class="course-title">Databases for Developers: Foundations</div>
      <div class="teacher-name">Teacher: Chris Saxon</div>
    </div>
    <div class="bottom-bar">
      <div>
        <div class="founder-info">Presented by: Steven Feuerstein</div>
        <div class="founder-title">Founder, Oracle Dev Gym</div>
      </div>
      <svg width="160" height="30" viewBox="0 0 200 40"><path d="M10 25 C50 5, 90 35, 140 10 S180 30, 190 15" stroke="#111" stroke-width="2" fill="none"/></svg>
      <div class="weight-badge">
        <svg width="45" height="45" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke="#fff" stroke-width="6"/>
          <path d="M30 50 L70 50" stroke="#fff" stroke-width="8"/>
        </svg>
      </div>
    </div>
  </div>
</body>
</html>`
  }
];

async function renderCerts() {
  const browser = await chromium.launch();
  for (const cert of certs) {
    const page = await browser.newPage({
      viewport: { width: cert.width, height: cert.height }
    });
    await page.setContent(cert.html);
    const outputPath = path.join(__dirname, '../public/certifications', cert.filename);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Rendered: ${outputPath}`);
    await page.close();
  }
  await browser.close();
}

renderCerts().catch(console.error);
