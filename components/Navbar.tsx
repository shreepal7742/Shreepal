
import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

interface NavbarProps {
  onNavigate?: (page: 'home' | 'selections' | 'faculty' | 'videos') => void;
  currentPage?: 'home' | 'selections' | 'faculty' | 'videos' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage = 'home' }) => {
  const { siteSettings } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    
    if (onNavigate) {
      if (sectionId === 'selections-page') {
        onNavigate('selections');
      } else if (sectionId === 'faculty-page') {
        onNavigate('faculty');
      } else if (sectionId === 'videos-page') {
        onNavigate('videos');
      } else {
        onNavigate('home');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (sectionId === 'home') {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
      }
    }
  };

  // Safe check in case phone is missing/undefined
  const dialNumber = (siteSettings.phone || '').split('/')[0].replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100">
      <div className="bg-gradient-to-r from-orange-700 to-red-800 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="hidden sm:flex items-center gap-1"><Phone size={12} /> पूछताछ के लिए कॉल करें</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {siteSettings.instituteSubName}</span>
            </div>
            <div className="hidden md:block font-medium">
                मर्चेंट नेवी और SSC के नए बैच शुरू | सत्र 2024-25
            </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            {siteSettings.logoUrl ? (
                <img 
                  src={siteSettings.logoUrl} 
                  alt="Logo" 
                  className="h-14 md:h-16 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                />
            ) : (
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-md transform rotate-3 border-2 border-orange-400">
                    {siteSettings.instituteName.charAt(0)}
                </div>
            )}
            <div>
                <h1 className="text-xl md:text-2xl font-bold font-heading text-gray-900 tracking-tight leading-none">
                    <span className="text-orange-600">{siteSettings.instituteName}</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-semibold tracking-wider">{siteSettings.instituteSubName}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm lg:text-base font-semibold">
            <button onClick={() => handleNavClick('home')} className={`transition ${currentPage === 'home' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>होम</button>
            <button onClick={() => handleNavClick('about')} className="text-gray-700 hover:text-orange-600 transition">परिचय</button>
            <button onClick={() => handleNavClick('courses')} className="text-gray-700 hover:text-orange-600 transition">कोर्स</button>
            <button 
                onClick={() => handleNavClick('faculty-page')} 
                className={`transition ${currentPage === 'faculty' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
                फैकल्टी
            </button>
            <button 
                onClick={() => handleNavClick('videos-page')} 
                className={`transition ${currentPage === 'videos' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
                विडियो (Videos)
            </button>
            <button 
                onClick={() => handleNavClick('selections-page')} 
                className={`transition ${currentPage === 'selections' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
                चयनित छात्र
            </button>
            
            <a 
                href={`tel:${dialNumber}`} 
                className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full hover:shadow-lg hover:shadow-orange-500/40 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Phone size={18} /> संपर्क करें
            </a>
          </div>

          <button 
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-fade-in space-y-3 bg-white">
            <button onClick={() => handleNavClick('home')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">होम</button>
            <button onClick={() => handleNavClick('about')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">परिचय</button>
            <button onClick={() => handleNavClick('courses')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">कोर्स</button>
            <button onClick={() => handleNavClick('faculty-page')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">फैकल्टी</button>
            <button onClick={() => handleNavClick('videos-page')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">विडियो (Videos)</button>
            <button onClick={() => handleNavClick('selections-page')} className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 font-medium rounded-lg">चयनित छात्र</button>
            
            <a href={`tel:${dialNumber}`} className="block w-full text-center mx-4 mt-2 py-3 bg-orange-600 text-white rounded-lg font-bold shadow-md flex justify-center items-center gap-2">
                <Phone size={18} /> संपर्क करें (Call)
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
