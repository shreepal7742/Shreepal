
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Faculty from './components/Faculty';
import FacultyFullPage from './components/FacultyFullPage';
import Gallery from './components/Gallery';
import Selections from './components/Selections';
import SelectionsFullPage from './components/SelectionsFullPage';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import VideosFullPage from './components/VideosFullPage';
import AICounselor from './components/AICounselor';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'selections' | 'faculty' | 'videos' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const handleAdminNav = () => setCurrentView('admin');
    window.addEventListener('nav-admin', handleAdminNav);
    return () => window.removeEventListener('nav-admin', handleAdminNav);
  }, []);

  const handleNavigate = (page: 'home' | 'selections' | 'faculty' | 'videos') => {
    if (page !== 'home') {
      window.scrollTo(0, 0);
    }
    setCurrentView(page);
  };

  const handleJoinBatch = () => {
    setCurrentView('home');
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin') {
        setIsAdminLoggedIn(true);
    } else {
        alert('गलत पासवर्ड! (Incorrect Password)');
    }
  };

  if (currentView === 'admin' && !isAdminLoggedIn) {
      return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full">
                  <h2 className="text-2xl font-bold font-heading text-center mb-6 text-gray-800">Admin Login</h2>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <input 
                              type="password" 
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                              placeholder="Enter passcode"
                          />
                      </div>
                      <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition">
                          Login
                      </button>
                      <button type="button" onClick={() => setCurrentView('home')} className="w-full text-gray-500 text-sm hover:text-gray-800">
                          Back to Website
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  if (currentView === 'admin' && isAdminLoggedIn) {
      return (
          <AdminDashboard onLogout={() => {
              setIsAdminLoggedIn(false);
              setCurrentView('home');
          }} />
      );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentView} />
      
      {currentView === 'home' && (
        <>
          <Hero />
          <About />
          <Courses />
          <Faculty onViewAll={() => handleNavigate('faculty')} />
          <Gallery />
          <Selections onViewAll={() => handleNavigate('selections')} />
          <Contact />
        </>
      )}

      {currentView === 'selections' && (
        <SelectionsFullPage onBack={() => handleNavigate('home')} onJoin={handleJoinBatch} />
      )}

      {currentView === 'faculty' && (
        <FacultyFullPage onBack={() => handleNavigate('home')} onJoin={handleJoinBatch} />
      )}

      {currentView === 'videos' && (
        <VideosFullPage onBack={() => handleNavigate('home')} />
      )}
      
      {/* AI Counselor Chat Bot */}
      <AICounselor />
      
    </div>
  );
}

export default function App() {
    return (
        <DataProvider>
            <AppContent />
        </DataProvider>
    )
}
