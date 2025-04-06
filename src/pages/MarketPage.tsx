import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketPrices from "@/components/market/MarketPrices";
import FarmerMarketplace from "@/components/market/FarmerMarketplace";
import MarketInsights from "@/components/market/MarketInsights";

interface CropPrice {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
}

interface FarmerProduct {
  id: number;
  farmer: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  organic: boolean;
  image: string;
}

const MarketPage = () => {
  const { t } = useI18n();
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  
  // Local storage key for market products
  const STORAGE_KEY = "harvestai-market-products";
  
  // Initial product data
  const initialFarmerProducts: FarmerProduct[] = [
    {
      id: 1,
      farmer: t("farmers.greenValley", "Green Valley Farm"),
      crop: t("products.organicTomatoes", "Organic Tomatoes"),
      quantity: 500,
      unit: "kg",
      price: 4.25,
      location: t("locations.agritechValley", "Agritech Valley"),
      organic: true,
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f"
    },
    {
      id: 2,
      farmer: t("farmers.sunriseOrchards", "Sunrise Orchards"),
      crop: t("products.freshApples", "Fresh Apples"),
      quantity: 750,
      unit: "kg",
      price: 2.75,
      location: t("locations.highlandCounty", "Highland County"),
      organic: false,
      image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a"
    },
    {
      id: 3,
      farmer: t("farmers.riverCreek", "River Creek Farms"),
      crop: t("products.organicPotatoes", "Organic Potatoes"),
      quantity: 1200,
      unit: "kg",
      price: 1.80,
      location: t("locations.westfield", "Westfield"),
      organic: true,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
    },
    {
      id: 4,
      farmer: t("farmers.sunnyMeadows", "Sunny Meadows"),
      crop: t("products.premiumWheat", "Premium Wheat"),
      quantity: 3000,
      unit: "kg",
      price: 0.95,
      location: t("locations.eastlakeCounty", "Eastlake County"),
      organic: false,
      image: "https://images.unsplash.com/photo-1535912559178-39783fccc107"
    }
  ];

  // State for farmer products (including user-added ones)
  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>([]);

  // Load saved products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setFarmerProducts([...initialFarmerProducts, ...parsedProducts]);
      } catch (error) {
        console.error("Error parsing saved products:", error);
        setFarmerProducts(initialFarmerProducts);
      }
    } else {
      setFarmerProducts(initialFarmerProducts);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t("market.title", "Market Prices & Direct Sales")}</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {t("market.description", "Track real-time crop prices and connect directly with buyers or sellers")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="prices" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prices">{t("market.tabs.prices", "Market Prices")}</TabsTrigger>
                  <TabsTrigger value="marketplace">{t("market.tabs.marketplace", "Farmer Marketplace")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="prices">
                  <MarketPrices 
                    selectedCrop={selectedCrop}
                    onSelectCrop={setSelectedCrop}
                  />
                </TabsContent>
                
                <TabsContent value="marketplace">
                  <FarmerMarketplace 
                    initialFarmerProducts={initialFarmerProducts}
                    farmerProducts={farmerProducts}
                    setFarmerProducts={setFarmerProducts}
                    storageKey={STORAGE_KEY}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <MarketInsights selectedCrop={selectedCrop} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
