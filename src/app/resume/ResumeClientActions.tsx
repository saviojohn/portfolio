'use client';

import React, { useState } from 'react';
import styles from './Resume.module.css';

interface ResumeClientActionsProps {
  email: string;
}

export function ResumeClientActions({ email }: ResumeClientActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
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

        <button
          onClick={handlePrint}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 14px' }}
        >
          🖨️ Print / Save as PDF
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
