import { useState } from "react";
import { 
  ShoppingCart, 
  Plus,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/use-i18n";

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

interface FarmerMarketplaceProps {
  initialFarmerProducts: FarmerProduct[];
  farmerProducts: FarmerProduct[];
  setFarmerProducts: (products: FarmerProduct[]) => void;
  storageKey: string;
}

const FarmerMarketplace = ({ 
  initialFarmerProducts, 
  farmerProducts, 
  setFarmerProducts,
  storageKey
}: FarmerMarketplaceProps) => {
  const { toast } = useToast();
  const { t } = useI18n();
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
    localStorage.setItem(storageKey, JSON.stringify(userAddedProducts));

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
  
  const handleContact = (product: FarmerProduct) => {
    toast({
      title: t("market.contactRequestSent", "Contact Request Sent"),
      description: t("market.contactRequestDescription", `You've requested to buy ${product.crop} from ${product.farmer}`)
    });
  };

  const filteredProducts = farmerProducts.filter((product) => 
    product.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
};

export default FarmerMarketplace;
