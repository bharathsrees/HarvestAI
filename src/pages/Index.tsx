import { Link } from "react-router-dom";
import { 
  Scan, 
  Cloud, 
  ShoppingCart, 
  Leaf, 
  Droplet, 
  Sprout, 
  LineChart, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureCard from "@/components/common/FeatureCard";
import { useI18n } from "@/hooks/use-i18n";

const Index = () => {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in">
                <span className="text-harvest-primary">{t("hero.smartFarming", "Smart Farming")}</span> {t("hero.with", "with")} {t("common.title", "HarvestAI")}
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {t("hero.description", "AI-powered tools to help farmers identify crop diseases, track weather patterns, and connect directly with consumers.")}
              </p>
              <div className="mt-8 flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button asChild className="bg-harvest-primary hover:bg-harvest-secondary text-white px-6 py-3 rounded-md text-lg">
                  <Link to="/scan">{t("nav.getStarted", "Get Started")}</Link>
                </Button>
                <Button asChild variant="outline" className="border-harvest-primary text-harvest-primary hover:bg-harvest-light px-6 py-3 rounded-md text-lg">
                  <a href="#features">{t("hero.learnMore", "Learn More")}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{t("features.title", "Our Features")}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {t("features.description", "HarvestAI provides farmers with powerful tools to maximize productivity and profitability.")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/scan" className="block hover:no-underline">
                <FeatureCard
                  title={t("features.scanner.title", "Crop Disease Scanner")}
                  description={t("features.scanner.description", "Upload photos of your crops to instantly identify diseases and get treatment recommendations.")}
                  icon={<Scan size={24} />}
                />
              </Link>
              
              <Link to="/weather" className="block hover:no-underline">
                <FeatureCard
                  title={t("features.weather.title", "Weather Dashboard")}
                  description={t("features.weather.description", "Access 3-day forecasts with smart irrigation recommendations based on local conditions.")}
                  icon={<Cloud size={24} />}
                />
              </Link>
              
              <Link to="/market" className="block hover:no-underline">
                <FeatureCard
                  title={t("features.market.title", "Market Prices")}
                  description={t("features.market.description", "Track real-time crop prices and connect directly with consumers for better profits.")}
                  icon={<ShoppingCart size={24} />}
                />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{t("benefits.title", "Why Choose HarvestAI")}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {t("benefits.description", "Our platform is designed to address the unique challenges facing modern farmers.")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-harvest-light text-harvest-primary mb-4">
                  <Leaf size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("benefits.earlyDetection.title", "Early Detection")}</h3>
                <p className="text-gray-600">{t("benefits.earlyDetection.description", "Identify crop diseases before they spread to save your harvest.")}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-harvest-light text-harvest-primary mb-4">
                  <Droplet size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("benefits.waterEfficiency.title", "Water Efficiency")}</h3>
                <p className="text-gray-600">{t("benefits.waterEfficiency.description", "Optimize irrigation based on weather patterns and soil conditions.")}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-harvest-light text-harvest-primary mb-4">
                  <LineChart size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("benefits.betterProfits.title", "Better Profits")}</h3>
                <p className="text-gray-600">{t("benefits.betterProfits.description", "Get the best prices by tracking market trends and selling directly.")}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-harvest-light text-harvest-primary mb-4">
                  <Sprout size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("benefits.sustainable.title", "Sustainable Farming")}</h3>
                <p className="text-gray-600">{t("benefits.sustainable.description", "Make data-driven decisions to minimize environmental impact.")}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 harvest-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("cta.title", "Ready to Transform Your Farming?")}</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8">
              {t("cta.description", "Join thousands of farmers already using HarvestAI to increase yields and profitability.")}
            </p>
            <Button asChild className="bg-white text-harvest-primary hover:bg-gray-100 px-6 py-3 rounded-md text-lg">
              <Link to="/scan">{t("cta.button", "Get Started Now")}</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
