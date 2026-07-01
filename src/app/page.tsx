import React from 'react';
import { getAllProjects } from '../lib/content';
import ClientPage from './ClientPage';

export default function HomePage() {
  const allProjects = getAllProjects();
  
  return <ClientPage allProjects={allProjects} />;
}
