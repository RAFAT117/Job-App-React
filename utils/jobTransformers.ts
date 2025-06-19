import { JobPosting } from '@/types/job';
// src/lib/transform.ts

// Funktion för att omvandla jobb från API-svaret till en standardiserad JobPosting
export function transformApiJobToJobPosting(apiJob: any): JobPosting {
  console.log('Transforming job:', apiJob);
  
  // Parse the publication date
  let postedAt = new Date();
  if (apiJob.publication_date) {
    // Try to parse the date string
    const parsedDate = new Date(apiJob.publication_date);
    if (!isNaN(parsedDate.getTime())) {
      postedAt = parsedDate;
    }
  }
  
  return {
    id: apiJob.id || '',
    title: apiJob.headline || 'No title',
    company: {
      id: apiJob.employer?.id || '',
      name: apiJob.employer?.name || 'Unknown Company',
      logo: apiJob.employer?.logo_url || null,
      location: apiJob.workplace_address?.municipality || 'Unknown Location',
      website: apiJob.employer?.website || null
    },
    location: apiJob.workplace_address?.municipality || 'Unknown Location',
    category: apiJob.occupation?.label || 'Uncategorized',
    type: apiJob.employment_type?.label || 'Unknown Type',
    description: apiJob.description?.text || '',
    url: apiJob.webpage_url || '',
    postedAt: postedAt,
    remote: apiJob.workplace_address?.remote_work === true,
    responsibilities: apiJob.responsibilities || [],
    requirements: apiJob.requirements || [],
    benefits: apiJob.benefits || [],
    sourceUrl: apiJob.webpage_url || '',
    skills: apiJob.skills || []
  };
}
