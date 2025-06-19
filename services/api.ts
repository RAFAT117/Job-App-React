import { JobPosting } from '@/types/job';
import { transformApiJobToJobPosting } from '@/utils/jobTransformers';
import { getOccupationFieldCode } from './categoryMapping';

export interface JobFilter {
  query?: string;
  location?: string;
  radius?: number;
  category?: string;
  type?: string;
  remote?: boolean;
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

const API_BASE_URL = 'https://jobsearch.api.jobtechdev.se/search';

export async function fetchFromAPI(params: Record<string, string | number>): Promise<{ hits: any[]; total: number }> {
    const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const url = `${API_BASE_URL}?${queryParams.toString()}`;
  console.log('Fetching from URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response:', data);

    if (!data.hits || !Array.isArray(data.hits)) {
      throw new Error('Invalid API response format');
    }

    return {
      hits: data.hits,
      total: data.total?.value || 0
    };
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}

export async function searchJobs(
  query: string,
  page: number = 1,
  limit: number = 10,
  category: string | null = null,
  location: string | null = null,
  employmentType: string | null = null,
  remote: boolean | null = null,
  sortBy: string | null = null
) {
  const offset = (page - 1) * limit;
  const params: Record<string, string | number> = {
    offset,
    limit,
  };

  // Build the search query
  let searchQuery = query || '*';
  
  // Add location to the search query if provided
  if (location) {
    searchQuery = `${searchQuery} AND (workplace-address.municipality:${location} OR workplace-address.city:${location} OR workplace-address.region:${location})`;
  }

  params.q = searchQuery;

  // Add occupation filter if category is selected
  const occupationField = getOccupationFieldCode(category);
  if (occupationField) {
    params.occupation = occupationField;
  }

  // Add employment type filter
  if (employmentType) {
    params['employment-type'] = employmentType;
  }

  // Add remote work filter
  if (remote !== null) {
    params.remote = remote ? 'true' : 'false';
  }

  // Add sorting
  if (sortBy) {
    switch (sortBy) {
      case 'newest':
        params.sort = 'publication_date:desc';
        break;
      case 'oldest':
        params.sort = 'publication_date:asc';
        break;
      case 'location':
        params.sort = 'workplace-address.municipality:asc';
        break;
      default:
        break;
    }
  }

  console.log('Search params:', params);
  const { hits, total } = await fetchFromAPI(params);
  console.log('API Response - hits:', hits.length, 'total:', total);
  return { hits, total };
}

export async function getTotalHits(
  query: string = '',
  category: string | null = null,
  location: string | null = null,
  employmentType: string | null = null,
  remote: boolean | null = null
): Promise<number> {
  const params: Record<string, string | number> = {
    offset: 0,
    limit: 1,
  };

  // Build the search query
  let searchQuery = query || '*';
  
  // Add location to the search query if provided
  if (location) {
    searchQuery = `${searchQuery} AND (workplace-address.municipality:${location} OR workplace-address.city:${location} OR workplace-address.region:${location})`;
  }

  params.q = searchQuery;

  // Add occupation filter if category is selected
  const occupationField = getOccupationFieldCode(category);
  if (occupationField) {
    params.occupation = occupationField;
  }

  // Add employment type filter
  if (employmentType) {
    params['employment-type'] = employmentType;
  }

  // Add remote work filter
  if (remote !== null) {
    params.remote = remote ? 'true' : 'false';
  }

  console.log('Total hits params:', params);
  const { total } = await fetchFromAPI(params);
  console.log('Total hits response:', total);
  return total;
}

// Funktion för att hämta ett jobb med ID (valfri)
export async function getJobById(id: string): Promise<JobPosting | null> {
  try {
    const params = { id };
    const { hits } = await fetchFromAPI(params);
    if (hits.length > 0) {
      return hits[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return null;
  }
}