import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/types/user';

interface UserState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setOnboarded: (value: boolean) => void;
  setAuthenticated: (value: boolean, token?: string) => void;
  logout: () => void;
}

const defaultProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Svensson',
  email: 'alex.svensson@example.com',
  phone: '070-123 45 67',
  location: 'Stockholm',
  title: 'Senior Frontend Developer',
  about: 'Experienced frontend developer with a passion for creating beautiful and user-friendly interfaces. Specialized in React and React Native development.',
  skills: ['React', 'React Native', 'JavaScript', 'TypeScript', 'UI/UX Design'],
  personalNumber: '',
  experience: [
    {
      company: 'Tech Innovations AB',
      title: 'Senior Frontend Developer',
      startDate: '2021-01',
      endDate: null,
      description: 'Leading the development of web and mobile applications for enterprise clients. Responsible for architecture decisions and mentoring junior developers.'
    },
    {
      company: 'Digital Solutions',
      title: 'Frontend Developer',
      startDate: '2018-06',
      endDate: '2020-12',
      description: 'Developed and maintained web applications using React and TypeScript. Collaborated with designers and backend developers to deliver high-quality products.'
    }
  ],
  education: [
    {
      institution: 'KTH Royal Institute of Technology',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2018-06'
    },
    {
      institution: 'Stockholm University',
      degree: 'Bachelor of Science',
      field: 'Information Technology',
      startDate: '2013-09',
      endDate: '2016-06'
    }
  ],
  languages: [
    {
      language: 'Swedish',
      proficiency: 'Native'
    },
    {
      language: 'English',
      proficiency: 'Fluent'
    },
    {
      language: 'German',
      proficiency: 'Basic'
    }
  ],
  preferences: {
    jobAlerts: true,
    locationRadius: 50,
    categories: ['IT', 'Engineering'],
    salary: {
      min: 40000,
      max: 70000
    }
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      isOnboarded: true,
      isAuthenticated: true,
      authToken: null,
      
      setProfile: (profile) => set({ profile }),
      
      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : { ...defaultProfile, ...updates },
      })),
      
      setOnboarded: (value) => set({ isOnboarded: value }),
      
      setAuthenticated: (value, token) => set({ 
        isAuthenticated: value,
        authToken: token || null
      }),
      
      logout: () => set({ 
        profile: defaultProfile,
        isAuthenticated: false,
        authToken: null
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);