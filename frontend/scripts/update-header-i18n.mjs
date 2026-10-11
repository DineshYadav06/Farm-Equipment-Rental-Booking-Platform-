import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesDir = path.join(__dirname, "../src/messages");

const translations = {
  en: {
    utility: {
      textSmall: "Small Text",
      textDefault: "Standard Text",
      textLarge: "Large Text",
      simpleMode: "Simple Mode",
      normalMode: "Standard Mode",
      digitsLatin: "123",
      digitsNative: "Native Digits",
      kisanHelpline: "Kisan Helpline",
      pauseTicker: "Pause announcement ticker",
      playTicker: "Play announcement ticker",
      accessibilityMenu: "Accessibility Menu",
      closeMenu: "Close menu",
      openMenu: "Open menu"
    },
    nav: {
      more: "More",
      about: "About Us",
      contact: "Contact",
      faq: "FAQ",
      logout: "Log Out",
      myBookings: "My Bookings",
      dashboard: "Dashboard",
      bookings: "Bookings"
    },
    location: {
      selectLocation: "Select Your Location",
      useGps: "Use my current location",
      searchState: "Search state...",
      searchDistrict: "Search district...",
      detecting: "Detecting GPS location...",
      locationDetected: "Location detected successfully",
      detectFailed: "Could not detect location. Please select manually.",
      allDistricts: "All Districts",
      stateLabel: "State",
      districtLabel: "District",
      changeLocation: "Change Location"
    },
    search: {
      searchPlaceholder: "Search tractors, harvesters, rotavators...",
      voiceListening: "Listening... speak now",
      voiceError: "Voice input not supported or permission denied",
      closeSearch: "Close search",
      openSearch: "Search equipment",
      searchButton: "Search"
    }
  },
  hi: {
    utility: {
      textSmall: "छोटा अक्षर",
      textDefault: "सामान्य अक्षर",
      textLarge: "बड़ा अक्षर",
      simpleMode: "सरल मोड",
      normalMode: "सामान्य मोड",
      digitsLatin: "123",
      digitsNative: "भारतीय अंक",
      kisanHelpline: "किसान हेल्पलाइन",
      pauseTicker: "सूचना पट्टी रोकें",
      playTicker: "सूचना पट्टी चलाएं",
      accessibilityMenu: "सुलभता मेनू",
      closeMenu: "मेनू बंद करें",
      openMenu: "मेनू खोलें"
    },
    nav: {
      more: "अन्य",
      about: "हमारे बारे में",
      contact: "संपर्क",
      faq: "प्रश्नोत्तरी",
      logout: "लॉग आउट",
      myBookings: "मेरी बुकिंग",
      dashboard: "डैशबोर्ड",
      bookings: "बुकिंग"
    },
    location: {
      selectLocation: "अपना स्थान चुनें",
      useGps: "मेरा वर्तमान स्थान चुनें (GPS)",
      searchState: "राज्य खोजें...",
      searchDistrict: "जिला खोजें...",
      detecting: "GPS स्थान की पहचान की जा रही है...",
      locationDetected: "स्थान की पहचान सफल",
      detectFailed: "स्थान की पहचान नहीं हो सकी। कृपया सूची से चुनें।",
      allDistricts: "सभी जिले",
      stateLabel: "राज्य",
      districtLabel: "जिला",
      changeLocation: "स्थान बदलें"
    },
    search: {
      searchPlaceholder: "ट्रैक्टर, कंबाइन, रोटावेटर खोजें...",
      voiceListening: "सुन रहे हैं... बोलिए",
      voiceError: "आवाज से खोज समर्थित नहीं है या अनुमति नहीं मिली",
      closeSearch: "खोज बंद करें",
      openSearch: "उपकरण खोजें",
      searchButton: "खोजें"
    }
  },
  pa: {
    utility: {
      textSmall: "ਛੋਟਾ ਅੱਖਰ",
      textDefault: "ਸਧਾਰਨ ਅੱਖਰ",
      textLarge: "ਵੱਡਾ ਅੱਖਰ",
      simpleMode: "ਸਰਲ ਮੋਡ",
      normalMode: "ਸਧਾਰਨ ਮੋਡ",
      digitsLatin: "123",
      digitsNative: "ਦੇਸੀ ਅੰਕ",
      kisanHelpline: "ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ",
      pauseTicker: "ਸੂਚਨਾ ਰੋਕੋ",
      playTicker: "ਸੂਚਨਾ ਚਲਾਓ",
      accessibilityMenu: "ਪਹੁੰਚਯੋਗਤਾ ਮੀਨੂ",
      closeMenu: "ਮੀਨੂ ਬੰਦ ਕਰੋ",
      openMenu: "ਮੀਨੂ ਖੋਲ੍ਹੋ"
    },
    nav: {
      more: "ਹੋਰ",
      about: "ਸਾਡੇ ਬਾਰੇ",
      contact: "ਸੰਪਰਕ",
      faq: "ਸਵਾਲ-ਜਵਾਬ",
      logout: "ਲਾਗ ਆਉਟ",
      myBookings: "ਮੇਰੀਆਂ ਬੁਕਿੰਗਾਂ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      bookings: "ਬੁਕਿੰਗ"
    },
    location: {
      selectLocation: "ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ",
      useGps: "ਮੇਰਾ ਮੌਜੂਦਾ ਸਥਾਨ ਵਰਤੋਂ",
      searchState: "ਰਾਜ ਖੋਜੋ...",
      searchDistrict: "ਜ਼ਿਲ੍ਹਾ ਖੋਜੋ...",
      detecting: "ਜੀਪੀਐਸ ਸਥਾਨ ਲੱਭ ਰਿਹਾ ਹੈ...",
      locationDetected: "ਸਥਾਨ ਲੱਭਿਆ ਗਿਆ",
      detectFailed: "ਸਥਾਨ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਹੱਥੀਂ ਚੁਣੋ।",
      allDistricts: "ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ",
      stateLabel: "ਰਾਜ",
      districtLabel: "ਜ਼ਿਲ੍ਹਾ",
      changeLocation: "ਸਥਾਨ ਬਦਲੋ"
    },
    search: {
      searchPlaceholder: "ਟਰੈਕਟਰ, ਕੰਬਾਈਨ, ਰੋਟਾਵੇਟਰ ਖੋਜੋ...",
      voiceListening: "ਸੁਣ ਰਿਹਾ ਹੈ... ਬੋਲੋ",
      voiceError: "ਆਵਾਜ਼ ਖੋਜ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
      closeSearch: "ਖੋਜ ਬੰਦ ਕਰੋ",
      openSearch: "ਉਪਕਰਣ ਖੋਜੋ",
      searchButton: "ਖੋਜੋ"
    }
  },
  mr: {
    utility: {
      textSmall: "लहान अक्षर",
      textDefault: "सामान्य अक्षर",
      textLarge: "मोठे अक्षर",
      simpleMode: "सोपे मोड",
      normalMode: "सामान्य मोड",
      digitsLatin: "123",
      digitsNative: "मराठी अंक",
      kisanHelpline: "किसान हेल्पलाइन",
      pauseTicker: "सूचना थांबवा",
      playTicker: "सूचना सुरू करा",
      accessibilityMenu: "सुलभता मेनू",
      closeMenu: "मेनू बंद करा",
      openMenu: "मेनू उघडा"
    },
    nav: {
      more: "अधिक",
      about: "आमच्याबद्दल",
      contact: "संपर्क",
      faq: "प्रश्नोत्तरे",
      logout: "बाहेर पडा",
      myBookings: "माझे बुकिंग",
      dashboard: "डॅशबोर्ड",
      bookings: "बुकिंग"
    },
    location: {
      selectLocation: "आपले ठिकाण निवडा",
      useGps: "माझे चालू ठिकाण वापरा",
      searchState: "राज्य शोधा...",
      searchDistrict: "जिल्हा शोधा...",
      detecting: "स्थान तपासत आहे...",
      locationDetected: "स्थान सापडले",
      detectFailed: "स्थान सापडले नाही. कृपया स्वतः निवडा.",
      allDistricts: "सर्व जिल्हे",
      stateLabel: "राज्य",
      districtLabel: "जिल्हा",
      changeLocation: "ठिकाण बदला"
    },
    search: {
      searchPlaceholder: "ट्रॅक्टर, कम्बाइन, रोटाव्हेटर शोधा...",
      voiceListening: "ऐकत आहे... बोला",
      voiceError: "आवाज शोध उपलब्ध नाही",
      closeSearch: "शोध बंद करा",
      openSearch: "उपकरणे शोधा",
      searchButton: "शोधा"
    }
  },
  gu: {
    utility: {
      textSmall: "નાના અક્ષર",
      textDefault: "સામાન્ય અક્ષર",
      textLarge: "મોટા અક્ષર",
      simpleMode: "સરળ મોડ",
      normalMode: "સામાન્ય મોડ",
      digitsLatin: "123",
      digitsNative: "ગુજરાતી અંક",
      kisanHelpline: "કિસાન હેલ્પલાઇન",
      pauseTicker: "સૂચના અટકાવો",
      playTicker: "સૂચના ચલાવો",
      accessibilityMenu: "સુલભતા મેનુ",
      closeMenu: "મેનુ બંધ કરો",
      openMenu: "મેનુ ખોલો"
    },
    nav: {
      more: "વધુ",
      about: "અમારા વિશે",
      contact: "સંપર્ક",
      faq: "પ્રશ્નોત્તરી",
      logout: "લોગ આઉટ",
      myBookings: "મારી બુકિંગ",
      dashboard: "ડેશબોર્ડ",
      bookings: "બુકિંગ"
    },
    location: {
      selectLocation: "તમારું સ્થળ પસંદ કરો",
      useGps: "મારું વર્તમાન સ્થળ વાપરો",
      searchState: "રાજ્ય શોધો...",
      searchDistrict: "જિલ્લો શોધો...",
      detecting: "સ્થળ શોધી રહ્યું છે...",
      locationDetected: "સ્થળ મળ્યું",
      detectFailed: "સ્થળ મળ્યું નથી. કૃપા કરીને જાતે પસંદ કરો.",
      allDistricts: "બધા જિલ્લા",
      stateLabel: "રાજ્ય",
      districtLabel: "જિલ્લો",
      changeLocation: "સ્થળ બદલો"
    },
    search: {
      searchPlaceholder: "ટ્રેક્ટર, કમ્બાઇન, રોટાવેટર શોધો...",
      voiceListening: "સાંભળી રહ્યું છે... બોલો",
      voiceError: "અવાજ શોધ ઉપલબ્ધ નથી",
      closeSearch: "શોધ બંધ કરો",
      openSearch: "સાધનો શોધો",
      searchButton: "શોધો"
    }
  },
  bn: {
    utility: {
      textSmall: "ছোট অক্ষর",
      textDefault: "সাধারণ অক্ষর",
      textLarge: "বড় অক্ষর",
      simpleMode: "সহজ মোড",
      normalMode: "সাধারণ মোড",
      digitsLatin: "123",
      digitsNative: "বাংলা সংখ্যা",
      kisanHelpline: "কিষাণ হেল্পলাইন",
      pauseTicker: "বিজ্ঞপ্তি থামান",
      playTicker: "বিজ্ঞপ্তি চালান",
      accessibilityMenu: "অ্যাক্সেসিবিলিটি মেনু",
      closeMenu: "মেনু বন্ধ করুন",
      openMenu: "মেনু খুলুন"
    },
    nav: {
      more: "আরও",
      about: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ",
      faq: "প্রশ্নোত্তর",
      logout: "লগ আউট",
      myBookings: "আমার বুকিং",
      dashboard: "ড্যাশবোর্ড",
      bookings: "বুকিং"
    },
    location: {
      selectLocation: "আপনার অবস্থান নির্বাচন করুন",
      useGps: "আমার বর্তমান অবস্থান ব্যবহার করুন",
      searchState: "রাজ্য খুঁজুন...",
      searchDistrict: "জেলা খুঁজুন...",
      detecting: "অবস্থান সনাক্ত করা হচ্ছে...",
      locationDetected: "অবস্থান সনাক্ত হয়েছে",
      detectFailed: "অবস্থান পাওয়া যায়নি। ম্যানুয়ালি নির্বাচন করুন।",
      allDistricts: "সমস্ত জেলা",
      stateLabel: "রাজ্য",
      districtLabel: "জেলা",
      changeLocation: "অবস্থান পরিবর্তন করুন"
    },
    search: {
      searchPlaceholder: "ট্র্যাক্টর, কম্বাইন, রোটাভেটর খুঁজুন...",
      voiceListening: "শুনছি... বলুন",
      voiceError: "ভয়েস অনুসন্ধান সমর্থিত নয়",
      closeSearch: "অনুসন্ধান বন্ধ করুন",
      openSearch: "যন্ত্রপাতি খুঁজুন",
      searchButton: "অনুসন্ধান"
    }
  },
  ta: {
    utility: {
      textSmall: "சிறிய எழுத்து",
      textDefault: "சாதாரண எழுத்து",
      textLarge: "பெரிய எழுத்து",
      simpleMode: "எளிய முறை",
      normalMode: "இயல்பான முறை",
      digitsLatin: "123",
      digitsNative: "தமிழ் எண்கள்",
      kisanHelpline: "உழவர் உதவி எண்",
      pauseTicker: "அறிவிப்பை நிறுத்து",
      playTicker: "அறிவிப்பை இயக்கு",
      accessibilityMenu: "அணுகல் பட்டி",
      closeMenu: "மெனுவை மூடு",
      openMenu: "மெனுவை திற"
    },
    nav: {
      more: "மேலும்",
      about: "எங்களை பற்றி",
      contact: "தொடர்பு",
      faq: "கேள்வி-பதில்",
      logout: "வெளியேறு",
      myBookings: "எனது முன்பதிவுகள்",
      dashboard: "டாஷ்போர்டு",
      bookings: "முன்பதிவு"
    },
    location: {
      selectLocation: "உங்கள் இடத்தை தேர்வு செய்க",
      useGps: "எனது தற்போதைய இடத்தை பயன்படுத்து",
      searchState: "மாநிலம் தேடு...",
      searchDistrict: "மாவட்டம் தேடு...",
      detecting: "ஜிபிஎஸ் இடம் கண்டறியப்படுகிறது...",
      locationDetected: "இடம் கண்டறியப்பட்டது",
      detectFailed: "இடத்தை கண்டறிய முடியவில்லை. கைமுறையாக தேர்வு செய்க.",
      allDistricts: "அனைத்து மாவட்டங்கள்",
      stateLabel: "மாநிலம்",
      districtLabel: "மாவட்டம்",
      changeLocation: "இடத்தை மாற்று"
    },
    search: {
      searchPlaceholder: "டிராக்டர், அறுவடை இயந்திரம் தேடுக...",
      voiceListening: "கேட்கிறது... பேசுங்கள்",
      voiceError: "குரல் தேடல் ஆதரிக்கப்படவில்லை",
      closeSearch: "தேடலை மூடு",
      openSearch: "கருவிகளை தேடு",
      searchButton: "தேடு"
    }
  },
  te: {
    utility: {
      textSmall: "చిన్న అక్షరాలు",
      textDefault: "సాధారణ అక్షరాలు",
      textLarge: "పెద్ద అక్షరాలు",
      simpleMode: "సరళ విధానం",
      normalMode: "సాధారణ విధానం",
      digitsLatin: "123",
      digitsNative: "తెలుగు అంకెలు",
      kisanHelpline: "కిసాన్ హెల్ప్‌లైన్",
      pauseTicker: "ప్రకటన ఆపు",
      playTicker: "ప్రకటన ప్రారంభించు",
      accessibilityMenu: "యాక్సెసిబిలిటీ మెనూ",
      closeMenu: "మెనూ మూసివేయి",
      openMenu: "మెనూ తెరువు"
    },
    nav: {
      more: "మరిన్ని",
      about: "మా గురించి",
      contact: "సంప్రదించండి",
      faq: "ప్రశ్నోత్తరాలు",
      logout: "లాగ్ అవుట్",
      myBookings: "నా బుకింగ్‌లు",
      dashboard: "డాష్‌బోర్డ్",
      bookings: "బుకింగ్‌లు"
    },
    location: {
      selectLocation: "మీ ప్రాంతాన్ని ఎంచుకోండి",
      useGps: "నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
      searchState: "రాష్ట్రం శోధించండి...",
      searchDistrict: "జిల్లా శోధించండి...",
      detecting: "స్థానాన్ని గుర్తిస్తోంది...",
      locationDetected: "స్థానం గుర్తించబడింది",
      detectFailed: "స్థానం గుర్తించలేకపోయాము. దయచేసి ఎంచుకోండి.",
      allDistricts: "అన్ని జిల్లాలు",
      stateLabel: "రాష్ట్రం",
      districtLabel: "జిల్లా",
      changeLocation: "స్థానాన్ని మార్చండి"
    },
    search: {
      searchPlaceholder: "ట్రాక్టర్లు, హార్వెస్టర్లు శోధించండి...",
      voiceListening: "వింటోంది... మాట్లాడండి",
      voiceError: "వాయిస్ శోధనకు మద్దతు లేదు",
      closeSearch: "శోధన మూసివేయి",
      openSearch: "పరికరాలు శోధించండి",
      searchButton: "శోధించు"
    }
  },
  kn: {
    utility: {
      textSmall: "ಸಣ್ಣ ಅಕ್ಷರ",
      textDefault: "ಸಾಮಾನ್ಯ ಅಕ್ಷರ",
      textLarge: "ದೊಡ್ಡ ಅಕ್ಷರ",
      simpleMode: "ಸರಳ ಮೋಡ್",
      normalMode: "ಸಾಮಾನ್ಯ ಮೋಡ್",
      digitsLatin: "123",
      digitsNative: "ಕನ್ನಡ ಅಂಕಿಗಳು",
      kisanHelpline: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ",
      pauseTicker: "ಸೂಚನೆ ನಿಲ್ಲಿಸಿ",
      playTicker: "ಸೂಚನೆ ಚಲಾಯಿಸಿ",
      accessibilityMenu: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ಮೆನು",
      closeMenu: "ಮೆನು ಮುಚ್ಚಿ",
      openMenu: "ಮೆನು ತೆರೆಯಿರಿ"
    },
    nav: {
      more: "ಇನ್ನಷ್ಟು",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
      faq: "ಪ್ರಶ್ನೋತ್ತರ",
      logout: "ಲಾಗ್ ಔಟ್",
      myBookings: "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      bookings: "ಬುಕಿಂಗ್"
    },
    location: {
      selectLocation: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      useGps: "ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
      searchState: "ರಾಜ್ಯ ಹುಡುಕಿ...",
      searchDistrict: "ಜಿಲ್ಲೆ ಹುಡುಕಿ...",
      detecting: "ಜಿಪಿಎಸ್ ಸ್ಥಳ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
      locationDetected: "ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ",
      detectFailed: "ಸ್ಥಳ ಪತ್ತೆಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಆಯ್ಕೆಮಾಡಿ.",
      allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
      stateLabel: "ರಾಜ್ಯ",
      districtLabel: "ಜಿಲ್ಲೆ",
      changeLocation: "ಸ್ಥಳ ಬದಲಾಯಿಸಿ"
    },
    search: {
      searchPlaceholder: "ಟ್ರಾಕ್ಟರ್, ಹಾರ್ವೆಸ್ಟರ್ ಹುಡುಕಿ...",
      voiceListening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ... ಮಾತನಾಡಿ",
      voiceError: "ಧ್ವನಿ ಹುಡುಕಾಟ ಲಭ್ಯವಿಲ್ಲ",
      closeSearch: "ಹುಡುಕಾಟ ಮುಚ್ಚಿ",
      openSearch: "ಉಪಕರಣ ಹುಡುಕಿ",
      searchButton: "ಹುಡುಕಿ"
    }
  },
  ml: {
    utility: {
      textSmall: "ചെറിയ അക്ഷരം",
      textDefault: "സാധാരണ അക്ഷരം",
      textLarge: "വലിയ അക്ഷരം",
      simpleMode: "ലളിത മോഡ്",
      normalMode: "സാധാരണ മോഡ്",
      digitsLatin: "123",
      digitsNative: "മലയാള അക്കങ്ങൾ",
      kisanHelpline: "കിസാൻ ഹെൽപ്പ്‌ലൈൻ",
      pauseTicker: "അറിയിപ്പ് നിർത്തുക",
      playTicker: "അറിയിപ്പ് തുടരുക",
      accessibilityMenu: "ആക്സസിബിലിറ്റി മെനു",
      closeMenu: "മെനു അടയ്ക്കുക",
      openMenu: "മെനു തുറക്കുക"
    },
    nav: {
      more: "കൂടുതൽ",
      about: "ഞങ്ങളെക്കുറിച്ച്",
      contact: "ബന്ധപ്പെടുക",
      faq: "ചോദ്യോത്തരങ്ങൾ",
      logout: "ലോഗ് ഔട്ട്",
      myBookings: "എന്റെ ബുക്കിംഗുകൾ",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      bookings: "ബുക്കിംഗുകൾ"
    },
    location: {
      selectLocation: "നിങ്ങളുടെ സ്ഥലം തിരഞ്ഞെടുക്കുക",
      useGps: "എന്റെ ഇപ്പോഴത്തെ സ്ഥലം ഉപയോഗിക്കുക",
      searchState: "സംസ്ഥാനം തിരയുക...",
      searchDistrict: "ജില്ല തിരയുക...",
      detecting: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",
      locationDetected: "ലൊക്കേഷൻ കണ്ടെത്തി",
      detectFailed: "ലൊക്കേഷൻ കണ്ടെത്താനായില്ല. സ്വയം തിരഞ്ഞെടുക്കുക.",
      allDistricts: "എല്ലാ ജില്ലകളും",
      stateLabel: "സംസ്ഥാനം",
      districtLabel: "ജില്ല",
      changeLocation: "സ്ഥലം മാറ്റുക"
    },
    search: {
      searchPlaceholder: "ട്രാക്ടർ, ഹാർവെസ്റ്റർ തിരയുക...",
      voiceListening: "കേൾക്കുന്നു... സംസാരിക്കൂ",
      voiceError: "വോയ്സ് സേർച്ച് ലഭ്യമല്ല",
      closeSearch: "തിരച്ചിൽ അടയ്ക്കുക",
      openSearch: "ഉപകരണങ്ങൾ തിരയുക",
      searchButton: "തിരയുക"
    }
  },
  or: {
    utility: {
      textSmall: "ଛୋଟ ଅକ୍ଷର",
      textDefault: "ସାଧାରଣ ଅକ୍ଷର",
      textLarge: "ବଡ ଅକ୍ଷର",
      simpleMode: "ସରଳ ମୋଡ୍",
      normalMode: "ସାଧାରଣ ମୋଡ୍",
      digitsLatin: "123",
      digitsNative: "ଓଡ଼ିଆ ଅଙ୍କ",
      kisanHelpline: "କିଷାନ ହେଲ୍ପଲାଇନ୍",
      pauseTicker: "ସୂଚନା ବନ୍ଦ କରନ୍ତୁ",
      playTicker: "ସୂଚନା ଚଲାନ୍ତୁ",
      accessibilityMenu: "ସୁଲଭତା ମେନୁ",
      closeMenu: "ମେନୁ ବନ୍ଦ କରନ୍ତୁ",
      openMenu: "ମେନୁ ଖୋଲନ୍ତୁ"
    },
    nav: {
      more: "ଅଧିକ",
      about: "ଆମ ବିଷୟରେ",
      contact: "ଯୋଗାଯୋଗ",
      faq: "ପ୍ରଶ୍ନୋତ୍ତର",
      logout: "ଲଗ୍ ଆଉଟ୍",
      myBookings: "ମୋର ବୁକିଂ",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      bookings: "ବୁକିଂ"
    },
    location: {
      selectLocation: "ଆପଣଙ୍କ ସ୍ଥାନ ବାଛନ୍ତୁ",
      useGps: "ମୋର ବର୍ତ୍ତମାନର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
      searchState: "ରାଜ୍ୟ ଖୋଜନ୍ତୁ...",
      searchDistrict: "ଜିଲ୍ଲା ଖୋଜନ୍ତୁ...",
      detecting: "ସ୍ଥାନ ଚିହ୍ନଟ ହେଉଛି...",
      locationDetected: "ସ୍ଥାନ ଚିହ୍ନଟ ହେଲା",
      detectFailed: "ସ୍ଥାନ ମିଳିଲା ନାହିଁ। ଦୟାକରି ବାଛନ୍ତୁ।",
      allDistricts: "ସମସ୍ତ ଜିଲ୍ଲା",
      stateLabel: "ରାଜ୍ୟ",
      districtLabel: "ଜିଲ୍ଲା",
      changeLocation: "ସ୍ଥାନ ବଦଳାନ୍ତୁ"
    },
    search: {
      searchPlaceholder: "ଟ୍ରାକ୍ଟର, ହାର୍ଭେଷ୍ଟର ଖୋଜନ୍ତୁ...",
      voiceListening: "ଶୁଣୁଛି... କୁହନ୍ତୁ",
      voiceError: "ଭଏସ୍ ସନ୍ଧାନ ଉପଲବ୍ଧ ନାହିଁ",
      closeSearch: "ସନ୍ଧାନ ବନ୍ଦ କରନ୍ତୁ",
      openSearch: "ଉପକରଣ ଖୋଜନ୍ତୁ",
      searchButton: "ଖୋଜନ୍ତୁ"
    }
  },
  as: {
    utility: {
      textSmall: "সৰু আখৰ",
      textDefault: "সাধাৰণ আখৰ",
      textLarge: "ডাঙৰ আখৰ",
      simpleMode: "সহজ মোড",
      normalMode: "সাধাৰণ মোড",
      digitsLatin: "123",
      digitsNative: "অসমীয়া সংখ্যা",
      kisanHelpline: "কিষাণ হেল্পলাইন",
      pauseTicker: "জাননী বন্ধ কৰক",
      playTicker: "জাননী চলাওক",
      accessibilityMenu: "প্ৰৱেশাধিকাৰ মেনু",
      closeMenu: "মেনু বন্ধ কৰক",
      openMenu: "মেনু খোলক"
    },
    nav: {
      more: "অধিক",
      about: "আমাৰ বিষয়ে",
      contact: "যোগাযোগ",
      faq: "প্ৰশ্নোত্তৰ",
      logout: "লগ আউট",
      myBookings: "মোৰ বুকিং",
      dashboard: "ডেশ্ববৰ্ড",
      bookings: "বুকিং"
    },
    location: {
      selectLocation: "আপোনাৰ স্থান বাছনি কৰক",
      useGps: "মোৰ বৰ্তমান স্থান ব্যৱহাৰ কৰক",
      searchState: "ৰাজ্য সন্ধান কৰক...",
      searchDistrict: "জিলা সন্ধান কৰক...",
      detecting: "স্থান চিনাক্ত কৰা হৈছে...",
      locationDetected: "স্থান চিনাক্ত হ'ল",
      detectFailed: "স্থান পোৱা নগ'ল। অনুগ্ৰহ কৰি বাছক।",
      allDistricts: "সকলো জিলা",
      stateLabel: "ৰাজ্য",
      districtLabel: "জিলা",
      changeLocation: "স্থান সলনি কৰক"
    },
    search: {
      searchPlaceholder: "ট্ৰেক্টৰ, কম্বাইন সন্ধান কৰক...",
      voiceListening: "শুনি আছোঁ... কওক",
      voiceError: "ভইচ সন্ধান উপলব্ধ নহয়",
      closeSearch: "সন্ধান বন্ধ কৰক",
      openSearch: "সঁজুলি সন্ধান কৰক",
      searchButton: "সন্ধান"
    }
  }
};

const locales = Object.keys(translations);

for (const loc of locales) {
  const filePath = path.join(messagesDir, `${loc}/common.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    continue;
  }
  const current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const add = translations[loc];

  current.utility = { ...current.utility, ...add.utility };
  current.nav = { ...current.nav, ...add.nav };
  current.location = add.location;
  current.search = add.search;

  fs.writeFileSync(filePath, JSON.stringify(current, null, 2), "utf-8");
  console.log(`Updated ${loc}/common.json`);
}

console.log("All translations updated successfully.");
