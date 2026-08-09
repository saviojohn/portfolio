export interface Project {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  tech?: string[];
  problem?: string;
  solution?: string;
  architecture?: string;
  results?: string;
  metrics?: string;
  featured?: boolean;
  publishedDate: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  publishedDate: string;
}

export interface Experiment {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  tech?: string[];
  publishedDate: string;
}

export interface Experience {
  id: string; // Typically mapped from filename for uniqueness
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // Optional for current roles
  highlights?: string[];
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  tags?: string[];
  description?: string;
  featured?: boolean;
}

