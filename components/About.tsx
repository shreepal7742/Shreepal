
import React from 'react';
import { Target, Users } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { siteSettings } = useData();

  const renderText = (text: string) => {
      const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
      return { __html: html };
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
             <div className="relative">
                <div className="w-full h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-2 border-orange-100">
                    <img 
                        src={siteSettings.aboutDirectorImage} 
                        alt={siteSettings.aboutDirectorName} 
                        className="w-full h-full object-cover object-top" 
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-tl-3xl shadow-lg">
                    <h4 className="text-xl font-bold font-heading">{siteSettings.aboutDirectorName}</h4>
                    <p className="text-sm opacity-90 font-medium">निदेशक और मेंटर</p>
                </div>
             </div>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">{siteSettings.aboutSectionSubtitle}</span>
            <h2 
                className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-6 mt-2"
                dangerouslySetInnerHTML={{ __html: siteSettings.aboutSectionTitle }}
            ></h2>
            <div 
                className="text-gray-700 mb-8 leading-relaxed text-lg"
                dangerouslySetInnerHTML={renderText(siteSettings.aboutText)}
            ></div>
            
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="bg-orange-200 p-2 rounded-lg text-orange-700"><Target size={24} /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">विशेषज्ञता (Specialization)</h4>
                        <p className="text-sm text-gray-600">मर्चेंट नेवी स्पॉन्सरशिप और IMU-CET के लिए विशेष मार्गदर्शन।</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="bg-blue-200 p-2 rounded-lg text-blue-700"><Users size={24} /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">सीमित सीटें (Limited Seats)</h4>
                        <p className="text-sm text-gray-600">हर बैच में केवल 20-40 छात्र ताकि शिक्षक हर बच्चे को जान सकें।</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
