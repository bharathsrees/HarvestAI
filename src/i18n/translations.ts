export type LanguageCode = "en" | "ta" | "hi";

export type TranslationKey = 
  | "common.title" 
  | "common.description"
  | "common.cancel"
  | "nav.home"
  | "nav.scan"
  | "nav.weather"
  | "nav.market"
  | "nav.expert"
  | "nav.community"
  | "nav.getStarted"
  | "nav.changeLanguage"
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
  | "location.coimbatore"
  | "hero.smartFarming"
  | "hero.with"
  | "hero.description"
  | "hero.learnMore"
  | "features.title"
  | "features.description"
  | "features.scanner.title"
  | "features.scanner.description"
  | "features.weather.title"
  | "features.weather.description"
  | "features.market.title"
  | "features.market.description"
  | "benefits.title"
  | "benefits.description"
  | "benefits.earlyDetection.title"
  | "benefits.earlyDetection.description"
  | "benefits.waterEfficiency.title"
  | "benefits.waterEfficiency.description"
  | "benefits.betterProfits.title"
  | "benefits.betterProfits.description"
  | "benefits.sustainable.title"
  | "benefits.sustainable.description"
  | "cta.title"
  | "cta.description"
  | "cta.button"
  | "market.title"
  | "market.description"
  | "market.tabs.prices"
  | "market.tabs.marketplace"
  | "market.currentCropPrices"
  | "market.table.crop"
  | "market.table.price"
  | "market.table.change"
  | "market.table.trend"
  | "market.table.action"
  | "market.details"
  | "market.lastUpdated"
  | "market.today"
  | "market.pricesDisclaimer"
  | "market.farmersMarketplace"
  | "market.listProduct"
  | "market.listYourProduct"
  | "market.form.productName"
  | "market.form.productNamePlaceholder"
  | "market.form.quantityAndUnit"
  | "market.form.amount"
  | "market.form.pricePerUnit"
  | "market.form.price"
  | "market.form.location"
  | "market.form.locationPlaceholder"
  | "market.form.productDescription"
  | "market.form.descriptionPlaceholder"
  | "market.searchPlaceholder"
  | "market.organic"
  | "market.available"
  | "market.location"
  | "market.contactSeller"
  | "market.noProductsFound"
  | "market.insights"
  | "market.currentPrice"
  | "market.priceHistory"
  | "market.analysis"
  | "market.analysis.up"
  | "market.analysis.down"
  | "market.analysis.stable"
  | "market.tradingTip"
  | "market.tradingTip.up"
  | "market.tradingTip.down"
  | "market.tradingTip.stable"
  | "market.selectCrop"
  | "market.selectCropInstruction"
  | "market.contactRequestSent"
  | "market.contactRequestDescription"
  | "market.productListed"
  | "market.productListedDescription"
  | "crops.wheat"
  | "crops.corn"
  | "crops.soybeans"
  | "crops.rice"
  | "crops.potatoes"
  | "crops.tomatoes"
  | "crops.apples"
  | "crops.oranges"
  | "units.perTon"
  | "units.perKg"
  | "farmers.greenValley"
  | "farmers.sunriseOrchards"
  | "farmers.riverCreek"
  | "farmers.sunnyMeadows"
  | "products.organicTomatoes"
  | "products.freshApples"
  | "products.organicPotatoes"
  | "products.premiumWheat"
  | "locations.agritechValley"
  | "locations.highlandCounty"
  | "locations.westfield"
  | "locations.eastlakeCounty"
  | "locations.coimbatore"
  | "months.jan"
  | "months.dec";

export type Translations = Record<TranslationKey, string>;

export const translations: Record<LanguageCode, Translations> = {
  en: {
    "common.title": "HarvestAI",
    "common.description": "Smart agriculture for modern farmers",
    "common.cancel": "Cancel",
    "nav.home": "Home",
    "nav.scan": "Scan",
    "nav.weather": "Weather",
    "nav.market": "Market",
    "nav.expert": "Expert Advice",
    "nav.community": "Community",
    "nav.getStarted": "Get Started",
    "nav.changeLanguage": "Change language",
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
    "location.coimbatore": "Coimbatore",
    "hero.smartFarming": "Smart Farming",
    "hero.with": "with",
    "hero.description": "AI-powered tools to help farmers identify crop diseases, track weather patterns, and connect directly with consumers.",
    "hero.learnMore": "Learn More",
    "features.title": "Our Features",
    "features.description": "HarvestAI provides farmers with powerful tools to maximize productivity and profitability.",
    "features.scanner.title": "Crop Disease Scanner",
    "features.scanner.description": "Upload photos of your crops to instantly identify diseases and get treatment recommendations.",
    "features.weather.title": "Weather Dashboard",
    "features.weather.description": "Access 3-day forecasts with smart irrigation recommendations based on local conditions.",
    "features.market.title": "Market Prices",
    "features.market.description": "Track real-time crop prices and connect directly with consumers for better profits.",
    "benefits.title": "Why Choose HarvestAI",
    "benefits.description": "Our platform is designed to address the unique challenges facing modern farmers.",
    "benefits.earlyDetection.title": "Early Detection",
    "benefits.earlyDetection.description": "Identify crop diseases before they spread to save your harvest.",
    "benefits.waterEfficiency.title": "Water Efficiency",
    "benefits.waterEfficiency.description": "Optimize irrigation based on weather patterns and soil conditions.",
    "benefits.betterProfits.title": "Better Profits",
    "benefits.betterProfits.description": "Get the best prices by tracking market trends and selling directly.",
    "benefits.sustainable.title": "Sustainable Farming",
    "benefits.sustainable.description": "Make data-driven decisions to minimize environmental impact.",
    "cta.title": "Ready to Transform Your Farming?",
    "cta.description": "Join thousands of farmers already using HarvestAI to increase yields and profitability.",
    "cta.button": "Get Started Now",
    "market.title": "Market Prices & Direct Sales",
    "market.description": "Track real-time crop prices and connect directly with buyers or sellers",
    "market.tabs.prices": "Market Prices",
    "market.tabs.marketplace": "Farmer Marketplace",
    "market.currentCropPrices": "Current Crop Prices",
    "market.table.crop": "Crop",
    "market.table.price": "Price",
    "market.table.change": "Change",
    "market.table.trend": "Trend",
    "market.table.action": "Action",
    "market.details": "Details",
    "market.lastUpdated": "Last updated",
    "market.today": "Today",
    "market.pricesDisclaimer": "Prices may vary by region and quality",
    "market.farmersMarketplace": "Farmer's Marketplace",
    "market.listProduct": "List Product",
    "market.listYourProduct": "List Your Product",
    "market.form.productName": "Crop/Product Name",
    "market.form.productNamePlaceholder": "e.g., Organic Tomatoes",
    "market.form.quantityAndUnit": "Quantity & Unit",
    "market.form.amount": "Amount",
    "market.form.pricePerUnit": "Price per Unit ($)",
    "market.form.price": "Price",
    "market.form.location": "Location",
    "market.form.locationPlaceholder": "Your farm location",
    "market.form.productDescription": "Product Description",
    "market.form.descriptionPlaceholder": "Describe your product (quality, harvesting date, etc.)",
    "market.searchPlaceholder": "Search by crop, farmer, or location",
    "market.organic": "Organic",
    "market.available": "available",
    "market.location": "Location",
    "market.contactSeller": "Contact Seller",
    "market.noProductsFound": "No products found matching your search.",
    "market.insights": "Market Insights",
    "market.currentPrice": "Current Price",
    "market.priceHistory": "Price History",
    "market.analysis": "Market Analysis",
    "market.analysis.up": "Prices are trending upward due to increased demand and lower supplies. Consider holding if you can store safely.",
    "market.analysis.down": "Prices are declining due to seasonal harvests increasing supply. Consider selling soon if quality might degrade.",
    "market.analysis.stable": "Prices are stable with consistent demand. Good time for regular selling.",
    "market.tradingTip": "Trading Tip",
    "market.tradingTip.up": "Consider forward contracts to lock in current high prices for future production.",
    "market.tradingTip.down": "Look into value-added processing options to increase profit margins during low price periods.",
    "market.tradingTip.stable": "Diversify your selling strategy with a mix of spot market sales and forward contracts.",
    "market.selectCrop": "Select a Crop",
    "market.selectCropInstruction": "Click on a crop in the market prices table to view detailed insights",
    "market.contactRequestSent": "Contact Request Sent",
    "market.contactRequestDescription": "You've requested to buy {product} from {farmer}",
    "market.productListed": "Product Listed",
    "market.productListedDescription": "Your product has been listed on the marketplace",
    "crops.wheat": "Wheat",
    "crops.corn": "Corn",
    "crops.soybeans": "Soybeans", 
    "crops.rice": "Rice",
    "crops.potatoes": "Potatoes",
    "crops.tomatoes": "Tomatoes",
    "crops.apples": "Apples",
    "crops.oranges": "Oranges",
    "units.perTon": "per ton",
    "units.perKg": "per kg",
    "farmers.greenValley": "Green Valley Farm",
    "farmers.sunriseOrchards": "Sunrise Orchards",
    "farmers.riverCreek": "River Creek Farms",
    "farmers.sunnyMeadows": "Sunny Meadows",
    "products.organicTomatoes": "Organic Tomatoes",
    "products.freshApples": "Fresh Apples",
    "products.organicPotatoes": "Organic Potatoes",
    "products.premiumWheat": "Premium Wheat",
    "locations.agritechValley": "Agritech Valley",
    "locations.highlandCounty": "Highland County",
    "locations.westfield": "Westfield",
    "locations.eastlakeCounty": "Eastlake County",
    "locations.coimbatore": "Coimbatore",
    "months.jan": "Jan",
    "months.dec": "Dec"
  },
  ta: {
    "common.title": "அறுவடை AI",
    "common.description": "நவீன விவசாயிகளுக்கான ஸ்மார்ட் விவசாயம்",
    "common.cancel": "ரத்து செய்",
    "nav.home": "முகப்பு",
    "nav.scan": "ஸ்கேன்",
    "nav.weather": "வானிலை",
    "nav.market": "சந்தை",
    "nav.expert": "நிபுணர் ஆலோசனை",
    "nav.community": "சமூகம்",
    "nav.getStarted": "தொடங்குங்கள்",
    "nav.changeLanguage": "மொழியை மாற்று",
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
    "location.coimbatore": "கோயம்புத்தூர்",
    "hero.smartFarming": "ஸ்மார்ட் விவசாயம்",
    "hero.with": "மூலம்",
    "hero.description": "விவசாயிகள் பயிர் நோய்களை அடையாளம் காண, வானிலை நிலைமைகளை கண்காணிக்க, மற்றும் நுகர்வோருடன் நேரடியாக தொடர்பு கொள்ள உதவும் AI சக்தி கொண்ட கருவிகள்.",
    "hero.learnMore": "மேலும் அறிக",
    "features.title": "எங்கள் அம்சங்கள்",
    "features.description": "அறுவடை AI விவசாயிகளுக்கு உற்பத்தியையும் இலாபத்தையும் அதிகரிக்க சக்திவாய்ந்த கருவிகளை வழங்குகிறது.",
    "features.scanner.title": "பயிர் நோய் ஸ்கேனர்",
    "features.scanner.description": "உங்கள் பயிர்களின் புகைப்படங்களை பதிவேற்றி உடனடியாக நோய்களை கண்டறிந்து சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்.",
    "features.weather.title": "வானிலை டாஷ்போர்டு",
    "features.weather.description": "உள்ளூர் நிலைமைகளின் அடிப்படையில் ஸ்மார்ட் பாசன பரிந்துரைகளுடன் 3 நாள் முன்னறிவிப்புகளைப் பெறுங்கள்.",
    "features.market.title": "சந்தை விலைகள்",
    "features.market.description": "நிகழ்நேர பயிர் விலைகளைக் கண்காணித்து நுகர்வோருடன் நேரடியாக இணைந்து சிறந்த லாபத்தைப் பெறுங்கள்.",
    "benefits.title": "ஏன் அறுவடை AI ஐ தேர்வு செய்ய வேண்டும்",
    "benefits.description": "எங்கள் தளம் நவீன விவசாயிகள் எதிர்கொள்ளும் தனித்துவமான சவால்களைத் தீர்க்க வடிவமைக்கப்பட்டுள்ளது.",
    "benefits.earlyDetection.title": "ஆரம்ப கண்டறிதல்",
    "benefits.earlyDetection.description": "உங்கள் அறுவடையைக் காப்பாற்ற, பரவும் முன் பயிர் நோய்களைக் கண்டறியுங்கள்.",
    "benefits.waterEfficiency.title": "நீர் திறன்",
    "benefits.waterEfficiency.description": "வானிலை முறைகள் மற்றும் மண் நிலைமைகளின் அடிப்படையில் பாசனத்தை உகந்ததாக்குங்கள்.",
    "benefits.betterProfits.title": "சிறந்த லாபங்கள்",
    "benefits.betterProfits.description": "சந்தை போக்குகளைக் கண்காணித்து நேரடியாக விற்பதன் மூலம் சிறந்த விலைகளைப் பெறுங்கள்.",
    "benefits.sustainable.title": "நிலையான விவசாயம்",
    "benefits.sustainable.description": "சுற்றுச்சூழல் தாக்கத்தைக் குறைக்க தரவு அடிப்படையிலான முடிவுகளை எடுங்கள்.",
    "cta.title": "உங்கள் விவசாயத்தை மாற்ற தயாரா?",
    "cta.description": "ஏற்கனவே அறுவடை AI ஐப் பயன்படுத்தி மகசூல் மற்றும் லாபத்தை அதிகரிக்கும் ஆயிரக்கணக்கான விவசாயிகளுடன் இணையுங்கள்.",
    "cta.button": "இப்போதே தொடங்குங்கள்",
    "market.title": "சந்தை விலைகள் & நேரடி விற்பனை",
    "market.description": "நிகழ்நேர பயிர் விலைகளைக் கண்காணித்து வாங்குபவர்கள் அல்லது விற்பவர்களுடன் நேரடியாக இணையுங்கள்",
    "market.tabs.prices": "சந்தை விலைகள்",
    "market.tabs.marketplace": "விவசாயி சந்தை",
    "market.currentCropPrices": "தற்போதைய பயிர் விலைகள்",
    "market.table.crop": "பயிர்",
    "market.table.price": "விலை",
    "market.table.change": "மாற்றம்",
    "market.table.trend": "போக்கு",
    "market.table.action": "செயல்",
    "market.details": "விவரங்கள்",
    "market.lastUpdated": "கடைசியாக புதுப்பிக்கப்பட்டது",
    "market.today": "இன்று",
    "market.pricesDisclaimer": "விலைகள் பகுதி மற்றும் தரத்தின் அடிப்படையில் மாறுபடலாம்",
    "market.farmersMarketplace": "விவசாயிகளின் சந்தை",
    "market.listProduct": "பொருளைப் பட்டியலிடு",
    "market.listYourProduct": "உங்கள் பொருளைப் பட்டியலிடுங்கள்",
    "market.form.productName": "பயிர்/பொருள் பெயர்",
    "market.form.productNamePlaceholder": "எ.கா., ஆர்கானிக் தக்காளிகள்",
    "market.form.quantityAndUnit": "அளவு & அலகு",
    "market.form.amount": "அளவு",
    "market.form.pricePerUnit": "அலகு விலை ($)",
    "market.form.price": "விலை",
    "market.form.location": "இடம்",
    "market.form.locationPlaceholder": "உங்கள் பண்ணை இருப்பிடம்",
    "market.form.productDescription": "பொருள் விளக்கம்",
    "market.form.descriptionPlaceholder": "உங்கள் பொருளை விவரிக்கவும் (தரம், அறுவடை தேதி போன்றவை)",
    "market.searchPlaceholder": "பயிர், விவசாயி அல்லது இருப்பிடத்தால் தேடுங்கள்",
    "market.organic": "ஆர்கானிக்",
    "market.available": "கிடைக்கிறது",
    "market.location": "இடம்",
    "market.contactSeller": "விற்பனையாளரைத் தொடர்பு கொள்ளுங்கள்",
    "market.noProductsFound": "உங்கள் தேடலுடன் பொருந்தும் பொருட்கள் எதுவும் இல்லை.",
    "market.insights": "சந்தை நுண்ணறிவுகள்",
    "market.currentPrice": "தற்போதைய விலை",
    "market.priceHistory": "விலை வரலாறு",
    "market.analysis": "சந்தை பகுப்பாய்வு",
    "market.analysis.up": "அதிகரித்த தேவை மற்றும் குறைந்த விநியோகம் காரணமாக விலைகள் உயர்ந்து வருகின்றன. நீங்கள் பாதுகாப்பாக சேமிக்க முடிந்தால் வைத்திருக்கவும்.",
    "market.analysis.down": "பருவகால அறுவடைகள் விநியோகத்தை அதிகரிப்பதால் விலைகள் குறைகின்றன. தரம் குறையக்கூடும் என்றால் விரைவில் விற்பனை செய்ய பரிசீலிக்கவும்.",
    "market.analysis.stable": "விலைகள் நிலையான தேவையுடன் நிலையாக உள்ளன. வழக்கமான விற்பனைக்கு நல்ல நேரம்.",
    "market.tradingTip": "வர்த்தக குறிப்பு",
    "market.tradingTip.up": "எதிர்கால உற்பத்திக்கு தற்போதைய உயர் விலைகளை பூட்ட முன்னோக்கு ஒப்பந்தங்களை பரிசீலிக்கவும்.",
    "market.tradingTip.down": "குறைந்த விலை காலங்களில் லாப விளிம்புகளை அதிகரிக்க மதிப்பு கூட்டப்பட்ட செயலாக்க விருப்பங்களைப் பார்க்கவும்.",
    "market.tradingTip.stable": "ஸ்பாட் மார்க்கெட் விற்பனை மற்றும் ஃபார்வர்டு ஒப்பந்தங்களின் கலவையுடன் உங்கள் விற்பனை உத்தியை பல்வகைப்படுத்துங்கள்.",
    "market.selectCrop": "ஒரு பயிரைத் தேர்ந்தெடுக்கவும்",
    "market.selectCropInstruction": "விரிவான நுண்ணறிவுகளைக் காண சந்தை விலைகள் அட்டவணையில் ஒரு பயிரைக் கிளிக் செய்யவும்",
    "market.contactRequestSent": "தொடர்பு கோரிக்கை அனுப்பப்பட்டது",
    "market.contactRequestDescription": "நீங்கள் {product} வாங்க {farmer} இடமிருந்து கோரிக்கை விடுத்துள்ளீர்கள்",
    "market.productListed": "பொருள் பட்டியலிடப்பட்டது",
    "market.productListedDescription": "உங்கள் பொருள் சந்தையில் பட்டியலிடப்பட்டுள்ளது",
    "crops.wheat": "கோதுமை",
    "crops.corn": "மக்காச்சோளம்",
    "crops.soybeans": "சோயாபீன்ஸ்", 
    "crops.rice": "அரிசி",
    "crops.potatoes": "உருளைக்கிழங்கு",
    "crops.tomatoes": "தக்காளி",
    "crops.apples": "ஆப்பிள்",
    "crops.oranges": "ஆரஞ்சு",
    "units.perTon": "டன் ஒன்றுக்கு",
    "units.perKg": "கிலோ ஒன்றுக்கு",
    "farmers.greenValley": "கிரீன் வேலி பார்ம்",
    "farmers.sunriseOrchards": "சன்ரைஸ் ஆர்ச்சர்ட்ஸ்",
    "farmers.riverCreek": "ரிவர் க்ரீக் பார்ம்ஸ்",
    "farmers.sunnyMeadows": "சன்னி மெடோஸ்",
    "products.organicTomatoes": "ஆர்கானிக் தக்காளிகள்",
    "products.freshApples": "புதிய ஆப்பிள்கள்",
    "products.organicPotatoes": "ஆர்கானிக் உருளைக்கிழங்கு",
    "products.premiumWheat": "பிரீமியம் கோதுமை",
    "locations.agritechValley": "அக்ரிடெக் வேலி",
    "locations.highlandCounty": "ஹைலேண்ட் கவுண்டி",
    "locations.westfield": "வெஸ்ட்ஃபீல்டு",
    "locations.eastlakeCounty": "ஈஸ்ட்லேக் கவுண்டி",
    "locations.coimbatore": "கோயம்புத்தூர்",
    "months.jan": "ஜன",
    "months.dec": "டிச"
  },
  hi: {
    "common.title": "हार्वेस्ट AI",
    "common.description": "आधुनिक किसानों के लिए स्मार्ट कृषि",
    "common.cancel": "रद्द करें",
    "nav.home": "होम",
    "nav.scan": "स्कैन",
    "nav.weather": "मौसम",
    "nav.market": "बाज़ार",
    "nav.expert": "विशेषज्ञ सलाह",
    "nav.community": "समुदाय",
    "nav.getStarted": "शुरू करें",
    "nav.changeLanguage": "भाषा बदलें",
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
    "location.coimbatore": "कोयंबटूर",
    "hero.smartFarming": "स्मार्ट खेती",
    "hero.with": "के साथ",
    "hero.description": "AI-संचालित उपकरण जो किसानों को फसल रोगों की पहचान करने, मौसम पैटर्न को ट्रैक करने और उपभोक्ताओं से सीधे जुड़ने में मदद करते हैं।",
    "hero.learnMore": "अधिक जानें",
    "features.title": "हमारी विशेषताएं",
    "features.description": "हार्वेस्ट AI किसानों को उत्पादकता और लाभप्रदता को अधिकतम करने के लिए शक्तिशाली उपकरण प्रदान करता है।",
    "features.scanner.title": "फसल रोग स्कैनर",
    "features.scanner.description": "अपनी फसलों की तस्वीरें अपलोड करके तुरंत रोगों की पहचान करें और उपचार की सिफारिशें प्राप्त करें।",
    "features.weather.title": "मौसम डैशबोर्ड",
    "features.weather.description": "स्थानीय परिस्थितियों के आधार पर स्मार्ट सिंचाई अनुशंसाओं के साथ 3-दिन के पूर्वानुमान तक पहुंचें।",
    "features.market.title": "बाजार मूल्य",
    "features.market.description": "रीयल-टाइम फसल मूल्यों को ट्रैक करें और बेहतर लाभ के लिए उपभोक्ताओं से सीधे जुड़ें।",
    "benefits.title": "हार्वेस्ट AI को क्यों चुनें",
    "benefits.description": "हमारा प्लेटफॉर्म आधुनिक किसानों के सामने आने वाली अनूठी चुनौतियों का समाधान करने के लिए डिज़ाइन किया गया है।",
    "benefits.earlyDetection.title": "प्रारंभिक पहचान",
    "benefits.earlyDetection.description": "अपनी फसल को बचाने के लिए फैलने से पहले फसल के रोगों की पहचान करें।",
    "benefits.waterEfficiency.title": "जल दक्षता",
    "benefits.waterEfficiency.description": "मौसम पैटर्न और मिट्टी की स्थिति के आधार पर सिंचाई को अनुकूलित करें।",
    "benefits.betterProfits.title": "बेहतर लाभ",
    "benefits.betterProfits.description": "बाजार के रुझानों को ट्रैक करके और सीधे बेचकर सर्वोत्तम कीमतें प्राप्त करें।",
    "benefits.sustainable.title": "टिकाऊ खेती",
    "benefits.sustainable.description": "पर्यावरण प्रभाव को कम करने के लिए डेटा-संचालित निर्णय लें।",
    "cta.title": "अपनी खेती को बदलने के लिए तैयार हैं?",
    "cta.description": "हजारों किसानों के साथ जुड़ें जो पहले से ही हार्वेस्ट AI का उपयोग उपज और लाभप्रदता बढ़ाने के लिए कर रहे हैं।",
    "cta.button": "अभी शुरू करें",
    "market.title": "बाजार मूल्य और प्रत्यक्ष बिक्री",
    "market.description": "रीयल-टाइम फसल मूल्यों को ट्रैक करें और खरीदारों या विक्रेताओं से सीधे जुड़ें",
    "market.tabs.prices": "बाजार मूल्य",
    "market.tabs.marketplace": "किसान बाज़ार",
    "market.currentCropPrices": "वर्तमान फसल मूल्य",
    "market.table.crop": "फसल",
    "market.table.price": "मूल्य",
    "market.table.change": "बदलाव",
    "market.table.trend": "रुझान",
    "market.table.action": "कार्रवाई",
    "market.details": "विवरण",
    "market.lastUpdated": "अंतिम अपडेट",
    "market.today": "आज",
    "market.pricesDisclaimer": "कीमतें क्षेत्र और गुणवत्ता के अनुसार भिन्न हो सकती हैं",
    "market.farmersMarketplace": "किसान का बाज़ार",
    "market.listProduct": "उत्पाद सूचीबद्ध करें",
    "market.listYourProduct": "अपना उत्पाद सूचीबद्ध करें",
    "market.form.productName": "फसल/उत्पाद नाम",
    "market.form.productNamePlaceholder": "जैसे, जैविक टमाटर",
    "market.form.quantityAndUnit": "मात्रा और इकाई",
    "market.form.amount": "राशि",
    "market.form.pricePerUnit": "प्रति इकाई मूल्य ($)",
    "market.form.price": "मूल्य",
    "market.form.location": "स्थान",
    "market.form.locationPlaceholder": "आपका खेत स्थान",
    "market.form.productDescription": "उत्पाद विवरण",
    "market.form.descriptionPlaceholder": "अपने उत्पाद का वर्णन करें (गुणवत्ता, कटाई की तारीख, आदि)",
    "market.searchPlaceholder": "फसल, किसान, या स्थान से खोजें",
    "market.organic": "जैविक",
    "market.available": "उपलब्ध",
    "market.location": "स्थान",
    "market.contactSeller": "विक्रेता से संपर्क करें",
    "market.noProductsFound": "आपकी खोज से मेल खाने वाले कोई उत्पाद नहीं मिले।",
    "market.insights": "बाजार अंतर्दृष्टि",
    "market.currentPrice": "वर्तमान मूल्य",
    "market.priceHistory": "मूल्य इतिहास",
    "market.analysis": "बाजार विश्लेषण",
    "market.analysis.up": "बढ़ती मांग और कम आपूर्ति के कारण कीमतें बढ़ रही हैं। यदि आप सुरक्षित रूप से स्टोर कर सकते हैं तो रखने पर विचार करें।",
    "market.analysis.down": "मौसमी फसलों से आपूर्ति बढ़ने के कारण कीमतें घट रही हैं। अगर गुणवत्ता खराब हो सकती है तो जल्द बेचने पर विचार करें।",
    "market.analysis.stable": "कीमतें लगातार मांग के साथ स्थिर हैं। नियमित बिक्री के लिए अच्छा समय है।",
    "market.tradingTip": "ट्रेडिंग टिप",
    "market.tradingTip.up": "भविष्य के उत्पादन के लिए वर्तमान उच्च कीमतों को लॉक करने के लिए फॉरवर्ड अनुबंधों पर विचार करें।",
    "market.tradingTip.down": "कम कीमत वाले समय में लाभ मार्जिन बढ़ाने के लिए मूल्य-वर्धित प्रसंस्करण विकल्पों पर विचार करें।",
    "market.tradingTip.stable": "स्पॉट मार्केट सेल्स और फॉरवर्ड कॉन्ट्रैक्ट्स के मिश्रण के साथ अपनी बिक्री रणनीति को विविधतापूर्ण करें।",
    "market.selectCrop": "एक फसल चुनें",
    "market.selectCropInstruction": "विस्तृत अंतर्दृष्टि देखने के लिए बाजार मूल्य तालिका में किसी फसल पर क्लिक करें",
    "market.contactRequestSent": "संपर्क अनुरोध भेजा गया",
    "market.contactRequestDescription": "आपने {farmer} से {product} खरीदने का अनुरोध किया है",
    "market.productListed": "उत्पाद सूचीबद्ध",
    "market.productListedDescription": "आपका उत्पाद बाज़ार में सूचीबद्ध किया गया है",
    "crops.wheat": "गेहूं",
    "crops.corn": "मक्का",
    "crops.soybeans": "सोयाबीन", 
    "crops.rice": "चावल",
    "crops.potatoes": "आलू",
    "crops.tomatoes": "टमाटर",
    "crops.apples": "सेब",
    "crops.oranges": "संतरा",
    "units.perTon": "प्रति टन",
    "units.perKg": "प्रति किलो",
    "farmers.greenValley": "ग्रीन वैली फार्म",
    "farmers.sunriseOrchards": "सनराइज़ ऑर्चर्ड्स",
    "farmers.riverCreek": "रिवर क्रीक फार्म्स",
    "farmers.sunnyMeadows": "सनी मेडोज़",
    "products.organicTomatoes": "जैविक टमाटर",
    "products.freshApples": "ताजे सेब",
    "products.organicPotatoes": "जैविक आलू",
    "products.premiumWheat": "प्रीमियम गेहूं",
    "locations.agritechValley": "एग्रीटेक वैली",
    "locations.highlandCounty": "हाईलैंड काउंटी",
    "locations.westfield": "वेस्टफील्ड",
    "locations.eastlakeCounty": "ईस्टलेक काउंटी",
    "locations.coimbatore": "कोयंबटूर",
    "months.jan": "जन",
    "months.dec": "दिस"
  }
};
