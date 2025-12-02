
import React from 'react';
import { Trophy, Medal, Star, ArrowRight, ClipboardList } from 'lucide-react';
import { useData } from '../context/DataContext';

interface SelectionsProps {
    onViewAll?: () => void;
}

const Selections: React.FC<SelectionsProps> = ({ onViewAll }) => {
  const { students, siteSettings } = useData();
  const topStudents = students.slice(0, 4);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="selections" className="py-20 bg-white indian-pattern relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="text-orange-600 animate-bounce-slow" size={24} />
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">सफलता की कहानियाँ</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900" dangerouslySetInnerHTML={{ __html: siteSettings.selectionsSectionTitle }}></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {siteSettings.selectionsSectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {topStudents.map((student) => (
            <div key={student.id} className="group relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={student.imageUrl} 
                    alt={student.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {student.badge && (
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-orange-700 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-orange-100 flex items-center gap-1">
                      <Medal size={12} /> {student.badge}
                    </div>
                  )}
                  {student.year && (
                    <div className="absolute top-4 left-4 z-20 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                        {student.year}
                    </div>
                  )}
                </div>

                <div className="p-6 text-center relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white p-2 rounded-full shadow-lg z-20 border-4 border-white">
                    <Star size={20} className="fill-current" />
                  </div>

                  <h3 className="text-xl font-bold font-heading text-gray-900 mt-4 mb-1 group-hover:text-orange-600 transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {student.exam}
                  </p>
                  
                  <div className="inline-block bg-green-50 text-green-700 px-4 py-1.5 rounded-lg text-sm font-medium border border-green-100">
                    {student.rank}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
            <button 
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md group"
            >
                सभी चयनित छात्र देखें <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
            </button>
        </div>

        <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-orange-50 px-8 py-6 rounded-2xl border border-orange-100 shadow-sm">
                <div>
                    <h4 className="text-xl font-bold text-gray-900">क्या आप अगले टॉपर बनना चाहते हैं?</h4>
                    <p className="text-gray-600 text-sm">आज ही जुड़ें हमारे फाउंडेशन बैच से।</p>
                </div>
                <button 
                  onClick={scrollToForm}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold hover:shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2"
                >
                    <ClipboardList size={20} /> रजिस्ट्रेशन करें
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Selections;
