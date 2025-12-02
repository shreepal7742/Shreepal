
import React from 'react';
import { ArrowRight, Anchor, Users, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { siteSettings } = useData();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-10 pb-20 lg:pt-24 lg:pb-32 overflow-hidden indian-pattern">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-sm font-bold mb-6 border border-orange-200">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse"></span>
              सत्र 2024-25 के लिए प्रवेश शुरू
            </div>
            {/* Dynamic Headline with HTML support */}
            <h1 
                className="text-4xl lg:text-6xl font-bold font-heading text-gray-900 leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: siteSettings.heroHeadline }}
            >
            </h1>
            <p 
                className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0 font-medium"
                dangerouslySetInnerHTML={{ __html: siteSettings.heroSubHeadline }}
            >
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-1 transition flex items-center justify-center gap-2 text-lg"
              >
                फ्री डेमो क्लास लें <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('courses')}
                className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-xl font-bold hover:border-orange-600 hover:text-orange-600 transition text-lg"
              >
                कोर्स देखें
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6 border-t border-gray-200 pt-8">
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex justify-center lg:justify-start items-center gap-2">
                        <Users className="text-orange-600 w-6 h-6 sm:w-8 sm:h-8"/> सीमित
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">बैच साइज (20-40)</p>
                </div>
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex justify-center lg:justify-start items-center gap-2">
                        <Anchor className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8"/> विशेषज्ञ
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">मर्चेंट नेवी में</p>
                </div>
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex justify-center lg:justify-start items-center gap-2">
                        <BookOpen className="text-green-600 w-6 h-6 sm:w-8 sm:h-8"/> 100%
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">डाउट सॉल्विंग</p>
                </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-200 to-red-100 rounded-[2rem] transform rotate-3"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img 
                    src={siteSettings.heroImageUrl} 
                    alt="Institute Environment" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-center">
                    <p className="text-white font-medium text-lg font-heading">"भीड़ नहीं, हर छात्र पर विशेष ध्यान"</p>
                </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-white p-4 rounded-xl shadow-xl border-l-4 border-orange-600 animate-bounce-slow max-w-[150px]">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🚢</span>
                    <span className="font-bold text-gray-900 leading-tight text-sm">Merchant Navy</span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">स्पेशल कोचिंग उपलब्ध</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;