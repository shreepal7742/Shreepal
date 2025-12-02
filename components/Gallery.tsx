
import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { galleryImages, siteSettings } = useData();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto'; 
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ImageIcon className="text-orange-600" size={24} />
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">{siteSettings.gallerySectionSubtitle}</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900" dangerouslySetInnerHTML={{ __html: siteSettings.gallerySectionTitle }}></h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div 
              key={img.id} 
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64 md:h-72 border border-gray-100"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold font-heading transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
                <p className="text-orange-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 font-medium">
                  {img.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
               <img 
                  src={galleryImages[selectedImageIndex].url} 
                  alt={galleryImages[selectedImageIndex].title}
                  className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white rounded-b-lg">
                  <h3 className="text-xl font-bold font-heading">{galleryImages[selectedImageIndex].title}</h3>
                  <p className="text-gray-300">{galleryImages[selectedImageIndex].subtitle}</p>
               </div>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <ChevronRight size={40} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-sm font-medium">
                Image {selectedImageIndex + 1} of {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
