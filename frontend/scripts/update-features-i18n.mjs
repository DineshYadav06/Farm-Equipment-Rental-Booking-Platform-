import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesDir = path.join(__dirname, "../src/messages");

const translations = {
  en: {
    theme: {
      title: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      toggle: "Switch theme",
      choose: "Choose theme"
    },
    weather: {
      label: "Weather",
      title: "Agricultural Weather",
      clear: "Clear Sky",
      partlyCloudy: "Partly Cloudy",
      cloudy: "Cloudy",
      overcast: "Overcast",
      fog: "Fog / Mist",
      drizzle: "Drizzle",
      rain: "Rain",
      snow: "Snow",
      showers: "Showers",
      thunderstorm: "Thunderstorm",
      feelsLike: "Feels like",
      rainChance: "Rain",
      humidity: "Humidity",
      windSpeed: "Wind",
      threeDay: "3-Day Forecast",
      today: "Today",
      updated: "Updated",
      unavailable: "Weather is not available right now"
    },
    location: {
      promptTitle: "Find Equipment & Weather Nearby",
      promptDesc: "Allow location to show nearby machines and live agricultural weather.",
      allowLocation: "Allow Location",
      chooseManually: "Choose Manually",
      forget: "Forget my location",
      forgotten: "Location preference cleared",
      privacyNote: "Rounded to ~1 km. Never shared.",
      geoUnsupported: "Geolocation is not supported by your browser.",
      outOfIndia: "Location appears outside India. Please select manually.",
      permissionDenied: "Location permission was denied. Please select manually.",
      timeout: "Location request timed out. Please select manually.",
      unavailable: "Location service unavailable.",
      noDistricts: "No districts found.",
      change: "Change Location"
    }
  },
  hi: {
    theme: {
      title: "थीम",
      light: "लाइट",
      dark: "डार्क",
      system: "सिस्टम",
      toggle: "थीम बदलें",
      choose: "थीम चुनें"
    },
    weather: {
      label: "मौसम",
      title: "कृषि मौसम पूर्वानुमान",
      clear: "साफ आसमान",
      partlyCloudy: "आंशिक बादल",
      cloudy: "बादल छाए",
      overcast: "घने बादल",
      fog: "कोहरा",
      drizzle: "बूंदाबांदी",
      rain: "बारिश",
      snow: "बर्फबारी",
      showers: "बौछारें",
      thunderstorm: "गरज के साथ बारिश",
      feelsLike: "महसूस",
      rainChance: "बारिश",
      humidity: "नमी",
      windSpeed: "हवा",
      threeDay: "3-दिवसीय पूर्वानुमान",
      today: "आज",
      updated: "अपडेट",
      unavailable: "मौसम की जानकारी अभी उपलब्ध नहीं है"
    },
    location: {
      promptTitle: "आसपास के उपकरण और मौसम देखें",
      promptDesc: "नजदीकी कृषि मशीनें और स्थानीय मौसम देखने के लिए स्थान की अनुमति दें।",
      allowLocation: "स्थान की अनुमति दें",
      chooseManually: "मैन्युअल चुनें",
      forget: "स्थान मिटाएं",
      forgotten: "स्थान की जानकारी हटा दी गई",
      privacyNote: "लगभग 1 किमी तक सुरक्षित। कभी साझा नहीं किया जाता।",
      geoUnsupported: "ब्राउज़र में स्थान सेवा समर्थित नहीं है।",
      outOfIndia: "स्थान भारत से बाहर प्रतीत होता है। कृपया स्वयं जिला चुनें।",
      permissionDenied: "स्थान की अनुमति अस्वीकृत की गई।",
      timeout: "स्थान का पता लगाने में समय समाप्त हो गया।",
      unavailable: "स्थान सेवा अनुपलब्ध है।",
      noDistricts: "कोई जिला नहीं मिला।",
      change: "स्थान बदलें"
    }
  },
  pa: {
    theme: {
      title: "ਥੀਮ",
      light: "ਲਾਈਟ",
      dark: "ਡਾਰਕ",
      system: "ਸਿਸਟਮ",
      toggle: "ਥੀਮ ਬਦਲੋ",
      choose: "ਥੀਮ ਚੁਣੋ"
    },
    weather: {
      label: "ਮੌਸਮ",
      title: "ਖੇਤੀਬਾੜੀ ਮੌਸਮ ਅਨੁਮਾਨ",
      clear: "ਸਾਫ਼ ਅਸਮਾਨ",
      partlyCloudy: "ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ",
      cloudy: "ਬੱਦਲਵਾਈ",
      overcast: "ਘਣੇ ਬੱਦਲ",
      fog: "ਧੁੰਦ",
      drizzle: "ਬੂੰਦਾ-ਬਾਂਦੀ",
      rain: "ਮੀਂਹ",
      snow: "ਬਰਫ਼ਬਾਰੀ",
      showers: "ਫੁਹਾਰਾਂ",
      thunderstorm: "ਗਰਜ ਨਾਲ ਮੀਂਹ",
      feelsLike: "ਮਹਿਸੂਸ",
      rainChance: "ਮੀਂਹ",
      humidity: "ਨਮੀ",
      windSpeed: "ਹਵਾ",
      threeDay: "3-ਦਿਨਾ ਅਨੁਮਾਨ",
      today: "ਅੱਜ",
      updated: "ਤਾਜ਼ਾ",
      unavailable: "ਮੌਸਮ ਜਾਣਕਾਰੀ ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ"
    },
    location: {
      promptTitle: "ਨੇੜਲੀਆਂ ਮਸ਼ੀਨਾਂ ਅਤੇ ਮੌਸਮ ਵੇਖੋ",
      promptDesc: "ਨੇੜਲੀਆਂ ਖੇਤੀ ਮਸ਼ੀਨਾਂ ਅਤੇ ਸਥਾਨਕ ਮੌਸਮ ਦੇਖਣ ਲਈ ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।",
      allowLocation: "ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ",
      chooseManually: "ਖ਼ੁਦ ਚੁਣੋ",
      forget: "ਸਥਾਨ ਹਟਾਓ",
      forgotten: "ਸਥਾਨ ਜਾਣਕਾਰੀ ਸਾਫ਼ ਕਰ ਦਿੱਤੀ ਗਈ",
      privacyNote: "ਲਗਭਗ 1 ਕਿਲੋਮੀਟਰ ਤੱਕ ਸੁਰੱਖਿਅਤ। ਕਦੇ ਸਾਂਝਾ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ।",
      geoUnsupported: "ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਲੋਕੇਸ਼ਨ ਸੇਵਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
      outOfIndia: "ਸਥਾਨ ਭਾਰਤ ਤੋਂ ਬਾਹਰ ਜਾਪਦਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ।",
      permissionDenied: "ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ।",
      timeout: "ਸਥਾਨ ਜਾਂਚ ਦਾ ਸਮਾਂ ਸਮਾਪਤ ਹੋ ਗਿਆ।",
      unavailable: "ਲੋਕੇਸ਼ਨ ਸੇਵਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
      noDistricts: "ਕੋਈ ਜ਼ਿਲ੍ਹਾ ਨਹੀਂ ਮਿਲਿਆ।",
      change: "ਸਥਾਨ ਬਦਲੋ"
    }
  },
  mr: {
    theme: {
      title: "थीम",
      light: "लाइट",
      dark: "डार्क",
      system: "सिस्टम",
      toggle: "थीम बदला",
      choose: "थीम निवडा"
    },
    weather: {
      label: "हवामान",
      title: "शेती हवामान अंदाज",
      clear: "निरभ्र आकाश",
      partlyCloudy: "अंशतः ढगाळ",
      cloudy: "ढगाळ",
      overcast: "दाट ढग",
      fog: "धुके",
      drizzle: "रिमझिम पाऊस",
      rain: "पाऊस",
      snow: "हिमवृष्टी",
      showers: "पावसाच्या सरी",
      thunderstorm: "वादळी पाऊस",
      feelsLike: "जाणवणारे",
      rainChance: "पाऊस",
      humidity: "आर्द्रता",
      windSpeed: "वारा",
      threeDay: "३ दिवसांचा अंदाज",
      today: "आज",
      updated: "अपडेट",
      unavailable: "हवामानाची माहिती सध्या उपलब्ध नाही"
    },
    location: {
      promptTitle: "जवळपासची यंत्रे व हवामान पाहा",
      promptDesc: "जवळची कृषी यंत्रे आणि स्थानिक हवामान पाहण्यासाठी स्थानाची परवानगी द्या.",
      allowLocation: "स्थानाची अनुमती द्या",
      chooseManually: "स्वतः निवडा",
      forget: "स्थान हटवा",
      forgotten: "स्थान माहिती हटवली",
      privacyNote: "सुमारे १ किमी सुरक्षित. कधीही सामायिक केले जात नाही.",
      geoUnsupported: "ब्राउझरमध्ये स्थान सेवा उपलब्ध नाही.",
      outOfIndia: "स्थान भारताबाहेरील दिसते. कृपया जिल्हा निवडा.",
      permissionDenied: "स्थानाची अनुमती नाकारली गेली.",
      timeout: "वेळ संपली. कृपया स्वतः निवडा.",
      unavailable: "स्थान सेवा उपलब्ध नाही.",
      noDistricts: "जिल्हा आढळला नाही.",
      change: "स्थान बदला"
    }
  },
  gu: {
    theme: {
      title: "થીમ",
      light: "લાઇટ",
      dark: "ડાર્ક",
      system: "સિસ્ટમ",
      toggle: "થીમ બદલો",
      choose: "થીમ પસંદ કરો"
    },
    weather: {
      label: "હવામાન",
      title: "કૃષિ હવામાન આગાહી",
      clear: "સ્વચ્છ આકાશ",
      partlyCloudy: "અંશતઃ વાદળછાયું",
      cloudy: "વાદળછાયું",
      overcast: "ઘાટા વાદળો",
      fog: "ઝાકળ",
      drizzle: "ઝરમર વરસાદ",
      rain: "વરસાદ",
      snow: "બરફવર્ષા",
      showers: "વરસાદી ઝાપટાં",
      thunderstorm: "ગાજવીજ સાથે વરસાદ",
      feelsLike: "અનુભવાતું",
      rainChance: "વરસાદ",
      humidity: "ભેજ",
      windSpeed: "પવન",
      threeDay: "૩ દિવસની આગાહી",
      today: "આજે",
      updated: "અપડેટ",
      unavailable: "હવામાન વિગતો હાલ ઉપલબ્ધ નથી"
    },
    location: {
      promptTitle: "નજીકના સાધનો અને હવામાન જુઓ",
      promptDesc: "નજીકની કૃષિ મશીનરી અને સ્થાનિક હવામાન જોવા સ્થાનની મંજૂરી આપો.",
      allowLocation: "સ્થાનની મંજૂરી આપો",
      chooseManually: "જાતે પસંદ કરો",
      forget: "સ્થાન ભૂંસી નાખો",
      forgotten: "સ્થાન માહિતી હટાવી",
      privacyNote: "આશરે ૧ કિમી સુરક્ષિત. ક્યારેય શેર થતું નથી.",
      geoUnsupported: "બ્રાઉઝરમાં લોકેશન સપોર્ટ નથી.",
      outOfIndia: "સ્થાન ભારત બહારનું લાગે છે. જિલ્લો પસંદ કરો.",
      permissionDenied: "સ્થાન મંજૂરી નકારાઈ.",
      timeout: "સમય સમાપ્ત થયો.",
      unavailable: "સ્થાન સેવા અનુપલબ્ધ.",
      noDistricts: "કોઈ જિલ્લો મળ્યો નથી.",
      change: "સ્થાન બદલો"
    }
  },
  bn: {
    theme: {
      title: "থিম",
      light: "লাইট",
      dark: "ডার্ক",
      system: "সিস্টেম",
      toggle: "থিম পরিবর্তন",
      choose: "থিম নির্বাচন করুন"
    },
    weather: {
      label: "আবহাওয়া",
      title: "কৃষি আবহাওয়া পূর্বাভাস",
      clear: "পরিষ্কার আকাশ",
      partlyCloudy: "আংশিক মেঘলা",
      cloudy: "মেঘলা",
      overcast: "ঘন মেঘ",
      fog: "কুয়াশা",
      drizzle: "ঝিরিঝিরি বৃষ্টি",
      rain: "বৃষ্টি",
      snow: "তুষারপাত",
      showers: "বৃষ্টির ধারা",
      thunderstorm: "বজ্রবিদ্যুৎ সহ ঝড়বৃষ্টি",
      feelsLike: "অনুভূত",
      rainChance: "বৃষ্টি",
      humidity: "আর্দ্রতা",
      windSpeed: "বাতাস",
      threeDay: "৩ দিনের পূর্বাভাস",
      today: "আজ",
      updated: "হালনাগাদ",
      unavailable: "আবহাওয়া তথ্য বর্তমানে উপলব্ধ নয়"
    },
    location: {
      promptTitle: "কাছের সরঞ্জাম ও আবহাওয়া দেখুন",
      promptDesc: "কাছাকাছি কৃষি যন্ত্রপাতি ও স্থানীয় আবহাওয়া দেখতে লোকেশন অনুমতি দিন।",
      allowLocation: "লোকেশন অনুমতি দিন",
      chooseManually: "নিজে বেছে নিন",
      forget: "লোকেশন মুছুন",
      forgotten: "লোকেশন মুছে ফেলা হয়েছে",
      privacyNote: "প্রায় ১ কিমি সুরক্ষিত। কখনও শেয়ার করা হয় না।",
      geoUnsupported: "ব্রাউজারে লোকেশন সমর্থিত নয়।",
      outOfIndia: "লোকেশন ভারতের বাইরে। জেলা বেছে নিন।",
      permissionDenied: "লোকেশন অনুমতি প্রত্যাখ্যান করা হয়েছে।",
      timeout: "সময় উত্তীর্ণ হয়েছে।",
      unavailable: "লোকেশন পরিষেবা অনুপলબ્ধ।",
      noDistricts: "কোন জেলা পাওয়া যায়নি।",
      change: "লোকেশন পরিবর্তন"
    }
  },
  ta: {
    theme: {
      title: "தீம்",
      light: "லைட்",
      dark: "டார்க்",
      system: "சிஸ்டம்",
      toggle: "தீம் மாற்றுக",
      choose: "தீம் தேர்வு"
    },
    weather: {
      label: "வானிலை",
      title: "விவசாய வானிலை முன்னறிவிப்பு",
      clear: "தெளிவான வானம்",
      partlyCloudy: "பகுதி மேகமூட்டம்",
      cloudy: "மேகமூட்டம்",
      overcast: "அடர்ந்த மேகம்",
      fog: "பனிமூட்டம்",
      drizzle: "தூறல்",
      rain: "மழை",
      snow: "பனிப்பொழிவு",
      showers: "மழைச்சாரல்",
      thunderstorm: "இடி மின்னலுடன் மழை",
      feelsLike: "உணரப்படும்",
      rainChance: "மழை",
      humidity: "ஈரப்பதம்",
      windSpeed: "காற்று",
      threeDay: "3 நாள் முன்னறிவிப்பு",
      today: "இன்று",
      updated: "புதுப்பிக்கப்பட்டது",
      unavailable: "வானிலை தகவல் தற்போது கிடைக்கவில்லை"
    },
    location: {
      promptTitle: "அருகிலுள்ள இயந்திரங்கள் & வானிலை",
      promptDesc: "அருகிலுள்ள பண்ணை இயந்திரங்கள் மற்றும் உள்ளூர் வானிலையைக் காண இருப்பிடத்தை அனுமதிக்கவும்.",
      allowLocation: "இருப்பிடத்தை அனுமதி",
      chooseManually: "கைமுறையாக தேர்வு செய்",
      forget: "இருப்பிடத்தை நீக்கு",
      forgotten: "இருப்பிடம் அழிக்கப்பட்டது",
      privacyNote: "சுமார் 1 கி.மீ பாதுகாப்பானது. பகிரப்படாது.",
      geoUnsupported: "உலாவியில் இருப்பிடம் ஆதரிக்கப்படவில்லை.",
      outOfIndia: "இருப்பிடம் இந்தியாவிற்கு வெளியே உள்ளது.",
      permissionDenied: "இருப்பிட அனுமதி மறுக்கப்பட்டது.",
      timeout: "நேரம் கடந்துவிட்டது.",
      unavailable: "இருப்பிட சேவை கிடைக்கவில்லை.",
      noDistricts: "மாவட்டம் காணப்படவில்லை.",
      change: "இருப்பிடம் மாற்றுக"
    }
  },
  te: {
    theme: {
      title: "థీమ్",
      light: "లైట్",
      dark: "డార్క్",
      system: "సిస్టమ్",
      toggle: "థీమ్ మార్చండి",
      choose: "థీమ్ ఎంచుకోండి"
    },
    weather: {
      label: "వాతావరణం",
      title: "వ్యవసాయ వాతావరణ సమాచారం",
      clear: "నిర్మలమైన ఆకాశం",
      partlyCloudy: "పాక్షిక మేఘావృతం",
      cloudy: "మేఘావృతం",
      overcast: "దట్టమైన మేఘాలు",
      fog: "పొగమంచు",
      drizzle: "చిరుజల్లులు",
      rain: "వర్షం",
      snow: "మంచు",
      showers: "జల్లులు",
      thunderstorm: "ఉరుములతో కూడిన వర్షం",
      feelsLike: "అనిపించేది",
      rainChance: "వర్షం",
      humidity: "తేమ",
      windSpeed: "గాలి",
      threeDay: "3 రోజుల అంచనా",
      today: "ఈరోజు",
      updated: "నవీకరించబడింది",
      unavailable: "వాతావరణ సమాచారం ప్రస్తుతం అందుబాటులో లేదు"
    },
    location: {
      promptTitle: "సమీప యంత్రాలు & వాతావరణం",
      promptDesc: "సమీప వ్యవసాయ యంత్రాలు మరియు వాతావరణాన్ని చూడటానికి లొకేషన్ అనుమతించండి.",
      allowLocation: "లొకేషన్ అనుమతించండి",
      chooseManually: "మాన్యువల్‌గా ఎంచుకోండి",
      forget: "లొకేషన్ తొలగించండి",
      forgotten: "లొకేషన్ క్లియర్ చేయబడింది",
      privacyNote: "సుమారు 1 కి.మీ సురక్షితం. భాగస్వామ్యం చేయబడదు.",
      geoUnsupported: "బ్రౌజర్‌లో లొకేషన్ సపోర్ట్ లేదు.",
      outOfIndia: "లొకేషన్ భారతదేశం వెలుపల ఉంది.",
      permissionDenied: "లొకేషన్ అనుమతి నిరాకరించబడింది.",
      timeout: "సమయం ముగిసింది.",
      unavailable: "లొకేషన్ సేవ అందుబాటులో లేదు.",
      noDistricts: "జిల్లాలు కనుగొనబడలేదు.",
      change: "లొకేషన్ మార్చండి"
    }
  },
  kn: {
    theme: {
      title: "ಥೀಮ್",
      light: "ಲೈಟ್",
      dark: "ಡಾರ್ಕ್",
      system: "ಸಿಸ್ಟಮ್",
      toggle: "ಥೀಮ್ ಬದಲಿಸಿ",
      choose: "ಥೀಮ್ ಆಯ್ಕೆಮಾಡಿ"
    },
    weather: {
      label: "ಹವಾಮಾನ",
      title: "ಕೃಷಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      clear: "ಸ್ವಚ್ಛ ಆಕಾಶ",
      partlyCloudy: "ಭಾಗಶಃ ಮೋಡ",
      cloudy: "ಮೋಡ ಕವಿದ",
      overcast: "ದಟ್ಟ ಮೋಡ",
      fog: "ಮಂಜು",
      drizzle: "ತುಂತುರು ಮಳೆ",
      rain: "ಮಳೆ",
      snow: "ಹಿಮಪಾತ",
      showers: "ಮಳೆಯ ಸಿಂಚನ",
      thunderstorm: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
      feelsLike: "ಅನುಭವವಾಗುವ",
      rainChance: "ಮಳೆ",
      humidity: "ಆರ್ದ್ರತೆ",
      windSpeed: "ಗಾಳಿ",
      threeDay: "3 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
      today: "ಇಂದು",
      updated: "ನವೀಕರಿಸಲಾಗಿದೆ",
      unavailable: "ಹವಾಮಾನ ಮಾಹಿತಿ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ"
    },
    location: {
      promptTitle: "ಹತ್ತಿರದ ಯಂತ್ರೋಪಕರಣ ಮತ್ತು ಹವಾಮಾನ",
      promptDesc: "ಹತ್ತಿರದ ಕೃಷಿ ಯಂತ್ರಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಹವಾಮಾನ ನೋಡಲು ಸ್ಥಳವನ್ನು ಅನುಮತಿಸಿ.",
      allowLocation: "ಸ್ಥಳವನ್ನು ಅನುಮತಿಸಿ",
      chooseManually: "ಕೈಯಾರೆ ಆಯ್ಕೆಮಾಡಿ",
      forget: "ಸ್ಥಳ ಅಳಿಸಿ",
      forgotten: "ಸ್ಥಳ ಮಾಹಿತಿ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ",
      privacyNote: "ಸುಮಾರು 1 ಕಿ.ಮೀ ಸುರಕ್ಷಿತ. ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ.",
      geoUnsupported: "ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಸೇವೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
      outOfIndia: "ಸ್ಥಳ ಭಾರತದ ಹೊರಗೆ ಕಾಣುತ್ತದೆ.",
      permissionDenied: "ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ.",
      timeout: "ಸಮಯ ಮೀರಿದೆ.",
      unavailable: "ಸ್ಥಳ ಸೇವೆ ಲಭ್ಯವಿಲ್ಲ.",
      noDistricts: "ಯಾವುದೇ ಜಿಲ್ಲೆ ಕಂಡುಬಂದಿಲ್ಲ.",
      change: "ಸ್ಥಳ ಬದಲಿಸಿ"
    }
  },
  ml: {
    theme: {
      title: "തീം",
      light: "ലൈറ്റ്",
      dark: "ഡാർക്ക്",
      system: "സിസ്റ്റം",
      toggle: "തീം മാറ്റുക",
      choose: "തീം തിരഞ്ഞെടുക്കുക"
    },
    weather: {
      label: "കാലാവസ്ഥ",
      title: "കാർഷിക കാലാവസ്ഥാ പ്രവചനം",
      clear: "തെളിഞ്ഞ ആകാശം",
      partlyCloudy: "ഭാഗിക മേഘാവൃതം",
      cloudy: "മേഘാവൃതം",
      overcast: "കനത്ത മേഘം",
      fog: "മൂടൽമഞ്ഞ്",
      drizzle: "ചാറ്റൽമഴ",
      rain: "മഴ",
      snow: "മഞ്ഞുവീഴ്ച",
      showers: "മഴത്തുള്ളികൾ",
      thunderstorm: "ഇടിമിന്നലോട് കൂടിയ മഴ",
      feelsLike: "അനുഭവപ്പെടുന്നത്",
      rainChance: "മഴ",
      humidity: "ഈർപ്പം",
      windSpeed: "കാറ്റ്",
      threeDay: "3 ദിവസത്തെ പ്രവചനം",
      today: "ഇന്ന്",
      updated: "പുതുക്കിയത്",
      unavailable: "കാലാവസ്ഥാ വിവരങ്ങൾ ഇപ്പോൾ ലഭ്യമല്ല"
    },
    location: {
      promptTitle: "അടുത്തുള്ള യന്ത്രങ്ങളും കാലാവസ്ഥയും",
      promptDesc: "സമീപത്തുള്ള കാർഷിക യന്ത്രങ്ങളും പ്രാദേശിക കാലാവസ്ഥയും കാണാൻ ലൊക്കേഷൻ അനുവദിക്കുക.",
      allowLocation: "ലൊക്കേഷൻ അനുവദിക്കുക",
      chooseManually: "സ്വയം തിരഞ്ഞെടുക്കുക",
      forget: "ലൊക്കേഷൻ ഒഴിവാക്കുക",
      forgotten: "ലൊക്കേഷൻ വിവരങ്ങൾ നീക്കം ചെയ്തു",
      privacyNote: "ഏകദേശം 1 കി.മീ സുരക്ഷിതം. പങ്കിടില്ല.",
      geoUnsupported: "ബ്രൗസറിൽ ലൊക്കേഷൻ ലഭ്യമല്ല.",
      outOfIndia: "ലൊക്കേഷൻ ഇന്ത്യക്ക് പുറത്താണ്.",
      permissionDenied: "ലൊക്കേഷൻ അനുമതി നിഷേധിച്ചു.",
      timeout: "സമയം കഴിഞ്ഞു.",
      unavailable: "ലൊക്കേഷൻ സേവനം ലഭ്യമല്ല.",
      noDistricts: "ജില്ലകൾ കണ്ടെത്തിയില്ല.",
      change: "ലൊക്കേഷൻ മാറ്റുക"
    }
  },
  or: {
    theme: {
      title: "ଥିମ୍",
      light: "ଲାଇଟ୍",
      dark: "ଡାର୍କ",
      system: "ସିଷ୍ଟମ୍",
      toggle: "ଥିମ୍ ବଦଳାନ୍ତୁ",
      choose: "ଥିମ୍ ବାଛନ୍ତୁ"
    },
    weather: {
      label: "ପାଣିପାଗ",
      title: "କୃଷି ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
      clear: "ନିର୍ମଳ ଆକାଶ",
      partlyCloudy: "ଆଂଶିକ ମେଘୁଆ",
      cloudy: "ମେଘୁଆ",
      overcast: "ଘନ ମେଘ",
      fog: "କୁହୁଡ଼ି",
      drizzle: "ଝିପିଝିପି ବର୍ଷା",
      rain: "ବର୍ଷା",
      snow: "ତୁଷାରପାତ",
      showers: "ବର୍ଷା ଛିଟା",
      thunderstorm: "ଘଡ଼ଘଡ଼ି ସହ ବର୍ଷା",
      feelsLike: "ଅନୁଭୂତ",
      rainChance: "ବର୍ଷା",
      humidity: "ଆର୍ଦ୍ରତା",
      windSpeed: "ପବନ",
      threeDay: "୩ ଦିନର ପୂର୍ବାନୁମାନ",
      today: "ଆଜି",
      updated: "ଅପଡେଟ୍",
      unavailable: "ପାଣିପାଗ ସୂଚନା ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ନାହିଁ"
    },
    location: {
      promptTitle: "ନିକଟସ୍ଥ ଯନ୍ତ୍ରପାତି ଓ ପାଣିପାଗ",
      promptDesc: "ପାଖରେ ଥିବା କୃଷି ଯନ୍ତ୍ରପାତି ଏବଂ ପାଣିପାଗ ଦେଖିବା ପାଇଁ ଲୋକେସନ୍ ଅନୁମତି ଦିଅନ୍ତୁ।",
      allowLocation: "ଲୋକେସନ୍ ଅନୁମତି ଦିଅନ୍ତୁ",
      chooseManually: "ନିଜେ ବାଛନ୍ତୁ",
      forget: "ଲୋକେସନ୍ ହଟାନ୍ତୁ",
      forgotten: "ଲୋକେସନ୍ ସୂଚନା ସଫା କରାଗଲା",
      privacyNote: "ପ୍ରାୟ ୧ କିମି ସୁରକ୍ଷିତ। କେବେ ସେୟାର ହୁଏ ନାହିଁ।",
      geoUnsupported: "ବ୍ରାଉଜରରେ ଲୋକେସନ୍ ସମର୍ଥିତ ନୁହେଁ।",
      outOfIndia: "ଲୋକେସନ୍ ଭାରତ ବାହାରେ ଅଛି।",
      permissionDenied: "ଲୋକେସନ୍ ଅନୁମତି ମିଳିଲା ନାହିଁ।",
      timeout: "ସମୟ ସମାପ୍ତ ହେଲା।",
      unavailable: "ଲୋକେସନ୍ ସେବା ଅନୁପଲବ୍ଧ।",
      noDistricts: "କୌଣସି ଜିଲ୍ଲା ମିଳିଲା ନାହିଁ।",
      change: "ଲୋକେସନ୍ ବଦଳାନ୍ତୁ"
    }
  },
  as: {
    theme: {
      title: "থিম",
      light: "লাইট",
      dark: "ডাৰ্ক",
      system: "ছিষ্টেম",
      toggle: "থিম সলনি কৰক",
      choose: "থিম বাছক"
    },
    weather: {
      label: "বতৰ",
      title: "কৃষি বতৰৰ আগজাননী",
      clear: "পৰিষ্কাৰ আকাশ",
      partlyCloudy: "আংশিক ডাৱৰীয়া",
      cloudy: "ডাৱৰীয়া",
      overcast: "ঘন ডাৱৰ",
      fog: "কুঁৱলী",
      drizzle: "টোপাটোপে বৰষুণ",
      rain: "বৰষুণ",
      snow: "বৰফপাত",
      showers: "বৰষুণৰ জাক",
      thunderstorm: "ঢেৰেকণিৰ সৈতে বৰষুণ",
      feelsLike: "অনুভৱ",
      rainChance: "বৰষুণ",
      humidity: "আৰ্দ্ৰতা",
      windSpeed: "বতাহ",
      threeDay: "৩ দিনৰ আগজাননী",
      today: "আজি",
      updated: "আপডেট",
      unavailable: "বতৰৰ তথ্য এতিয়া উপলব্ধ নহয়"
    },
    location: {
      promptTitle: "ওচৰৰ সা-সঁজুলি আৰু বতৰ চাওক",
      promptDesc: "ওচৰৰ কৃষি যন্ত্ৰপাতি আৰু স্থানীয় বতৰ চাবলৈ স্থানৰ অনুমতি দিয়ক।",
      allowLocation: "স্থানৰ অনুমতি দিয়ক",
      chooseManually: "নিজে বাছক",
      forget: "স্থান মচক",
      forgotten: "স্থান তথ্য মচি পেলোৱা হ'ল",
      privacyNote: "প্ৰায় ১ কিমি সুৰক্ষিত। কেতিয়াও প্ৰকাশ কৰা নহয়।",
      geoUnsupported: "ব্ৰাউজাৰত স্থান সমৰ্থিত নহয়।",
      outOfIndia: "স্থান ভাৰতৰ বাহিৰৰ। জিলা বাছক।",
      permissionDenied: "স্থানৰ অনুমতি অগ্ৰাহ্য কৰা হ'ল।",
      timeout: "সময় উকলি গ'ল।",
      unavailable: "স্থান সেৱা অনুপলব্ধ।",
      noDistricts: "কোনো জিলা পোৱা নগ'ল।",
      change: "স্থান সলনি কৰক"
    }
  }
};

const locales = Object.keys(translations);

for (const loc of locales) {
  const filePath = path.join(messagesDir, loc, "common.json");
  if (!fs.existsSync(filePath)) continue;

  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const updates = translations[loc];

  content.theme = { ...(content.theme || {}), ...updates.theme };
  content.weather = { ...(content.weather || {}), ...updates.weather };
  content.location = { ...(content.location || {}), ...updates.location };

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + "\n", "utf-8");
  console.log(`✓ Updated common.json for ${loc}`);
}

console.log("All 12 language common.json files updated successfully!");
