import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketPrices from "@/components/market/MarketPrices";
import FarmerMarketplace from "@/components/market/FarmerMarketplace";
import MarketInsights from "@/components/market/MarketInsights";
import { useI18n } from "@/hooks/use-i18n";

const MarketPage = () => {
  const { t } = useI18n();
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t("market.title", "Market Prices & Direct Sales")}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {t("market.description", "Track real-time crop prices and connect directly with buyers or sellers")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="prices" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prices">
                    {t("market.tabs.prices", "Market Prices")}
                  </TabsTrigger>
                  <TabsTrigger value="marketplace">
                    {t("market.tabs.marketplace", "Farmer Marketplace")}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="prices">
                  <MarketPrices 
                    selectedCropId={selectedCropId}
                    onSelectCrop={setSelectedCropId}
                    onBack={() => setSelectedCropId(null)}
                  />
                </TabsContent>
                
                <TabsContent value="marketplace">
                  <FarmerMarketplace />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <MarketInsights cropId={selectedCropId} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
