"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const translations = {
  en: {
    title: "Choose Your Profession",
    description:
      "Select your profession from the list below. This will help us provide you with relevant opportunities.",
    continue: "Continue",
    saving: "Saving...",
    selectProfession: "Please select a profession",
    selectProfessionDesc: "You must choose a profession to continue.",
    professionSelected: "Profession selected",
    professionSelectedDesc: "Your profession has been saved successfully.",
    error: "Error",
    errorDesc: "Failed to save profession. Please try again.",
    playAudio: "Play Audio Instructions",
    audioText: "Please choose your profession from the following options",
  },
  hi: {
    title: "अपना पेशा चुनें",
    description: "नीचे दी गई सूची से अपना पेशा चुनें। इससे हमें आपके लिए प्रासंगिक अवसर प्रदान करने में मदद मिलेगी।",
    continue: "जारी रखें",
    saving: "सेव कर रहे हैं...",
    selectProfession: "कृपया एक पेशा चुनें",
    selectProfessionDesc: "आगे बढ़ने के लिए आपको एक पेशा चुनना होगा।",
    professionSelected: "पेशा चुना गया",
    professionSelectedDesc: "आपका पेशा सफलतापूर्वक सेव हो गया है।",
    error: "त्रुटि",
    errorDesc: "पेशा सेव करने में विफल। कृपया पुनः प्रयास करें।",
    playAudio: "ऑडियो निर्देश चलाएं",
    audioText: "कृपया निम्नलिखित विकल्पों में से अपना पेशा चुनें",
  },
  bn: {
    title: "আপনার পেশা বেছে নিন",
    description: "নিচের তালিকা থেকে আপনার পেশা নির্বাচন করুন। এটি আমাদের আপনার জন্য প্রাসঙ্গিক সুযোগ প্রদান করতে সাহায্য করবে।",
    continue: "চালিয়ে যান",
    saving: "সংরক্ষণ করা হচ্ছে...",
    selectProfession: "অনুগ্রহ করে একটি পেশা নির্বাচন করুন",
    selectProfessionDesc: "এগিয়ে যেতে আপনাকে একটি পেশা বেছে নিতে হবে।",
    professionSelected: "পেশা নির্বাচিত",
    professionSelectedDesc: "আপনার পেশা সফলভাবে সংরক্ষিত হয়েছে।",
    error: "ত্রুটি",
    errorDesc: "পেশা সংরক্ষণ করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",
    playAudio: "অডিও নির্দেশাবলী চালান",
    audioText: "অনুগ্রহ করে নিম্নলিখিত বিকল্পগুলি থেকে আপনার পেশা বেছে নিন",
  },
  te: {
    title: "మీ వృత్తిని ఎంచుకోండి",
    description: "దిగువ జాబితా నుండి మీ వృత్తిని ఎంచుకోండి. ఇది మీకు సంబంధిత అవకాశాలను అందించడంలో మాకు సహాయపడుతుంది.",
    continue: "కొనసాగించు",
    saving: "సేవ్ చేస్తున్నాం...",
    selectProfession: "దయచేసి ఒక వృత్తిని ఎంచుకోండి",
    selectProfessionDesc: "కొనసాగించడానికి మీరు ఒక వృత్తిని ఎంచుకోవాలి.",
    professionSelected: "వృత్తి ఎంచుకోబడింది",
    professionSelectedDesc: "మీ వృత్తి విజయవంతంగా సేవ్ చేయబడింది.",
    error: "లోపం",
    errorDesc: "వృత్తిని సేవ్ చేయడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    playAudio: "ఆడియో సూచనలను ప్లే చేయండి",
    audioText: "దయచేసి క్రింది ఎంపికల నుండి మీ వృత్తిని ఎంచుకోండి",
  },
  mr: {
    title: "आपला व्यवसाय निवडा",
    description: "खालील यादीतून आपला व्यवसाय निवडा. यामुळे आम्हाला आपल्यासाठी संबंधित संधी उपलब्ध करून देता येतील.",
    continue: "सुरू ठेवा",
    saving: "साठवत आहोत...",
    selectProfession: "कृपया व्यवसाय निवडा",
    selectProfessionDesc: "पुढे जाण्यासाठी आपल्याला व्यवसाय निवडावा लागेल.",
    professionSelected: "व्यवसाय निवडला गेला",
    professionSelectedDesc: "आपला व्यवसाय यशस्वीरित्या जतन केला गेला आहे.",
    error: "त्रुटी",
    errorDesc: "व्यवसाय जतन करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    playAudio: "ऑडिओ सूचना प्ले करा",
    audioText: "कृपया खालील पर्यायांमधून आपला व्यवसाय निवडा",
  },
  ta: {
    title: "உங்கள் தொழிலை தேர்ந்தெடுக்கவும்",
    description: "கீழே உள்ள பட்டியலிலிருந்து உங்கள் தொழிலை தேர்ந்தெடுக்கவும். இது எங்களுக்கு உங்களுக்கான தொடர்புடைய வாய்ப்புகளை வழங்க உதவும்.",
    continue: "தொடரவும்",
    saving: "சேமிக்கப்படுகிறது...",
    selectProfession: "தயவுசெய்து ஒரு தொழிலை தேர்ந்தெடுக்கவும்",
    selectProfessionDesc: "தொடர, நீங்கள் ஒரு தொழிலை தேர்ந்தெடுக்க வேண்டும்.",
    professionSelected: "தொழில் தேர்ந்தெடுக்கப்பட்டது",
    professionSelectedDesc: "உங்கள் தொழில் வெற்றிகரமாக சேமிக்கப்பட்டுள்ளது.",
    error: "பிழை",
    errorDesc: "தொழிலை சேமிப்பதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    playAudio: "ஆடியோ வழிமுறைகளை பிளே செய்",
    audioText: "தயவுசெய்து கீழ்க்காணும் விருப்பங்களில் இருந்து உங்கள் தொழிலை தேர்ந்தெடுக்கவும்",
  },
  gu: {
    title: "તમારો વ્યવસાય પસંદ કરો",
    description: "નીચેનાં યાદીમાંથી તમારો વ્યવસાય પસંદ કરો. આથી અમને તમને સંબંધિત તક આપવામાં મદદ મળશે.",
    continue: "ચાલુ રાખો",
    saving: "સંચયિત કરી રહ્યા છીએ...",
    selectProfession: "કૃપા કરીને વ્યવસાય પસંદ કરો",
    selectProfessionDesc: "આગળ વધવા માટે તમારે વ્યવસાય પસંદ કરવો પડશે.",
    professionSelected: "વ્યવસાય પસંદ કરાયો",
    professionSelectedDesc: "તમારો વ્યવસાય સફળતાપૂર્વક સાચવાયો છે.",
    error: "ત્રુટિ",
    errorDesc: "વ્યવસાય સાચવવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.",
    playAudio: "ઑડિયો સૂચનાઓ ચલાવો",
    audioText: "કૃપા કરીને નીચેની વિકલ્પોમાંથી તમારો વ્યવસાય પસંદ કરો",
  },
  kn: {
    title: "ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    description: "ಕೆಳಗಿನ ಪಟ್ಟಿಯಿಂದ ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಇದು ನಿಮಗೆ ಸಂಬಂಧಿಸಿದ ಅವಕಾಶಗಳನ್ನು ಒದಗಿಸಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    continue: "ಮುಂದುವರಿಸಿ",
    saving: "ಸೇವ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    selectProfession: "ದಯವಿಟ್ಟು ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectProfessionDesc: "ಮುಂದುವರಿಯಲು, ನೀವು ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಬೇಕು.",
    professionSelected: "ವೃತ್ತಿ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
    professionSelectedDesc: "ನಿಮ್ಮ ವೃತ್ತಿ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
    error: "ದೋಷ",
    errorDesc: "ವೃತ್ತಿಯನ್ನು ಉಳಿಸಲು ವಿಫಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.",
    playAudio: "ಆಡಿಯೋ ಸೂಚನೆಗಳನ್ನು ಪ್ಲೇ ಮಾಡಿ",
    audioText: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಲ್ಲಿ ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  ml: {
    title: "നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുക്കുക",
    description: "താഴെയുള്ള പട്ടികയിൽ നിന്ന് നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുക്കുക. ഇത് ഞങ്ങൾക്കു നിങ്ങൾക്കു അനുയോജ്യമായ അവസരങ്ങൾ നൽകാൻ സഹായിക്കും.",
    continue: "തുടരുക",
    saving: "സംരക്ഷിക്കുന്നു...",
    selectProfession: "ദയവായി ഒരു തൊഴിൽ തിരഞ്ഞെടുക്കുക",
    selectProfessionDesc: "തുടരാൻ, നിങ്ങൾ ഒരു തൊഴിൽ തിരഞ്ഞെടുക്കേണ്ടതുണ്ട്.",
    professionSelected: "തൊഴിൽ തിരഞ്ഞെടുത്തു",
    professionSelectedDesc: "നിങ്ങളുടെ തൊഴിൽ വിജയകരമായി സംരക്ഷിക്കപ്പെട്ടു.",
    error: "പിശക്",
    errorDesc: "തൊഴിൽ സംരക്ഷിക്കാൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    playAudio: "ഓഡിയോ നിർദ്ദേശങ്ങൾ പ്ലേ ചെയ്യുക",
    audioText: "ദയവായി താഴെ നൽകിയ ഓപ്ഷനുകളിൽ നിന്ന് നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുക്കുക",
  },
  pa: {
    title: "ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ",
    description: "ਹੇਠ ਦਿੱਤੀ ਸੂਚੀ ਵਿੱਚੋਂ ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ। ਇਸ ਨਾਲ ਸਾਨੂੰ ਤੁਹਾਡੇ ਲਈ ਸੰਬੰਧਤ ਮੌਕੇ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਮਦਦ ਮਿਲੇਗੀ।",
    continue: "ਜਾਰੀ ਰੱਖੋ",
    saving: "ਸੰਭਾਲ ਰਿਹਾ ਹੈ...",
    selectProfession: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਪੇਸ਼ਾ ਚੁਣੋ",
    selectProfessionDesc: "ਆਗੇ ਵੱਧਣ ਲਈ ਤੁਹਾਨੂੰ ਇੱਕ ਪੇਸ਼ਾ ਚੁਣਨਾ ਪਵੇਗਾ।",
    professionSelected: "ਪੇਸ਼ਾ ਚੁਣਿਆ ਗਿਆ",
    professionSelectedDesc: "ਤੁਹਾਡਾ ਪੇਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਕੀਤਾ ਗਿਆ ਹੈ।",
    error: "ਤ੍ਰੁੱਟੀ",
    errorDesc: "ਪੇਸ਼ਾ ਸੇਵ ਕਰਨ ਵਿੱਚ ਅਸਫਲ. ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    playAudio: "ਆਡੀਓ ਹੁਕਮ ਚਲਾਓ",
    audioText: "ਕਿਰਪਾ ਕਰਕੇ ਹੇਠ ਦਿੱਤੀਆਂ ਵਿਕਲਪਾਂ ਵਿੱਚੋਂ ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ",
  },
}

const professions = {
  en: [
    { id: "driver", name: "Driver", subtitle: "Car, Truck, Auto-rickshaw, Delivery van" },
    { id: "delivery", name: "Delivery Partner", subtitle: "Food, Courier" },
    { id: "electrician", name: "Electrician", subtitle: "Electrical work and repairs" },
    { id: "tailor", name: "Tailor", subtitle: "Clothing and alterations" },
    { id: "cook", name: "Cook / Chef", subtitle: "Home cook, Restaurant cook" },
    { id: "security", name: "Security Guard", subtitle: "Security services" },
    { id: "sales", name: "Sales Assistant", subtitle: "Shop worker, Cashier" },
    { id: "mechanic", name: "Mechanic", subtitle: "Two-wheeler, Four-wheeler" },
  ],
  hi: [
    { id: "driver", name: "ड्राइवर", subtitle: "कार, ट्रक, ऑटो-रिक्शा, डिलीवरी वैन" },
    { id: "delivery", name: "डिलीवरी पार्टनर", subtitle: "खाना, कूरियर" },
    { id: "electrician", name: "इलेक्ट्रीशियन", subtitle: "बिजली का काम और मरम्मत" },
    { id: "tailor", name: "दर्जी", subtitle: "कपड़े और सुधार" },
    { id: "cook", name: "रसोइया / शेफ", subtitle: "घरेलू रसोइया, रेस्टोरेंट रसोइया" },
    { id: "security", name: "सिक्यूरिटी गार्ड", subtitle: "सुरक्षा सेवाएं" },
    { id: "sales", name: "सेल्स असिस्टेंट", subtitle: "दुकान कर्मचारी, कैशियर" },
    { id: "mechanic", name: "मैकेनिक", subtitle: "दो-पहिया, चार-पहिया" },
  ],
  bn: [
    { id: "driver", name: "চালক", subtitle: "গাড়ি, ট্রাক, অটো-রিকশা, ডেলিভারি ভ্যান" },
    { id: "delivery", name: "ডেলিভারি পার্টনার", subtitle: "খাবার, কুরিয়ার" },
    { id: "electrician", name: "ইলেকট্রিশিয়ান", subtitle: "বৈদ্যুতিক কাজ এবং মেরামত" },
    { id: "tailor", name: "দর্জি", subtitle: "পোশাক এবং পরিবর্তন" },
    { id: "cook", name: "রাঁধুনি / শেফ", subtitle: "বাড়ির রাঁধুনি, রেস্টোরাঁর রাঁধুনি" },
    { id: "security", name: "নিরাপত্তা প্রহরী", subtitle: "নিরাপত্তা সেবা" },
    { id: "sales", name: "বিক্রয় সহায়ক", subtitle: "দোকানের কর্মী, ক্যাশিয়ার" },
    { id: "mechanic", name: "মেকানিক", subtitle: "দুই-চাকা, চার-চাকা" },
  ],
  te: [
    { id: "driver", name: "డ్రైవర్", subtitle: "కార్, ట్రక్, ఆటో-రిక్షా, డెలివరీ వ్యాన్" },
    { id: "delivery", name: "డెలివరీ పార్టనర్", subtitle: "ఆహారం, కొరియర్" },
    { id: "electrician", name: "ఎలక్ట్రీషియన్", subtitle: "విద్యుత్ పని మరియు మరమ్మతులు" },
    { id: "tailor", name: "దర్జీ", subtitle: "దుస్తులు మరియు మార్పులు" },
    { id: "cook", name: "వంటవాడు / చెఫ్", subtitle: "ఇంటి వంటవాడు, రెస్టారెంట్ వంటవాడు" },
    { id: "security", name: "సెక్యూరిటీ గార్డ్", subtitle: "భద్రతా సేవలు" },
    { id: "sales", name: "సేల్స్ అసిసెంట్", subtitle: "దుకాణ కార్మికుడు, క్యాషియర్" },
    { id: "mechanic", name: "మెకానిక్", subtitle: "రెండు-చక్రాలు, నాలుగు-చక్రాలు" },
  ],
  mr: [
    { id: "driver", name: "ड्रायव्हर", subtitle: "कार, ट्रक, ऑटो-रिक्शा, डिलिव्हरी वॅन" },
    { id: "delivery", name: "डिलिव्हरी पार्टनर", subtitle: "अन्न, कुरिअर" },
    { id: "electrician", name: "इलेक्ट्रीशियन", subtitle: "वीज काम आणि दुरुस्ती" },
    { id: "tailor", name: "शिंगर", subtitle: "कपडे आणि सुधारणा" },
    { id: "cook", name: "स्वयंपाक करणारा / शेफ", subtitle: "घरचा स्वयंपाक, रेस्टॉरंट शेफ" },
    { id: "security", name: "सुरक्षा रक्षक", subtitle: "सुरक्षा सेवा" },
    { id: "sales", name: "सेल्स असिस्टंट", subtitle: "दुकानदार, कॅशियर" },
    { id: "mechanic", name: "मेकेनिक", subtitle: "दोन चाकी, चार चाकी" },
  ],
  ta: [
    { id: "driver", name: "இயக்குநர்", subtitle: "கார், லாரி, ஆட்டோ-ரிக்ஷா, டெலிவரி வான்" },
    { id: "delivery", name: "டெலிவரி பங்குதாரர்", subtitle: "உணவு, கூரியர்" },
    { id: "electrician", name: "மின்வியல் தொழிலாளர்", subtitle: "மின்சார வேலை மற்றும் பழுது" },
    { id: "tailor", name: "தையல் தொழிலாளர்", subtitle: "வஸ்திரங்கள் மற்றும் திருத்தம்" },
    { id: "cook", name: "சமையல்காரர் / செஃப்", subtitle: "வீட்டு சமையல், உணவகம் சமையல்" },
    { id: "security", name: "பாதுகாப்பு காவலர்", subtitle: "பாதுகாப்பு சேவைகள்" },
    { id: "sales", name: "விற்பனை உதவியாளர்", subtitle: "கடை பணியாளர், காசியர்" },
    { id: "mechanic", name: "யந்திரவியல் தொழிலாளர்", subtitle: "இரு சக்கரங்கள், நான்கு சக்கரங்கள்" },
  ],
  gu: [
    { id: "driver", name: "ડ્રાઈવર", subtitle: "કાર, ટ્રક, ઓટો-રિક્ષા, ડિલિવરી વૅન" },
    { id: "delivery", name: "ડિલિવરી પાર્ટનર", subtitle: "ખાદ્ય, કૂરિયર" },
    { id: "electrician", name: "ઇલેક્ટ્રીશિયન", subtitle: "વિજળી કામ અને મરામત" },
    { id: "tailor", name: "દર્જી", subtitle: "કપડાં અને ફેરફાર" },
    { id: "cook", name: "રસોઈયા / શેફ", subtitle: "ઘરનું રસોઈ, રેસ્ટોરન્ટ રસોઈ" },
    { id: "security", name: "સુરક્ષા ગાર્ડ", subtitle: "સુરક્ષા સેવાઓ" },
    { id: "sales", name: "સેલ્સ અસિસ્ટન્ટ", subtitle: "દુકાન કર્મચારી, કૅશિયર" },
    { id: "mechanic", name: "મેકાનિક", subtitle: "બે ચક્ર, ચાર ચક્ર" },
  ],
  kn: [
    { id: "driver", name: "ಡ್ರೈವರ್", subtitle: "ಕಾರು, ಲಾರಿ, ಆಟೋ-ರಿಕ್ಷಾ, ಡೆಲಿವರಿ ವ್ಯಾನ್" },
    { id: "delivery", name: "ಡೆಲಿವರಿ ಪಾಲುದಾರ", subtitle: "ಭೋಜನ, ಕೂರಿಯರ್" },
    { id: "electrician", name: "ಇಲೆಕ್ಟ್ರಿಷಿಯನ್", subtitle: "ವಿದ್ಯುತ್ ಕೆಲಸ ಮತ್ತು ಮರುಮರಾಂತಿ" },
    { id: "tailor", name: "ದರ್ಜೀ", subtitle: "ಬಟ್ಟೆ ಮತ್ತು ಬದಲಾವಣೆ" },
    { id: "cook", name: "ಅಡುಗೆಗಾರ / ಶೆಫ್", subtitle: "ಮನೆ ಅಡುಗೆ, ರೆಸ್ಟೋರೆಂಟ್ ಅಡುಗೆ" },
    { id: "security", name: "ಭದ್ರತಾ ಗಾರ್ಡ್", subtitle: "ಭದ್ರತಾ ಸೇವೆಗಳು" },
    { id: "sales", name: "ಮಾರಾಟ ಸಹಾಯಕ", subtitle: "ಕಡೆ ಕೆಲಸಗಾರ, ನಗದುಗಾರ" },
    { id: "mechanic", name: "ಮೆಕಾನಿಕ್", subtitle: "ಎರಡು ಚಕ್ರ, ನಾಲ್ಕು ಚಕ್ರ" },
  ],
  ml: [
    { id: "driver", name: "ഡ്രൈവർ", subtitle: "കാർ, ട്രക്ക്, ഓട്ടോ-റിക്ഷ, ഡെലിവറി വാൻ" },
    { id: "delivery", name: "ഡെലിവറി പങ്കാളി", subtitle: "ഭക്ഷണം, കൂരിയർ" },
    { id: "electrician", name: "ഇലക്ട്രീഷ്യൻ", subtitle: "വൈദ്യുതി ജോലി, മർമ്മം" },
    { id: "tailor", name: "തെറാപ്പി", subtitle: "വസ്ത്രങ്ങൾ, മാറ്റം" },
    { id: "cook", name: "ചെഫ് / അടുക്കളക്കാരൻ", subtitle: "വീട്, റെസ്റ്റോറന്റ്" },
    { id: "security", name: "സുരക്ഷാ ഗാർഡ്", subtitle: "സുരക്ഷാ സേവനങ്ങൾ" },
    { id: "sales", name: "വിക്രയ സഹായി", subtitle: "കട തൊഴിലാളി, കാഷിയർ" },
    { id: "mechanic", name: "മെക്കാനിക്", subtitle: "രണ്ട് ചക്രം, നാല് ചക്രം" },
  ],
  pa: [
    { id: "driver", name: "ਡਰਾਈਵਰ", subtitle: "ਕਾਰ, ਟਰੱਕ, ਆਟੋ-ਰਿਕਸ਼ਾ, ਡੈਲੀਵਰੀ ਵੈਨ" },
    { id: "delivery", name: "ਡੈਲੀਵਰੀ ਭਾਗੀਦਾਰ", subtitle: "ਭੋਜਨ, ਕੂਰੀਅਰ" },
    { id: "electrician", name: "ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ", subtitle: "ਬਿਜਲੀ ਦਾ ਕੰਮ ਅਤੇ ਮੁਰੰਮਤ" },
    { id: "tailor", name: "ਦਰਜ਼ੀ", subtitle: "ਕਪੜੇ ਅਤੇ ਤਬਦੀਲੀਆਂ" },
    { id: "cook", name: "ਰਸੋਈਆ / ਸ਼ੈਫ", subtitle: "ਘਰੇਲੂ ਰਸੋਈ, ਰੈਸਟੋਰੈਂਟ" },
    { id: "security", name: "ਸੁਰੱਖਿਆ ਗਾਰਡ", subtitle: "ਸੁਰੱਖਿਆ ਸੇਵਾਵਾਂ" },
    { id: "sales", name: "ਸੇਲਜ਼ ਸਹਾਇਕ", subtitle: "ਦੁਕਾਨ ਕਰਮਚਾਰੀ, ਕੈਸ਼ੀਅਰ" },
    { id: "mechanic", name: "ਮਕੈਨਿਕ", subtitle: "ਦੋ ਪਹੀਆ, ਚਾਰ ਪਹੀਆ" },
  ],
}

export default function ProfessionSelectionPage() {
  const router = useRouter()
  const [selectedProfession, setSelectedProfession] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState("en")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Get language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en"
    setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    if (language && language !== "en") {
      // Delay audio playback to ensure page is fully loaded
      const timer = setTimeout(() => {
        playAudioInstructions()
      }, 1000)

      return () => clearTimeout(timer)
    } else if (language === "en") {
      // Also play for English after a short delay
      const timer = setTimeout(() => {
        playAudioInstructions()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [language])

  const t = translations[language as keyof typeof translations] || translations.en
  const professionList = professions[language as keyof typeof professions] || professions.en

  const getLanguageCode = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      hi: "hi-IN",
      en: "en-US",
      bn: "bn-IN",
      te: "te-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      gu: "gu-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      pa: "pa-IN",
      or: "or-IN",
      as: "as-IN",
      ur: "ur-PK",
    }
    return languageMap[lang] || "en-US"
  }

  const playAudioInstructions = async () => {
    if (isPlaying) return

    setIsPlaying(true)

    try {
      // Create speech synthesis
      const utterance = new SpeechSynthesisUtterance(t.audioText)
      utterance.lang = getLanguageCode(language)
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => {
        setIsPlaying(false)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
        toast({
          title: t.error,
          description: "Audio playback failed. Please try again.",
          variant: "destructive",
        })
      }

      speechSynthesis.speak(utterance)
    } catch (error) {
      setIsPlaying(false)
      toast({
        title: t.error,
        description: "Audio not supported on this device.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProfession) {
      toast({
        title: t.selectProfession,
        description: t.selectProfessionDesc,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Store profession preference in localStorage
      localStorage.setItem("selectedProfession", selectedProfession)

      toast({
        title: t.professionSelected,
        description: t.professionSelectedDesc,
      })

      // Navigate to dashboard or next page
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: t.error,
        description: t.errorDesc,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedProfession} onValueChange={setSelectedProfession}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionList.map((profession) => (
                  <div
                    key={profession.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent"
                  >
                    <RadioGroupItem value={profession.id} id={profession.id} />
                    <Label htmlFor={profession.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-base">{profession.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{profession.subtitle}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
          <div className="px-6 pb-6">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? t.saving : t.continue}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
