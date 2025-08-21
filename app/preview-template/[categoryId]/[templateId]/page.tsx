"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Mic } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LanguageSelector } from "@/components/language-selector"
import { getTranslation, getTranslatedSampleData, type Language } from "@/lib/translations"
import {
  DriverTemplate,
  DeliveryPartnerTemplate,
  ElectricianTemplate,
  TailorTemplate,
  CookChefTemplate,
  SecurityGuardTemplate,
  SalesAssistantTemplate,
  MechanicTemplate,
} from "@/components/resume-templates"

export default function PreviewTemplate({
  params,
}: {
  params: Promise<{ categoryId: string; templateId: string }>
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModeSelection, setShowModeSelection] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { categoryId, templateId } = use(params)

  const categoryNames: Record<string, Record<Language, string>> = {
    "1": {
      hi: "ड्राइवर",
      en: "Driver",
      bn: "চালক",
      te: "డ్రైవర్",
      mr: "चालक",
      ta: "ஓட்டுநர்",
      gu: "ડ્રાઇવર",
      kn: "ಚಾಲಕ",
      ml: "ഡ്രൈവർ",
      pa: "ਡਰਾਈਵਰ",
    },
    "2": {
      hi: "डिलीवरी पार्टनर",
      en: "Delivery Partner",
      bn: "ডেলিভারি পার্টনার",
      te: "డేలివరీ పార్ట్‌నర్",
      mr: "डिलीवరी पार्टनर",
      ta: "வணிக பேராளர்",
      gu: "ડિલીવરી પાર્ટનર",
      kn: "வணிக ಪரಾಂಶಿ",
      ml: "ડേലിവറി പാർട്ടനർ",
      pa: "ਡਿਲੀਵਰੀ ਪਾਰਟਨਰ",
    },
    "3": {
      hi: "इलेक्ट्रिकियन",
      en: "Electrician",
      bn: "ইলেকট্রিকিয়ান",
      te: "ఎలెక్ట్రికియన్",
      mr: "इलेक्ट्रिकियन",
      ta: "மின்னாட்டு சுதார்",
      gu: "ઇલેક્ટ્રિકિયન",
      kn: "ಮಾರಿ ಚಾಲಕ",
      ml: "എലക്ട്രിക്കൻ",
      pa: "इलੇਕਟ੍ਰਿਕਨ",
    },
    "4": {
      hi: "टेलर",
      en: "Tailor",
      bn: "টেলর",
      te: "టైలర్",
      mr: "टेलर",
      ta: "வேட்டார்",
      gu: "ટેલર",
      kn: "ೈಲರ್",
      ml: "ടൈലർ",
      pa: "ਟੈਲਰ",
    },
    "5": {
      hi: "कूक/चेफ",
      en: "Cook/Chef",
      bn: "কুক/চেফ",
      te: "కూక్/చేఫ్",
      mr: "कूक/चेफ",
      ta: "வருவர்/வேட்டார்",
      gu: "કૂક/ચેફ",
      kn: "ಕೂಕ/ಚೇಫ",
      ml: "കൂക്കൻ/ചേഫ്",
      pa: "ਕੂਕ/ਚੇਫ",
    },
    "6": {
      hi: "सुरक्षा गार्ड",
      en: "Security Guard",
      bn: "সুরক্ষা গার্ড",
      te: "సురక్ష గార్డ్",
      mr: "सुरक्षा गार्ड",
      ta: "பாதுகாப்பு காவலர்",
      gu: "સુરક્ષા ગાર્ડ",
      kn: "பாதுகாப்பு காவலர்",
      ml: "സുരക്ഷ കാവലർ",
      pa: "ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    "7": {
      hi: "सेल्स असिस्टेंट",
      en: "Sales Assistant",
      bn: "সেলস অ্যাসিস্টেন্ট",
      te: "సేల్స్ అసిస్టెంట్",
      mr: "सेल्स असिस्टेंट",
      ta: "விற்சனி அங்கையாளர்",
      gu: "સેલ્સ અસિસ્ટન્ટ",
      kn: "விற்சனி ಅங்கையாளர்",
      ml: "வിറ്റുക്കൽ അസിസ്ടന്റ്",
      pa: "ਸੇਲ਼ ਅਸਿਸਟੰਟ",
    },
    "8": {
      hi: "मैकेनिक",
      en: "Mechanic",
      bn: "মেকানিক",
      te: "మేకెనిక్",
      mr: "मैकेनिक",
      ta: "வணிக பேராளர்",
      gu: "મેકનિક",
      kn: "வணிக ಪரಾಂಶಿ",
      ml: "മേക്കൻ",
      pa: "ਮੈਕਨਿਕ",
    },
  }

  const templateNames: Record<string, Record<Language, string>> = {
    // Driver templates
    d1: {
      hi: "पेशेवर ड्राइवर",
      en: "Professional Driver",
      bn: "পেশেবর চালক",
      te: "ప్రొఫెషనల్ డ్రైవర్",
      mr: "पेशेवर चालक",
      ta: "வேலை சுதார்",
      gu: "પેશેવર ડ્રાઇવર",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਪ੍ਰੋਫੇਸ਼ਨਲ ਡਰਾਈਵਰ",
    },
    d2: {
      hi: "कमercial ड्राइवर",
      en: "Commercial Driver",
      bn: "কমercial চালক",
      te: "కమర్సీల్ డ్రైవర్",
      mr: "कमercial चालक",
      ta: "வணிக சுதார்",
      gu: "કમર્સીયલ ડ્રાઇવર",
      kn: "ಕમercial ಚಾಲಕ",
      ml: "കമercial ഡ്രൈവർ",
      pa: "ਕਮਰ੍ਸੀਲ ਡਰਾਈਵਰ",
    },
    d3: {
      hi: "डिलीवरी ड्राइवर",
      en: "Delivery Driver",
      bn: "ডেলিভারি চালক",
      te: "డేలివరీ డ్రైవర్",
      mr: "डिलीवरी चालक",
      ta: "வருவர் சுதார்",
      gu: "ડિલીવરી ડ્રાઇવર",
      kn: "వருவர் ಚಾಲಕ",
      ml: "വருவர் ഡ്രൈവർ",
      pa: "ਵਰੂਵਰ ਡਰਾਈਵਰ",
    },
    // Delivery Partner templates
    dp1: {
      hi: "फॉड डिलीवरी प्रो",
      en: "Food Delivery Pro",
      bn: "ফোড ডেলিভারি প্রো",
      te: "ఫోడ్ డేలివరీ ప్రొ",
      mr: "फॉड डिलीवरी प्रो",
      ta: "பாதுகாப்பு பேராளர்",
      gu: "ફોડ ડિલીવરી પ્રો",
      kn: "பாதுகாப்பு பரಾಂಶಿ",
      ml: "பாதுகாப்பு പരാംശി",
      pa: "ਫੋਡ ਡਿਲੀਵਰੀ ਪ੍ਰੋ",
    },
    dp2: {
      hi: "करायर सpecialist",
      en: "Courier Specialist",
      bn: "করায়ের স্পেশালিস্ট",
      te: "కౌરియర్ స్పేషలిస్ట్",
      mr: "करायर सpecialist",
      ta: "வருவர் பொறுத்தவர்",
      gu: "કરાયર સપેશલિસ્ટ",
      kn: "வருவர் பொறுத்தவர்",
      ml: "வருவர் പொறுத்தவர்",
      pa: "ਕਰਾਈਰ ਸਪੇਸ਼ਲਿਸਟ",
    },
    dp3: {
      hi: "मल्टी-प्ल랫फॉर्म पार्टनर",
      en: "Multi-Platform Partner",
      bn: "মাল্টি-প্ল্যাটফর্ম পার্টনার",
      te: "మల్టీ-ప్లాట్‌ఫారంట్ పార్ట్‌నర్",
      mr: "मल्टी-प्ल랫ফॉर्म पार्टनर",
      ta: "பல பத்திரங்கள் பேராளர்",
      gu: "મલ્ટી-પ્લેટ્ફોર્મ પાર્ટનર",
      kn: "பல பத்திரங்கள் ಪரಾಂಶಿ",
      ml: "പല പ്ലാറ്റ്ഫോർമുകളിൽ പേരாളർ",
      pa: "ਮੁਲਟੀ-ਪਲੇਟਫਾਰਮ ਪਾਰਟਨਰ",
    },
    // Electrician templates
    e1: {
      hi: "लाइसेंसेड इलेक्ट्रिकियन",
      en: "Licensed Electrician",
      bn: "লাইসেন্সেড ইলেকট্রিকিয়ান",
      te: "లైసెన్సేడ్ ఎలెక్ట్రికియన్",
      mr: "लाइसेंसेड इलेक्ट्रिकियन",
      ta: "வருவர் சுதார்",
      gu: "લાઇસેન્સેડ ઇલેક્ટ્રિકિયન",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "ലൈസൻസേഡ ഡ്രൈവർ",
      pa: "ਲਾਈਸਨਸੇਡ ਇਲੇਕਟ੍ਰਿਕਨ",
    },
    e2: {
      hi: "घरेलू सpecialist",
      en: "Residential Specialist",
      bn: "ঘরেলু স্পেশালিস্ট",
      te: "ঘরেলু స్పేషలిస్ట్",
      mr: "घरेलू सpecialist",
      ta: "வீட்டு பொறுத்தவர்",
      gu: "ঘরেলু સપેશલિસ્ટ",
      kn: "வீட்டு பொறுத்தவர்",
      ml: "வீட்டு പொறுத்தவர்",
      pa: "ঘরেলু ਸਪੇਸ਼ਲਿਸਟ",
    },
    e3: {
      hi: "कमercial इलेक्ट्रिकियन",
      en: "Commercial Electrician",
      bn: "কমercial ইলেকট্রিকিয়ান",
      te: "కమర్సీల్ ఎలెక్ట్రికియన్",
      mr: "कमercial इलेक्ट्रिकियन",
      ta: "வணிக சுதார்",
      gu: "કમર્સીયલ ઇલેક્ટ્રિકિયન",
      kn: "வணிக ಚಾಲಕ",
      ml: "കമercial ഡ്രൈവർ",
      pa: "ਕਮਰ੍ਸੀਲ ਇਲੇਕਟ੍ਰਿਕਨ",
    },
    // Tailor templates
    t1: {
      hi: "मास्टर टेलर",
      en: "Master Tailor",
      bn: "মাস্টার টেলর",
      te: "మాస్టర్ టైలర్",
      mr: "मास्टर टेलर",
      ta: "வேட்டார் பொறுத்தவர்",
      gu: "માસ્ટર ટેલર",
      kn: "வேட்டார் பொறுத்தவர்",
      ml: "வேட்டார் പொறுத்தவர்",
      pa: "ਮਾਸਟਰ ਟੈਲਰ",
    },
    t2: {
      hi: "अल्टरेशन్‌s एक्सपर్",
      en: "Alterations Expert",
      bn: "অল্টারেশন্স এক্সপার্ট",
      te: "అల్టరేషన్‌లు ఏక్స్‌పర్ట్",
      mr: "अल्टरेशन్‌s एक्सपर్",
      ta: "அறிவு பொறுத்தவர்",
      gu: "અલ્ટરેશન્‌સ એક્સપર્ટ",
      kn: "அறிவு பொறுத்தவர்",
      ml: "அറிவு പொறுத்தவர்",
      pa: "ਅਲਟਰੇਸ਼ਨਾਂ ਏਕਸਪੇਰਟ",
    },
    t3: {
      hi: "फॉशन टेलर",
      en: "Fashion Tailor",
      bn: "ফোশন টেলর",
      te: "ఫాషన్ టైలర్",
      mr: "फॉशन टेलर",
      ta: "பொறுத்தவர்",
      gu: "ફોશન ટેલર",
      kn: "பொறுத்தவர்",
      ml: "பொறுத்தவர்",
      pa: "ਫਾਸ਼ਨ ਟੈਲਰ",
    },
    // Cook/Chef templates
    c1: {
      hi: "पेशेवर चेफ",
      en: "Professional Chef",
      bn: "পেশেবর চেফ",
      te: "ప్రొఫెషనల్ చేఫ్",
      mr: "पेशेवर चेफ",
      ta: "வேலை சுதார்",
      gu: "પેશેવર ચેફ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚೇಫ್",
      ml: "പേഷോവർ ചേഫ്",
      pa: "ਪ੍ਰੋਫੇਸ਼ਨਲ ਚੇਫ",
    },
    c2: {
      hi: "घरेलू कूक",
      en: "Home Cook",
      bn: "ঘরেলু কূক",
      te: "ঘরেলু కూక్",
      mr: "घरেলू कूক",
      ta: "வீட்டு குடியர்",
      gu: "ঘরেলু કૂક",
      kn: "வீட்டு குடியர்",
      ml: "வீட்டு കൂക്കൻ",
      pa: "ਘਰੇਲੂ ਕੂਕ",
    },
    c3: {
      hi: "रेस्टरेंट कूक",
      en: "Restaurant Cook",
      bn: "রেস্টরেন্ট কূক",
      te: "రెస్టరాంట్ కూక్",
      mr: "रेस्टरें कूক",
      ta: "வணிக குடியர்",
      gu: "રেસ્ટરાંટ કૂક",
      kn: "வணிக ಕுடியர்",
      ml: "வணிக കൂക്കൻ",
      pa: "ਰੇਸਟਰੰਟ ਕੂਕ",
    },
    // Security Guard templates
    s1: {
      hi: "लाइसेंसेड सुरक्षा गार्ड",
      en: "Licensed Security Guard",
      bn: "লাইসেন্সেড সুরক্ষা গার্ড",
      te: "లైసెన్సేడ్ సురక్ష గార్డ్",
      mr: "लाइसेंसेड सुरक्षा गार्ड",
      ta: "வருவர் சுதார்",
      gu: "લાઇસેન્સેડ સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "ലൈസൻസേഡ ഡ്രൈവർ",
      pa: "ਲਾਈਸਨਸੇਡ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    s2: {
      hi: "कॉર्पोरेट सुरक्षा गार्ड",
      en: "Corporate Security Guard",
      bn: "ক৉র্পোরেট সুরক্ষা গার্ড",
      te: "కార్పొరేట్ సురక్ష గార్ડ్",
      mr: "कॉর्पोरेट सुरक्षा गार्ड",
      ta: "வேலை சுதார்",
      gu: "કૉર્પોરেট સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਕ੉ਰਪੋਰੇਟ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    s3: {
      hi: "इवेंट सुरक्षा गार्ड",
      en: "Event Security Guard",
      bn: "ইভেন্ট সুরক্ষা গার্ড",
      te: "ఇవెంట్ సురక్ష గార్ડ్",
      mr: "इवेंट सुरक्षा गार्ड",
      ta: "வருவர் சுதார்",
      gu: "ઇવેન્ટ સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਇਵੇਂਟ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    // Sales Assistant templates
    sa1: {
      hi: "रेटेल असिस्टेंट",
      en: "Retail Associate",
      bn: "রেটেল অ্যাসিস্টেন্ট",
      te: "రెట్‌ల్ అసిస్టెంట్",
      mr: "रेटेल असिस्टेंट",
      ta: "வருவர் சுதார்",
      gu: "રেટેલ અસિસ્ટન્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਰੇਟਲ ਅਸਿਸਟੰਟ",
    },
    sa2: {
      hi: "शॉप असिस्टेंट",
      en: "Shop Assistant",
      bn: "শপ অ্যাসিস্টেন্ট",
      te: "షాప్ అసిస్టెంట్",
      mr: "शॉप असिस्टेंट",
      ta: "வருவர் சுதார்",
      gu: "શોપ અસિસ્ટન્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਸ਼ੋਪ ਅਸਿਸਟੰਟ",
    },
    sa3: {
      hi: "सेल्स सpecialist",
      en: "Sales Specialist",
      bn: "সেল্স স্পেশালিস্ট",
      te: "సేల్స్ స్పేషలిస్ట్",
      mr: "सेल्स सpecialist",
      ta: "வருவர் சுதார்",
      gu: "સેલ્સ સપેશલિસ્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਸੇਲ਼ ਸਪੇਸ਼ਲਿਸਟ",
    },
    // Mechanic templates
    m1: {
      hi: "ऑटो मैकेनिक",
      en: "Auto Mechanic",
      bn: "অটো মেকানিক",
      te: "ఆటో మేకనిక్",
      mr: "ऑो मैकेनिक",
      ta: "வருவர் சுதார்",
      gu: "અટો મેકનિક",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ऑਟੋ ਮੈਕਨਿਕ",
    },
    m2: {
      hi: "टై-వీలర్ సpecialist",
      en: "Two-Wheeler Specialist",
      bn: "টৈ-ভিউলার স্পেশালিস্ট",
      te: "టై-వీలర్ స్పేషలిస్ట్",
      mr: "टై-వీలర్ सpecialist",
      ta: "வருவர் சுதார்",
      gu: "ટૈ-વીલર સપેશલિસ્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਟੈ-ਵੀਲਰ ਸਪੇਸ਼ਲਿਸਟ",
    },
    m3: {
      hi: "मल्टी-वेहिकल मैकेनिक",
      en: "Multi-Vehicle Mechanic",
      bn: "মাল্টি-ভেহিকেল মেকানিক",
      te: "మల్టీ-వేహికల్ మేకనిక్",
      mr: "मल्टी-वेहিকల मैकेनिक",
      ta: "வருவர் சுதார்",
      gu: "મલ્ટી-વેહિકલ મેકનિક",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਮੁਲਟੀ-ਵੇਹਿਕਲ ਮੈਕਨਿਕ",
    },
  }

  const getSampleData = (categoryId: string, language: Language) => {
    return getTranslatedSampleData(categoryId, language)
  }

  useEffect(() => {
    const langFromUrl = (searchParams.get("lang") as Language) || "en"
    setCurrentLanguage(langFromUrl)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [searchParams])

  const handleSelectTemplate = (templateId: string) => {
    // setShowModeSelection(true)
    router.push(`/audio-input?template=${templateId}&category=${categoryId}`)
  }

  // const handleModeSelection = (mode: "guided" | "freeform") => {
  //   setShowModeSelection(false)
  //   if (mode === "guided") {
  //     router.push(`/guided-input?template=${templateId}&category=${categoryId}&lang=${currentLanguage}`)
  //   } else {
  //     router.push(`/audio-input?template=${templateId}&category=${categoryId}&mode=${mode}&lang=${currentLanguage}`)
  //   }
  // }

  const handleGoBack = () => {
    router.push(`/templates?category=${categoryId}&lang=${currentLanguage}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{getTranslation("loadingTemplatePreview", currentLanguage)}</p>
        </div>
      </div>
    )
  }

  const renderTemplate = () => {
    const sampleData = getSampleData(categoryId, currentLanguage)
    const templateType = templateId.substring(0, templateId.length - 1)
    const templateNumber = templateId.slice(-1)

    switch (templateType) {
      case "d":
        return <DriverTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "dp":
        return <DeliveryPartnerTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "e":
        return <ElectricianTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "t":
        return <TailorTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "c":
        return <CookChefTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "s":
        return <SecurityGuardTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "sa":
        return <SalesAssistantTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "m":
        return <MechanicTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      default:
        return <DriverTemplate variant="1" data={sampleData} language={currentLanguage} />
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Language Selector and Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="sm" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {getTranslation("backToDashboard", currentLanguage)}
        </Button>
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {categoryNames[categoryId]?.[currentLanguage] || "Template"} -{" "}
          {templateNames[templateId]?.[currentLanguage] || "Preview"}
        </h1>
        <p className="text-gray-600 mt-2">
          {getTranslation("templatePreviewWithJobSpecificSections", currentLanguage)}
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">{getTranslation("likeThisTemplate", currentLanguage)}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => handleSelectTemplate(templateId)}>
            {getTranslation("selectThisTemplate", currentLanguage)}
          </Button>
          <Button variant="outline" onClick={handleGoBack}>
            {getTranslation("viewOtherTemplates", currentLanguage)}
          </Button>
        </div>
      </div>
    </div>
  )
}

