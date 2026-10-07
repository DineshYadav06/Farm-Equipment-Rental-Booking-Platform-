/**
 * FarmRentHub Multilingual Configuration
 * Phase 1: 12 Major Indian Languages + English
 * Extensible to 22+ Scheduled Languages & RTL (Urdu, Kashmiri) with zero component changes.
 */

export type LocaleCode =
  | "hi"
  | "en"
  | "pa"
  | "mr"
  | "gu"
  | "bn"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "or"
  | "as";

export interface LocaleMeta {
  code: LocaleCode;
  name: string;        // In English
  nativeName: string;  // In its OWN script
  script: string;
  dir: "ltr" | "rtl";
  speechLang: string;  // BCP-47 for Web Speech Recognition & SpeechSynthesis
  defaultRegion: string;
  tagline: string;     // Translated brand tagline
  digits: "latin" | "indic";
  digitMap?: string[]; // 0 to 9 in native script
}

export const SUPPORTED_LOCALES: Record<LocaleCode, LocaleMeta> = {
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari",
    dir: "ltr",
    speechLang: "hi-IN",
    defaultRegion: "UP/Bihar/MP/Rajasthan/Haryana",
    tagline: "सही मशीन, आसान खेती",
    digits: "latin",
    digitMap: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    script: "Latin",
    dir: "ltr",
    speechLang: "en-IN",
    defaultRegion: "National",
    tagline: "Rent the Right Equipment. Grow with Ease.",
    digits: "latin",
    digitMap: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  },
  pa: {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    dir: "ltr",
    speechLang: "pa-IN",
    defaultRegion: "Punjab",
    tagline: "ਸਹੀ ਮਸ਼ੀਨ, ਸੌਖੀ ਖੇਤੀ",
    digits: "latin",
    digitMap: ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯"]
  },
  mr: {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    script: "Devanagari",
    dir: "ltr",
    speechLang: "mr-IN",
    defaultRegion: "Maharashtra",
    tagline: "योग्य यंत्र, सोपी शेती",
    digits: "latin",
    digitMap: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    script: "Gujarati",
    dir: "ltr",
    speechLang: "gu-IN",
    defaultRegion: "Gujarat",
    tagline: "સાચું સાધન, સરળ ખેતી",
    digits: "latin",
    digitMap: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
  },
  bn: {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    script: "Bengali",
    dir: "ltr",
    speechLang: "bn-IN",
    defaultRegion: "West Bengal",
    tagline: "সঠিক সরঞ্জাম, সহজ চাষাবাদ",
    digits: "latin",
    digitMap: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil",
    dir: "ltr",
    speechLang: "ta-IN",
    defaultRegion: "Tamil Nadu",
    tagline: "சரியான உபகரணம், எளிய விவசாயம்",
    digits: "latin",
    digitMap: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"]
  },
  te: {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu",
    dir: "ltr",
    speechLang: "te-IN",
    defaultRegion: "Andhra Pradesh / Telangana",
    tagline: "సరైన యంత్రం, సులభమైన సాగు",
    digits: "latin",
    digitMap: ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯"]
  },
  kn: {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    script: "Kannada",
    dir: "ltr",
    speechLang: "kn-IN",
    defaultRegion: "Karnataka",
    tagline: "ಸರಿಯಾದ ಯಂತ್ರ, ಸುಲಭ ಬೇಸಾಯ",
    digits: "latin",
    digitMap: ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"]
  },
  ml: {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    script: "Malayalam",
    dir: "ltr",
    speechLang: "ml-IN",
    defaultRegion: "Kerala",
    tagline: "ശരിയായ യന്ത്രം, എളുപ്പമുള്ള കൃഷി",
    digits: "latin",
    digitMap: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"]
  },
  or: {
    code: "or",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    script: "Odia",
    dir: "ltr",
    speechLang: "or-IN",
    defaultRegion: "Odisha",
    tagline: "ସଠିକ୍ ଯନ୍ତ୍ରପାତି, ସହଜ ଚାଷ",
    digits: "latin",
    digitMap: ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"]
  },
  as: {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    script: "Bengali-Assamese",
    dir: "ltr",
    speechLang: "as-IN",
    defaultRegion: "Assam",
    tagline: "সঠিক সা-সঁজুলি, সহজ খেতি",
    digits: "latin",
    digitMap: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  }
};

export const DEFAULT_LOCALE: LocaleCode = "hi";

export const LOCALES_LIST = Object.values(SUPPORTED_LOCALES);
