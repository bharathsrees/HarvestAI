import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  LineChart, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  ChevronDown,
  Plus,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useI18n } from "@/hooks/use-i18n";

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
  const { toast } = useToast();
  const { t } = useI18n();
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  
  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    crop: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: "Coimbatore",
    description: "",
    organic: false,
  });

  // Local storage key for market products
  const STORAGE_KEY = "harvestai-market-products";
  
  const marketPrices: CropPrice[] = [
    { id: 1, name: t("crops.wheat", "Wheat"), price: 280.50, unit: t("units.perTon", "per ton"), change: 1.2, trend: "up" },
    { id: 2, name: t("crops.corn", "Corn"), price: 220.75, unit: t("units.perTon", "per ton"), change: -0.8, trend: "down" },
    { id: 3, name: t("crops.soybeans", "Soybeans"), price: 550.25, unit: t("units.perTon", "per ton"), change: 2.3, trend: "up" },
    { id: 4, name: t("crops.rice", "Rice"), price: 420.00, unit: t("units.perTon", "per ton"), change: 0.5, trend: "up" },
    { id: 5, name: t("crops.potatoes", "Potatoes"), price: 12.35, unit: t("units.perKg", "per kg"), change: -1.5, trend: "down" },
    { id: 6, name: t("crops.tomatoes", "Tomatoes"), price: 3.75, unit: t("units.perKg", "per kg"), change: -2.1, trend: "down" },
    { id: 7, name: t("crops.apples", "Apples"), price: 2.50, unit: t("units.perKg", "per kg"), change: 0.2, trend: "stable" },
    { id: 8, name: t("crops.oranges", "Oranges"), price: 2.80, unit: t("units.perKg", "per kg"), change: 1.0, trend: "up" }
  ];
  
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
  
  const getTrendIcon = (trend: string, size: number = 16) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={size} className="text-green-500" />;
      case "down":
        return <TrendingDown size={size} className="text-red-500" />;
      default:
        return <LineChart size={size} className="text-gray-500" />;
    }
  };
  
  const handleCropSelect = (crop: CropPrice) => {
    setSelectedCrop(crop);
  };
  
const handleContact = (product: FarmerProduct) => {
  toast({
    title: t("market.contactRequestSent", "Contact Request Sent"),
    description: t(
      "market.contactRequestDescription",
      `You've requested to buy ${product.crop} from ${product.farmer}`
    ),
  });
};


  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewProduct(prev => ({ ...prev, [name]: checked }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle adding a new product
  const handleAddProduct = () => {
    if (!newProduct.crop || !newProduct.quantity || !newProduct.price) {
      toast({
        title: t("market.formError", "Form Error"),
        description: t("market.fillRequiredFields", "Please fill all required fields"),
        variant: "destructive"
      });
      return;
    }

    // Generate image URL based on crop name
    let imageUrl = "";
    const cropLower = newProduct.crop.toLowerCase();
    
    if (cropLower.includes("tomato")) {
      imageUrl = "https://images.unsplash.com/photo-1557800636-894a64c1696f";
    } else if (cropLower.includes("apple")) {
      imageUrl = "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a";
    } else if (cropLower.includes("potato")) {
      imageUrl = "https://images.unsplash.com/photo-1518977676601-b53f82aba655";
    } else if (cropLower.includes("wheat") || cropLower.includes("rice") || cropLower.includes("grain")) {
      imageUrl = "https://images.unsplash.com/photo-1535912559178-39783fccc107";
    } else if (cropLower.includes("corn")) {
      imageUrl = "https://images.unsplash.com/photo-1551754655-cd27e38d2076";
    } else if (cropLower.includes("soybean")) {
      imageUrl = "https://images.unsplash.com/photo-1620656798579-1984d9e87df7";
    } else if (cropLower.includes("orange") || cropLower.includes("citrus")) {
      imageUrl = "https://images.unsplash.com/photo-1605027620100-01f457196a1d";
    } else {
      // Default farm produce image
      imageUrl = "https://images.unsplash.com/photo-1471193945509-9ad0617afabf";
    }

    // Create new product with current timestamp as ID
    const newProductEntry: FarmerProduct = {
      id: Date.now(),
      farmer: "Your Farm", // Default name
      crop: newProduct.crop,
      quantity: parseInt(newProduct.quantity, 10),
      unit: newProduct.unit,
      price: parseFloat(newProduct.price),
      location: newProduct.location,
      organic: newProduct.organic,
      image: imageUrl
    };

    // Add new product to the list
    const updatedProducts = [...farmerProducts, newProductEntry];
    setFarmerProducts(updatedProducts);
    
    // Save only user-added products to localStorage
    const userAddedProducts = updatedProducts.filter(
      product => !initialFarmerProducts.some(initial => initial.id === product.id)
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userAddedProducts));

    // Show success toast
    toast({
      title: t("market.productListed", "Product Listed"),
      description: t("market.productListedDescription", "Your product has been listed on the marketplace")
    });
    
    // Reset form and hide it
    setNewProduct({
      crop: "",
      quantity: "",
      unit: "kg",
      price: "",
      location: "Coimbatore",
      description: "",
      organic: false,
    });
    setShowNewProductForm(false);
  };
  
  const filteredProducts = farmerProducts.filter((product) => 
    product.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <LineChart className="h-5 w-5 text-harvest-primary" />
                        <span>{t("market.currentCropPrices", "Current Crop Prices")}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <th className="px-4 py-2 text-left">{t("market.table.crop", "Crop")}</th>
                              <th className="px-4 py-2 text-right">{t("market.table.price", "Price")}</th>
                              <th className="px-4 py-2 text-right">{t("market.table.change", "Change")}</th>
                              <th className="px-4 py-2 text-center">{t("market.table.trend", "Trend")}</th>
                              <th className="px-4 py-2 text-center">{t("market.table.action", "Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marketPrices.map((crop) => (
                              <tr 
                                key={crop.id} 
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={() => handleCropSelect(crop)}
                              >
                                <td className="px-4 py-3 font-medium">{crop.name}</td>
                                <td className="px-4 py-3 text-right">
                                  ${crop.price.toFixed(2)} <span className="text-gray-500 dark:text-gray-400 text-xs">{crop.unit}</span>
                                </td>
                                <td className={px-4 py-3 text-right ${
                                  crop.change > 0 
                                    ? "text-green-600" 
                                    : crop.change < 0 
                                      ? "text-red-600" 
                                      : "text-gray-600 dark:text-gray-400"
                                }}>
                                  {crop.change > 0 ? "+" : ""}{crop.change.toFixed(1)}%
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {getTrendIcon(crop.trend)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button 
                                    className="text-xs text-harvest-primary hover:text-harvest-secondary underline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCropSelect(crop);
                                    }}
                                  >
                                    {t("market.details", "Details")}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <p>{t("market.lastUpdated", "Last updated")}: {t("market.today", "Today")}, 10:30 AM</p>
                        <p className="flex items-center">
                          <AlertTriangle size={14} className="mr-1 text-yellow-500" />
                          {t("market.pricesDisclaimer", "Prices may vary by region and quality")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="marketplace">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <ShoppingCart className="h-5 w-5 text-harvest-primary" />
                        <span>{t("market.farmersMarketplace", "Farmer's Marketplace")}</span>
                      </CardTitle>
                      <Button 
                        className="bg-harvest-primary hover:bg-harvest-secondary"
                        onClick={() => setShowNewProductForm(!showNewProductForm)}
                      >
                        <Plus size={16} className="mr-1" />
                        {t("market.listProduct", "List Product")}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {showNewProductForm && (
                        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-medium mb-4 dark:text-gray-100">{t("market.listYourProduct", "List Your Product")}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("market.form.productName", "Crop/Product Name")}*
                              </label>
                              <Input 
                                name="crop"
                                value={newProduct.crop}
                                onChange={handleInputChange}
                                placeholder={t("market.form.productNamePlaceholder", "e.g., Organic Tomatoes")} 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("market.form.quantityAndUnit", "Quantity & Unit")}*
                              </label>
                              <div className="flex space-x-2">
                                <Input 
                                  name="quantity"
                                  value={newProduct.quantity}
                                  onChange={handleInputChange}
                                  type="number" 
                                  placeholder={t("market.form.amount", "Amount")} 
                                  className="w-2/3" 
                                />
                                <select 
                                  name="unit"
                                  value={newProduct.unit}
                                  onChange={handleInputChange}
                                  className="w-1/3 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-3 py-2 bg-white dark:bg-gray-900 text-sm"
                                >
                                  <option value="kg">kg</option>
                                  <option value="ton">ton</option>
                                  <option value="boxes">boxes</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("market.form.pricePerUnit", "Price per Unit ($)")}*
                              </label>
                              <Input 
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                type="number" 
                                placeholder={t("market.form.price", "Price")} 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("market.form.location", "Location")}
                              </label>
                              <Input 
                                name="location"
                                value={newProduct.location}
                                onChange={handleInputChange}
                                placeholder={t("market.form.locationPlaceholder", "Your farm location")} 
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("market.form.productDescription", "Product Description")}
                              </label>
                              <textarea 
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-3 py-2 bg-white dark:bg-gray-900 text-sm"
                                rows={3}
                                placeholder={t("market.form.descriptionPlaceholder", "Describe your product (quality, harvesting date, etc.)")}
                              ></textarea>
                            </div>
                            <div>
                              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <input
                                  type="checkbox"
                                  name="organic"
                                  checked={newProduct.organic}
                                  onChange={handleInputChange}
                                  className="mr-2 rounded"
                                />
                                {t("market.form.organic", "Organic Product")}
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowNewProductForm(false)}
                            >
                              {t("common.cancel", "Cancel")}
                            </Button>
                            <Button 
                              className="bg-harvest-primary hover:bg-harvest-secondary"
                              onClick={handleAddProduct}
                            >
                              {t("market.listProduct", "List Product")}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            placeholder={t("market.searchPlaceholder", "Search by crop, farmer, or location")} 
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <div 
                              key={product.id}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <div className="h-40 overflow-hidden">
                                <img 
                                  src={product.image}
                                  alt={product.crop}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.crop}</h3>
                                  {product.organic && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      {t("market.organic", "Organic")}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.farmer}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-sm">
                                    <span className="font-medium">${product.price.toFixed(2)}</span>/
                                    <span className="text-gray-500 dark:text-gray-400">{product.unit}</span>
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {product.quantity} {product.unit} {t("market.available", "available")}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {t("market.location", "Location")}: {product.location}
                                </p>
                                <Button 
                                  className="w-full mt-3 bg-harvest-primary hover:bg-harvest-secondary"
                                  onClick={() => handleContact(product)}
                                >
                                  {t("market.contactSeller", "Contact Seller")}
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">{t("market.noProductsFound", "No products found matching your search.")}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="h-5 w-5 text-harvest-primary" />
                    <span>{t("market.insights", "Market Insights")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedCrop ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedCrop.name}</h3>
                        <div className="flex items-center">
                          {getTrendIcon(selectedCrop.trend, 20)}
                          <span className={ml-1 font-medium ${
                            selectedCrop.change > 0 
                              ? "text-green-600" 
                              : selectedCrop.change < 0 
                                ? "text-red-600" 
                                : "text-gray-600 dark:text-gray-400"
                          }}>
                            {selectedCrop.change > 0 ? "+" : ""}{selectedCrop.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("market.currentPrice", "Current Price")}:</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          ${selectedCrop.price.toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{selectedCrop.unit}</span>
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{t("market.priceHistory", "Price History")}</h4>
                          <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-md flex items-end px-2">
                            {/* Placeholder for chart - in real app would use Recharts */}
                            {[...Array(12)].map((_, i) => {
                              const height = 30 + Math.random() * 50;
                              return (
                                <div 
                                  key={i} 
                                  className="w-1/12 mx-0.5"
                                  style={{ height: ${height}% }}
                                >
                                  <div 
                                    className={w-full h-full rounded-t ${
                                      i === 11 ? 'bg-harvest-primary' : 'bg-gray-300 dark:bg-gray-600'
                                    }}
                                  ></div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>{t("months.jan", "Jan")}</span>
                            <span>{t("months.dec", "Dec")}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{t("market.analysis", "Market Analysis")}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCrop.trend === "up" 
                              ? t("market.analysis.up", ${selectedCrop.name} prices are trending upward due to increased demand and lower supplies. Consider holding if you can store safely.)
                              : selectedCrop.trend === "down"
                                ? t("market.analysis.down", ${selectedCrop.name} prices are declining due to seasonal harvests increasing supply. Consider selling soon if quality might degrade.)
                                : t("market.analysis.stable", ${selectedCrop.name} prices are stable with consistent demand. Good time for regular selling.)
                            }
                          </p>
                        </div>
                        
                        <div className="bg-harvest-light dark:bg-gray-800 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{t("market.tradingTip", "Trading Tip")}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCrop.trend === "up" 
                              ? t("market.tradingTip.up", "Consider forward contracts to lock in current high prices for future production.")
                              : selectedCrop.trend === "down"
                                ? t("market.tradingTip.down", "Look into value-added processing options to increase profit margins during low price periods.")
                                : t("market.tradingTip.stable", "Diversify your selling strategy with a mix of spot market sales and forward contracts.")
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <LineChart className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">{t("market.selectCrop", "Select a Crop")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("market.selectCropInstruction", "Click on a crop in the market prices table to view detailed insights")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
