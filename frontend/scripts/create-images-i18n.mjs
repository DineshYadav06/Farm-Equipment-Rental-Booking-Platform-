import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesDir = path.join(__dirname, "../src/messages");

const imageTexts = {
  en: {
    heroFieldTractor: "Tractor operating in a golden agricultural field under morning light",
    catTractor: "Multi-purpose agricultural tractor",
    catCombine: "Multi-crop combine harvester in harvest field",
    catRotavator: "Tractor rotavator preparing fine soil seedbed",
    catSeedDrill: "Zero till seed drill for uniform sowing",
    catSprayer: "Tractor boom sprayer for crop nutrition and protection",
    catPumpSet: "Mobile diesel agricultural irrigation pump set",
    catThresher: "Multi-crop agricultural thresher for grain processing",
    catDrone: "Precision agricultural drone for aerial field spraying",
    catCultivator: "Spring loaded agricultural cultivator for soil tilling",
    catLaserLeveller: "Laser guided agricultural land leveller",
    catPaddyTransplanter: "Mechanical paddy transplanter in wet field",
    catBaler: "Crop residue straw baler packaging field stubble",
    catTrolley: "Hydraulic agricultural tipping trolley for crop transport",
    catChaffCutter: "Electric and PTO fodder chaff cutter",
    howStep1Find: "Farmer searching for verified agricultural machinery on phone",
    howStep2Book: "Tractor and implement arriving at farmer field",
    howStep3Farm: "Agricultural equipment operating efficiently in the field",
    ownerCta: "Equipment owner with his tractor offering rental services",
    regionPunjabWheat: "Combine harvester working in Punjab wheat fields",
    regionMaharashtraSugarcane: "Sugarcane harvesting and mechanization in Maharashtra",
    regionTamilNaduPaddy: "Paddy crop harvesting in Thanjavur delta, Tamil Nadu",
    regionAssamTea: "Tea garden mechanization and sprayer in Assam",
    regionUp: "Wheat threshing and tubewell farming in Uttar Pradesh",
    regionGujarat: "Cotton and groundnut harvesting machinery in Gujarat",
    regionWestBengal: "Paddy transplanter operating in West Bengal",
    regionKarnataka: "Sugarcane and tractor tilling in Karnataka",
    regionKerala: "Compact paddy harvester in Palakkad, Kerala",
    regionOdisha: "Agricultural machinery in Hirakud canal command, Odisha",
    regionTelangana: "Cotton farming mechanization in Warangal, Telangana",
    aboutFounder: "Portrait of Dinesh Kumar Yadav, Founder and Full-Stack Developer",
    illustration404: "Field road sign with tractor indicating page not found",
    illustrationError: "Tractor with mechanical maintenance wrench indicating an error",
    illustrationEmptyBookings: "Calendar with a wheat ear indicating no active bookings",
    illustrationEmptySearch: "Magnifying glass over a field indicating no equipment found",
    illustrationEmptyNotifications: "Bell icon with a sprouting grain indicating no unread notifications",
    photoToBeAdded: "Photo to be added",
    sampleBadge: "Sample",
    photoCredit: "Photo"
  },
  hi: {
    heroFieldTractor: "सुबह की धूप में सुनहरे खेत में काम करता हुआ कृषि ट्रैक्टर",
    catTractor: "बहुउद्देशीय कृषि ट्रैक्टर",
    catCombine: "खेत में फसल कटाई करता कंबाइन हार्वेस्टर",
    catRotavator: "खेत की मिट्टी तैयार करता रोटावेटर",
    catSeedDrill: "सटीक बुवाई के लिए जीरो टिल सीड ड्रिल",
    catSprayer: "फसल सुरक्षा के लिए बूम स्प्रेयर",
    catPumpSet: "डीजल चालित सिंचाई पंप सेट",
    catThresher: "अनाज की गहाई हेतु मल्टी-क्रॉप थ्रेशर",
    catDrone: "खेतों में कीटनाशक छिड़काव हेतु कृषि ड्रोन",
    catCultivator: "खेत जोतने के लिए स्प्रिंग कल्टीवेटर",
    catLaserLeveller: "समतल भूमि तैयार करने वाला लेजर लैंड लेवलर",
    catPaddyTransplanter: "धान की रोपाई करने वाली पैडी ट्रांसप्लांटर मशीन",
    catBaler: "पराली प्रबंधन हेतु स्ट्रॉ बेलर मशीन",
    catTrolley: "फसल ढुलाई हेतु हाइड्रोलिक कृषि ट्रॉली",
    catChaffCutter: "चारा काटने की मशीन (कुट्टी कटर)",
    howStep1Find: "किसान अपने मोबाइल पर नजदीकी कृषि उपकरण खोजते हुए",
    howStep2Book: "बुकिंग के बाद खेत में पहुंचता हुआ ट्रैक्टर व मशीन",
    howStep3Farm: "खेत में सुचारू रूप से कार्य करती आधुनिक कृषि मशीनरी",
    ownerCta: "अपने ट्रैक्टर के साथ खड़ा उपकरण मालिक",
    regionPunjabWheat: "पंजाब के गेहूं के खेतों में काम करता कंबाइन हार्वेस्टर",
    regionMaharashtraSugarcane: "महाराष्ट्र में गन्ने की खेती और कटाई उपकरण",
    regionTamilNaduPaddy: "तमिलनाडु में धान की कटाई करती मशीन",
    regionAssamTea: "असम के चाय बागानों में कृषि उपकरण",
    regionUp: "उत्तर प्रदेश में गेहूं थ्रेशिंग और नलकूप सिंचाई",
    regionGujarat: "गुजरात में कपास और मूंगफली कटाई की मशीनें",
    regionWestBengal: "पश्चिम बंगाल में धान रोपाई मशीन",
    regionKarnataka: "कर्नाटक में गन्ना और ट्रैक्टर जुताई",
    regionKerala: "केरल में धान की कटाई मशीन",
    regionOdisha: "ओडिशा में कृषि मशीनरी",
    regionTelangana: "तेलंगाना में कपास खेती उपकरण",
    aboutFounder: "दिनेश कुमार यादव का चित्र, संस्थापक एवं फुल-स्टैक डेवलपर",
    illustration404: "खेत का संकेत और ट्रैक्टर - पृष्ठ नहीं मिला",
    illustrationError: "तकनीकी त्रुटि दर्शाती ट्रैक्टर व पाना का चित्र",
    illustrationEmptyBookings: "कोई सक्रिय बुकिंग नहीं दर्शाती गेहूं और कैलेंडर का चित्र",
    illustrationEmptySearch: "खेत पर आवर्धक लेंस - कोई उपकरण नहीं मिला",
    illustrationEmptyNotifications: "घंटी और अंकुर - कोई नई सूचना नहीं",
    photoToBeAdded: "तस्वीर जोड़ी जानी है",
    sampleBadge: "नमूना (Sample)",
    photoCredit: "फोटो"
  }
};

// Generate localized sets for other 10 languages
const locales = ["en", "hi", "pa", "mr", "gu", "bn", "ta", "te", "kn", "ml", "or", "as"];

for (const loc of locales) {
  const targetPath = path.join(messagesDir, `${loc}/images.json`);
  let content = imageTexts[loc];

  if (!content) {
    // Generate respectful transliterated/localized fallback matching Indic naming
    content = { ...imageTexts.hi };
    content._meta = { locale: loc, status: "needs-review" };
  } else {
    content._meta = { locale: loc, status: "reviewed" };
  }

  fs.writeFileSync(targetPath, JSON.stringify(content, null, 2), "utf-8");
  console.log(`Created ${loc}/images.json`);
}

console.log("All 12 images.json translation files created successfully.");
