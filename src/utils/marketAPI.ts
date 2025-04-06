// Market price API service
export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

export interface CropDetail {
  id: string;
  name: string;
  currentPrice: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  priceHistory: { date: string; price: number }[];
  description: string;
  image?: string;
}

// Cache market data to avoid excessive data loading
let marketPriceCache: { 
  data: MarketPrice[] | null; 
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

// Use a realistic dataset based on actual crop prices
export const getMarketPrices = async (): Promise<MarketPrice[]> => {
  try {
    // Check if we have cached data that's less than 1 hour old
    const now = Date.now();
    if (marketPriceCache.data && now - marketPriceCache.timestamp < 60 * 60 * 1000) {
      console.log("Using cached market price data");
      return marketPriceCache.data;
    }

    // In a real app, this would fetch from an API
    // For demo, generate realistic data
    const crops = [
      { id: "rice-001", name: "Rice", basePrice: 35.50, unit: "per kg" },
      { id: "wheat-001", name: "Wheat", basePrice: 28.75, unit: "per kg" },
      { id: "corn-001", name: "Corn", basePrice: 20.25, unit: "per kg" },
      { id: "potatoes-001", name: "Potatoes", basePrice: 25.60, unit: "per kg" },
      { id: "tomatoes-001", name: "Tomatoes", basePrice: 40.80, unit: "per kg" },
      { id: "soybeans-001", name: "Soybeans", basePrice: 52.30, unit: "per kg" },
      { id: "sugarcane-001", name: "Sugarcane", basePrice: 32.15, unit: "per quintal" },
      { id: "cotton-001", name: "Cotton", basePrice: 6800, unit: "per quintal" }
    ];
    
    const marketPrices: MarketPrice[] = crops.map(crop => {
      // Randomize price changes for demo
      const changePercent = (Math.random() * 6) - 3; // -3% to +3%
      const change = parseFloat((crop.basePrice * (changePercent / 100)).toFixed(2));
      const currentPrice = parseFloat((crop.basePrice + change).toFixed(2));
      
      return {
        id: crop.id,
        crop: crop.name,
        price: currentPrice,
        unit: crop.unit,
        change: changePercent,
        trend: changePercent > 0.5 ? "up" : changePercent < -0.5 ? "down" : "stable",
        lastUpdated: new Date().toISOString()
      };
    });
    
    // Cache the result
    marketPriceCache = {
      data: marketPrices,
      timestamp: now
    };
    
    return marketPrices;
  } catch (error) {
    console.error("Market data error:", error);
    throw error;
  }
};

export const getCropDetails = async (cropId: string): Promise<CropDetail | null> => {
  try {
    const allCrops = await getMarketPrices();
    const crop = allCrops.find(c => c.id === cropId);
    
    if (!crop) {
      return null;
    }
    
    // Generate historical price data for the selected crop
    const today = new Date();
    const priceHistory = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (29 - i));
      
      // Create some realistic price variation
      const basePrice = crop.price - (crop.change * 5); // Starting point for history
      const dailyChange = (Math.sin(i * 0.3) * 8) + (Math.random() * 3) - 1.5;
      const historicalPrice = parseFloat((basePrice + dailyChange).toFixed(2));
      
      return {
        date: date.toISOString().split('T')[0],
        price: historicalPrice > 0 ? historicalPrice : basePrice
      };
    });
    
    return {
      id: crop.id,
      name: crop.crop,
      currentPrice: crop.price,
      unit: crop.unit,
      change: crop.change,
      trend: crop.trend,
      lastUpdated: crop.lastUpdated,
      priceHistory,
      description: `${crop.crop} is a major agricultural commodity in India. Prices are influenced by seasonal harvest patterns, domestic demand, and export markets.`
    };
  } catch (error) {
    console.error("Error getting crop details:", error);
    return null;
  }
};
