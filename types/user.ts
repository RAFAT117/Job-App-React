export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  title?: string;
  about?: string;
  skills: string[];
  personalNumber?: string; // Swedish personal number
  experience: {
    company: string;
    title: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
  }[];
  languages: {
    language: string;
    proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  }[];
  resume?: {
    url: string;
    filename: string;
    updatedAt: string;
  };
  preferences: {
    jobAlerts: boolean;
    locationRadius: number;
    categories: string[];
    salary: {
      min: number | null;
      max: number | null;
    };
  };
}

export interface JobApplication {
  id: string;
  jobId: string;
  status: 'Applied' | 'Viewed' | 'Interviewing' | 'Offered' | 'Rejected' | 'Withdrawn';
  appliedDate: string;
  notes?: string;
  documents?: {
    type: 'Resume' | 'Cover Letter' | 'Other';
    url: string;
    filename: string;
  }[];
  interviews?: {
    date: string;
    type: 'Phone' | 'Video' | 'In-person';
    notes?: string;
  }[];
}