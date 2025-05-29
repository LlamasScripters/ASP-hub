export interface Club {
    id: string;
    name: string;
    description?: string;
    address?: string;
    email?: string;
    phone?: string;
    website?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Section {
    id: string;
    name: string;
    description?: string;
    color?: string;
    clubId: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
    ageMin?: number;
    ageMax?: number;
    sectionId: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface SessionSport {
    id: string;
    title: string;
    description?: string;
    type: 'entrainement' | 'match' | 'stage' | 'competition' | 'autre';
    status: 'planifie' | 'en_cours' | 'termine' | 'annule';
    startDate: string;
    endDate: string;
    location?: string;
    maxParticipants?: number;
    currentParticipants?: number;
    categoryId: string;
    createdAt?: string;
    updatedAt?: string;
    notes?: string;
  }
  