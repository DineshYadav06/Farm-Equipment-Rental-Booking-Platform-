/**
 * Pluggable Machine Translation Service Interface
 * Prepared for Google Cloud Translation API or Bhashini API integration.
 */

export interface TranslationRequest {
  text: string;
  sourceLang?: string;
  targetLang: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedSourceLang: string;
  provider: "mock" | "bhashini" | "google";
}

export async function translateText({
  text,
  sourceLang = "en",
  targetLang
}: TranslationRequest): Promise<TranslationResult> {
  // Simulate network latency (250ms)
  await new Promise((res) => setTimeout(res, 250));

  // Quick dictionary for demo translation strings
  const sampleMap: Record<string, Record<string, string>> = {
    hi: {
      "Good condition tractor with cage wheels": "केज व्हील के साथ अच्छी स्थिति में ट्रैक्टर",
      "Very punctual owner and well maintained machine": "बहुत समयनिष्ठ मालिक और अच्छी तरह से रखरखाव की गई मशीन",
      "Saved 2 days of wheat harvest time": "गेहूं कटाई में 2 दिन का समय बचाया"
    },
    pa: {
      "Good condition tractor with cage wheels": "ਕੇਜ ਵ੍ਹੀਲਜ਼ ਵਾਲਾ ਚੰਗੀ ਹਾਲਤ ਵਿੱਚ ਟਰੈਕਟਰ",
      "Very punctual owner and well maintained machine": "ਬਹੁਤ ਸਮੇਂ ਦਾ ਪਾਬੰਦ ਮਾਲਕ ਅਤੇ ਵਧੀਆ ਮਸ਼ੀਨ"
    },
    ta: {
      "Good condition tractor with cage wheels": "நல்ல நிலையில் உள்ள டிராக்டர்",
      "Very punctual owner and well maintained machine": "நேரத்தை கடைபிடிக்கும் உரிமையாளர், சிறந்த இயந்திரம்"
    }
  };

  const translated = sampleMap[targetLang]?.[text] || `[${targetLang.toUpperCase()}] ${text}`;

  return {
    translatedText: translated,
    detectedSourceLang: sourceLang,
    provider: "mock"
  };
}
