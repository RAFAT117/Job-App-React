// src/lib/categoryMapping.ts

// Funktion för att mappa kategori till occupation-field i API-anrop
export function mapCategoryToOccupationField(category: string): string {
    switch (category) {
      case 'Software Development':
        return 'programmerare-och-systemutvecklare';
      case 'Data Science':
        return 'data-analytiker';
      case 'Design':
        return 'grafisk-designer';
      case 'Marketing':
        return 'marknadsforing';
      case 'Sales':
        return 'salu-och-marknadsforing';
      default:
        return category; // Om ingen matchning, returnera kategorin som den är
    }
  }
  
  // Funktion för att mappa jobbtjänstetyp till employment-type i API-anrop
  export function mapJobTypeToEmploymentType(jobType: string): string {
    switch (jobType) {
      case 'Full-time':
        return 'heltid';
      case 'Part-time':
        return 'deltid';
      case 'Freelance':
        return 'konsult';
      case 'Internship':
        return 'praktik';
      default:
        return jobType; // Om ingen matchning, returnera jobbtjänstetypen som den är
    }
  }
  
export const CATEGORY_MAPPING: Record<string, string[]> = {
  'IT': [
    'programmerare',
    'systemutvecklare',
    'it-sakerhetsspecialist',
    'natverkstekniker',
    'systemtekniker',
    'supporttekniker',
    'systemadministrator',
    'systemanalytiker',
    'it-arkitekt',
    'systemforvaltare',
    'testledare',
    'spelutvecklare',
    'webbutvecklare',
    'webbmaster',
    'webbadministrator'
  ],
  'Vård & Omsorg': ['sjukskoterska', 'vardpersonal'],
  'Utbildning': ['larare', 'pedagog'],
  'Teknik': ['ingenjor', 'tekniker'],
  'Ekonomi': ['ekonomi', 'redovisning'],
  'Försäljning': ['forsaljning', 'inkop'],
  'Marknadsföring': ['marknadsforing', 'kommunikation'],
  'Kundservice': ['kundservice', 'support'],
  'Administration': ['administration', 'kontor'],
  'Övrigt': ['ovrigt']
};

export const EMPLOYMENT_TYPE_MAPPING: Record<string, string> = {
  'Heltid': 'heltid',
  'Deltid': 'deltid',
  'Tillsvidare': 'tillsvidare',
  'Vikariat': 'vikariat',
  'Projektanställning': 'projektanstallning',
  'Sommarjobb': 'sommarjobb',
  'Praktik': 'praktik'
};

export function getOccupationFieldCode(category: string | null): string | null {
  if (!category || category === 'Alla') return null;
  const codes = CATEGORY_MAPPING[category];
  console.log('Category mapping:', { category, codes });
  return codes ? codes.join(' OR ') : null;
}

export function getEmploymentTypeCode(type: string | null): string | null {
  if (!type || type === 'Alla') return null;
  const code = EMPLOYMENT_TYPE_MAPPING[type];
  console.log('Employment type mapping:', { type, code });
  return code || null;
}
 