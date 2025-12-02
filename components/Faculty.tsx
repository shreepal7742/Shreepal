
import React from 'react';
import { Award, Star, Users, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FacultyProps {
    onViewAll?: () => void;
}

const Faculty: React.FC<FacultyProps> = ({ onViewAll }) => {
  const { faculty, siteSettings } = useData();
  const displayedFaculty = faculty.slice(0, 3);

  return (
    <section id="faculty" className="py-20 bg-white indian-pattern">
      <div className="container mx-auto px-4">
         <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900" dangerouslySetInnerHTML={{ __html: siteSettings.facultySectionTitle }}></h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            {siteSettings.facultySectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12">
             
             {displayedFaculty.map((member) => (
                <div key={member.id} className="group relative overflow-hidden rounded-2xl shadow-xl border-2 border-orange-100 bg-white hover:border-orange-300 transition-all duration-300">
                    <div className="h-full flex flex-col">
                        <div className="h-72 overflow-hidden relative bg-gray-100">
                            {member.imageUrl ? (
                                <img 
                                    src={member.imageUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                    <Users size={64} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-bold font-heading">{member.name}</h3>
                                <p className="text-orange-300 font-medium text-sm">{member.experience}</p>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex gap-1 mb-3">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400"/>)}
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                                <Award size={16} className="text-orange-600"/> {member.subject}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {member.description}
                            </p>
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
                सभी शिक्षकों से मिलें (View All) <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
            </button>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
