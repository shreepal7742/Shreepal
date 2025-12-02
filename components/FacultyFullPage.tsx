
import React, { useState } from 'react';
import { ArrowLeft, Star, Award, BookOpen, Users, Quote, Phone, X, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { FacultyMember } from '../types';

interface FacultyFullPageProps {
  onBack: () => void;
  onJoin: () => void;
}

const FacultyFullPage: React.FC<FacultyFullPageProps> = ({ onBack, onJoin }) => {
  const { faculty, siteSettings } = useData();
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // Separate Director from other faculty if needed, or just display all
  const director = faculty.find(f => f.name.includes('Mohit') || f.name.includes('मोहित'));
  const otherFaculty = faculty.filter(f => f.id !== director?.id);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
       {/* Navbar Placeholder */}
       <div className="h-16 bg-white shadow-sm"></div>

       {/* Hero Section */}
       <div className="relative bg-gray-900 text-white overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/60 to-black z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-orange-300 hover:text-white mb-8 transition group font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition"/> होम पेज पर वापस
          </button>

          <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-600 rounded-lg shadow-lg">
                    <Users size={24} className="text-white" />
                </div>
                <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">हमारी टीम</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                गुरु बिना <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">ज्ञान नहीं</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                मोहित दहिया क्लासेज की सबसे बड़ी ताकत है यहाँ के अनुभवी शिक्षक। 
                जानिए उन गुरुओं के बारे में जो आपके सपनों को हकीकत में बदलने के लिए दिन-रात मेहनत करते हैं।
              </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        
        {/* Director Profile - Special Highlight */}
        {director && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12 transform hover:scale-[1.01] transition-all duration-500 cursor-pointer" onClick={() => setSelectedFaculty(director)}>
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/5 h-[400px] lg:h-auto relative">
                        <img 
                            src={director.imageUrl} 
                            alt={director.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden"></div>
                        <div className="absolute bottom-4 left-4 text-white lg:hidden">
                            <h2 className="text-3xl font-bold font-heading">{director.name}</h2>
                            <p className="text-orange-300 font-medium">{director.experience}</p>
                        </div>
                    </div>
                    <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="hidden lg:block mb-6">
                             <h2 className="text-4xl font-bold font-heading text-gray-900">{director.name}</h2>
                             <p className="text-orange-600 font-bold text-lg">{director.experience} | {director.subject}</p>
                        </div>
                        
                        <div className="mb-8">
                             <Quote size={40} className="text-orange-200 fill-current mb-4" />
                             <p className="text-gray-700 text-lg leading-relaxed italic border-l-4 border-orange-500 pl-4 line-clamp-3 lg:line-clamp-none">
                                {director.description || "मेरा उद्देश्य केवल सिलेबस पूरा करना नहीं, बल्कि छात्रों के मन से असफलता का डर निकालना है। हर छात्र खास है और उसे बस सही मार्गदर्शन की जरूरत है।"}
                             </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-orange-50 p-4 rounded-xl">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                                    <Star className="text-orange-600 fill-orange-600" size={18}/> अनुभव
                                </h4>
                                <p className="text-sm text-gray-600">10+ वर्षों का शिक्षण अनुभव</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                                    <Award className="text-blue-600" size={18}/> विशेषज्ञता
                                </h4>
                                <p className="text-sm text-gray-600">Physics & Maths (Technical)</p>
                            </div>
                        </div>
                        <div className="mt-6 text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View Full Profile →
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Other Faculty Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-orange-600 pl-4">विषय विशेषज्ञ (Subject Experts)</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {otherFaculty.map((member) => (
                <div 
                    key={member.id} 
                    onClick={() => setSelectedFaculty(member)}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                    <div className="h-64 overflow-hidden relative bg-gray-200 shrink-0">
                        {member.imageUrl ? (
                             <img 
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Users size={64}/>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                            {member.experience}
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold font-heading text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-orange-600 font-medium text-sm mb-4 flex items-center gap-2">
                            <BookOpen size={16}/> {member.subject}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 border-t border-gray-100 pt-4 line-clamp-3">
                            {member.description}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current"/>)}
                            </div>
                             <span className="text-orange-600 text-xs font-bold hover:underline">Read More</span>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Join Team Card */}
             <div className="bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center hover:border-orange-400 transition cursor-pointer h-full min-h-[300px]" onClick={onJoin}>
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                    <Users size={32} className="text-orange-600"/>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">हमारी टीम से जुड़ें</h3>
                <p className="text-gray-500 text-sm mb-6">
                    क्या आप भी एक बेहतरीन शिक्षक हैं? हमें अपना बायोडाटा भेजें।
                </p>
                <a href={`mailto:${siteSettings.email}`} className="text-orange-600 font-bold hover:underline">
                    Apply Now
                </a>
            </div>
        </div>

        {/* CTA */}
        <div className="bg-orange-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">इन विशेषज्ञों से पढ़ने का मौका न चूकें</h2>
                <p className="text-orange-100">2 दिन की फ्री डेमो क्लास लेकर देखें और फर्क महसूस करें।</p>
            </div>
            <button 
                onClick={onJoin}
                className="bg-white text-orange-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition transform hover:-translate-y-1 flex items-center gap-2"
            >
                <Phone size={20} /> अभी डेमो बुक करें
            </button>
        </div>

      </div>

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedFaculty(null)}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setSelectedFaculty(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition"
                >
                    <X size={20} />
                </button>

                {/* Left: Image */}
                <div className="md:w-2/5 relative h-72 md:h-auto bg-gray-100 shrink-0">
                    <img 
                        src={selectedFaculty.imageUrl} 
                        alt={selectedFaculty.name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                         <div className="flex items-center gap-2 mb-1">
                             <Award size={16} className="text-orange-400"/>
                             <span className="text-xs font-bold uppercase tracking-wider text-orange-200">Expert Faculty</span>
                         </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="md:w-3/5 p-8 overflow-y-auto">
                    <div>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                            {selectedFaculty.subject}
                        </span>
                        <h2 className="text-3xl font-bold font-heading text-gray-900">{selectedFaculty.name}</h2>
                        <p className="text-lg text-gray-500 font-medium mt-1">
                            {selectedFaculty.experience}
                        </p>
                    </div>

                    <div className="h-px bg-gray-100 w-full my-6"></div>

                    <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen className="text-orange-600" size={18} /> About
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            {selectedFaculty.description || "An experienced educator dedicated to student success."}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500"/>
                            <span>Specialized in Competitive Exams</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500"/>
                            <span>Personalized Mentorship</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500"/>
                            <span>Doubt Solving Expert</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button 
                            onClick={onJoin}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-orange-600 transition flex justify-center items-center gap-2"
                        >
                            <Phone size={18} /> Book a Class with {selectedFaculty.name.split(' ')[0]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default FacultyFullPage;
