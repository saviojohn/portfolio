'use client';

import React, { useState } from 'react';
import styles from './Resume.module.css';

interface ResumeClientActionsProps {
  email: string;
}

export function ResumeClientActions({ email }: ResumeClientActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    const existingFrame = document.getElementById('pdf-print-frame');
    if (existingFrame) {
      existingFrame.remove();
    }
    const iframe = document.createElement('iframe');
    iframe.id = 'pdf-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.src = '/resume.pdf';
    document.body.appendChild(iframe);

    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        window.open('/resume.pdf', '_blank');
      }
    };
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.actionHeader}>
      <div className={styles.actionBadge}>
        <span>📄</span>
        <span>Recruiter Quick Actions</span>
      </div>
      <div className={styles.actionButtonGroup}>
        <button
          onClick={handleCopyEmail}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 14px' }}
        >
          {copied ? '✓ Email Copied' : '✉ Copy Email'}
        </button>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 14px' }}
        >
          👁️ View PDF ↗
        </a>

        <button
          onClick={handlePrint}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 14px' }}
        >
          🖨️ Print
        </button>

        <a
          href="/resume.pdf"
          download="Savio_John_Resume.pdf"
          className="btn btn-primary"
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          ⬇ Download PDF Resume
        </a>
      </div>
    </div>
  );
}

export default ResumeClientActions;
