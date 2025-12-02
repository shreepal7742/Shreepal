
import { Course, GalleryImage, StudentResult, FacultyMember, SiteSettings, Video } from "../types";

export const INITIAL_SETTINGS: SiteSettings = {
  instituteName: "मोहित दहिया",
  instituteSubName: "क्लासेज (Kuchaman)",
  logoUrl: "", // Empty will use default initial letter
  heroHeadline: "सरकारी नौकरी और <br/> <span class='text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600'>मर्चेंट नेवी</span> का सपना करें साकार",
  heroSubHeadline: "कुचामन सिटी का एकमात्र संस्थान जहाँ मिलता है <strong>मर्चेंट नेवी</strong> और सरकारी परीक्षाओं (SSC, Railways, CET) के लिए व्यक्तिगत मार्गदर्शन और गुणवत्तापूर्ण शिक्षा।",
  heroImageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  
  // About Section Defaults
  aboutSectionTitle: "सिर्फ एक कोचिंग नहीं, <br/><span class='text-orange-600'>सफलता का विश्वास</span>",
  aboutSectionSubtitle: "हमारे बारे में",
  aboutDirectorName: "मोहित दहिया",
  aboutDirectorImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  aboutText: "कुचामन के **प्रेरणा टॉवर** में स्थित, मोहित दहिया क्लासेज की स्थापना एक स्पष्ट उद्देश्य के साथ की गई है: छात्रों को भीड़ का हिस्सा बनाने के बजाय उन्हें व्यक्तिगत मार्गदर्शन देना।\n\nजहाँ अन्य बड़ी अकादमियों में सैकड़ों छात्र एक हॉल में बैठते हैं, हम **छोटे बैच** और गुणवत्ता पर ध्यान केंद्रित करते हैं।",
  
  // Course Section Defaults
  courseSectionTitle: "अपने सपनों को दें <span class='text-orange-600'>नई उड़ान</span>",
  courseSectionSubtitle: "हमारे प्रमुख कोर्स",

  // Faculty Section Defaults
  facultySectionTitle: "अनुभवी <span class='text-orange-600'>मार्गदर्शन</span>",
  facultySectionSubtitle: "कुचामन के सर्वश्रेष्ठ शिक्षकों का अनुभव और निदेशक का व्यक्तिगत साथ।",

  // Gallery Section Defaults
  gallerySectionTitle: "संस्थान की <span class='text-orange-600'>झलक</span>",
  gallerySectionSubtitle: "गैलरी",

  // Selections Section Defaults
  selectionsSectionTitle: "हमारे <span class='text-orange-600'>चमकते सितारे</span>",
  selectionsSectionSubtitle: "कड़ी मेहनत और सही मार्गदर्शन का परिणाम।",

  address: "प्रेरणा टॉवर, जैन मंदिर के सामने, चुंगी नाका, डीडवाना रोड, जिलिया, कुचामन सिटी, नागौर, राजस्थान – 341508",
  mapUrl: "https://maps.google.com/maps?q=Prerna%20Tower%2C%20Didwana%20Road%2C%20Kuchaman%20City&t=&z=16&ie=UTF8&iwloc=&output=embed",
  phone: "6376100570 / 7597416905",
  email: "mohitkws@gmail.com",
  
  facebookUrl: "",
  instagramUrl: "https://www.instagram.com/mohitdahiyaclasses?igsh=ZDhvcWZxNWg1Z2N5",
  youtubeUrl: "https://youtube.com/@mohitdahiyaclasses?si=WQiKZ-nfrw8MO2Sa",
  whatsappUrl: "https://www.whatsapp.com/channel/0029VaVD3eaEQIarO0vZQa29"
};

export const INITIAL_VIDEOS: Video[] = [
    {
        id: '1',
        title: 'Merchant Navy Career Guide',
        videoId: 'b0q2Zt5sKrs', // Safe Educational Video
        category: 'motivation',
        description: 'Complete details about Merchant Navy career path and opportunities.'
    },
    {
        id: '2',
        title: 'Physics - Laws of Motion',
        videoId: 'kKKM8Y-u7ds', // Safe Physics Video
        category: 'physics',
        description: 'Important concepts for technical exams.'
    }
];

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: '1',
    name: 'मोहित दहिया',
    subject: 'Physics & Mathematics',
    experience: 'Director & Mentor',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'तकनीकी परीक्षाओं के लिए फिजिक्स और गणित के विशेषज्ञ। मर्चेंट नेवी के छात्रों के लिए विशेष रणनीति और काउंसलिंग प्रदान करते हैं।'
  },
  {
    id: '2',
    name: 'Visiting Faculty',
    subject: 'GK & Current Affairs',
    experience: 'Expert Panel',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'राजस्थान और भारत के सामान्य ज्ञान पर विशेषज्ञ पकड़। कुचामन की प्रसिद्ध स्टार फैकल्टी।'
  },
  {
    id: '3',
    name: 'Visiting Faculty',
    subject: 'Reasoning & Aptitude',
    experience: 'Expert Panel',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'SSC और रेलवे के लिए शॉर्टकट ट्रिक्स के माहिर।'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'merchant-navy',
    title: 'मर्चेंट नेवी (Merchant Navy)',
    description: 'IMU-CET और कंपनी स्पॉन्सरशिप परीक्षा की विशेष तैयारी। इसमें फिजिक्स, मैथ्स, इंग्लिश और एप्टीट्यूड शामिल हैं।',
    icon: 'anchor',
    duration: '4-6 महीने',
    target: '12वीं पास (PCM)',
    features: [
      'IMU-CET रैंक बूस्टर प्रोग्राम',
      'कंपनी स्पॉन्सरशिप (Sponsorship) इंटरव्यू की तैयारी',
      'साइकोमेट्रिक टेस्ट (Psychometric Test) गाइडेंस',
      'विशिष्ट तकनीकी विषयों पर फोकस'
    ],
    subjects: [
      'Physics (Class 11 & 12 Level)',
      'Mathematics (Technical)',
      'English (Grammar & Communication)',
      'General Aptitude & Reasoning'
    ],
    jobRoles: [
      'Deck Cadet',
      'Engine Cadet',
      'Trainee Marine Engineer (TME)',
      'General Purpose Rating (GP Rating)'
    ],
    afterCompletion: [
      'मर्चेंट जहाजों पर डेक कैडेट या इंजन कैडेट के रूप में जॉइनिंग।',
      '18 महीने की सी-सर्विस के बाद थर्ड ऑफिसर/इंजीनियर बनने का मौका।',
      '10-12 साल में कप्तान (Captain) या चीफ इंजीनियर बनने का अवसर।'
    ]
  },
  {
    id: 'ssc',
    title: 'एसएससी (SSC GD/CHSL/CGL)',
    description: 'SSC की सभी परीक्षाओं के लिए व्यापक कोचिंग। गणित, रीजनिंग, जीके और हिंदी/इंग्लिश पर विशेष पकड़।',
    icon: 'briefcase',
    duration: 'परीक्षा तक / 8-12 महीने',
    target: '10वीं / 12वीं / स्नातक',
    features: [
      'मैथ्स और रीजनिंग के लिए शॉर्ट ट्रिक्स',
      'डेली प्रैक्टिस पेपर्स (DPP)',
      'साप्ताहिक मॉक टेस्ट (Online/Offline)',
      'करंट अफेयर्स की विशेष कक्षाएं'
    ],
    subjects: [
      'Quantitative Aptitude (Basic to Advanced)',
      'General Intelligence & Reasoning',
      'General Awareness (GK/GS)',
      'English / Hindi Comprehension'
    ],
    jobRoles: [
      'Income Tax Inspector',
      'Central Excise Inspector',
      'GD Constable (BSF, CRPF, CISF)',
      'Lower Division Clerk (LDC)'
    ],
    afterCompletion: [
      'केंद्र सरकार के मंत्रालयों में असिस्टेंट या इंस्पेक्टर के पद पर नियुक्ति।',
      'इनकम टैक्स, CBI, विदेश मंत्रालय या कस्टम विभाग में पोस्टिंग।',
      'नियमित प्रमोशन और सरकारी सुविधाओं के साथ सुरक्षित भविष्य।'
    ]
  },
  {
    id: 'airforce-navy',
    title: 'एयरफोर्स और नेवी (Airforce/Navy)',
    description: 'वायु सेना (X & Y Group) और नेवी (SSR) की लिखित परीक्षा के लिए फिजिक्स और गणित का स्पेशल बैच।',
    icon: 'plane',
    duration: '4-5 महीने',
    target: '12वीं पास (Science/Arts)',
    features: [
      'फिजिक्स और मैथ्स (Technical) पर पकड़',
      'X और Y ग्रुप दोनों का सिलेबस',
      'नेगेटिव मार्किंग से बचने की ट्रिक्स',
      'साप्ताहिक मॉक टेस्ट'
    ],
    subjects: [
      'Technical Physics',
      'Mathematics (11th & 12th)',
      'English Grammar',
      'Reasoning & General Awareness (RAGA)'
    ],
    jobRoles: [
      'Airmen (Technical Trade)',
      'Airmen (Non-Technical)',
      'Sailor (AA/SSR)',
      'Indian Coast Guard'
    ],
    afterCompletion: [
      'भारतीय वायु सेना में एयरमैन के रूप में शानदार करियर।',
      'कम उम्र में देश सेवा और सरकारी नौकरी।',
      'टेक्निकल ट्रेड में इंजीनियरिंग जैसा अनुभव।'
    ]
  },
  {
    id: 'railways',
    title: 'रेलवे (Railways - NTPC/ALP)',
    description: 'रेलवे भर्ती बोर्ड की परीक्षाओं और ALP (लोको पायलट) के लिए टारगेट बैच। साइंस और टेक्निकल पर जोर।',
    icon: 'train',
    duration: '6 महीने',
    target: '10वीं / 12वीं / ITI / Diploma',
    features: [
      'ALP के लिए साइको टेस्ट (CBAT) गाइडेंस',
      'CBT-1 और CBT-2 का पूरा कवरेज',
      'साइंस (Physics/Chem) के लिए एक्सपर्ट फैकल्टी',
      'पिछले वर्षों के प्रश्न पत्रों का हल'
    ],
    subjects: [
      'General Science (Physics, Chemistry, Biology)',
      'Mathematics (Arithmetic)',
      'General Intelligence & Reasoning',
      'General Awareness & Current Affairs'
    ],
    jobRoles: [
      'Assistant Loco Pilot (ALP)',
      'Station Master',
      'Junior Engineer (Railway)',
      'Group D Staff',
      'Technician'
    ],
    afterCompletion: [
      'भारतीय रेलवे में ALP, टेक्नीशियन या स्टेशन मास्टर के रूप में चयन।',
      'ट्रेनिंग अवधि के बाद आवंटित जोन में स्थायी पोस्टिंग।',
      'विभागीय परीक्षाओं (Departmental Exams) के जरिए ऑफिसर बनने का मौका।'
    ]
  },
  {
    id: 'cet',
    title: 'राजस्थान CET (12th & Grad)',
    description: 'राजस्थान सरकार की नौकरियों के लिए अनिवार्य CET (स्नातक और 12वीं स्तर) की संपूर्ण तैयारी।',
    icon: 'check',
    duration: '5-6 महीने',
    target: '12वीं / स्नातक',
    features: [
      'राजस्थान जीके को याद करने की ट्रिक्स',
      'कंप्यूटर और हिंदी/अंग्रेजी का पूरा सिलेबस',
      'न्यूनतम कट-ऑफ पार करने की रणनीति',
      'OMR शीट पर टेस्ट प्रैक्टिस'
    ],
    subjects: [
      'Rajasthan History, Art & Culture',
      'India GK & Geography',
      'General Hindi & English',
      'Basic Computer Knowledge',
      'Mental Ability & Reasoning'
    ],
    jobRoles: [
      'Rajasthan Police Constable',
      'Patwari / Gram Sevak (VDO)',
      'Junior Accountant',
      'Forest Guard / Forester',
      'LDC (State Govt)'
    ],
    afterCompletion: [
      'राजस्थान पुलिस, पटवारी और LDC की आगामी भर्तियों के लिए पात्रता।',
      'मुख्य परीक्षाओं (Mains) में सीधे बैठने का अवसर।',
      'एक साल तक स्कोर कार्ड की वैधता विभिन्न पदों पर आवेदन के लिए।'
    ]
  },
  {
    id: 'police',
    title: 'पुलिस कांस्टेबल (Raj/Delhi Police)',
    description: 'राजस्थान पुलिस, दिल्ली पुलिस और RPF कांस्टेबल भर्ती की लिखित परीक्षा की संपूर्ण तैयारी।',
    icon: 'shield',
    duration: '3-4 महीने',
    target: '10वीं / 12वीं पास',
    features: [
      'महिला और बाल अपराध कानून (फॉर राजस्थान)',
      'कंप्यूटर ज्ञान का विशेष सत्र',
      'इंडिया और राजस्थान जीके ट्रिक्स',
      'फिजिकल टेस्ट के लिए मार्गदर्शन'
    ],
    subjects: [
      'General Knowledge (India & World)',
      'Rajasthan GK (History/Geog/Art)',
      'Reasoning & Logic',
      'Computer Basics',
      'Women & Child Crime Law'
    ],
    jobRoles: [
      'Rajasthan Police Constable',
      'Delhi Police Constable',
      'RPF Constable',
      'Jail Prahari'
    ],
    afterCompletion: [
      'पुलिस विभाग में कांस्टेबल के पद पर नियुक्ति।',
      'कानून व्यवस्था बनाए रखने में योगदान।',
      'समय के साथ हेड कांस्टेबल और ASI बनने का मौका।'
    ]
  }
];

export const INITIAL_STUDENTS: StudentResult[] = [
  {
    id: '1',
    name: 'राहुल वर्मा',
    exam: 'Merchant Navy',
    rank: 'Sponsorship Secured',
    imageUrl: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'Maersk Line',
    category: 'merchant-navy',
    year: '2024',
    story: 'शुरुआत में मुझे मैथ्स से डर लगता था, लेकिन मोहित सर ने बेसिक्स पर जो काम किया, उससे मेरा कॉन्फिडेंस बढ़ा। IMU-CET क्लियर करना मेरा सपना था।'
  },
  {
    id: '2',
    name: 'प्रिया शेखावत',
    exam: 'SSC GD',
    rank: 'Selected',
    imageUrl: 'https://images.unsplash.com/photo-1629813583232-a2790757d976?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'BSF',
    category: 'defence',
    year: '2023',
    story: 'रोजाना मॉक टेस्ट और फिजिकल गाइडेंस ने मुझे BSF तक पहुँचाया। मैं सभी लड़कियों को कहना चाहूँगी कि वर्दी का सपना मोहित दहिया क्लासेज के साथ सच हो सकता है।'
  },
  {
    id: '3',
    name: 'अमित चौधरी',
    exam: 'Rajasthan Police',
    rank: 'Constable',
    imageUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'Jaipur Comm.',
    category: 'civil',
    year: '2023',
    story: 'पुलिस भर्ती में GK का रोल बहुत बड़ा होता है। यहाँ की फैकल्टी ने ट्रिक्स के साथ जो GK पढ़ाया, वो एग्जाम हॉल में बहुत काम आया।'
  },
  {
    id: '4',
    name: 'संदीप कुमावत',
    exam: 'Railway Group D',
    rank: 'Selected',
    imageUrl: 'https://images.unsplash.com/photo-1543965170-4c01cdb10604?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'NWR Zone',
    category: 'civil',
    year: '2022',
    story: 'साइंस और मैथ्स पर यहाँ का फोकस बेहतरीन है। ग्रुप डी के पेपर में मैंने साइंस में पूरे नंबर स्कोर किए।'
  },
  {
    id: '5',
    name: 'विक्रम सिंह',
    exam: 'Merchant Navy',
    rank: 'Deck Cadet',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'Anglo-Eastern',
    category: 'merchant-navy',
    year: '2024',
    story: 'मुझे स्पॉन्सरशिप इंटरव्यू के बारे में कुछ नहीं पता था। मोहित सर ने पर्सनली मेरे इंटरव्यू की तैयारी करवाई।'
  },
  {
    id: '6',
    name: 'सुनीता मीणा',
    exam: 'Delhi Police',
    rank: 'Constable',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'Delhi Police',
    category: 'defence',
    year: '2023',
    story: 'कंप्यूटर और रीजनिंग की क्लासेस ने मेरा स्कोर काफी बढ़ा दिया। दिल्ली पुलिस का फिजिकल भी गाइडेंस से निकल गया।'
  },
  {
    id: '7',
    name: 'राजेश जांगिड़',
    exam: 'SSC CGL',
    rank: 'Auditor',
    imageUrl: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'CAG',
    category: 'ssc',
    year: '2022',
    story: 'CGL क्रैक करना आसान नहीं था, लेकिन यहाँ के एडवांस्ड मैथ्स के तरीके और डाउट सॉल्विंग ने इसे आसान बना दिया।'
  },
  {
    id: '8',
    name: 'सुरेश बिश्नोई',
    exam: 'Airforce X Group',
    rank: 'Airman',
    imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: 'Technical',
    category: 'defence',
    year: '2024',
    story: 'टेक्निकल फिजिक्स में मेरे कांसेप्ट बहुत कमजोर थे। यहाँ के नोट्स और प्रैक्टिस सेट्स ने मुझे पास करवाया।'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'आधुनिक कक्षाएँ',
    subtitle: 'स्मार्ट क्लासरूम सुविधा'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'शांत लाइब्रेरी',
    subtitle: 'एकाग्रता के लिए उत्तम स्थान'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1577896334506-c71164e05079?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'ग्रुप स्टडी',
    subtitle: 'साथ मिलकर सीखने का माहौल'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'व्यक्तिगत मार्गदर्शन',
    subtitle: 'शिक्षकों का पूरा सहयोग'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'डाउट सेशन',
    subtitle: 'हर शंका का समाधान'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'प्रेरणादायक वातावरण',
    subtitle: 'सफलता की ओर एक कदम'
  }
];