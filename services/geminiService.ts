
import { GoogleGenAI } from "@google/genai";

// Using the specific API key provided by the user
const apiKey = 'AIzaSyCjH_j6DA6HWOqiSaK1-U5OlAZequ-jOl0';
const ai = new GoogleGenAI({ apiKey });

// Smart Fallback Logic for when API is down or key is invalid
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('fee') || lowerMsg.includes('price') || lowerMsg.includes('paise') || lowerMsg.includes('फीस')) {
    return "फीस (Fees) की जानकारी के लिए कृपया सेंटर पर पधारें। हम छात्रों की योग्यता और कोर्स के अनुसार फीस बताते हैं। आप 2 दिन की फ्री डेमो क्लास भी ले सकते हैं।";
  }
  
  if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('kaha') || lowerMsg.includes('jagah') || lowerMsg.includes('पता')) {
    return "हमारा पता है: प्रेरणा टॉवर, जैन मंदिर के सामने, चुंगी नाका, डीडवाना रोड, कुचामन सिटी।";
  }
  
  if (lowerMsg.includes('merchant') || lowerMsg.includes('navy') || lowerMsg.includes('ship')) {
    return "मर्चेंट नेवी हमारा प्रमुख कोर्स है। हम IMU-CET और कंपनी स्पॉन्सरशिप (Sponsorship) दोनों की तैयारी करवाते हैं। हमारे पास इसके लिए विशेष फैकल्टी है।";
  }
  
  if (lowerMsg.includes('ssc') || lowerMsg.includes('gd') || lowerMsg.includes('cgl')) {
    return "SSC (GD, CGL, CHSL) के लिए हमारे पास नए बैच उपलब्ध हैं। गणित और रीजनिंग पर हमारा विशेष फोकस रहता है।";
  }
  
  if (lowerMsg.includes('contact') || lowerMsg.includes('number') || lowerMsg.includes('phone') || lowerMsg.includes('call')) {
    return "आप हमें इन नंबरों पर कॉल कर सकते हैं: 6376100570, 7597416905. (सुबह 9 से शाम 6 बजे तक)";
  }

  return "नमस्ते! मैं अभी सर्वर से कनेक्ट नहीं हो पा रहा हूँ, लेकिन मैं आपकी मदद कर सकता हूँ। आप मर्चेंट नेवी, SSC, फीस या हमारे पते के बारे में पूछ सकते हैं। या सीधे कॉल करें: 6376100570";
};

export const generateCounselingResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // 1. If no API key, use fallback immediately to avoid crash
  if (!apiKey) {
    console.warn("API Key missing, using fallback.");
    return getFallbackResponse(userMessage);
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `आप "द्रोणा" हैं, कुचामन सिटी, राजस्थान में स्थित "मोहित दहिया क्लासेज" (MDC) के विशेषज्ञ शैक्षणिक परामर्शदाता (Academic Counselor)।
    संस्थान: प्रेरणा टॉवर, कुचामन सिटी। निदेशक: श्री मोहित दहिया।
    कोर्स: मर्चेंट नेवी (स्पेशल), SSC, रेलवे, पुलिस।
    टोन: विनम्र, उत्साहजनक और हिंदी/हिंग्लिश में। उत्तर 150 शब्दों से कम रखें।
    महत्वपूर्ण: फीस फिक्स न बताएं, विजिट करने को कहें।`;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: userMessage
    });

    return result.text || getFallbackResponse(userMessage);

  } catch (error: any) {
    // 2. Catch 403, 429, 500 errors and return fallback
    console.error("Gemini API Error (Handled):", error);
    
    if (error.status === 403 || error.status === 429 || error.message?.includes('permission') || error.message?.includes('quota')) {
        return getFallbackResponse(userMessage);
    }
    
    return getFallbackResponse(userMessage);
  }
};
