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
