
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Users, BookOpen, Image as ImageIcon, Trash2, Plus, Edit, LogOut, RefreshCcw, LayoutDashboard, Settings, UserCheck, UploadCloud, Save, Link as LinkIcon, Globe, MapPin, Phone, Mail, Youtube, AlignLeft, Video as VideoIcon, X, Check, Bot, MessageSquare, Cloud, Github } from 'lucide-react';
import { StudentResult, Course, GalleryImage, SiteSettings, FacultyMember, Video, AISettings } from '../types';
import { uploadToGitHub } from '../services/githubService';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Helper Component for Image Inputs
const ImageInputGroup = ({ label, namePrefix, currentImage }: { label: string, namePrefix: string, currentImage?: string }) => (
    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 shadow-sm hover:shadow-md transition-shadow">
        <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <ImageIcon size={18} className="text-orange-600"/> {label}
        </label>
        
        <div className="flex flex-col md:flex-row gap-6">
            {/* Preview Section */}
            <div className="md:w-1/3">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Current Preview</p>
                 <div className="aspect-video bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative shadow-inner group">
                    {currentImage ? (
                        <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-xs text-gray-400 flex flex-col items-center gap-1">
                            <ImageIcon size={24} className="opacity-20"/> No Image
                        </span>
                    )}
                 </div>
            </div>

            {/* Inputs Section */}
            <div className="md:w-2/3 space-y-4">
                {/* Option 1: File */}
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                        <UploadCloud size={14} className="text-orange-600"/> Option A: Upload Photo
                    </label>
                    <input 
                        type="file" 
                        name={`${namePrefix}File`} 
                        accept="image/*" 
                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
                    />
                    <p className="text-[10px] text-green-600 mt-1 ml-1 flex items-center gap-1">
                        ✨ Use this option. It works with GitHub or Local Storage.
                    </p>
                </div>
                
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Option 2: URL */}
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                        <LinkIcon size={14} className="text-blue-600"/> Option B: Direct Image Link
                    </label>
                    <input 
                        type="text" 
                        name={`${namePrefix}Url`} 
                        placeholder="https://example.com/image.jpg" 
                        className="w-full text-sm p-2 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition"
                    />
                </div>
            </div>
        </div>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { 
    courses, students, galleryImages, siteSettings, faculty, videos, aiSettings,
    updateCourse, 
    addStudent, updateStudent, deleteStudent, 
    addGalleryImage, updateGalleryImage, deleteGalleryImage,
    updateSiteSettings, updateAISettings,
    addFaculty, updateFaculty, deleteFaculty,
    addVideo, deleteVideo,
    resetData 
  } = useData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'students' | 'faculty' | 'courses' | 'gallery' | 'videos' | 'ai-settings'>('dashboard');
  
  // Edit States
  const [editingStudent, setEditingStudent] = useState<StudentResult | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);
  
  // New Item States
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  
  // Mobile Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Helper: Compress Local Image ---
  const compressLocalImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            resolve(dataUrl);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = error => reject(error);
    });
  };

  // --- Main Upload Logic: Decides between GitHub or Local Storage ---
  const handleSmartUpload = async (file: File): Promise<string> => {
      // 1. Check if GitHub is configured
      if (siteSettings.githubToken && siteSettings.githubOwner && siteSettings.githubRepo) {
          try {
              // Upload to GitHub
              return await uploadToGitHub(
                  file, 
                  siteSettings.githubToken, 
                  siteSettings.githubOwner, 
                  siteSettings.githubRepo
              );
          } catch (error) {
              console.error("GitHub Upload Failed", error);
              alert("GitHub Upload Failed! Falling back to Local Storage. Check your Token.");
              // Fallback to local
              return await compressLocalImage(file);
          }
      } else {
          // 2. Fallback to Local Storage (Compressed)
          if (file.size > 5 * 1024 * 1024) {
              alert("File too large for Local Storage! Please configure GitHub Storage in Settings.");
              throw new Error("File too large");
          }
          return await compressLocalImage(file);
      }
  };

  const transformImageUrl = (url: string): string => {
    if (!url) return '';
    // Handle Google Drive Links
    const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const extractYoutubeId = (url: string): string | null => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
  };

  // --- Handlers ---

  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const processImageField = async (prefix: string, currentUrl: string) => {
        const file = formData.get(`${prefix}File`) as File;
        const url = formData.get(`${prefix}Url`) as string;
        
        if (file && file.size > 0) {
            return await handleSmartUpload(file);
        } else if (url && url.trim() !== '') {
            return transformImageUrl(url);
        }
        return currentUrl;
    };

    try {
        const newLogoUrl = await processImageField('logo', siteSettings.logoUrl || '');
        const newHeroUrl = await processImageField('hero', siteSettings.heroImageUrl);
        const newDirUrl = await processImageField('director', siteSettings.aboutDirectorImage);

        const updatedSettings: SiteSettings = {
            ...siteSettings,
            instituteName: formData.get('instituteName') as string,
            instituteSubName: formData.get('instituteSubName') as string,
            logoUrl: newLogoUrl,
            heroHeadline: formData.get('heroHeadline') as string,
            heroSubHeadline: formData.get('heroSubHeadline') as string,
            heroImageUrl: newHeroUrl,
            aboutDirectorName: formData.get('aboutDirectorName') as string,
            aboutDirectorImage: newDirUrl,
            aboutText: formData.get('aboutText') as string,
            
            aboutSectionTitle: formData.get('aboutSectionTitle') as string,
            aboutSectionSubtitle: formData.get('aboutSectionSubtitle') as string,
            courseSectionTitle: formData.get('courseSectionTitle') as string,
            courseSectionSubtitle: formData.get('courseSectionSubtitle') as string,
            facultySectionTitle: formData.get('facultySectionTitle') as string,
            facultySectionSubtitle: formData.get('facultySectionSubtitle') as string,
            gallerySectionTitle: formData.get('gallerySectionTitle') as string,
            gallerySectionSubtitle: formData.get('gallerySectionSubtitle') as string,
            selectionsSectionTitle: formData.get('selectionsSectionTitle') as string,
            selectionsSectionSubtitle: formData.get('selectionsSectionSubtitle') as string,

            address: formData.get('address') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            mapUrl: formData.get('mapUrl') as string,
            googleMapsApiKey: formData.get('googleMapsApiKey') as string,
            whatsappUrl: formData.get('whatsappUrl') as string,
            instagramUrl: formData.get('instagramUrl') as string,
            youtubeUrl: formData.get('youtubeUrl') as string,
            facebookUrl: formData.get('facebookUrl') as string,

            // GitHub Settings
            githubToken: formData.get('githubToken') as string,
            githubOwner: formData.get('githubOwner') as string,
            githubRepo: formData.get('githubRepo') as string,
        };
        
        updateSiteSettings(updatedSettings);
        alert('Settings Saved Successfully!');
    } catch (error) {
        console.error("Failed to save settings:", error);
        alert("Error saving settings.");
    }
  };
  
  const handleAISettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      const newAISettings: AISettings = {
          apiKey: formData.get('apiKey') as string,
          systemInstruction: formData.get('systemInstruction') as string,
          welcomeMessage: formData.get('welcomeMessage') as string,
          fallbackMessage: formData.get('fallbackMessage') as string,
      };
      
      updateAISettings(newAISettings);
      alert('AI Chatbot Settings Saved Successfully!');
  };

  const handleVideoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const url = formData.get('videoUrl') as string;
      const videoId = extractYoutubeId(url);

      if (!videoId) {
          alert("Invalid YouTube URL! Please paste a standard link like https://youtube.com/watch?v=... or a Shorts link.");
          return;
      }

      const video: Video = {
          id: Date.now().toString(),
          title: formData.get('title') as string,
          videoId: videoId,
          category: formData.get('category') as any,
          description: formData.get('description') as string,
      };

      addVideo(video);
      setIsAddingVideo(false);
      alert("Video Added Successfully!");
  };

  const handleStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('studentFile') as File;
    const url = formData.get('studentUrl') as string;
    let imageUrl = editingStudent?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80';
    try {
        if (file && file.size > 0) imageUrl = await handleSmartUpload(file);
        else if (url && url.trim() !== '') imageUrl = transformImageUrl(url);

        const student: StudentResult = {
          id: editingStudent ? editingStudent.id : Date.now().toString(),
          name: formData.get('name') as string,
          exam: formData.get('exam') as string,
          rank: formData.get('rank') as string,
          badge: formData.get('badge') as string,
          category: formData.get('category') as any,
          year: formData.get('year') as string,
          story: formData.get('story') as string,
          imageUrl: imageUrl,
        };
        if (editingStudent) { updateStudent(student); setEditingStudent(null); alert("Student updated!"); }
        else { addStudent(student); setIsAddingStudent(false); alert("New student added!"); }
    } catch (error) { alert("Error saving student."); }
  };
  
  const handleFacultySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('facultyFile') as File;
    const url = formData.get('facultyUrl') as string;
    let imageUrl = editingFaculty?.imageUrl || '';
    try {
        if (file && file.size > 0) imageUrl = await handleSmartUpload(file);
        else if (url && url.trim() !== '') imageUrl = transformImageUrl(url);
        
        const member: FacultyMember = {
            id: editingFaculty ? editingFaculty.id : Date.now().toString(),
            name: formData.get('name') as string,
            subject: formData.get('subject') as string,
            experience: formData.get('experience') as string,
            description: formData.get('description') as string,
            imageUrl: imageUrl
        };
        if (editingFaculty) { updateFaculty(member); setEditingFaculty(null); alert("Faculty updated!"); }
        else { addFaculty(member); setIsAddingFaculty(false); alert("Faculty added!"); }
    } catch (error) { alert("Error saving faculty."); }
  };

  const handleCourseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!editingCourse) return;
    const updated: Course = {
        ...editingCourse,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        duration: formData.get('duration') as string,
        target: formData.get('target') as string,
    };
    updateCourse(updated);
    setEditingCourse(null);
    alert("Course updated!");
  };

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('galleryFile') as File;
    const url = formData.get('galleryUrl') as string;
    let imageUrl = editingGalleryImage?.url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
    try {
        if (file && file.size > 0) imageUrl = await handleSmartUpload(file);
        else if (url && url.trim() !== '') imageUrl = transformImageUrl(url);

        const newImage: GalleryImage = {
            id: editingGalleryImage ? editingGalleryImage.id : Date.now().toString(),
            title: formData.get('title') as string,
            subtitle: formData.get('subtitle') as string,
            url: imageUrl
        };
        
        if (editingGalleryImage) {
            updateGalleryImage(newImage);
            setEditingGalleryImage(null);
            alert("Photo updated!");
        } else {
            addGalleryImage(newImage);
            setIsAddingImage(false);
            alert("Photo added!");
        }
    } catch (error) { alert("Error saving photo."); }
  };

  const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'settings', label: 'Site Settings', icon: Settings },
      { id: 'ai-settings', label: 'AI Chatbot', icon: Bot },
      { id: 'videos', label: 'Videos', icon: Youtube },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'faculty', label: 'Faculty', icon: UserCheck },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden font-sans">
      
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 md:hidden z-30 shadow-md">
        <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
                <LayoutDashboard />
            </button>
            <span className="font-bold text-lg tracking-tight">MDC Admin</span>
        </div>
        <button onClick={onLogout} className="p-2 text-red-400">
            <LogOut size={20} />
        </button>
      </div>

      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
        <div className="p-8 border-b border-gray-800 hidden md:block">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutDashboard size={24}/>
            <h2 className="text-2xl font-bold font-heading">MDC Admin</h2>
          </div>
          <p className="text-xs text-gray-500 font-medium tracking-wide">CONTROL PANEL v3.5</p>
        </div>
        <div className="p-6 border-b border-gray-800 md:hidden mt-16">
           <h2 className="text-xl font-bold font-heading text-orange-500">MDC Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <item.icon size={20} className={`transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} /> 
                <span className="font-medium">{item.label}</span>
              </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-3">
            <button onClick={resetData} className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 w-full justify-center transition-colors py-2">
                <RefreshCcw size={14} /> Reset All Data
            </button>
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 font-medium"
            >
                <LogOut size={18} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 h-screen overflow-y-auto bg-gray-100 scroll-smooth">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
            <div className="animate-fade-in max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back. Here is what's happening on your website.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-md transition">
                        <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Users size={28} /></div>
                        <div><p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Students</p><h3 className="text-3xl font-bold text-gray-900">{students.length}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-md transition">
                        <div className="bg-orange-100 p-4 rounded-xl text-orange-600"><BookOpen size={28} /></div>
                        <div><p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Courses</p><h3 className="text-3xl font-bold text-gray-900">{courses.length}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-md transition">
                        <div className="bg-red-100 p-4 rounded-xl text-red-600"><Youtube size={28} /></div>
                        <div><p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Videos</p><h3 className="text-3xl font-bold text-gray-900">{videos.length}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-md transition">
                        <div className="bg-green-100 p-4 rounded-xl text-green-600"><ImageIcon size={28} /></div>
                        <div><p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Photos</p><h3 className="text-3xl font-bold text-gray-900">{galleryImages.length}</h3></div>
                    </div>
                </div>
            </div>
        )}

        {/* AI Chatbot Settings Tab */}
        {activeTab === 'ai-settings' && (
             <div className="animate-fade-in max-w-4xl mx-auto">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">AI Chatbot Configuration</h2>
                    <p className="text-gray-500">Manage 'Drona' (AI Counselor) personality and API keys.</p>
                </header>
                
                <form onSubmit={handleAISettingsSubmit} className="space-y-8">
                    {/* ... (Existing AI Settings Form) ... */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <Bot className="text-purple-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Core Settings</h3>
                        </div>
                        <div className="p-6 space-y-6">
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Google Gemini API Key</label>
                                <input 
                                    name="apiKey" 
                                    type="password"
                                    defaultValue={aiSettings.apiKey} 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm"
                                    placeholder="AIza..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Keep this key secret. If you see errors in chat, check this key.</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">System Instructions (Personality)</label>
                                <textarea 
                                    name="systemInstruction" 
                                    defaultValue={aiSettings.systemInstruction} 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-48 font-mono text-sm" 
                                    placeholder="Describe how the AI should behave..."
                                />
                                <p className="text-xs text-gray-500 mt-1">This tells the AI who it is and how to answer.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <MessageSquare className="text-blue-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Messages</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Welcome Message</label>
                                <input 
                                    name="welcomeMessage" 
                                    defaultValue={aiSettings.welcomeMessage} 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Fallback Message (Offline Mode)</label>
                                <textarea 
                                    name="fallbackMessage" 
                                    defaultValue={aiSettings.fallbackMessage} 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24" 
                                />
                                <p className="text-xs text-gray-500 mt-1">Shown when the API is down or quota exceeded.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition transform flex items-center gap-2">
                            <Save size={20} /> Save AI Settings
                        </button>
                    </div>
                </form>
             </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'settings' && (
            <div className="animate-fade-in max-w-4xl mx-auto pb-20">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Site Configuration</h2>
                </header>
                <form onSubmit={handleSettingsSubmit} className="space-y-8">
                    
                    {/* GitHub Cloud Storage */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800 flex items-center gap-2">
                            <Github className="text-white" size={20}/>
                            <h3 className="font-bold">Cloud Storage (GitHub)</h3>
                            <span className="ml-auto bg-green-500 text-xs font-bold px-2 py-1 rounded">Recommended</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                                <strong>Why?</strong> Browsers limit local storage to 5MB. Connecting GitHub allows you to upload unlimited photos directly to your repository.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">GitHub Username</label>
                                    <input name="githubOwner" defaultValue={siteSettings.githubOwner} placeholder="e.g. your-username" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Repository Name</label>
                                    <input name="githubRepo" defaultValue={siteSettings.githubRepo} placeholder="e.g. mohit-dahiya-classes" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Personal Access Token</label>
                                    <input name="githubToken" type="password" defaultValue={siteSettings.githubToken} placeholder="ghp_..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                Need a token? <a href="https://github.com/settings/tokens" target="_blank" className="text-blue-600 underline">Generate Classic Token</a> with 'repo' scope.
                            </div>
                        </div>
                    </div>

                    {/* Hero & Identity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <LayoutDashboard className="text-purple-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Identity & Hero</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Institute Name</label>
                                    <input name="instituteName" defaultValue={siteSettings.instituteName} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sub Name</label>
                                    <input name="instituteSubName" defaultValue={siteSettings.instituteSubName} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                            </div>
                            <ImageInputGroup label="Logo" namePrefix="logo" currentImage={siteSettings.logoUrl} />
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hero Headline</label>
                                <textarea name="heroHeadline" defaultValue={siteSettings.heroHeadline} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24 font-mono text-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hero Sub Headline</label>
                                <textarea name="heroSubHeadline" defaultValue={siteSettings.heroSubHeadline} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24" />
                            </div>
                            <ImageInputGroup label="Hero Image" namePrefix="hero" currentImage={siteSettings.heroImageUrl} />
                        </div>
                    </div>
                    
                    {/* ... (Existing Text Settings) ... */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <AlignLeft className="text-orange-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Section Texts (Headings)</h3>
                        </div>
                        <div className="p-6 space-y-8">
                            {/* About Section */}
                            <div className="border-b border-gray-100 pb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">About Section & Director Profile</h4>
                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle (Small)</label>
                                        <input name="aboutSectionSubtitle" defaultValue={siteSettings.aboutSectionSubtitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Main Title (HTML Allowed)</label>
                                        <input name="aboutSectionTitle" defaultValue={siteSettings.aboutSectionTitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                </div>
                                <div className="mt-4 mb-4">
                                     <label className="block text-xs font-bold text-gray-700 mb-2">Director Name</label>
                                     <input name="aboutDirectorName" defaultValue={siteSettings.aboutDirectorName} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                                <div className="mb-4">
                                    <ImageInputGroup label="Director's Photo" namePrefix="director" currentImage={siteSettings.aboutDirectorImage} />
                                </div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">Director's Message / About Text</label>
                                <textarea name="aboutText" defaultValue={siteSettings.aboutText} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-32" />
                            </div>

                            {/* Courses Section */}
                            <div className="border-b border-gray-100 pb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Courses Section</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle</label>
                                        <input name="courseSectionSubtitle" defaultValue={siteSettings.courseSectionSubtitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Main Title</label>
                                        <input name="courseSectionTitle" defaultValue={siteSettings.courseSectionTitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                             {/* Faculty Section */}
                            <div className="border-b border-gray-100 pb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Faculty Section</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Title</label>
                                        <input name="facultySectionTitle" defaultValue={siteSettings.facultySectionTitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Description</label>
                                        <input name="facultySectionSubtitle" defaultValue={siteSettings.facultySectionSubtitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Selections Section */}
                             <div className="border-b border-gray-100 pb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Selections / Hall of Fame</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Title</label>
                                        <input name="selectionsSectionTitle" defaultValue={siteSettings.selectionsSectionTitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle / Description</label>
                                        <input name="selectionsSectionSubtitle" defaultValue={siteSettings.selectionsSectionSubtitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                             {/* Gallery Section */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Gallery Section</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Title</label>
                                        <input name="gallerySectionTitle" defaultValue={siteSettings.gallerySectionTitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle</label>
                                        <input name="gallerySectionSubtitle" defaultValue={siteSettings.gallerySectionSubtitle} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Map Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <MapPin className="text-green-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Contact & Location</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* ... (Existing Contact Fields) ... */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                <textarea name="address" defaultValue={siteSettings.address} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number(s)</label>
                                    <input name="phone" defaultValue={siteSettings.phone} placeholder="e.g. 9876543210 / 1234567890" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input name="email" defaultValue={siteSettings.email} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps Embed URL</label>
                                <input name="mapUrl" defaultValue={siteSettings.mapUrl} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps API Key</label>
                                <input name="googleMapsApiKey" defaultValue={siteSettings.googleMapsApiKey} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                            <Globe className="text-pink-600" size={20}/>
                            <h3 className="font-bold text-gray-800">Social Media</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input name="whatsappUrl" defaultValue={siteSettings.whatsappUrl} placeholder="WhatsApp Link" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                <input name="instagramUrl" defaultValue={siteSettings.instagramUrl} placeholder="Instagram Link" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                <input name="youtubeUrl" defaultValue={siteSettings.youtubeUrl} placeholder="YouTube Link" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                                <input name="facebookUrl" defaultValue={siteSettings.facebookUrl} placeholder="Facebook Link" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-6 z-20 flex justify-end">
                        <button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition transform flex items-center gap-2">
                            <Save size={20} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        )}

        {/* ... (Rest of Tabs: Videos, Students, Faculty, Courses, Gallery) ... */}
        {/* Videos Tab */}
        {activeTab === 'videos' && (
             <div className="animate-fade-in max-w-5xl mx-auto">
                {/* ... (Existing Video Content) ... */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Video Gallery</h2>
                    </div>
                    <button onClick={() => setIsAddingVideo(true)} className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700 transition font-bold shadow-md">
                        <Plus size={20} /> Add New Video
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map(video => (
                        <div key={video.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">
                             <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                                <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt="Thumbnail" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white"><Youtube size={20}/></div>
                                </div>
                             </div>
                             <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 line-clamp-2">{video.title}</h4>
                                <button onClick={() => deleteVideo(video.id)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 size={18}/></button>
                             </div>
                             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold uppercase">{video.category}</span>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
            <div className="animate-fade-in max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Student Selections</h2>
                    </div>
                    <button onClick={() => { setEditingStudent(null); setIsAddingStudent(true); }} className="bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition font-bold shadow-md">
                        <Plus size={20} /> Add Student
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                        <div key={student.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex gap-4 items-start relative hover:shadow-md transition">
                            <img src={student.imageUrl} alt={student.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{student.name}</h3>
                                <p className="text-xs text-orange-600 font-bold uppercase">{student.exam}</p>
                                <p className="text-sm text-gray-500">{student.rank}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => { setEditingStudent(student); setIsAddingStudent(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                                <button onClick={() => deleteStudent(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Faculty Tab */}
        {activeTab === 'faculty' && (
            <div className="animate-fade-in max-w-5xl mx-auto">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Faculty Team</h2>
                    </div>
                    <button onClick={() => { setEditingFaculty(null); setIsAddingFaculty(true); }} className="bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition font-bold shadow-md">
                        <Plus size={20} /> Add Faculty
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faculty.map(member => (
                        <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex gap-6 items-center hover:shadow-md transition">
                             <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full object-cover bg-gray-100 border-4 border-white shadow-sm" />
                             <div className="flex-1">
                                <h3 className="font-bold text-xl text-gray-900">{member.name}</h3>
                                <p className="text-orange-600 font-medium text-sm">{member.subject}</p>
                             </div>
                             <div className="flex flex-col gap-2">
                                <button onClick={() => { setEditingFaculty(member); setIsAddingFaculty(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
                                <button onClick={() => deleteFaculty(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
            <div className="animate-fade-in max-w-5xl mx-auto">
                 <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition relative">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                            <button onClick={() => setEditingCourse(course)} className="w-full py-2 border border-blue-200 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                                <Edit size={16}/> Edit Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
            <div className="animate-fade-in max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <button onClick={() => { setEditingGalleryImage(null); setIsAddingImage(true); }} className="bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition font-bold shadow-md">
                        <Plus size={20} /> Add Photo
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map(img => (
                        <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm bg-gray-200">
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => { setEditingGalleryImage(img); setIsAddingImage(true); }} className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-50"><Edit size={20}/></button>
                                <button onClick={() => deleteGalleryImage(img.id)} className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50"><Trash2 size={20}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- MODALS --- */}
        {/* Same Modals as before (Video, Student, Faculty, Course, Gallery) but using handleSmartUpload inside submission handlers via the helper passed down or updated logic above */}
        {/* Video Add Modal */}
        {isAddingVideo && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Youtube className="text-red-600"/> Add YouTube Video</h3>
                    <form onSubmit={handleVideoSubmit} className="space-y-6">
                        {/* ... (Existing inputs) ... */}
                        <div><label className="text-sm font-bold">Video Title</label><input name="title" required className="w-full p-3 border rounded-lg"/></div>
                        <div><label className="text-sm font-bold">YouTube Link</label><input name="videoUrl" required className="w-full p-3 border rounded-lg"/></div>
                        <div>
                             <label className="text-sm font-bold">Category</label>
                             <select name="category" className="w-full p-3 border rounded-lg">
                                 <option value="motivation">Motivation</option>
                                 <option value="maths">Maths</option>
                                 <option value="physics">Physics</option>
                                 <option value="update">Updates</option>
                             </select>
                        </div>
                        <div><label className="text-sm font-bold">Description</label><textarea name="description" className="w-full p-3 border rounded-lg h-24"/></div>
                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setIsAddingVideo(false)} className="px-6 py-3 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold">Add Video</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Student Modal */}
        {isAddingStudent && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
                    <form onSubmit={handleStudentSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input name="name" defaultValue={editingStudent?.name} required className="w-full p-3 border rounded-lg" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Exam</label><input name="exam" defaultValue={editingStudent?.exam} required className="w-full p-3 border rounded-lg" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Rank/Status</label><input name="rank" defaultValue={editingStudent?.rank} required className="w-full p-3 border rounded-lg" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Year</label><input name="year" defaultValue={editingStudent?.year || '2024'} className="w-full p-3 border rounded-lg" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                <select name="category" defaultValue={editingStudent?.category || 'merchant-navy'} className="w-full p-3 border rounded-lg">
                                    <option value="merchant-navy">Merchant Navy</option>
                                    <option value="defence">Defence/Police</option>
                                    <option value="ssc">SSC/Govt</option>
                                    <option value="civil">Civil</option>
                                </select>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Badge (Optional)</label><input name="badge" defaultValue={editingStudent?.badge} placeholder="e.g. BSF, Top 10" className="w-full p-3 border rounded-lg" /></div>
                        </div>
                        
                        <ImageInputGroup label="Student Photo" namePrefix="student" currentImage={editingStudent?.imageUrl} />

                        <div><label className="text-xs font-bold text-gray-500 uppercase">Success Story</label><textarea name="story" defaultValue={editingStudent?.story} className="w-full p-3 border rounded-lg h-24" /></div>
                        
                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setIsAddingStudent(false)} className="px-6 py-3 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700">Save Student</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Faculty Modal */}
        {isAddingFaculty && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingFaculty ? 'Edit Faculty' : 'Add Faculty'}</h3>
                    <form onSubmit={handleFacultySubmit} className="space-y-4">
                        <input name="name" defaultValue={editingFaculty?.name} placeholder="Name" required className="w-full p-3 border rounded-lg" />
                        <input name="subject" defaultValue={editingFaculty?.subject} placeholder="Subject (e.g. Maths)" required className="w-full p-3 border rounded-lg" />
                        <input name="experience" defaultValue={editingFaculty?.experience} placeholder="Experience/Role" required className="w-full p-3 border rounded-lg" />
                        
                        <ImageInputGroup label="Profile Photo" namePrefix="faculty" currentImage={editingFaculty?.imageUrl} />
                        
                        <textarea name="description" defaultValue={editingFaculty?.description} placeholder="Short Bio" className="w-full p-3 border rounded-lg h-24" />
                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setIsAddingFaculty(false)} className="px-6 py-3 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700">Save Faculty</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Course Modal */}
        {editingCourse && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Course</h3>
                    <form onSubmit={handleCourseSubmit} className="space-y-4">
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Title</label><input name="title" defaultValue={editingCourse.title} required className="w-full p-3 border rounded-lg" /></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Duration</label><input name="duration" defaultValue={editingCourse.duration} required className="w-full p-3 border rounded-lg" /></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Target Audience</label><input name="target" defaultValue={editingCourse.target} required className="w-full p-3 border rounded-lg" /></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Description</label><textarea name="description" defaultValue={editingCourse.description} required className="w-full p-3 border rounded-lg h-32" /></div>
                        
                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setEditingCourse(null)} className="px-6 py-3 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Update Course</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Gallery Modal */}
        {isAddingImage && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingGalleryImage ? 'Edit Photo' : 'Add Photo'}</h3>
                    <form onSubmit={handleImageSubmit} className="space-y-4">
                        <input name="title" defaultValue={editingGalleryImage?.title} placeholder="Title" required className="w-full p-3 border rounded-lg" />
                        <input name="subtitle" defaultValue={editingGalleryImage?.subtitle} placeholder="Subtitle" required className="w-full p-3 border rounded-lg" />
                        
                        <ImageInputGroup label="Select Photo" namePrefix="gallery" currentImage={editingGalleryImage?.url} />

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setIsAddingImage(false)} className="px-6 py-3 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700">
                                {editingGalleryImage ? 'Update Photo' : 'Add Photo'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
