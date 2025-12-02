
import React, { useState } from 'react';
import { ArrowLeft, Youtube, PlayCircle, BookOpen, Star, Zap, Info, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

interface VideosFullPageProps {
  onBack: () => void;
}

const VideosFullPage: React.FC<VideosFullPageProps> = ({ onBack }) => {
  const { videos, siteSettings } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories mapping
  const categories = [
    { id: 'all', label: 'All Videos', icon: Youtube },
    { id: 'motivation', label: 'Motivation & Strategy', icon: Zap },
    { id: 'maths', label: 'Maths & Physics', icon: BookOpen },
    { id: 'physics', label: 'Physics', icon: Star },
    { id: 'update', label: 'Exam Updates', icon: Info },
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      {/* Navbar Placeholder */}
      <div className="h-16 bg-white shadow-sm"></div>

      {/* Hero Section */}
      <div className="relative bg-red-900 text-white overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-900/60 to-black z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-red-200 hover:text-white mb-8 transition group font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition"/> Back to Home
          </button>

          <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg shadow-lg">
                    <Youtube size={24} className="text-white" />
                </div>
                <span className="text-red-300 font-bold tracking-widest uppercase text-sm">Video Lectures</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                Watch & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Learn</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Access free guidance, strategy sessions, and topic-wise lectures from Mohit Dahiya Classes. Subscribe to our channel for daily updates.
              </p>
              {siteSettings.youtubeUrl && (
                  <a href={siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-full font-bold hover:bg-red-50 transition shadow-lg">
                      <Youtube size={20} /> Subscribe Channel
                  </a>
              )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/30' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.label}
                </button>
              ))}
            </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredVideos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
                <Youtube size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-xl font-medium">No videos found in this category.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map(video => (
                    <a 
                        key={video.id} 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                    >
                        {/* Video Thumbnail */}
                        <div className="aspect-video bg-black relative overflow-hidden">
                            <img 
                                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                                alt={video.title} 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                loading="lazy"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                                    <PlayCircle size={32} className="fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                                Watch on YouTube
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <span className="inline-block px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded tracking-wider">
                                    {video.category}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                {video.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                                {video.description || "Click to watch full video on YouTube."}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-red-600 font-bold text-sm">
                                <span className="flex items-center gap-2"><PlayCircle size={16} /> Play Video</span>
                                <ExternalLink size={14} className="text-gray-400 group-hover:text-red-600 transition-colors"/>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default VideosFullPage;
