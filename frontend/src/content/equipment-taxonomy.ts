/**
 * FarmRentHub Equipment Taxonomy (14 Official Categories & Synonyms)
 * Fully compliant with ICAR-CIAE and Ministry of Agriculture classifications.
 */

export interface EquipmentCategoryTaxonomy {
  id: string;
  slug: string;
  name: string; // English
  names: Record<string, string>; // Local script names
  subtypes: string[];
  defaultRateUnit: "hour" | "day" | "acre" | "quintal" | "trip";
  synonyms: Record<string, string[]>; // Multi-lingual search synonyms
  iconName: string; // Lucide icon reference
  popularRegions: string[];
}

export const EQUIPMENT_TAXONOMY: EquipmentCategoryTaxonomy[] = [
  {
    id: "cat_tractor",
    slug: "tractor",
    name: "Tractor",
    names: {
      hi: "ट्रैक्टर",
      pa: "ਟਰੈਕਟਰ",
      mr: "ट्रॅक्टर",
      gu: "ટ્રેક્ટર",
      bn: "ট্র্যাক্টর",
      ta: "டிராக்டர்",
      te: "ట్రాక్టర్",
      kn: "ಟ್ರಾಕ್ಟರ್",
      ml: "ട്രാക്ടർ",
      or: "ଟ୍ରାକ୍ଟର",
      as: "ট্ৰেক্টৰ"
    },
    subtypes: [
      "Mini Tractor (20–30 HP)",
      "Utility Tractor (35–50 HP)",
      "Heavy Duty (50–75 HP)",
      "4WD Tractor",
      "Orchard Tractor"
    ],
    defaultRateUnit: "hour",
    synonyms: {
      en: ["tractor", "farm tractor", "4wd", "mini tractor"],
      hi: ["ट्रैक्टर", "ट्रेक्टर", "गाड़ी"],
      pa: ["ਟਰੈਕਟਰ", "ਟਰਾਲੀ"],
      mr: ["ट्रॅक्टर"],
      ta: ["டிராக்டர்"],
      te: ["ట్రాక్టర్"]
    },
    iconName: "Tractor",
    popularRegions: ["Punjab", "Haryana", "UP", "Maharashtra", "Tamil Nadu", "All India"]
  },
  {
    id: "cat_land_prep",
    slug: "land-preparation",
    name: "Land Preparation",
    names: {
      hi: "जुताई व खेत तैयारी",
      pa: "ਜ਼ਮੀਨ ਦੀ ਤਿਆਰੀ",
      mr: "जमीन मशागत अवजारे",
      gu: "જમીન તૈયારી સાધનો",
      bn: "জমি প্রস্তুতি",
      ta: "நிலம் தயாரித்தல்",
      te: "భూమి తయారీ",
      kn: "ಭೂಮಿ ಸಿದ್ಧತೆ",
      ml: "നിലമൊരുക്കൽ",
      or: "ଜମି ପ୍ରସ୍ତୁତି",
      as: "মাটি প্ৰস্তুতি"
    },
    subtypes: [
      "MB Plough",
      "Disc Plough",
      "Disc Harrow",
      "Cultivator",
      "Rotavator",
      "Laser Land Leveller",
      "Power Tiller",
      "Subsoiler",
      "Bund Former"
    ],
    defaultRateUnit: "hour",
    synonyms: {
      en: ["rotavator", "rotary tiller", "plough", "cultivator", "laser leveller", "harrow"],
      hi: ["रोटावेटर", "हल", "कल्टीवेटर", "हैरो", "लेज़र लेवलर", "कराहा", "पावर टिलर"],
      pa: ["ਰੋਟਾਵੇਟਰ", "ਹੱਲ", "ਕਲਟੀਵੇਟਰ", "ਲੇਜ਼ਰ ਲੈਵਲਰ"],
      mr: ["रोटाव्हेटर", "नांगर", "कुळव", "कल्टिव्हेटर"],
      ta: ["ரோட்டாவேட்டர்", "ஏர்", "கலப்பை"],
      te: ["రోటవేటర్", "నాగలి", "కల్టివేటర్"]
    },
    iconName: "Shovel",
    popularRegions: ["Punjab", "Haryana", "UP", "Bihar", "Gujarat", "MP"]
  },
  {
    id: "cat_sowing",
    slug: "sowing-planting",
    name: "Sowing & Planting",
    names: {
      hi: "बुवाई व रोपाई यंत्र",
      pa: "ਬਿਜਾਈ ਤੇ ਲੁਆਈ",
      mr: "पेरणी व लागवड",
      gu: "વાવણી સાધનો",
      bn: "বীজ বপন ও রোপণ",
      ta: "விதைப்பு மற்றும் நடவு",
      te: "విత్తనాలు & నాట్లు",
      kn: "ಬಿತ್ತನೆ ಮತ್ತು ನಾಟಿ",
      ml: "വിത്തുവിതയ്ക്കലും നടീലും",
      or: "ବୁଣା ଓ ରୋପଣ",
      as: "বীজ সিঁচা আৰু ৰোপণ"
    },
    subtypes: [
      "Seed Drill",
      "Happy Seeder",
      "Super Seeder",
      "Zero-Till Drill",
      "Multi-Crop Planter",
      "Paddy Transplanter",
      "Potato Planter",
      "Sugarcane Planter"
    ],
    defaultRateUnit: "acre",
    synonyms: {
      en: ["seed drill", "super seeder", "happy seeder", "paddy transplanter", "planter"],
      hi: ["सीड ड्रिल", "हैप्पी सीडर", "सुपर सीडर", "धान रोपाई मशीन", "आलू बुवाई मशीन"],
      pa: ["ਸੀਡ ਡ੍ਰਿਲ", "ਸੁਪਰ ਸੀਡਰ", "ਹੈਪੀ ਸੀਡਰ", "ਝੋਨਾ ਲਾਉਣ ਵਾਲੀ ਮਸ਼ੀਨ"],
      mr: ["पेरણી यंत्र", "टोकਣ यंत्र"],
      ta: ["விதைக்கும் இயந்திரம்", "நடவு இயந்திரம்"],
      te: ["విత్తన డ్రిల్", "నాట్లు వేసే యంత్రం"]
    },
    iconName: "Sprout",
    popularRegions: ["Punjab", "Haryana", "West Bengal", "Tamil Nadu", "Andhra Pradesh"]
  },
  {
    id: "cat_plant_protection",
    slug: "plant-protection",
    name: "Plant Protection & Spraying",
    names: {
      hi: "पौध संरक्षण व छिड़काव",
      pa: "ਸਪਰੇਅ ਤੇ ਫ਼ਸਲ ਸੁਰੱਖਿਆ",
      mr: "पीक संरक्षण व फवारणी",
      gu: "દવા છંટકાવ સાધનો",
      bn: "বালাই দমন ও স্প্রে",
      ta: "பயிர் பாதுகாப்பு மற்றும் தெளிப்பு",
      te: "మొక్కల సంరక్షణ & స్ప్రేయింగ్",
      kn: "ಬೆಳೆ ರಕ್ಷಣೆ ಮತ್ತು ಸಿಂಪಡಣೆ",
      ml: "സസ്യസംരക്ഷണവും തളിക്കലും",
      or: "ଫସଲ ସୁରକ୍ଷା ଓ ସ୍ପ୍ରେ",
      as: "শস্য সুৰক্ষা আৰু স্প্ৰে"
    },
    subtypes: [
      "Tractor-Mounted Sprayer",
      "Boom Sprayer",
      "Knapsack Power Sprayer",
      "Orchard Mist Blower",
      "Agri Drone Sprayer",
      "Power Weeder",
      "Cono Weeder"
    ],
    defaultRateUnit: "acre",
    synonyms: {
      en: ["sprayer", "boom sprayer", "drone sprayer", "power weeder", "spray pump"],
      hi: ["स्प्रेयर", "बूम स्प्रेयर", "ड्रोन स्प्रे", "निराई मशीन", "स्प्रे पंप"],
      pa: ["ਸਪਰੇਅਰ", "ਡਰੋਨ ਸਪਰੇਅ", "ਵੀਡਰ"],
      mr: ["फवारणी यंत्र", "एसटीपी स्प्रेयर", "ड्रोन फवारणी"],
      ta: ["தெளிப்பான்", "மருந்து தெளிப்பான்", "ட்ரோன்"],
      te: ["స్ప్రేయర్", "మందుల పంపు"]
    },
    iconName: "ShieldAlert",
    popularRegions: ["Maharashtra", "Punjab", "Gujarat", "Karnataka", "Assam"]
  },
  {
    id: "cat_irrigation",
    slug: "irrigation",
    name: "Irrigation Equipment",
    names: {
      hi: "सिंचाई उपकरण व पंप",
      pa: "ਸਿੰਚਾਈ ਪੰਪ ਤੇ ਸੈੱਟ",
      mr: "सिंचन उपकरणे व पंप",
      gu: "સિંચાઈ સાધનો",
      bn: "সেচ সরঞ্জাম ও পাম্প",
      ta: "பாசன உபகரணங்கள் & பம்புகள்",
      te: "నీటిపారుదల పరికరాలు",
      kn: "ನೀರಾವರಿ ಸಲಕರಣೆಗಳು",
      ml: "ജലസേചന ഉപകരണങ്ങൾ",
      or: "ଜଳସେଚନ ପମ୍ପ",
      as: "জলসিঞ্চন সঁজুলি"
    },
    subtypes: [
      "Diesel Pump Set",
      "Submersible Pump",
      "Drip Irrigation Kit",
      "Sprinkler Set",
      "Rain Gun",
      "Portable Pipe Set",
      "Solar Pump"
    ],
    defaultRateUnit: "day",
    synonyms: {
      en: ["pump set", "diesel pump", "drip irrigation", "sprinkler", "rain gun", "solar pump"],
      hi: ["पंप सेट", "डीजल इंजन", "फव्वारा", "ड्रिप सिंचाई", "रेन गन", "सोलर पंप"],
      pa: ["ਡੀਜ਼ਲ ਪੰਪ", "ਫੁਹਾਰਾ ਸਿੰਚਾਈ"],
      mr: ["डिझेल पंप", "तुषार सिंचन", "ठिबक सिंचन"],
      ta: ["பம்ப் செட்", "சொட்டு நீர் பாசனம்", "தெளிப்பு நீர்"],
      te: ["పంపు సెట్", "బిందు సేద్యం", "తుంపర సేద్యం"]
    },
    iconName: "Droplets",
    popularRegions: ["Rajasthan", "Maharashtra", "UP", "MP", "Karnataka"]
  },
  {
    id: "cat_harvesting",
    slug: "harvesting",
    name: "Harvesting Machinery",
    names: {
      hi: "फसल कटाई मशीनरी",
      pa: "ਕਟਾਈ ਮਸ਼ੀਨਰੀ (ਕੰਬਾਈਨ)",
      mr: "पीक काढणी यंत्रे",
      gu: "લણણી સાધનો",
      bn: "ফসল কাটার মেশিন",
      ta: "அறுவடை இயந்திரங்கள்",
      te: "పంట కోత యంత్రాలు",
      kn: "ಕೊಯ್ಲು ಯಂತ್ರಗಳು",
      ml: "വിളവെടുപ്പ് യന്ത്രങ്ങൾ",
      or: "ଫସଲ ଅମଳ ଯନ୍ତ୍ର",
      as: "ফচল চপোৱা যন্ত্ৰ"
    },
    subtypes: [
      "Combine Harvester",
      "Mini Combine",
      "Paddy Harvester",
      "Reaper Binder",
      "Sugarcane Harvester",
      "Potato Digger",
      "Groundnut Digger",
      "Cotton Picker",
      "Straw Reaper"
    ],
    defaultRateUnit: "acre",
    synonyms: {
      en: ["harvester", "combine", "paddy harvester", "sugarcane harvester", "reaper"],
      hi: ["कंबाइन हार्वेस्टर", "कटाई मशीन", "रीपर", "गन्ना कटाई", "आलू खुदाई", "मूंगफली खुदाई"],
      pa: ["ਕੰਬਾਈਨ", "ਰੀਪਰ", "ਵਾਢੀ ਮਸ਼ੀਨ"],
      mr: ["कम्बाइन हार्वेस्टर", "ऊस तोडणी यंत्र"],
      ta: ["அறுவடை இயந்திரம்", "கம்பைன்"],
      te: ["కోత యంత్రం", "హార్వెస్టర్"]
    },
    iconName: "Scissors",
    popularRegions: ["Punjab", "Haryana", "Maharashtra", "Tamil Nadu", "Odisha", "Andhra Pradesh"]
  },
  {
    id: "cat_post_harvest",
    slug: "post-harvest",
    name: "Post-Harvest & Processing",
    names: {
      hi: "कटाई उपरांत व गहाई",
      pa: "ਗਹਾਈ ਤੇ ਪ੍ਰੋਸੈਸਿੰਗ",
      mr: "काढणीपश्चात प्रक्रिया",
      gu: "લણણી પછીની પ્રક્રિયા",
      bn: "ফসল তোলার পরবর্তী প্রক্রিয়াকরণ",
      ta: "அறுவடைக்கு பிந்தைய இயந்திரங்கள்",
      te: "కోత అనంతర ప్రాసెసింగ్",
      kn: "ಕೊಯ್ಲಿನ ನಂತರದ ಯಂತ್ರಗಳು",
      ml: "വിളവെടുപ്പാനന്തര യന്ത്രങ്ങൾ",
      or: "ଅମଳ ପରବର୍ତ୍ତୀ ପ୍ରକ୍ରିୟାକରଣ",
      as: "চপোৱাৰ পিছৰ সংসাধন"
    },
    subtypes: [
      "Multicrop Thresher",
      "Maize Sheller",
      "Groundnut Decorticator",
      "Winnower",
      "Grain Cleaner and Grader",
      "Dryer",
      "Mini Rice Mill",
      "Oil Expeller (Kolhu)"
    ],
    defaultRateUnit: "hour",
    synonyms: {
      en: ["thresher", "multicrop thresher", "maize sheller", "cleaner", "winnower"],
      hi: ["थ्रेशर", "गहाई मशीन", "मक्का छिलाई", "पंखा", "कोल्हू"],
      pa: ["ਥਰੈਸ਼ਰ", "ਗਹਾਈ ਮਸ਼ੀਨ"],
      mr: ["मळणी यंत्र", "थ्रेशर"],
      ta: ["கதிர் அடிக்கும் இயந்திரம்"],
      te: ["నూర్పిడి యంత్రం"]
    },
    iconName: "RotateCw",
    popularRegions: ["UP", "Bihar", "MP", "Rajasthan", "Karnataka"]
  },
  {
    id: "cat_straw_residue",
    slug: "straw-residue",
    name: "Straw & Crop Residue",
    names: {
      hi: "पराली व अवशेष प्रबंधन",
      pa: "ਪਰਾਲੀ ਤੇ ਰਹਿੰਦ-ਖੂੰਹਦ ਪ੍ਰਬੰਧਨ",
      mr: "पेंढा व काडीकचरा व्यवस्थापन",
      gu: "પરાળ વ્યવસ્થાપન સાધનો",
      bn: "খড় ও অবশিষ্টাংশ ব্যবস্থাপনা",
      ta: "வைக்கோல் மேலாண்மை",
      te: "గడ్డి వ్యర్థాల నిర్వహణ",
      kn: "ಹುಲ್ಲು ಮತ್ತು ಕೃಷಿ ತ್ಯಾಜ್ಯ",
      ml: "വൈക്കോൽ സംസ്കരണം",
      or: "ନଡ଼ା ପରିଚାଳନା",
      as: "নৰা আৰু খেৰ ব্যৱস্থাপনা"
    },
    subtypes: [
      "Straw Baler",
      "Straw Chopper",
      "Straw Reaper",
      "Mulcher",
      "Hay Rake",
      "Stubble Shaver"
    ],
    defaultRateUnit: "acre",
    synonyms: {
      en: ["baler", "straw baler", "mulcher", "stubble chopper", "straw reaper"],
      hi: ["बेलर", "पराली बेलर", "मल्चर", "भूसा मशीन", "श्रेडर"],
      pa: ["ਬੇਲਰ", "ਮਲਚਰ", "ਸਟ੍ਰਾਅ ਰੀਪਰ", "ਤੂੜੀ ਵਾਲੀ ਮਸ਼ੀਨ"],
      mr: ["काडी कचरा श्रेडर", "मल्चर"],
      ta: ["வைக்கோல் கட்டும் இயந்திரம்"],
      te: ["బేలర్", "మల్చర్"]
    },
    iconName: "Layers",
    popularRegions: ["Punjab", "Haryana", "Western UP", "MP"]
  },
  {
    id: "cat_transport",
    slug: "loading-transport",
    name: "Loading & Farm Transport",
    names: {
      hi: "लोडिंग व ढुलाई वाहन",
      pa: "ਢੋਆ-ਢੁਆਈ ਤੇ ਟਰਾਲੀ",
      mr: "वाहतूक व ट्रॉली",
      gu: "પરિવહન અને ટ્રોલી",
      bn: "পরিবহন ও ট্রলি",
      ta: "போக்குவரத்து & டிராலி",
      te: "రవాణా & ట్రాలీ",
      kn: "ಸಾರಿಗೆ ಮತ್ತು ಟ್ರಾಲಿ",
      ml: "ഗതാഗതവും ട്രോളിയും",
      or: "ପରିବହନ ଓ ଟ୍ରଲି",
      as: "পৰিবহন আৰু ট্ৰলী"
    },
    subtypes: [
      "Tractor Trolley",
      "Hydraulic Tipping Trailer",
      "Mini Farm Loader (JCB)",
      "Pickup Truck",
      "Water Tanker"
    ],
    defaultRateUnit: "day",
    synonyms: {
      en: ["trolley", "tractor trolley", "trailer", "loader", "water tanker"],
      hi: ["ट्रॉली", "हाइड्रोलिक ट्रॉली", "लोडर", "पानी टैंकर"],
      pa: ["ਟਰਾਲੀ", "ਟਿੱਪਰ"],
      mr: ["ट्रॉली", "पाण्याचा टँकर"],
      ta: ["டிராலி"],
      te: ["ట్రాలీ"]
    },
    iconName: "Truck",
    popularRegions: ["All India"]
  },
  {
    id: "cat_horticulture",
    slug: "horticulture-orchard",
    name: "Horticulture & Orchard Tools",
    names: {
      hi: "बागवानी उपकरण",
      pa: "ਬਾਗਬਾਨੀ ਸੰਦ",
      mr: "बागकाम अवजारे",
      gu: "બાગાયત સાધનો",
      bn: "উদ্যানপালন সরঞ্জাম",
      ta: "தோட்டக்கலை உபகரணங்கள்",
      te: "ఉద్యానవన పరికరాలు",
      kn: "ತೋಟಗಾರಿಕೆ ಸಲಕರಣೆಗಳು",
      ml: "തോട്ടവിള യന്ത്രങ്ങൾ",
      or: "ଉଦ୍ୟାନ କୃଷି ଯନ୍ତ୍ର",
      as: "উদ্যান শস্যৰ সঁজুলি"
    },
    subtypes: [
      "Orchard Tractor",
      "Tree Climber (Coconut/Arecanut)",
      "Post-Hole Digger",
      "Pruner / Hedge Trimmer",
      "Tree Shaker",
      "Grass Cutter"
    ],
    defaultRateUnit: "day",
    synonyms: {
      en: ["tree climber", "orchard sprayer", "post hole digger", "grass cutter"],
      hi: ["पेड़ चढ़ने की मशीन", "गड्ढा खोदने की मशीन", "घास कटर"],
      pa: ["ਘਾਹ ਕਟਰ", "ਟੋਆ ਪੁੱਟਣ ਵਾਲੀ ਮਸ਼ੀਨ"],
      mr: ["झाडावर चढण्याचे यंत्र", "खड्डे खणण्याचे यंत्र"],
      ta: ["தென்னை மரம் ஏறும் கருவி"],
      kn: ["ಅಡಿಕೆ ಮರ ಹತ್ತುವ ಯಂತ್ರ"],
      ml: ["തെങ്ങുകയറ്റ യന്ത്രം"]
    },
    iconName: "Flower",
    popularRegions: ["Kerala", "Karnataka", "Maharashtra", "Himachal Pradesh", "Assam"]
  },
  {
    id: "cat_dairy_fodder",
    slug: "dairy-fodder",
    name: "Dairy & Fodder Equipment",
    names: {
      hi: "पशुपालन व चारा मशीनरी",
      pa: "ਡੇਅਰੀ ਤੇ ਚਾਰਾ ਮਸ਼ੀਨਰੀ",
      mr: "डेअरी व चारा अवजारे",
      gu: "ડેરી અને ઘાસચારો સાધનો",
      bn: "দুগ্ধ ও গোখাদ্য সরঞ্জাম",
      ta: "பால்பண்ணை & தீவன உபகரணங்கள்",
      te: "డైరీ & పశుగ్రాస పరికరాలు",
      kn: "ಡೈರಿ ಮತ್ತು ಮೇವು ಉಪಕರಣಗಳು",
      ml: "ക്ഷീരമേഖല & തീറ്റ യന്ത്രങ്ങൾ",
      or: "ଡାଏରୀ ଓ ଘାସ ଯନ୍ତ୍ର",
      as: "দুগ্ধ আৰু পশুখাদ্য সঁজুলি"
    },
    subtypes: [
      "Chaff Cutter (Kutti Machine)",
      "Fodder Harvester",
      "Milking Machine",
      "Silage Baler",
      "TMR Feed Mixer"
    ],
    defaultRateUnit: "day",
    synonyms: {
      en: ["chaff cutter", "milking machine", "silage baler", "fodder cutter"],
      hi: ["चारा कटर", "कुट्टी मशीन", "दूध निकालने की मशीन", "साइलेज"],
      pa: ["ਕੁਤਰਨ ਵਾਲੀ ਮਸ਼ੀਨ", "ਟੋਕਾ ਮਸ਼ੀਨ"],
      mr: ["कडबा कुट्टी यंत्र", "दूध काढणी यंत्र"],
      ta: ["தீவன வெட்டும் இயந்திரம்"],
      te: ["గడ్డి కట్టర్"]
    },
    iconName: "Milk",
    popularRegions: ["Haryana", "Punjab", "Gujarat", "Maharashtra", "Tamil Nadu"]
  },
  {
    id: "cat_soil_development",
    slug: "soil-development",
    name: "Soil & Farm Development",
    names: {
      hi: "भूमि सुधार व मेड़ निर्माण",
      pa: "ਜ਼ਮੀਨ ਸੁਧਾਰ ਸੰਦ",
      mr: "जमीन सुधारणा व बंधारे",
      gu: "જમીન સુધારણા સાધનો",
      bn: "ভূমি উন্নয়ন",
      ta: "நில மேம்பாடு & வரப்பு அமைத்தல்",
      te: "భూమి అభివృద్ధి & గట్ల నిర్మాణం",
      kn: "ಭೂಮಿ ಅಭಿವೃದ್ಧಿ",
      ml: "മണ്ണൊരുക്കൽ യന്ത്രങ്ങൾ",
      or: "ମାଟି ଉନ୍ନୟନ",
      as: "মাটি উন্নয়ন"
    },
    subtypes: [
      "Excavator (Backhoe / JCB)",
      "Trencher",
      "Pond Digger",
      "Bund Maker",
      "Earth Auger"
    ],
    defaultRateUnit: "hour",
    synonyms: {
      en: ["jcb", "excavator", "backhoe", "pond digger", "bund maker"],
      hi: ["जेसीबी", "खुदाई मशीन", "मेड़ बनाने की मशीन", "तालाब खुदाई"],
      pa: ["ਜੇਸੀਬੀ", "ਖੱਡਾ ਪੁੱਟਣ ਵਾਲੀ"],
      mr: ["जेसीबी", "बांध घालण्याचे यंत्र"],
      ta: ["ஜேசிபி", "வரப்பு போடும் கருவி"],
      te: ["జేసీబీ"]
    },
    iconName: "Hammer",
    popularRegions: ["All India"]
  },
  {
    id: "cat_utility_power",
    slug: "utility-power",
    name: "Power & Workshop Utility",
    names: {
      hi: "बिजली व जनरेटर उपकरण",
      pa: "ਬਿਜਲੀ ਤੇ ਜਨਰੇਟਰ",
      mr: "विद्युत व जनरेटर",
      gu: "પાવર અને જનરેટર સાધનો",
      bn: "বিদ্যুৎ ও জেনারেটর",
      ta: "மின்சாரம் & ஜெனரேட்டர்",
      te: "విద్యుత్ & జనరేటర్",
      kn: "ವಿದ್ಯುತ್ ಮತ್ತು ಜನರೇಟರ್",
      ml: "വൈദ്യുതി & ജനറേറ്റർ",
      or: "ବିଦ୍ୟୁତ୍ ଓ ଜେନେରେଟର",
      as: "বিদ্যুত আৰু জেনেৰেটৰ"
    },
    subtypes: [
      "Diesel Generator Set",
      "Tractor PTO Generator",
      "Air Compressor",
      "Mobile Welding Set",
      "Chain Saw"
    ],
    defaultRateUnit: "day",
    synonyms: {
      en: ["generator", "genset", "pto generator", "welding set", "compressor"],
      hi: ["जनरेटर", "जनरेटर सेट", "वेल्डिंग मशीन", "कंप्रेसर"],
      pa: ["ਜਨਰੇਟਰ", "ਵੈਲਡਿੰਗ ਸੈੱਟ"],
      mr: ["जनरेटर", "वेल्डिंग मशीन"],
      ta: ["ஜெனரேட்டர்"],
      te: ["జనరేటర్"]
    },
    iconName: "Zap",
    popularRegions: ["All India"]
  },
  {
    id: "cat_smart_agri",
    slug: "smart-modern-agri",
    name: "Smart & Precision Agri",
    names: {
      hi: "स्मार्ट व आधुनिक कृषि",
      pa: "ਸਮਾਰਟ ਤੇ ਡਿਜੀਟਲ ਖੇਤੀ",
      mr: "स्मार्ट शेती तंत्रज्ञान",
      gu: "સ્માર્ટ અને આધુનિક ખેતી",
      bn: "স্মার্ট ও আধুনিক কৃষি",
      ta: "நவீன துல்லிய விவசாயம்",
      te: "స్మార్ట్ అగ్రికల్చర్",
      kn: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
      ml: "സ്മാർട്ട് കൃഷി",
      or: "ସ୍ମାର୍ଟ କୃଷି ଯନ୍ତ୍ର",
      as: "স্মাৰ্ট আধুনিক কৃষি"
    },
    subtypes: [
      "DGCA Certified Agri Drone",
      "GPS Auto-Steer Kit",
      "Soil Sensor & NPK Kit",
      "Variable Rate Precision Planter"
    ],
    defaultRateUnit: "acre",
    synonyms: {
      en: ["agri drone", "drone", "gps steer", "soil sensor", "precision"],
      hi: ["ड्रोन", "कृषि ड्रोन", "जीपीएस स्टेयरिंग", "सॉइल सेंसर"],
      pa: ["ਡਰੋਨ", "ਸਮਾਰਟ ਸੈਂਸਰ"],
      mr: ["ड्रोन", "स्मार्ट सेन्सर"],
      ta: ["விவசாய ட்ரோன்"],
      te: ["డ్రోన్"]
    },
    iconName: "Cpu",
    popularRegions: ["Punjab", "Maharashtra", "Telangana", "Haryana", "Karnataka"]
  }
];

/**
 * Multi-lingual synonym match helper:
 * Allows user to search in any script ("ਟਰੈਕਟਰ", "டிராக்டர்", "tractor", "ट्रैक्टर")
 * and resolves to the matching category.
 */
export function matchCategoryByQuery(query: string): EquipmentCategoryTaxonomy | null {
  if (!query) return null;
  const cleanQ = query.trim().toLowerCase();

  for (const cat of EQUIPMENT_TAXONOMY) {
    if (cat.name.toLowerCase().includes(cleanQ) || cat.slug.toLowerCase().includes(cleanQ)) {
      return cat;
    }
    // Check all script names
    for (const localizedName of Object.values(cat.names)) {
      if (localizedName.toLowerCase().includes(cleanQ)) {
        return cat;
      }
    }
    // Check synonyms in all languages
    for (const synList of Object.values(cat.synonyms)) {
      if (synList.some((s) => s.toLowerCase().includes(cleanQ) || cleanQ.includes(s.toLowerCase()))) {
        return cat;
      }
    }
    // Check subtypes
    if (cat.subtypes.some((st) => st.toLowerCase().includes(cleanQ))) {
      return cat;
    }
  }

  return null;
}
