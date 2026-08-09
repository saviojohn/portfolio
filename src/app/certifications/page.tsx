import React from 'react';
import type { Metadata } from 'next';
import { SITE_NAME } from '../../lib/config';
import { getAllCertifications, getUniqueCertificationTags } from '../../lib/content';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { CertificationsClient } from './CertificationsClient';
import styles from './Certifications.module.css';

export const metadata: Metadata = {
  title: `Certifications & Credentials | ${SITE_NAME}`,
  description: 'Verified certifications, credentials, degrees, and technical specializations earned by Savio John.',
};

export default function CertificationsPage() {
  const certifications = getAllCertifications();
  const availableTags = getUniqueCertificationTags();

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.eyebrow}>02 · VERIFIED CREDENTIALS</div>
            <h1 className={styles.title}>Certifications &amp; Accomplishments</h1>
            <p className={styles.subtitle}>
              Verified industry certifications, degree credentials, and specialized course completions across Mobile Engineering, Web Architecture, and Asynchronous Systems.
            </p>
          </header>

          <CertificationsClient
            certifications={certifications}
            availableTags={availableTags}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
