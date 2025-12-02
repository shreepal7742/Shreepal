
import React, { useState } from 'react';
import { Trophy, Search, Award, Quote, ArrowLeft, BadgeCheck, PhoneCall, X, Calendar, Medal } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StudentResult } from '../types';

interface SelectionsFullPageProps {
  onBack: () => void;
  onJoin?: () => void;
}

const SelectionsFullPage: React.FC<SelectionsFullPageProps> = ({ onBack, onJoin }) => {
  const { students } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.category === filter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.exam.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      {/* Navbar Placeholder for visual consistency */}
      <div className="h-16 bg-white shadow-sm"></div>

      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden pb-16 pt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/40 to-black z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition"/> वापस होम पेज पर
          </button>

          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-600 rounded-lg shadow-lg rotate-3">
                    <Trophy size={32} className="text-white" />
                </div>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-sm bg-orange-900/30 px-3 py-1 rounded-full border border-orange-500/30">Hall of Fame</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                सफलता की <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">अमिट छाप</span>
              </h1>
              <p className="text-gray-400 mt-6 max-w-xl text-lg">
                यह सिर्फ नाम नहीं, मेहनत की कहानियाँ हैं। देखिये कैसे कुचामन के इन छात्रों ने मोहित दहिया क्लासेज के साथ मिलकर अपना भविष्य बदला।
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                    <h3 className="text-3xl font-bold text-orange-400 flex justify-center items-center gap-1">
                        500<span className="text-sm">+</span>
                    </h3>
                    <p className="text-xs text-gray-300">कुल चयन</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                    <h3 className="text-3xl font-bold text-blue-400 flex justify-center items-center gap-1">
                        95<span className="text-sm">%</span>
                    </h3>
                    <p className="text-xs text-gray-300">सफलता दर</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {[
                { id: 'all', label: 'सभी (All)' },
                { id: 'merchant-navy', label: 'मर्चेंट नेवी' },
                { id: 'defence', label: 'डिफेंस/पुलिस' },
                { id: 'ssc', label: 'SSC/Govt' },
                { id: 'civil', label: 'Civil Exams' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    filter === tab.id 
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="नाम या एग्जाम सर्च करें..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full focus:bg-white focus:border-orange-500 focus:outline-none transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="container mx-auto px-4 py-12">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">कोई परिणाम नहीं मिला।</p>
            <p className="text-sm">कृपया फिल्टर बदलें या दोबारा सर्च करें।</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full overflow-hidden cursor-pointer"
              >
                {/* Header with Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent z-10"></div>
                  <img 
                    src={student.imageUrl} 
                    alt={student.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 z-20">
                     <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded border border-white/20">
                        {student.year || '2024'}
                     </span>
                  </div>
                  {student.badge && (
                    <div className="absolute top-3 right-3 z-20">
                         <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                            <BadgeCheck size={12} /> {student.badge}
                         </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-xl font-bold font-heading">{student.name}</h3>
                    <p className="text-orange-300 text-sm font-medium flex items-center gap-1">
                        <Award size={14} /> {student.rank}
                    </p>
                  </div>
                </div>

                {/* Body with Story */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                            {student.exam}
                        </span>
                        {student.story && (
                            <div className="relative">
                                <Quote size={20} className="absolute -top-2 -left-1 text-orange-200 fill-current transform scale-150 opacity-50" />
                                <p className="text-gray-600 text-sm italic leading-relaxed pl-4 relative z-10 line-clamp-3">
                                    "{student.story}"
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1 text-orange-600">
                             सत्यापित परिणाम <BadgeCheck size={14}/>
                        </span>
                        <span className="group-hover:text-orange-600 transition">View Profile →</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Motivational Banner */}
        <div className="mt-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">अगली तस्वीर आपकी हो सकती है!</h2>
                <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
                    सपना देखने से कुछ नहीं होता, उसके लिए सही दिशा में मेहनत करनी पड़ती है। मोहित दहिया क्लासेज के साथ अपनी तैयारी शुरू करें।
                </p>
                <button 
                  onClick={onJoin || onBack} 
                  className="bg-white text-orange-700 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition shadow-lg transform hover:-translate-y-1 inline-flex items-center gap-2"
                >
                    <PhoneCall size={18} /> बैच जॉइन करें
                </button>
            </div>
        </div>
      </div>

      {/* Full Profile Modal */}
      {selectedStudent && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedStudent(null)}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setSelectedStudent(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition"
                >
                    <X size={20} />
                </button>

                {/* Left: Image */}
                <div className="md:w-2/5 relative h-64 md:h-auto bg-gray-100">
                    <img 
                        src={selectedStudent.imageUrl} 
                        alt={selectedStudent.name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                         <div className="flex items-center gap-2 mb-1">
                             <Calendar size={14} className="text-orange-400"/>
                             <span className="text-xs font-bold uppercase tracking-wider text-orange-200">Selected in {selectedStudent.year || '2024'}</span>
                         </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="md:w-3/5 p-8 overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                                {selectedStudent.exam}
                            </span>
                            <h2 className="text-3xl font-bold font-heading text-gray-900">{selectedStudent.name}</h2>
                            <p className="text-lg text-orange-600 font-bold flex items-center gap-2 mt-1">
                                <Award size={20} /> {selectedStudent.rank}
                            </p>
                        </div>
                        {selectedStudent.badge && (
                            <div className="text-center">
                                <Medal size={32} className="text-orange-500 mx-auto mb-1"/>
                                <span className="text-[10px] font-bold text-gray-500 uppercase block">{selectedStudent.badge}</span>
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-gray-100 w-full my-6"></div>

                    <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Quote className="text-orange-500 fill-current" size={18} /> Success Story
                        </h4>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-gray-700 leading-relaxed italic relative">
                            "{selectedStudent.story || "मोहित दहिया क्लासेज के साथ मेरी यात्रा अद्भुत रही। शिक्षकों का मार्गदर्शन और निरंतर सहयोग ही मेरी सफलता का कारण है।"}"
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">Category</p>
                            <p className="font-bold text-gray-800 capitalize">{selectedStudent.category?.replace('-', ' ')}</p>
                        </div>
                        <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                            <p className="font-bold text-green-600 flex items-center justify-center gap-1"><BadgeCheck size={16}/> Verified</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SelectionsFullPage;
