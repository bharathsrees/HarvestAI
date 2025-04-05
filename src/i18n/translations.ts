
export type LanguageCode = "en" | "ta" | "hi";

export type TranslationKey = 
  | "common.title" 
  | "common.description"
  | "nav.home"
  | "nav.scan"
  | "nav.weather"
  | "nav.market"
  | "nav.expert"
  | "nav.community"
  | "nav.getStarted"
  | "theme.light"
  | "theme.dark"
  | "theme.system"
  | "language.english"
  | "language.tamil"
  | "language.hindi"
  | "chatbot.title"
  | "chatbot.subtitle"
  | "chatbot.inputPlaceholder"
  | "expert.title"
  | "expert.description"
  | "expert.form.name"
  | "expert.form.email"
  | "expert.form.cropType"
  | "expert.form.issue"
  | "expert.form.submit"
  | "community.title"
  | "community.description"
  | "community.post.title"
  | "community.post.content"
  | "community.post.submit"
  | "community.post.placeholder"
  | "community.comment.placeholder"
  | "community.comment.submit"
  | "resources.title"
  | "resources.description"
  | "resources.guides"
  | "resources.community"
  | "resources.knowledgeBase"
  | "location.coimbatore";

export type Translations = Record<TranslationKey, string>;

export const translations: Record<LanguageCode, Translations> = {
  en: {
    "common.title": "HarvestAI",
    "common.description": "Smart agriculture for modern farmers",
    "nav.home": "Home",
    "nav.scan": "Scan",
    "nav.weather": "Weather",
    "nav.market": "Market",
    "nav.expert": "Expert Advice",
    "nav.community": "Community",
    "nav.getStarted": "Get Started",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "language.english": "English",
    "language.tamil": "Tamil",
    "language.hindi": "Hindi",
    "chatbot.title": "HarvestAI Assistant",
    "chatbot.subtitle": "Ask me anything about farming",
    "chatbot.inputPlaceholder": "Type your question...",
    "expert.title": "Expert Advice Portal",
    "expert.description": "Connect with agricultural experts",
    "expert.form.name": "Your Name",
    "expert.form.email": "Email Address",
    "expert.form.cropType": "Crop Type",
    "expert.form.issue": "Issue Description",
    "expert.form.submit": "Submit Query",
    "community.title": "Farmer Community",
    "community.description": "Connect with fellow farmers, researchers and agricultural enthusiasts",
    "community.post.title": "Post Title",
    "community.post.content": "Post Content",
    "community.post.submit": "Submit Post",
    "community.post.placeholder": "Share your farming experience or ask a question...",
    "community.comment.placeholder": "Write a comment...",
    "community.comment.submit": "Comment",
    "resources.title": "Resources",
    "resources.description": "Helpful farming resources and guides",
    "resources.guides": "Farming Guides",
    "resources.community": "Community",
    "resources.knowledgeBase": "Knowledge Base",
    "location.coimbatore": "Coimbatore"
  },
  ta: {
    "common.title": "அறுவடை AI",
    "common.description": "நவீன விவசாயிகளுக்கான ஸ்மார்ட் விவசாயம்",
    "nav.home": "முகப்பு",
    "nav.scan": "ஸ்கேன்",
    "nav.weather": "வானிலை",
    "nav.market": "சந்தை",
    "nav.expert": "நிபுணர் ஆலோசனை",
    "nav.community": "சமூகம்",
    "nav.getStarted": "தொடங்குங்கள்",
    "theme.light": "வெளிச்சம்",
    "theme.dark": "இருள்",
    "theme.system": "சிஸ்டம்",
    "language.english": "ஆங்கிலம்",
    "language.tamil": "தமிழ்",
    "language.hindi": "இந்தி",
    "chatbot.title": "அறுவடை AI உதவியாளர்",
    "chatbot.subtitle": "விவசாயம் பற்றி எதையும் கேளுங்கள்",
    "chatbot.inputPlaceholder": "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...",
    "expert.title": "நிபுணர் ஆலோசனை போர்டல்",
    "expert.description": "விவசாய நிபுணர்களுடன் இணையுங்கள்",
    "expert.form.name": "உங்கள் பெயர்",
    "expert.form.email": "மின்னஞ்சல் முகவரி",
    "expert.form.cropType": "பயிர் வகை",
    "expert.form.issue": "பிரச்சனை விளக்கம்",
    "expert.form.submit": "கேள்வியை சமர்ப்பிக்கவும்",
    "community.title": "விவசாயி சமூகம்",
    "community.description": "விவசாயிகள், ஆராய்ச்சியாளர்கள் மற்றும் விவசாய ஆர்வலர்களுடன் இணையுங்கள்",
    "community.post.title": "இடுகையின் தலைப்பு",
    "community.post.content": "இடுகையின் உள்ளடக்கம்",
    "community.post.submit": "இடுகையை சமர்ப்பிக்கவும்",
    "community.post.placeholder": "உங்கள் விவசாய அனுபவத்தை பகிரவும் அல்லது கேள்வி கேட்கவும்...",
    "community.comment.placeholder": "கருத்து எழுதுங்கள்...",
    "community.comment.submit": "கருத்து",
    "resources.title": "வளங்கள்",
    "resources.description": "பயனுள்ள விவசாய வளங்கள் மற்றும் வழிகாட்டிகள்",
    "resources.guides": "விவசாய வழிகாட்டிகள்",
    "resources.community": "சமூகம்",
    "resources.knowledgeBase": "அறிவு தளம்",
    "location.coimbatore": "கோயம்புத்தூர்"
  },
  hi: {
    "common.title": "हार्वेस्ट AI",
    "common.description": "आधुनिक किसानों के लिए स्मार्ट कृषि",
    "nav.home": "होम",
    "nav.scan": "स्कैन",
    "nav.weather": "मौसम",
    "nav.market": "बाज़ार",
    "nav.expert": "विशेषज्ञ सलाह",
    "nav.community": "समुदाय",
    "nav.getStarted": "शुरू करें",
    "theme.light": "उजला",
    "theme.dark": "अंधेरा",
    "theme.system": "सिस्टम",
    "language.english": "अंग्रेज़ी",
    "language.tamil": "तमिल",
    "language.hindi": "हिंदी",
    "chatbot.title": "हार्वेस्ट AI सहायक",
    "chatbot.subtitle": "खेती के बारे में कुछ भी पूछें",
    "chatbot.inputPlaceholder": "अपना प्रश्न टाइप करें...",
    "expert.title": "विशेषज्ञ सलाह पोर्टल",
    "expert.description": "कृषि विशेषज्ञों से जुड़ें",
    "expert.form.name": "आपका नाम",
    "expert.form.email": "ईमेल पता",
    "expert.form.cropType": "फसल प्रकार",
    "expert.form.issue": "समस्या विवरण",
    "expert.form.submit": "प्रश्न भेजें",
    "community.title": "किसान समुदाय",
    "community.description": "अन्य किसानों, शोधकर्ताओं और कृषि उत्साही लोगों से जुड़ें",
    "community.post.title": "पोस्ट शीर्षक",
    "community.post.content": "पोस्ट सामग्री",
    "community.post.submit": "पोस्ट करें",
    "community.post.placeholder": "अपना कृषि अनुभव साझा करें या प्रश्न पूछें...",
    "community.comment.placeholder": "टिप्पणी लिखें...",
    "community.comment.submit": "टिप्पणी",
    "resources.title": "संसाधन",
    "resources.description": "उपयोगी कृषि संसाधन और गाइड",
    "resources.guides": "कृषि गाइड",
    "resources.community": "समुदाय",
    "resources.knowledgeBase": "ज्ञान आधार",
    "location.coimbatore": "कोयंबटूर"
  }
};
