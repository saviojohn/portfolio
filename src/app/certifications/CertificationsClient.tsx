/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import type { Certification } from '../../lib/types';
import styles from './Certifications.module.css';

interface CertificationsClientProps {
  certifications: Certification[];
  availableTags: string[];
}

export function CertificationsClient({ certifications, availableTags }: CertificationsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCertifications = selectedTag === 'All'
    ? certifications
    : certifications.filter((c) => c.tags?.includes(selectedTag));

  return (
    <>
      {/* Category Filter Tabs */}
      <div className={styles.filterBar}>
        <button
          onClick={() => setSelectedTag('All')}
          className={`${styles.filterBtn} ${selectedTag === 'All' ? styles.filterBtnActive : ''}`}
        >
          All ({certifications.length})
        </button>
        {availableTags.map((tag) => {
          const count = certifications.filter((c) => c.tags?.includes(tag)).length;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`${styles.filterBtn} ${selectedTag === tag ? styles.filterBtnActive : ''}`}
            >
              {tag} ({count})
            </button>
          );
        })}
      </div>

      {/* Certifications Grid */}
      <div className={styles.grid}>
        {filteredCertifications.map((cert) => (
          <div
            key={cert.slug}
            className={styles.card}
            onClick={() => setActiveCert(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveCert(cert);
              }
            }}
          >
            <div className={styles.imageWrapper}>
              <img
                src={cert.image || '/certifications/flutter_certification.svg'}
                alt={cert.title}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.issuer}>{cert.issuer}</span>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <p className={styles.cardDescription}>{cert.description}</p>

              <div className={styles.cardFooter}>
                <span className={styles.date}>
                  {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                {cert.tags && cert.tags.length > 0 && (
                  <div className={styles.tags}>
                    {cert.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className={styles.tagPill}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeCert && (
        <div className={styles.modalBackdrop} onClick={() => setActiveCert(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => setActiveCert(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalImageWrapper}>
              <img
                src={activeCert.image || '/certifications/flutter_certification.svg'}
                alt={activeCert.title}
              />
            </div>

            <div className={styles.modalBody}>
              <span className={styles.modalIssuer}>{activeCert.issuer}</span>
              <h2 className={styles.modalTitle}>{activeCert.title}</h2>
              <p className={styles.modalDesc}>{activeCert.description}</p>

              <div className={styles.modalMetaRow}>
                <div className={styles.modalMetaItem}>
                  <span className={styles.modalMetaLabel}>Issue Date</span>
                  <span className={styles.modalMetaValue}>
                    {new Date(activeCert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                {activeCert.credentialId && (
                  <div className={styles.modalMetaItem}>
                    <span className={styles.modalMetaLabel}>Credential ID</span>
                    <span className={styles.modalMetaValue}>{activeCert.credentialId}</span>
                  </div>
                )}
                {activeCert.tags && activeCert.tags.length > 0 && (
                  <div className={styles.modalMetaItem}>
                    <span className={styles.modalMetaLabel}>Skills Covered</span>
                    <span className={styles.modalMetaValue}>{activeCert.tags.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className={styles.modalActions}>
                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: '13.5px', padding: '10px 18px' }}
                  >
                    Verify Credential ↗
                  </a>
                )}
                <button
                  onClick={() => setActiveCert(null)}
                  className="btn btn-ghost"
                  style={{ fontSize: '13.5px', padding: '10px 18px' }}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CertificationsClient;
