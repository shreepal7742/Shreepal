
import React, { useState } from 'react';
import { MapPin, Clock, Info, Instagram, Facebook, Youtube, PhoneCall, Map as MapIcon, Lock, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteSettings } = useData();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xovgwlab", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('idle');
        alert("फॉर्म भेजने में समस्या हुई। कृपया सीधे कॉल करें।");
      }
    } catch (error) {
      setFormStatus('idle');
      alert("नेटवर्क त्रुटि। कृपया इंटरनेट कनेक्शन जाँचें।");
    }
  };

  // Safe check for phone property
  const dialNumbers = (siteSettings.phone || '').split('/').map(n => n.trim());
  
  return (
    <section id="contact" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
             <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">हमसे जुड़ें</span>
             <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6 mt-2">कैंपस पधारें</h2>
             
             <div className="p-4 bg-orange-900/40 border border-orange-500/40 rounded-xl mb-8 flex gap-4">
                <Info className="text-orange-500 shrink-0 w-6 h-6" />
                <p className="text-sm text-gray-200">
                    <strong>नोट:</strong> बेहतर जानकारी और एडमिशन के लिए कृपया सेंटर पर स्वयं पधारें। फोन पर पूरी जानकारी मिलना संभव नहीं हो पाता है।
                </p>
             </div>

             <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                    <div className="bg-orange-600 p-3 rounded-lg text-white shadow-lg group-hover:scale-110 transition duration-300">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl mb-1">पता (Address)</h4>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {siteSettings.address}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group">
                    <div className="bg-orange-600 p-3 rounded-lg text-white shadow-lg group-hover:scale-110 transition duration-300">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl mb-1">फोन (Contact)</h4>
                        <div className="flex flex-col gap-1">
                            {dialNumbers.map((num, idx) => (
                                num ? (
                                    <a key={idx} href={`tel:${num.replace(/\D/g, '')}`} className="text-gray-300 hover:text-orange-400 transition text-lg font-medium">
                                        {num}
                                    </a>
                                ) : null
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">एडमिशन हेल्पलाइन</p>
                        <p className="text-sm text-gray-500 mt-1">Email: {siteSettings.email}</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                    <div className="bg-orange-600 p-3 rounded-lg text-white shadow-lg group-hover:scale-110 transition duration-300">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl mb-1">समय (Timing)</h4>
                        <p className="text-gray-300">सोमवार - शनिवार</p>
                        <p className="text-gray-300">सुबह 9:00 - शाम 5:00 बजे तक</p>
                    </div>
                </div>
             </div>

             <div className="mt-10 flex gap-4">
                {siteSettings.whatsappUrl && (
                    <a href={siteSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition shadow-lg text-white transform hover:-translate-y-1">
                        <MessageCircle size={24} />
                    </a>
                )}
                {siteSettings.instagramUrl && (
                    <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition shadow-lg text-white transform hover:-translate-y-1">
                        <Instagram size={24} />
                    </a>
                )}
                {siteSettings.youtubeUrl && (
                    <a href={siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition shadow-lg text-white transform hover:-translate-y-1">
                        <Youtube size={24} />
                    </a>
                )}
                {siteSettings.facebookUrl && (
                    <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition shadow-lg text-white transform hover:-translate-y-1">
                        <Facebook size={24} />
                    </a>
                )}
             </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900 shadow-2xl border-t-8 border-orange-600 relative overflow-hidden">
            {formStatus === 'success' ? (
                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">जानकारी भेजने के लिए धन्यवाद!</h3>
                    <p className="text-gray-600">हमारी टीम आपसे जल्द ही संपर्क करेगी।</p>
                    <button 
                        onClick={() => setFormStatus('idle')}
                        className="mt-8 text-orange-600 font-bold hover:underline"
                    >
                        नया फॉर्म भरें
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-6 text-center font-heading">फ्री डेमो / इंक्वायरी फॉर्म</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="name" type="text" placeholder="छात्र का नाम" required className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition" />
                            <input name="city" type="text" placeholder="शहर / गाँव" required className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition" />
                        </div>
                        <input name="phone" type="tel" placeholder="मोबाइल नंबर" required pattern="[0-9]{10}" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition" />
                        <select name="course" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-gray-600">
                            <option value="">कोर्स चुनें</option>
                            <option value="merchant-navy">मर्चेंट नेवी (IMU-CET/Sponsorship)</option>
                            <option value="ssc">एसएससी (SSC GD/CHSL)</option>
                            <option value="railway">रेलवे (Group D/NTPC)</option>
                            <option value="cet">राजस्थान CET</option>
                            <option value="police">पुलिस (Police Constable)</option>
                        </select>
                        <div className="flex items-center gap-2 text-sm text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <input type="checkbox" name="demo_request" id="demo" className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                            <label htmlFor="demo" className="font-medium">मैं 2 दिन की फ्री डेमो क्लास लेना चाहता हूँ</label>
                        </div>
                        <button 
                            type="submit" 
                            disabled={formStatus === 'submitting'}
                            className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/40 transition transform active:scale-95 flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {formStatus === 'submitting' ? 'भेजा जा रहा है...' : <><PhoneCall size={20}/> जानकारी भेजें</>}
                        </button>
                    </form>
                </>
            )}
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
                <MapIcon className="text-orange-500" />
                <h3 className="text-2xl font-bold font-heading text-white">मैप पर देखें (Location)</h3>
            </div>
            <div className="w-full h-80 bg-gray-800 rounded-2xl overflow-hidden border-4 border-gray-700 shadow-2xl relative group">
                <iframe 
                    width="100%" 
                    height="100%" 
                    id="gmap_canvas" 
                    src={siteSettings.mapUrl}
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    title="Location"
                    className="w-full h-full grayscale hover:grayscale-0 transition duration-700 ease-in-out"
                ></iframe>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg pointer-events-none">
                    📍 {siteSettings.instituteName}
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                 {siteSettings.logoUrl && (
                    <img src={siteSettings.logoUrl} alt="Footer Logo" className="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition" />
                 )}
                 <p>&copy; {new Date().getFullYear()} {siteSettings.instituteName}. सर्वाधिकार सुरक्षित।</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="flex items-center gap-1">Made with ❤️ in India</p>
                <button 
                  onClick={() => {
                     const event = new CustomEvent('nav-admin');
                     window.dispatchEvent(event);
                  }}
                  className="opacity-20 hover:opacity-100 transition duration-500 p-1"
                  title="Admin Access"
                >
                    <Lock size={12} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
