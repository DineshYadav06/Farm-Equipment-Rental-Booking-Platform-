import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "browse": "Browse Equipment",
      "nearby": "Nearby",
      "about": "About",
      "contact": "Contact Us",
      "dashboard": "Dashboard",
      "profile": "Profile",
      "search": "Search Equipment",
      "login": "Login / Register",
      "hero_title": "Modern Farming App 🌾",
      "hero_subtitle": "Rent high-quality agricultural equipment near you easily and affordably.",
      "explore_btn": "Explore Inventory",
      "crop_guide": "Crop Guide 🌾",
      "crop_study_title": "Seasonal Crop Guide & Weather Station",
      "crop_study_subtitle": "Expert insights on crop cycles, weather alerts, and matching farming machinery.",
      "kharif": "Kharif (Monsoon)",
      "rabi": "Rabi (Winter)",
      "zaid": "Zaid (Summer)",
      "sowing_time": "Sowing Period",
      "harvest_time": "Harvesting Period",
      "water_need": "Water Requirement",
      "soil_type": "Suitable Soil",
      "ideal_temp": "Ideal Temperature",
      "rec_equip": "Recommended Equipment",
      "rent_now": "Rent Equipment",
      "high": "High",
      "medium": "Moderate",
      "low": "Low",
      "view_details": "View Details",
      "soil_clayey": "Clayey / Clay Loam",
      "soil_loamy": "Loamy / Sandy Loam",
      "soil_black": "Black Cotton Soil",
      "soil_alluvial": "Alluvial / Loamy"
    }
  },
  hi: {
    translation: {
      "home": "होम",
      "browse": "उपकरण ब्राउज़ करें",
      "nearby": "आस-पास",
      "about": "हमारे बारे में",
      "contact": "संपर्क करें",
      "dashboard": "डैशबोर्ड",
      "profile": "प्रोफ़ाइल",
      "search": "उपकरण खोजें",
      "login": "लॉगिन / पंजीकरण",
      "hero_title": "आधुनिक खेती ऐप 🌾",
      "hero_subtitle": "अपने आस-पास उच्च गुणवत्ता वाले कृषि उपकरण आसानी से और किफायती किराए पर लें।",
      "explore_btn": "इन्वेंट्री देखें",
      "crop_guide": "फ़सल गाइड 🌾",
      "crop_study_title": "मौसमी फ़सल गाइड और मौसम केंद्र",
      "crop_study_subtitle": "फसल चक्र, मौसम की चेतावनी और उपयुक्त कृषि मशीनरी पर विशेषज्ञ सलाह।",
      "kharif": "खरीफ (मानसून)",
      "rabi": "रबी (सर्दियों)",
      "zaid": "जायद (गर्मी)",
      "sowing_time": "बुवाई का समय",
      "harvest_time": "कटाई का समय",
      "water_need": "पानी की आवश्यकता",
      "soil_type": "उपयुक्त मिट्टी",
      "ideal_temp": "आदर्श तापमान",
      "rec_equip": "अनुशंसित उपकरण",
      "rent_now": "उपकरण किराए पर लें",
      "high": "अधिक",
      "medium": "मध्यम",
      "low": "कम",
      "view_details": "विवरण देखें",
      "soil_clayey": "चिकनी मिट्टी / दोमट",
      "soil_loamy": "दोमट / रेतीली दोमट",
      "soil_black": "काली कपास मिट्टी",
      "soil_alluvial": "जलोढ़ / दोमट मिट्टी"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
