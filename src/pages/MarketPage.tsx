
import { useState } from "react";
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
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  
  const marketPrices: CropPrice[] = [
    { id: 1, name: "Wheat", price: 280.50, unit: "per ton", change: 1.2, trend: "up" },
    { id: 2, name: "Corn", price: 220.75, unit: "per ton", change: -0.8, trend: "down" },
    { id: 3, name: "Soybeans", price: 550.25, unit: "per ton", change: 2.3, trend: "up" },
    { id: 4, name: "Rice", price: 420.00, unit: "per ton", change: 0.5, trend: "up" },
    { id: 5, name: "Potatoes", price: 12.35, unit: "per kg", change: -1.5, trend: "down" },
    { id: 6, name: "Tomatoes", price: 3.75, unit: "per kg", change: -2.1, trend: "down" },
    { id: 7, name: "Apples", price: 2.50, unit: "per kg", change: 0.2, trend: "stable" },
    { id: 8, name: "Oranges", price: 2.80, unit: "per kg", change: 1.0, trend: "up" }
  ];
  
  const farmerProducts: FarmerProduct[] = [
    {
      id: 1,
      farmer: "Green Valley Farm",
      crop: "Organic Tomatoes",
      quantity: 500,
      unit: "kg",
      price: 4.25,
      location: "Agritech Valley",
      organic: true,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    },
    {
      id: 2,
      farmer: "Sunrise Orchards",
      crop: "Fresh Apples",
      quantity: 750,
      unit: "kg",
      price: 2.75,
      location: "Highland County",
      organic: false,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      id: 3,
      farmer: "River Creek Farms",
      crop: "Organic Potatoes",
      quantity: 1200,
      unit: "kg",
      price: 1.80,
      location: "Westfield",
      organic: true,
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
    },
    {
      id: 4,
      farmer: "Sunny Meadows",
      crop: "Premium Wheat",
      quantity: 3000,
      unit: "kg",
      price: 0.95,
      location: "Eastlake County",
      organic: false,
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
    }
  ];
  
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
      title: "Contact Request Sent",
      description: `You've requested to buy ${product.crop} from ${product.farmer}`
    });
  };
  
  const handleAddProduct = () => {
    toast({
      title: "Product Listed",
      description: "Your product has been listed on the marketplace"
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
            <h1 className="text-3xl font-bold text-gray-900">Market Prices & Direct Sales</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track real-time crop prices and connect directly with buyers or sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="prices" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prices">Market Prices</TabsTrigger>
                  <TabsTrigger value="marketplace">Farmer Marketplace</TabsTrigger>
                </TabsList>
                
                <TabsContent value="prices">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <LineChart className="h-5 w-5 text-harvest-primary" />
                        <span>Current Crop Prices</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left">Crop</th>
                              <th className="px-4 py-2 text-right">Price</th>
                              <th className="px-4 py-2 text-right">Change</th>
                              <th className="px-4 py-2 text-center">Trend</th>
                              <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marketPrices.map((crop) => (
                              <tr 
                                key={crop.id} 
                                className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCropSelect(crop)}
                              >
                                <td className="px-4 py-3 font-medium">{crop.name}</td>
                                <td className="px-4 py-3 text-right">
                                  ${crop.price.toFixed(2)} <span className="text-gray-500 text-xs">{crop.unit}</span>
                                </td>
                                <td className={`px-4 py-3 text-right ${
                                  crop.change > 0 
                                    ? "text-green-600" 
                                    : crop.change < 0 
                                      ? "text-red-600" 
                                      : "text-gray-600"
                                }`}>
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
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                        <p>Last updated: Today, 10:30 AM</p>
                        <p className="flex items-center">
                          <AlertTriangle size={14} className="mr-1 text-yellow-500" />
                          Prices may vary by region and quality
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
                        <span>Farmer's Marketplace</span>
                      </CardTitle>
                      <Button 
                        className="bg-harvest-primary hover:bg-harvest-secondary"
                        onClick={() => setShowNewProductForm(!showNewProductForm)}
                      >
                        <Plus size={16} className="mr-1" />
                        List Product
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {showNewProductForm && (
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h3 className="text-lg font-medium mb-4">List Your Product</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Crop/Product Name
                              </label>
                              <Input placeholder="e.g., Organic Tomatoes" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity & Unit
                              </label>
                              <div className="flex space-x-2">
                                <Input type="number" placeholder="Amount" className="w-2/3" />
                                <select className="w-1/3 rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm">
                                  <option>kg</option>
                                  <option>ton</option>
                                  <option>boxes</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price per Unit ($)
                              </label>
                              <Input type="number" placeholder="Price" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                              </label>
                              <Input placeholder="Your farm location" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Description
                              </label>
                              <textarea 
                                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm"
                                rows={3}
                                placeholder="Describe your product (quality, harvesting date, etc.)"
                              ></textarea>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowNewProductForm(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-harvest-primary hover:bg-harvest-secondary"
                              onClick={handleAddProduct}
                            >
                              List Product
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            placeholder="Search by crop, farmer, or location" 
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
                              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
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
                                  <h3 className="font-medium text-gray-900">{product.crop}</h3>
                                  {product.organic && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                      Organic
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{product.farmer}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-sm">
                                    <span className="font-medium">${product.price.toFixed(2)}</span>/
                                    <span className="text-gray-500">{product.unit}</span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {product.quantity} {product.unit} available
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Location: {product.location}
                                </p>
                                <Button 
                                  className="w-full mt-3 bg-harvest-primary hover:bg-harvest-secondary"
                                  onClick={() => handleContact(product)}
                                >
                                  Contact Seller
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p className="text-gray-500">No products found matching your search.</p>
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
                    <span>Market Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedCrop ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{selectedCrop.name}</h3>
                        <div className="flex items-center">
                          {getTrendIcon(selectedCrop.trend, 20)}
                          <span className={`ml-1 font-medium ${
                            selectedCrop.change > 0 
                              ? "text-green-600" 
                              : selectedCrop.change < 0 
                                ? "text-red-600" 
                                : "text-gray-600"
                          }`}>
                            {selectedCrop.change > 0 ? "+" : ""}{selectedCrop.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-2">Current Price:</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${selectedCrop.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">{selectedCrop.unit}</span>
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Price History</h4>
                          <div className="h-20 bg-gray-100 rounded-md flex items-end px-2">
                            {/* Placeholder for chart - in real app would use Recharts */}
                            {[...Array(12)].map((_, i) => {
                              const height = 30 + Math.random() * 50;
                              return (
                                <div 
                                  key={i} 
                                  className="w-1/12 mx-0.5"
                                  style={{ height: `${height}%` }}
                                >
                                  <div 
                                    className={`w-full h-full rounded-t ${
                                      i === 11 ? 'bg-harvest-primary' : 'bg-gray-300'
                                    }`}
                                  ></div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Jan</span>
                            <span>Dec</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Market Analysis</h4>
                          <p className="text-sm text-gray-600">
                            {selectedCrop.trend === "up" 
                              ? `${selectedCrop.name} prices are trending upward due to increased demand and lower supplies. Consider holding if you can store safely.`
                              : selectedCrop.trend === "down"
                                ? `${selectedCrop.name} prices are declining due to seasonal harvests increasing supply. Consider selling soon if quality might degrade.`
                                : `${selectedCrop.name} prices are stable with consistent demand. Good time for regular selling.`
                            }
                          </p>
                        </div>
                        
                        <div className="bg-harvest-light rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Trading Tip</h4>
                          <p className="text-sm text-gray-600">
                            {selectedCrop.trend === "up" 
                              ? "Consider forward contracts to lock in current high prices for future production."
                              : selectedCrop.trend === "down"
                                ? "Look into value-added processing options to increase profit margins during low price periods."
                                : "Diversify your selling strategy with a mix of spot market sales and forward contracts."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <LineChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Select a Crop</h3>
                      <p className="text-sm text-gray-500">
                        Click on a crop in the market prices table to view detailed insights
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
