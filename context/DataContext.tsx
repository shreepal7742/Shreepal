
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, StudentResult, GalleryImage, SiteSettings, FacultyMember, Video, AISettings } from '../types';
import { INITIAL_COURSES, INITIAL_STUDENTS, INITIAL_GALLERY, INITIAL_SETTINGS, INITIAL_FACULTY, INITIAL_VIDEOS, INITIAL_AI_SETTINGS } from '../data/mockData';
import { saveJsonToGitHub } from '../services/githubService';

interface DataContextType {
  courses: Course[];
  students: StudentResult[];
  galleryImages: GalleryImage[];
  siteSettings: SiteSettings;
  faculty: FacultyMember[];
  videos: Video[];
  aiSettings: AISettings;
  
  updateCourse: (updatedCourse: Course) => void;
  
  addStudent: (student: StudentResult) => void;
  updateStudent: (student: StudentResult) => void;
  deleteStudent: (id: string) => void;
  
  addGalleryImage: (image: GalleryImage) => void;
  updateGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  
  updateSiteSettings: (settings: SiteSettings) => void;
  updateAISettings: (settings: AISettings) => void;
  
  addFaculty: (member: FacultyMember) => void;
  updateFaculty: (member: FacultyMember) => void;
  deleteFaculty: (id: string) => void;

  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  
  resetData: () => void;
  
  // Publish Logic
  publishToLiveSite: () => Promise<void>;
  isPublishing: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Helper to save to local storage safely
const saveToStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e: any) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert('⚠️ STORAGE FULL: The image you are trying to upload is too large. Please use the GitHub Storage option in Settings.');
        } else {
            console.error('Error saving to storage:', e);
        }
    }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available, else use mock data
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
        const saved = localStorage.getItem('mdc_courses');
        return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch { return INITIAL_COURSES; }
  });

  const [students, setStudents] = useState<StudentResult[]>(() => {
    try {
        const saved = localStorage.getItem('mdc_students');
        return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch { return INITIAL_STUDENTS; }
  });

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    try {
        const saved = localStorage.getItem('mdc_gallery');
        return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch { return INITIAL_GALLERY; }
  });
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
        const saved = localStorage.getItem('mdc_settings');
        // Merge with INITIAL_SETTINGS to ensure all keys exist
        return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
    } catch { return INITIAL_SETTINGS; }
  });
  
  const [faculty, setFaculty] = useState<FacultyMember[]>(() => {
    try {
        const saved = localStorage.getItem('mdc_faculty');
        return saved ? JSON.parse(saved) : INITIAL_FACULTY;
    } catch { return INITIAL_FACULTY; }
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    try {
        const saved = localStorage.getItem('mdc_videos');
        return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch { return INITIAL_VIDEOS; }
  });

  const [aiSettings, setAiSettings] = useState<AISettings>(() => {
    try {
        const saved = localStorage.getItem('mdc_ai_settings');
        return saved ? { ...INITIAL_AI_SETTINGS, ...JSON.parse(saved) } : INITIAL_AI_SETTINGS;
    } catch { return INITIAL_AI_SETTINGS; }
  });

  const [isPublishing, setIsPublishing] = useState(false);

  // --- LIVE DATA LOADING ---
  // Attempt to fetch 'data.json' on startup. 
  // If local storage is EMPTY (new visitor), we use the live data.
  // If local storage HAS data (admin/returning user), we prioritize local storage.
  useEffect(() => {
    const loadLiveData = async () => {
       // Check if we already have local data for a key section
       const hasLocalData = localStorage.getItem('mdc_courses');
       
       if (!hasLocalData) {
           console.log("No local data found. Fetching live data.json...");
           try {
               const response = await fetch('./data.json');
               if (response.ok) {
                   const data = await response.json();
                   // Batch update state
                   if (data.courses) setCourses(data.courses);
                   if (data.students) setStudents(data.students);
                   if (data.galleryImages) setGalleryImages(data.galleryImages);
                   if (data.siteSettings) setSiteSettings(data.siteSettings);
                   if (data.faculty) setFaculty(data.faculty);
                   if (data.videos) setVideos(data.videos);
                   if (data.aiSettings) setAiSettings(data.aiSettings);
               } else {
                   console.log("No data.json found, using defaults.");
               }
           } catch (e) {
               console.error("Failed to load live data", e);
           }
       }
    };
    loadLiveData();
  }, []);


  // Persist to localStorage whenever state changes
  useEffect(() => saveToStorage('mdc_courses', courses), [courses]);
  useEffect(() => saveToStorage('mdc_students', students), [students]);
  useEffect(() => saveToStorage('mdc_gallery', galleryImages), [galleryImages]);
  useEffect(() => saveToStorage('mdc_settings', siteSettings), [siteSettings]);
  useEffect(() => saveToStorage('mdc_faculty', faculty), [faculty]);
  useEffect(() => saveToStorage('mdc_videos', videos), [videos]);
  useEffect(() => saveToStorage('mdc_ai_settings', aiSettings), [aiSettings]);

  // Actions
  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const addStudent = (student: StudentResult) => {
    setStudents(prev => [student, ...prev]);
  };

  const updateStudent = (student: StudentResult) => {
    setStudents(prev => prev.map(s => s.id === student.id ? student : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryImage = (image: GalleryImage) => {
    setGalleryImages(prev => [image, ...prev]);
  };

  const updateGalleryImage = (image: GalleryImage) => {
    setGalleryImages(prev => prev.map(img => img.id === image.id ? image : img));
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };
  
  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
  };
  
  const updateAISettings = (settings: AISettings) => {
    setAiSettings(settings);
  };
  
  const addFaculty = (member: FacultyMember) => {
      setFaculty(prev => [...prev, member]);
  };
  
  const updateFaculty = (member: FacultyMember) => {
      setFaculty(prev => prev.map(f => f.id === member.id ? member : f));
  };
  
  const deleteFaculty = (id: string) => {
      setFaculty(prev => prev.filter(f => f.id !== id));
  };

  const addVideo = (video: Video) => {
      setVideos(prev => [video, ...prev]);
  };

  const deleteVideo = (id: string) => {
      setVideos(prev => prev.filter(v => v.id !== id));
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data to default? This cannot be undone.")) {
        localStorage.clear();
        setCourses(INITIAL_COURSES);
        setStudents(INITIAL_STUDENTS);
        setGalleryImages(INITIAL_GALLERY);
        setSiteSettings(INITIAL_SETTINGS);
        setFaculty(INITIAL_FACULTY);
        setVideos(INITIAL_VIDEOS);
        setAiSettings(INITIAL_AI_SETTINGS);
        alert("All data has been reset!");
        window.location.reload();
    }
  };

  // --- PUBLISH FUNCTION ---
  const publishToLiveSite = async () => {
      if (!siteSettings.githubToken || !siteSettings.githubOwner || !siteSettings.githubRepo) {
          alert("❌ GitHub Configuration Missing!\nPlease go to 'Site Settings' > 'Cloud Storage' and fill in your GitHub Username, Repo Name, and Token.");
          return;
      }

      if (!window.confirm("📢 Are you sure you want to PUBLISH changes?\n\nThis will overwrite the live website data. It may take 2-3 minutes for changes to appear.")) return;

      setIsPublishing(true);
      try {
          const fullData = {
              courses,
              students,
              galleryImages,
              siteSettings,
              faculty,
              videos,
              aiSettings
          };
          
          // Save to 'public/data.json' in the repo
          await saveJsonToGitHub(fullData, siteSettings.githubToken, siteSettings.githubOwner, siteSettings.githubRepo, 'public/data.json');
          alert("✅ Published Successfully!\n\nYour changes have been sent to GitHub. Please wait a few minutes for the live site to update.");
      } catch (e: any) {
          console.error(e);
          alert("❌ Publish Failed: " + e.message);
      } finally {
          setIsPublishing(false);
      }
  };

  return (
    <DataContext.Provider value={{ 
      courses, students, galleryImages, siteSettings, faculty, videos, aiSettings,
      updateCourse, 
      addStudent, updateStudent, deleteStudent, 
      addGalleryImage, updateGalleryImage, deleteGalleryImage,
      updateSiteSettings, updateAISettings,
      addFaculty, updateFaculty, deleteFaculty,
      addVideo, deleteVideo,
      resetData,
      publishToLiveSite, isPublishing
    }}>
      {children}
    </DataContext.Provider>
  );
};
