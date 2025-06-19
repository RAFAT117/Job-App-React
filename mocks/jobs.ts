import { JobPosting, JobCategory } from '@/types/job';

export const jobCategories: JobCategory[] = [
  'All',
  'IT',
  'Healthcare',
  'Education',
  'Engineering',
  'Finance',
  'Sales',
  'Administration',
  'Customer Service',
  'Construction',
  'Transport',
  'Restaurant'
];

export const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

export const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Executive'
];

export const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: {
      id: 'c1',
      name: 'Airbnb',
      logo: 'https://images.unsplash.com/photo-1611746869696-b0fcc35a0471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'San Francisco, CA'
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a Senior React Native Developer to join our mobile team. You will be responsible for building and maintaining our mobile applications for iOS and Android.',
    requirements: [
      '5+ years of experience with React Native',
      'Strong knowledge of JavaScript and TypeScript',
      'Experience with state management libraries like Redux or MobX',
      'Experience with native modules and third-party libraries',
      'Experience with CI/CD pipelines'
    ],
    responsibilities: [
      'Develop and maintain our mobile applications',
      'Work closely with the design team to implement UI/UX',
      'Write clean, maintainable, and testable code',
      'Participate in code reviews and provide feedback',
      'Mentor junior developers'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'Remote work options',
      '401(k) matching',
      'Professional development budget'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Senior Level',
    postedAt: '2023-06-01',
    lastApplicationDate: '2023-07-01',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Git'],
    applicants: 45
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: {
      id: 'c2',
      name: 'Figma',
      logo: 'https://images.unsplash.com/photo-1552345386-6690de5b2c09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'New York, NY'
    },
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    description: 'We are looking for a talented UX/UI Designer to join our design team. You will be responsible for creating beautiful and intuitive user interfaces for our products.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD',
      'Strong portfolio showcasing your design skills',
      'Understanding of user-centered design principles',
      'Experience with design systems'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with product managers and engineers',
      'Maintain and evolve our design system',
      'Stay up-to-date with design trends and best practices'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget',
      'Company retreats'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Mid Level',
    postedAt: '2023-06-05',
    lastApplicationDate: '2023-07-05',
    skills: ['UI Design', 'UX Design', 'Figma', 'Sketch', 'Design Systems'],
    applicants: 32
  },
  {
    id: '3',
    title: 'Product Manager',
    company: {
      id: 'c3',
      name: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'Remote'
    },
    location: 'Remote',
    salary: '$130,000 - $160,000',
    description: 'We are looking for a Product Manager to join our team. You will be responsible for defining product strategy, roadmap, and features.',
    requirements: [
      '5+ years of experience in product management',
      'Experience with agile development methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership skills',
      'Technical background is a plus'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering, design, and marketing teams',
      'Analyze market trends and competition',
      'Define success metrics and track product performance'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'Remote work',
      '401(k) matching',
      'Stock options'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Senior Level',
    postedAt: '2023-06-10',
    lastApplicationDate: '2023-07-10',
    skills: ['Product Management', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping'],
    applicants: 28
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: {
      id: 'c4',
      name: 'Vercel',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'San Francisco, CA'
    },
    location: 'San Francisco, CA',
    salary: '$100,000 - $130,000',
    description: 'We are looking for a Frontend Developer to join our engineering team. You will be responsible for building and maintaining our web applications.',
    requirements: [
      '3+ years of experience with React',
      'Strong knowledge of JavaScript and TypeScript',
      'Experience with modern frontend tools and libraries',
      'Understanding of responsive design and cross-browser compatibility',
      'Experience with testing frameworks'
    ],
    responsibilities: [
      'Develop and maintain our web applications',
      'Implement responsive and accessible UI components',
      'Write clean, maintainable, and testable code',
      'Collaborate with designers and backend developers',
      'Participate in code reviews and provide feedback'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work hours',
      'Remote work options',
      '401(k) matching',
      'Professional development budget'
    ],
    type: 'Full-time',
    remote: false,
    experience: 'Mid Level',
    postedAt: '2023-06-15',
    lastApplicationDate: '2023-07-15',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    applicants: 37
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: {
      id: 'c5',
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'Los Angeles, CA'
    },
    location: 'Los Angeles, CA',
    salary: '$140,000 - $180,000',
    description: 'We are looking for a Data Scientist to join our data team. You will be responsible for analyzing data and building machine learning models to improve our products.',
    requirements: [
      '5+ years of experience in data science',
      'Strong knowledge of Python and SQL',
      'Experience with machine learning frameworks like TensorFlow or PyTorch',
      'Experience with data visualization tools',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Analyze large datasets to extract insights',
      'Build and deploy machine learning models',
      'Collaborate with product and engineering teams',
      'Create data visualizations and reports',
      'Stay up-to-date with the latest research and technologies'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'Remote work options',
      '401(k) matching',
      'Stock options'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Senior Level',
    postedAt: '2023-06-20',
    lastApplicationDate: '2023-07-20',
    skills: ['Python', 'SQL', 'Machine Learning', 'Data Analysis', 'Statistics'],
    applicants: 23
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: {
      id: 'c6',
      name: 'GitLab',
      logo: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'Remote'
    },
    location: 'Remote',
    salary: '$110,000 - $140,000',
    description: 'We are looking for a DevOps Engineer to join our infrastructure team. You will be responsible for building and maintaining our CI/CD pipelines and cloud infrastructure.',
    requirements: [
      '3+ years of experience in DevOps',
      'Experience with cloud platforms like AWS, GCP, or Azure',
      'Experience with containerization and orchestration tools like Docker and Kubernetes',
      'Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions',
      'Strong scripting skills in Python, Bash, or similar'
    ],
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Manage cloud infrastructure using Infrastructure as Code',
      'Implement monitoring and alerting systems',
      'Collaborate with development teams to improve deployment processes',
      'Ensure system reliability and security'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'Remote work',
      '401(k) matching',
      'Professional development budget'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Mid Level',
    postedAt: '2023-06-25',
    lastApplicationDate: '2023-07-25',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    applicants: 19
  },
  {
    id: '7',
    title: 'Marketing Manager',
    company: {
      id: 'c7',
      name: 'Shopify',
      logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'Toronto, Canada'
    },
    location: 'Toronto, Canada',
    salary: '$90,000 - $120,000',
    description: 'We are looking for a Marketing Manager to join our marketing team. You will be responsible for developing and executing marketing strategies to drive growth.',
    requirements: [
      '5+ years of experience in marketing',
      'Experience with digital marketing channels',
      'Strong analytical and data-driven approach',
      'Excellent communication and project management skills',
      'Experience with marketing automation tools'
    ],
    responsibilities: [
      'Develop and execute marketing strategies',
      'Manage digital marketing campaigns',
      'Analyze campaign performance and optimize for results',
      'Collaborate with content, design, and product teams',
      'Manage marketing budget and resources'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget',
      'Company retreats'
    ],
    type: 'Full-time',
    remote: true,
    experience: 'Senior Level',
    postedAt: '2023-06-30',
    lastApplicationDate: '2023-07-30',
    skills: ['Digital Marketing', 'SEO', 'SEM', 'Content Marketing', 'Analytics'],
    applicants: 31
  },
  {
    id: '8',
    title: 'Customer Success Manager',
    company: {
      id: 'c8',
      name: 'Slack',
      logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      location: 'San Francisco, CA'
    },
    location: 'San Francisco, CA',
    salary: '$80,000 - $110,000',
    description: 'We are looking for a Customer Success Manager to join our customer success team. You will be responsible for ensuring our customers achieve their goals using our product.',
    requirements: [
      '3+ years of experience in customer success or account management',
      'Strong communication and relationship-building skills',
      'Experience with CRM tools like Salesforce',
      'Problem-solving mindset',
      'Technical aptitude to understand our product'
    ],
    responsibilities: [
      'Onboard new customers and ensure successful adoption',
      'Develop and maintain relationships with key customers',
      'Identify upsell and cross-sell opportunities',
      'Collaborate with product and engineering teams to address customer needs',
      'Monitor customer health and prevent churn'
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work hours',
      'Remote work options',
      '401(k) matching',
      'Professional development budget'
    ],
    type: 'Full-time',
    remote: false,
    experience: 'Mid Level',
    postedAt: '2023-07-01',
    lastApplicationDate: '2023-08-01',
    skills: ['Customer Success', 'Account Management', 'Salesforce', 'Communication', 'Relationship Building'],
    applicants: 27
  }
];