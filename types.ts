
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  target: string;
  features: string[];
  subjects: string[];
  jobRoles: string[];
  afterCompletion: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  experience: string;
  imageUrl: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  rank: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StudentResult {
  id: string;
  name: string;
  exam: string;
  rank: string;
  imageUrl: string;
  badge?: string;
  category?: 'merchant-navy' | 'defence' | 'ssc' | 'civil';
  year?: string;
  story?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

export interface Video {
  id: string;
  title: string;
  videoId: string; // The YouTube ID (e.g., dQw4w9WgXcQ)
  category: 'motivation' | 'maths' | 'physics' | 'update' | 'general';
  description?: string;
}

export interface AISettings {
  apiKey: string;
  systemInstruction: string;
  welcomeMessage: string;
  fallbackMessage: string;
}

export interface SiteSettings {
  instituteName: string;
  instituteSubName: string;
  logoUrl?: string; // Base64 or URL
  
  heroHeadline: string; // HTML string allowed
  heroSubHeadline: string; // HTML string allowed
  heroImageUrl: string;
  
  // Section Headings (Editable Text)
  aboutSectionTitle: string;
  aboutSectionSubtitle: string;
  aboutDirectorName: string;
  aboutDirectorImage: string;
  aboutText: string;
  
  courseSectionTitle: string;
  courseSectionSubtitle: string;
  
  facultySectionTitle: string;
  facultySectionSubtitle: string;

  gallerySectionTitle: string;
  gallerySectionSubtitle: string;
  
  selectionsSectionTitle: string;
  selectionsSectionSubtitle: string;

  address: string;
  mapUrl: string;
  phone: string;
  email: string;
  
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  whatsappUrl?: string;
}