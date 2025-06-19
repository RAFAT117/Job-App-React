import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobPosting, JobFilter, JobCategory, PaginationParams, JobSearchResponse } from '@/types/job';
import { searchJobs, getJobById, getTotalHits } from '@/services/api';
import { transformApiJobToJobPosting } from '@/utils/jobTransformers';

interface JobState {
  // State
  jobs: JobPosting[];
  savedJobs: string[];
  appliedJobs: Record<string, { date: string, status: string }>;
  filter: JobFilter;
  sortBy: string | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  
  // Actions
  setJobs: (jobs: JobPosting[]) => void;
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  updateApplicationStatus: (jobId: string, status: string) => void;
  setFilter: (filter: Partial<JobFilter>) => void;
  setSortBy: (sortBy: string | null) => void;
  resetFilter: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: { currentPage: number; totalPages: number; totalJobs: number; hasNextPage: boolean; hasPrevPage: boolean }) => void;
  
  // Thunks
  fetchJobs: (page?: number) => Promise<void>;
  fetchJobById: (id: string) => Promise<JobPosting | null>;
  refreshJobs: () => Promise<void>;
  
  // Computed
  filteredJobs: JobPosting[];
  isJobSaved: (jobId: string) => boolean;
  isJobApplied: (jobId: string) => boolean;
  getApplicationStatus: (jobId: string) => string | null;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const defaultFilter: JobFilter = {
  query: '',
  category: undefined,
  remote: undefined,
  experience: undefined,
  type: undefined,
  location: undefined,
  radius: undefined,
};

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: [],
      savedJobs: [],
      appliedJobs: {},
      filter: defaultFilter,
      sortBy: null,
      isLoading: false,
      error: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalJobs: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
      
      setJobs: (jobs) => set({ jobs }),
      
      toggleSaveJob: (jobId) => set((state) => {
        const isSaved = state.savedJobs.includes(jobId);
        return {
          savedJobs: isSaved
            ? state.savedJobs.filter((id) => id !== jobId)
            : [...state.savedJobs, jobId],
        };
      }),
      
      applyToJob: (jobId) => set((state) => ({
        appliedJobs: {
          ...state.appliedJobs,
          [jobId]: { date: new Date().toISOString(), status: 'Applied' }
        },
      })),
      
      updateApplicationStatus: (jobId, status) => set((state) => ({
        appliedJobs: {
          ...state.appliedJobs,
          [jobId]: { 
            ...state.appliedJobs[jobId],
            status 
          }
        },
      })),
      
      setFilter: (newFilter) => {
        set((state) => ({
          filter: { ...state.filter, ...newFilter },
          pagination: { ...state.pagination, currentPage: 1 },
        }));
        get().fetchJobs();
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().fetchJobs();
      },
      
      resetFilter: () => set({ filter: defaultFilter }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      setPagination: (pagination) => set({ pagination }),
      
      fetchJobs: async (page = 1) => {
        const { filter, sortBy, setJobs, setLoading, setError, setPagination } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const { hits, total } = await searchJobs(
            filter.query || '',
            page,
            10,
            filter.category || null,
            filter.location || null,
            filter.type || null,
            filter.remote || null,
            sortBy
          );
          
          const jobs = hits.map(transformApiJobToJobPosting);
          const totalPages = Math.ceil(total / 10);

          setJobs(jobs);
          setPagination({
            currentPage: page,
            totalPages,
            totalJobs: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          });
        } catch (error) {
          setError('Kunde inte hämta jobbannonser. Försök igen senare.');
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false);
        }
      },
      
      fetchJobById: async (id) => {
        try {
          return await getJobById(id);
        } catch (error) {
          console.error('Error fetching job by ID:', error);
          return null;
        }
      },
      
      refreshJobs: async () => {
        const { fetchJobs } = get();
        await fetchJobs(1);
      },
      
      get filteredJobs() {
        const { jobs, filter } = get();
        return jobs.filter(job => {
          if (filter.query && !job.title.toLowerCase().includes(filter.query.toLowerCase())) {
            return false;
          }
          if (filter.category && filter.category !== 'All' && job.category !== filter.category) {
            return false;
          }
          if (filter.remote !== undefined && job.remote !== filter.remote) {
            return false;
          }
          if (filter.location && !job.location?.toLowerCase().includes(filter.location.toLowerCase())) {
            return false;
          }
          return true;
        });
      },
      
      isJobSaved: (jobId) => get().savedJobs.includes(jobId),
      
      isJobApplied: (jobId) => jobId in get().appliedJobs,
      
      getApplicationStatus: (jobId) => get().appliedJobs[jobId]?.status || null,
      
      handleNextPage: () => {
        const { pagination, fetchJobs } = get();
        if (pagination.hasNextPage) {
          fetchJobs(pagination.currentPage + 1);
        }
      },
      
      handlePrevPage: () => {
        const { pagination, fetchJobs } = get();
        if (pagination.hasPrevPage) {
          fetchJobs(pagination.currentPage - 1);
        }
      },
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedJobs: state.savedJobs,
        appliedJobs: state.appliedJobs,
      }),
    }
  )
);