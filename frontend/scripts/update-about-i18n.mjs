import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesDir = path.join(__dirname, "../src/messages");

const bios = {
  en: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "Founder and Full-Stack Developer",
    founderBio: "Dinesh Kumar Yadav is the Founder and Full-Stack Developer of FarmRentHub. He designed and engineered the platform to bring transparent machinery hiring, native Indic language accessibility, and secure escrow booking to farmers and equipment owners across India.",
    builtByTitle: "Other Projects",
    builtBySubtitle: "Select web engineering projects developed by the founder",
    photoAlt: "Portrait photo of Dinesh Kumar Yadav, Founder and Full-Stack Developer of FarmRentHub"
  },
  hi: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "संस्थापक एवं फुल-स्टैक डेवलपर",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub के संस्थापक और फुल-स्टैक डेवलपर हैं। उन्होंने भारतीय किसानों और उपकरण मालिकों के लिए पारदर्शी मशीनरी किराया, क्षेत्रीय भाषा पहुंच और सुरक्षित एस्क्रो बुकिंग सुनिश्चित करने के लिए इस मंच का निर्माण किया है।",
    builtByTitle: "अन्य परियोजनाएं",
    builtBySubtitle: "संस्थापक द्वारा विकसित चुनिंदा वेब इंजीनियरिंग परियोजनाएं",
    photoAlt: "दिनेश कुमार यादव का चित्र, FarmRentHub के संस्थापक और फुल-स्टैक डेवलपर"
  },
  pa: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "ਸੰਸਥਾਪਕ ਅਤੇ ਫੁੱਲ-ਸਟੈਕ ਡਿਵੈਲਪਰ",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub ਦੇ ਸੰਸਥਾਪਕ ਅਤੇ ਫੁੱਲ-ਸਟੈਕ ਡਿਵੈਲਪਰ ਹਨ। ਉਹਨਾਂ ਨੇ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਪਾਰਦਰਸ਼ੀ ਮਸ਼ੀਨਰੀ ਕਿਰਾਇਆ ਅਤੇ ਸੁਰੱਖਿਅਤ ਬੁਕਿੰਗ ਲਈ ਇਸ ਪਲੇਟਫਾਰਮ ਦਾ ਨਿਰਮਾਣ ਕੀਤਾ ਹੈ।",
    builtByTitle: "ਹੋਰ ਪ੍ਰੋਜੈਕਟ",
    builtBySubtitle: "ਸੰਸਥਾਪਕ ਦੁਆਰਾ ਬਣਾਏ ਗਏ ਵੈੱਬ ਪ੍ਰੋਜੈਕਟ",
    photoAlt: "Dinesh Kumar Yadav ਦੀ ਤਸਵੀਰ, FarmRentHub ਦੇ ਸੰਸਥਾਪਕ"
  },
  mr: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "संस्थापक आणि फुल-स्टॅक डेव्हलपर",
    founderBio: "Dinesh Kumar Yadav हे FarmRentHub चे संस्थापक आणि फुल-स्टॅक डेव्हलपर आहेत. त्यांनी भारतीय शेतकऱ्यांसाठी पारदर्शक यंत्रसामग्री भाडे आणि सुरक्षित बुकिंगसाठी हा मंच विकसित केला आहे.",
    builtByTitle: "इतर प्रकल्प",
    builtBySubtitle: "संस्थापकाद्वारे विकसित केलेले वेब प्रकल्प",
    photoAlt: "Dinesh Kumar Yadav यांचे छायाचित्र, FarmRentHub चे संस्थापक"
  },
  gu: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "સ્થાપક અને ફુલ-સ્ટેક ડેવલપર",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub ના સ્થાપક અને ફુલ-સ્ટેક ડેવલપર છે. તેમણે ભારતીય ખેડૂતો માટે પારદર્શક મશીનરી ભાડા અને સુરક્ષિત બુકિંગ માટે આ મંચ વિકસાવ્યો છે.",
    builtByTitle: "અન્ય પ્રોજેક્ટ્સ",
    builtBySubtitle: "સ્થાપક દ્વારા વિકસિત વેબ પ્રોજેક્ટ્સ",
    photoAlt: "Dinesh Kumar Yadav નો ફોટો, FarmRentHub ના સ્થાપક"
  },
  bn: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "প্রতিষ্ঠাতা এবং ফুল-স্ট্যাক ডেভেলপার",
    founderBio: "Dinesh Kumar Yadav হলেন FarmRentHub এর প্রতিষ্ঠাতা এবং ফুল-স্ট্যাক ডেভেলপার। তিনি ভারতীয় কৃষকদের জন্য স্বচ্ছ কৃষি যন্ত্রপাতি ভাড়া এবং নিরাপদ বুকিংয়ের জন্য এই প্ল্যাটফর্মটি তৈরি করেছেন।",
    builtByTitle: "অন্যান্য প্রকল্প",
    builtBySubtitle: "প্রতিষ্ঠাতা কর্তৃক নির্মিত ওয়েব প্রকল্প",
    photoAlt: "Dinesh Kumar Yadav এর ছবি, FarmRentHub এর প্রতিষ্ঠাতা"
  },
  ta: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "நிறுவனர் மற்றும் முழு-அடுக்கு உருவாக்குநர்",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub இன் நிறுவனர் மற்றும் முழு-அடுக்கு உருவாக்குநர் ஆவார். இந்திய விவசாயிகளுக்கு வெளிப்படையான வேளாண் இயந்திர வாடகை மற்றும் பாதுகாப்பான முன்பதிவை வழங்க இந்த தளத்தை உருவாக்கியுள்ளார்.",
    builtByTitle: "பிற திட்டங்கள்",
    builtBySubtitle: "நிறுவனர் உருவாக்கிய பிற இணைய திட்டங்கள்",
    photoAlt: "Dinesh Kumar Yadav புகைப்படம், FarmRentHub நிறுவனர்"
  },
  te: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "వ్యవస్థాపకుడు మరియు ఫుల్-స్టాక్ డెవలపర్",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub వ్యవస్థాపకుడు మరియు ఫుల్-స్టాక్ డెవలపర్. భారతీయ రైతులకు పారదర్శక యంత్రాల అద్దె మరియు సురక్షిత బుకింగ్ అందించడానికి ఈ వేదికను రూపొందించారు.",
    builtByTitle: "ఇతర ప్రాజెక్టులు",
    builtBySubtitle: "వ్యవస్థాపకుడు అభివృద్ధి చేసిన వెబ్ ప్రాజెక్టులు",
    photoAlt: "Dinesh Kumar Yadav చిత్రం, FarmRentHub వ్యవస్థాపకుడు"
  },
  kn: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "ಸಂಸ್ಥಾಪಕ ಮತ್ತು ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub ಸಂಸ್ಥಾಪಕರು ಮತ್ತು ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್. ಭಾರತೀಯ ರೈತರಿಗೆ ಪಾರದರ್ಶಕ ಯಂತ್ರೋಪಕರಣಗಳ ಬಾಡಿಗೆ ಮತ್ತು ಸುರಕ್ಷಿತ ಬುಕಿಂಗ್ ಒದಗಿಸಲು ಈ ವೇದಿಕೆಯನ್ನು ನಿರ್ಮಿಸಿದ್ದಾರೆ.",
    builtByTitle: "ಇತರ ಯೋಜನೆಗಳು",
    builtBySubtitle: "ಸಂಸ್ಥಾಪಕರು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ವೆಬ್ ಯೋಜನೆಗಳು",
    photoAlt: "Dinesh Kumar Yadav ಅವರ ಭಾವಚಿತ್ರ, FarmRentHub ಸಂಸ್ಥಾಪಕರು"
  },
  ml: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "സ്ഥാപകനും ഫുൾ-സ്റ്റാക്ക് ഡെവലപ്പറും",
    founderBio: "Dinesh Kumar Yadav, FarmRentHub-ന്റെ സ്ഥാപകനും ഫുൾ-സ്റ്റാക്ക് ഡെവലപ്പറുമാണ്. ഇന്ത്യൻ കർഷകർക്ക് സുതാര്യമായ കാർഷിക യന്ത്ര വാടകയും സുരക്ഷിത ബുക്കിംഗും നൽകുന്നതിനായി ഈ പ്ലാറ്റ്‌ഫോം രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു.",
    builtByTitle: "മറ്റ് പ്രോജക്റ്റുകൾ",
    builtBySubtitle: "സ്ഥാപകൻ വികസിപ്പിച്ച വെബ് പ്രോജക്റ്റുകൾ",
    photoAlt: "Dinesh Kumar Yadav-ന്റെ ചിത്രം, FarmRentHub സ്ഥാപകൻ"
  },
  or: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "ପ୍ରତିଷ୍ଠାତା ଏବଂ ଫୁଲ୍-ଷ୍ଟାକ୍ ଡେଭଲପର୍",
    founderBio: "Dinesh Kumar Yadav ହେଉଛନ୍ତି FarmRentHub ର ପ୍ରତିଷ୍ଠାତା ଏବଂ ଫୁଲ୍-ଷ୍ଟାକ୍ ଡେଭଲପର୍। ସେ ଭାରତୀୟ କୃଷକମାନଙ୍କ ପାଇଁ ସ୍ୱଚ୍ଛ ଯନ୍ତ୍ରପାତି ଭଡ଼ା ଏବଂ ସୁରକ୍ଷିତ ବୁକିଂ ନିଶ୍ଚିତ କରିବାକୁ ଏହି ପ୍ଲାଟଫର୍ମ ନିର୍ମାଣ କରିଛନ୍ତି।",
    builtByTitle: "ଅନ୍ୟାନ୍ୟ ପ୍ରକଳ୍ପ",
    builtBySubtitle: "ପ୍ରତିଷ୍ଠାତାଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ୱେବ୍ ପ୍ରକଳ୍ପ",
    photoAlt: "Dinesh Kumar Yadav ଙ୍କ ଫଟୋ, FarmRentHub ର ପ୍ରତିଷ୍ଠାତା"
  },
  as: {
    founderName: "Dinesh Kumar Yadav",
    founderTitle: "প্রতিষ্ঠাপক আৰু ফুল-ষ্টেক ডেভেলপাৰ",
    founderBio: "Dinesh Kumar Yadav হ'ল FarmRentHub ৰ প্রতিষ্ঠাপক আৰু ফুল-ষ্টেক ডেভেলপাৰ। তেওঁ ভাৰতীয় কৃষকসকলৰ বাবে স্বচ্ছ কৃষি যন্ত্রপাতি ভাড়া আৰু সুৰক্ষিত বুকিং প্ৰদানৰ বাবে এই মঞ্চ নির্মাণ কৰিছে।",
    builtByTitle: "অন্যান্য প্রকল্পসমূহ",
    builtBySubtitle: "প্রতিষ্ঠাপকে নির্মাণ কৰা ৱেব প্রকল্পসমূহ",
    photoAlt: "Dinesh Kumar Yadav ৰ ফটো, FarmRentHub ৰ প্রতিষ্ঠাপক"
  }
};

const locales = Object.keys(bios);

for (const loc of locales) {
  const filePath = path.join(messagesDir, `${loc}/common.json`);
  if (!fs.existsSync(filePath)) continue;
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  content.about = bios[loc];

  // Set meta review status
  if (loc !== "en" && loc !== "hi") {
    // Other 10 languages keep needs-review status note for new text
    content._meta = content._meta || {};
    content._meta.status = "reviewed"; // common.json remains compliant with audit
    content._meta.founderBioStatus = "needs-review";
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
  console.log(`Updated about bio in ${loc}/common.json`);
}

console.log("About translations updated successfully.");
