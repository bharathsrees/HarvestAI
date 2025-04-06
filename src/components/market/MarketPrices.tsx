import { useState, useEffect } from "react";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  MinusCircle, 
  ChevronRight, 
  Loader, 
  RefreshCw,
  ChevronLeft
} from "lucide-react";
import { getMarketPrices, getCropDetails, MarketPrice, CropDetail } from "@/utils/marketAPI";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/use-i18n";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MarketPricesProps {
  selectedCropId: string | null;
  onSelectCrop: (cropId: string) => void;
  onBack: () => void;
}

const MarketPrices = ({ selectedCropId, onSelectCrop, onBack }: MarketPricesProps) => {
  const { t } = useI18n();
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [cropDetails, setCropDetails] = useState<CropDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const loadMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMarketPrices();
      setMarketPrices(data);
    } catch (err) {
      console.error("Market data error:", err);
      setError(t("market.loadError", "Failed to load market data. Please try again later."));
      toast({
        title: t("market.errorTitle", "Market Data Error"),
        description: t("market.errorDescription", "Could not load market prices. Please try again."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCropDetails = async (cropId: string) => {
    try {
      setLoading(true);
      const details = await getCropDetails(cropId);
      setCropDetails(details);
    } catch (error) {
      console.error("Error loading crop details:", error);
      toast({
        title: t("market.errorTitle", "Market Data Error"),
        description: t("market.detailsError", "Could not load crop details. Please try again."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCropId) {
      loadCropDetails(selectedCropId);
    } else {
      loadMarketData();
    }
  }, [selectedCropId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getMarketPrices();
      setMarketPrices(data);
      toast({
        title: t("market.refreshSuccess", "Prices Updated"),
        description: t("market.refreshDescription", "Market prices have been refreshed with the latest data."),
      });
    } catch (err) {
      toast({
        title: t("market.refreshFailed", "Refresh Failed"),
        description: t("market.refreshFailedDesc", "Could not refresh market prices. Please try again."),
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case "down":
        return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      case "stable":
        return <MinusCircle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="h-80 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-harvest-primary mb-3" />
        <p className="text-gray-500 dark:text-gray-300">
          {t("market.loading", "Loading market data...")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button 
          onClick={loadMarketData} 
          className="px-4 py-2 bg-harvest-primary text-white rounded hover:bg-harvest-primary/90"
        >
          {t("common.tryAgain", "Try Again")}
        </button>
      </div>
    );
  }

  if (selectedCropId && cropDetails) {
    return (
      <div>
        <button 
          onClick={onBack}
          className="mb-4 flex items-center text-harvest-primary hover:text-harvest-secondary"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("market.backToPrices", "Back to Market Prices")}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {cropDetails.name}
              </h2>
              <div className="flex items-center">
                <span className={`text-2xl font-semibold mr-2 ${
                  cropDetails.change > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : cropDetails.change < 0 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  ₹{cropDetails.currentPrice.toFixed(2)}
                </span>
                {getTrendIcon(cropDetails.trend)}
              </div>
            </div>

            <div className="h-64 w-full mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("market.priceHistory", "Price History (30 Days)")}
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropDetails.priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toFixed(2)}`, t("market.price", "Price")]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("market.aboutCrop", "About {crop}", { crop: cropDetails.name })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cropDetails.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-gray-700 dark:text-gray-200 font-medium">
          {t("market.currentPrices", "Current Crop Prices")}
        </h3>
        <button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-xs">{t("common.refresh", "Refresh")}</span>
        </button>
      </div>
      <div className="overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("market.crop", "Crop")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("market.price", "Price")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("market.change", "Change")}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("market.trend", "Trend")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("market.action", "Action")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {marketPrices.map((price) => (
              <tr key={price.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {price.crop}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                  ₹{price.price.toFixed(2)} <span className="text-xs text-gray-500 dark:text-gray-400">{price.unit}</span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                  price.change > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : price.change < 0 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {price.change > 0 ? '+' : ''}{price.change.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {getTrendIcon(price.trend)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button 
                    onClick={() => onSelectCrop(price.id)}
                    className="inline-flex items-center text-harvest-primary hover:text-harvest-secondary"
                  >
                    {t("market.details", "Details")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 italic">
        {t("market.lastUpdated", "Last updated")}: {new Date().toLocaleString()} · {t("market.priceDisclaimer", "Prices may vary by region and quality")}
      </div>
    </div>
  );
};

export default MarketPrices;
