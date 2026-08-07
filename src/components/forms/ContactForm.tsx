'use client';

import React, { useState, useEffect } from 'react';
import { useDialogue } from '../../hooks/useDialogue';
import { encodePathToURL } from '../../lib/dialogue/engine';
import { Button } from '../ui/Button';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const { path } = useDialogue();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    context: ''
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-fill context with encoded path when component mounts or path changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, context: encodePathToURL(path) }));
  }, [path]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '', context: formData.context });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
        Message sent. I&apos;ll get back to you shortly.
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      {status === 'error' && (
        <div className={`${styles.statusMessage} ${styles.statusError}`}>
          Something went wrong. Please try again later or email me directly.
        </div>
      )}
      
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-name">Name</label>
        <input 
          id="contact-name"
          type="text" 
          name="name" 
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'loading'}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-email">Email</label>
        <input 
          id="contact-email"
          type="email" 
          name="email" 
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading'}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-message">Message</label>
        <textarea 
          id="contact-message"
          name="message" 
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <div className={styles.submitBtn}>
        <Button 
          variant="primary" 
          size="md" 
          onClick={handleSubmit}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </div>
  );
}
