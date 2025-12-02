
import React, { useState } from 'react';
import { Anchor, Briefcase, Train, CheckCircle, ArrowRight, HelpCircle, GraduationCap, Target, RefreshCw, Check, X, BookOpen, Star, Award, TrendingUp, Plane, Shield, PhoneCall } from 'lucide-react';
import { Course } from '../types';
import { useData } from '../context/DataContext';

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'anchor': return <Anchor size={32} className="text-blue-600" />;
        case 'briefcase': return <Briefcase size={32} className="text-orange-600" />;
        case 'train': return <Train size={32} className="text-red-600" />;
        case 'plane': return <Plane size={32} className="text-sky-600" />;
        case 'shield': return <Shield size={32} className="text-indigo-600" />;
        default: return <CheckCircle size={32} className="text-green-600" />;
    }
};

const Courses: React.FC = () => {
  const { courses, siteSettings } = useData();
  const [quizState, setQuizState] = useState<'start' | 'q1' | 'q2' | 'result'>('start');
  const [qualification, setQualification] = useState('');
  const [recommendedId, setRecommendedId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const resetQuiz = () => {
    setQuizState('start');
    setQualification('');
    setRecommendedId('');
  };

  const handleQualificationSelect = (qual: string) => {
    setQualification(qual);
    setQuizState('q2');
  };

  const handleInterestSelect = (interest: string) => {
    let result = '';

    if (qualification === '12th-pcm') {
        if (interest === 'adventure') result = 'merchant-navy';
        else if (interest === 'force') result = 'airforce-navy';
        else result = 'ssc';
    } else if (qualification === '10th') {
        if (interest === 'force') result = 'ssc'; 
        else if (interest === 'police') result = 'police';
        else result = 'railways';
    } else if (qualification === '12th-other') {
        if (interest === 'force') result = 'police';
        else result = 'cet';
    } else if (qualification === 'grad') {
        if (interest === 'officer') result = 'ssc';
        else result = 'cet';
    }

    setRecommendedId(result);
    setQuizState('result');
    
    setTimeout(() => {
        const element = document.getElementById(`course-${result}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-orange-400');
            setTimeout(() => element.classList.remove('ring-4', 'ring-orange-400'), 2000);
        }
    }, 100);
  };

  // Safe check for phone property
  const dialNumber = (siteSettings.phone || '').split('/')[0].replace(/\D/g, '');

  return (
    <section id="courses" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">{siteSettings.courseSectionSubtitle}</span>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900 mt-2" dangerouslySetInnerHTML={{ __html: siteSettings.courseSectionTitle }}></h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Interactive Quiz Section */}
        <div className="max-w-3xl mx-auto mb-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-600"></div>
            
            <div className="p-8 text-center">
                {quizState === 'start' && (
                    <div className="animate-fade-in">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HelpCircle size={32} className="text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">तय नहीं कर पा रहे कि कौन सा कोर्स चुनें?</h3>
                        <p className="text-gray-600 mb-6">30 सेकंड का क्विज़ लें और जानें आपके करियर के लिए सबसे सही विकल्प।</p>
                        <button 
                            onClick={() => setQuizState('q1')}
                            className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                        >
                            कोर्स फाइंडर शुरू करें
                        </button>
                    </div>
                )}

                {quizState === 'q1' && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="bg-orange-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">1</span>
                            <span className="h-0.5 w-10 bg-gray-200"></span>
                            <span className="bg-gray-200 text-gray-500 w-6 h-6 rounded-full text-xs flex items-center justify-center">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                            <GraduationCap className="text-orange-500" /> आपकी पढ़ाई (Qualification) क्या है?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => handleQualificationSelect('10th')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">10वीं पास</button>
                            <button onClick={() => handleQualificationSelect('12th-pcm')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">12वीं (Science-Math)</button>
                            <button onClick={() => handleQualificationSelect('12th-other')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">12वीं (Arts/Comm/Bio)</button>
                            <button onClick={() => handleQualificationSelect('grad')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">ग्रेजुएट (Graduate)</button>
                        </div>
                    </div>
                )}

                {quizState === 'q2' && (
                    <div className="animate-fade-in">
                         <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="bg-green-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"><Check size={12}/></span>
                            <span className="h-0.5 w-10 bg-orange-600"></span>
                            <span className="bg-orange-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                            <Target className="text-orange-500" /> आपकी मुख्य रुचि क्या है?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {qualification === '12th-pcm' ? (
                                <>
                                    <button onClick={() => handleInterestSelect('adventure')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">एडवेंचर और हाई सैलरी</span>
                                        <span className="text-xs text-gray-500">मर्चेंट नेवी</span>
                                    </button>
                                    <button onClick={() => handleInterestSelect('force')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">टेक्निकल डिफेंस</span>
                                        <span className="text-xs text-gray-500">एयरफोर्स / नेवी</span>
                                    </button>
                                </>
                            ) : qualification === '10th' ? (
                                <>
                                    <button onClick={() => handleInterestSelect('force')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">पैरामिलिट्री (GD)</span>
                                        <span className="text-xs text-gray-500">SSC GD (BSF/CRPF)</span>
                                    </button>
                                     <button onClick={() => handleInterestSelect('police')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">पुलिस सेवा</span>
                                        <span className="text-xs text-gray-500">राज्य/दिल्ली पुलिस</span>
                                    </button>
                                </>
                            ) : qualification === 'grad' ? (
                                <>
                                     <button onClick={() => handleInterestSelect('officer')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">केंद्र सरकार (Officer Rank)</button>
                                     <button onClick={() => handleInterestSelect('state')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700">राज्य सरकार (Rajasthan Govt)</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleInterestSelect('force')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">वर्दी (Uniform) / पुलिस</span>
                                        <span className="text-xs text-gray-500">पुलिस, पैरामिलिट्री</span>
                                    </button>
                                    <button onClick={() => handleInterestSelect('office')} className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-medium text-gray-700 text-left">
                                        <span className="block font-bold text-gray-900">ऑफिस / क्लेरिकल जॉब</span>
                                        <span className="text-xs text-gray-500">डेस्क वर्क, CET</span>
                                    </button>
                                </>
                            )}
                        </div>
                        <button onClick={resetQuiz} className="mt-6 text-sm text-gray-500 underline hover:text-orange-600">शुरू से करें</button>
                    </div>
                )}

                {quizState === 'result' && (
                    <div className="animate-fade-in text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">आपके लिए हमारी सिफारिश:</h3>
                        <p className="text-orange-600 font-bold text-2xl font-heading mb-6">
                            {courses.find(c => c.id === recommendedId)?.title}
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            हमने आपके विकल्पों के आधार पर यह सुझाव दिया है। <br/> अधिक जानकारी के लिए नीचे कोर्स कार्ड देखें।
                        </p>
                        <button 
                            onClick={resetQuiz}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium bg-gray-100 px-4 py-2 rounded-full transition"
                        >
                            <RefreshCw size={16} /> फिर से देखें
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
                key={course.id} 
                id={`course-${course.id}`}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border flex flex-col group hover:-translate-y-2 relative overflow-hidden ${recommendedId === course.id ? 'border-orange-500 ring-2 ring-orange-200 scale-105 z-10' : 'border-gray-100'}`}
            >
              {recommendedId === course.id && (
                  <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">
                      RECOMMENDED
                  </div>
              )}
              <div className="mb-4 bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                {getIcon(course.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">{course.description}</p>
              
              <div className="border-t border-gray-100 pt-4 mt-auto space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">अवधि (Duration):</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">योग्यता (Elig.):</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{course.target}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedCourse(course)}
                className={`w-full mt-6 py-2.5 flex items-center justify-center gap-2 border rounded-lg font-bold transition ${recommendedId === course.id ? 'bg-orange-600 text-white border-orange-600 hover:bg-orange-700' : 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'}`}
              >
                विस्तार से जानें <ArrowRight size={16}/>
              </button>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedCourse(null)}>
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">{getIcon(selectedCourse.icon)}</div>
                            <h3 className="text-2xl font-bold font-heading text-gray-900">{selectedCourse.title}</h3>
                        </div>
                        <button onClick={() => setSelectedCourse(null)} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <X size={24} className="text-gray-500"/>
                        </button>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                                <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-orange-800">
                                    <Star className="w-5 h-5 fill-orange-600 text-orange-600"/>
                                    मुख्य विशेषताएं (Key Features)
                                </h4>
                                <ul className="space-y-3">
                                    {selectedCourse.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                            <CheckCircle className="w-4 h-4 text-orange-600 mt-1 shrink-0"/>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-blue-800">
                                    <BookOpen className="w-5 h-5 text-blue-600"/>
                                    सिलेबस कवरेज (Syllabus)
                                </h4>
                                <ul className="space-y-3">
                                    {selectedCourse.subjects.map((subject, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                            {subject}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-green-800">
                                <TrendingUp className="w-5 h-5 text-green-600"/>
                                कोर्स के बाद भविष्य (Future Scope)
                            </h4>
                            <ul className="space-y-3">
                                {selectedCourse.afterCompletion.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                             <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-gray-900 border-b pb-2">
                                <Award className="w-5 h-5 text-purple-600"/>
                                करियर के अवसर (Career Opportunities)
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {selectedCourse.jobRoles.map((role, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h5 className="font-bold text-lg">आज ही डेमो क्लास बुक करें</h5>
                                <p className="text-gray-400 text-sm">सीमित सीटें उपलब्ध हैं। अभी संपर्क करें।</p>
                            </div>
                            <a href={`tel:${dialNumber}`} className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-bold transition shadow-lg flex items-center gap-2">
                                <PhoneCall size={20} /> कॉल करें (Call Now)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
