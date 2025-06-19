export interface Company {
  id: string;
  name: string;
  logo?: string;
  location: string;
  website?: string;
}

// src/types.ts

export interface JobPosting {
  id: string;
  title: string;
  company: Company;
  location: string;
  category: string;
  type: string;
  description: string;
  url: string;
  postedAt: Date;
  remote: boolean;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  sourceUrl?: string;
  skills?: string[];
}


export type JobCategory = 
  | 'All'
  | 'IT'
  | 'Healthcare'
  | 'Education'
  | 'Engineering'
  | 'Finance'
  | 'Sales'
  | 'Administration'
  | 'Customer Service'
  | 'Construction'
  | 'Transport'
  | 'Restaurant';

export interface JobFilter {
  query?: string;
  category?: string;
  remote?: boolean | null;
  experience?: string | null;
  type?: string | null;
  location?: string;
  radius?: number | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface JobSearchResponse {
  jobs: JobPosting[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}