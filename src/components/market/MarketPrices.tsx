import { LineChart, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";

interface CropPrice {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
}

interface MarketPricesProps {
  selectedCrop: CropPrice | null;
  onSelectCrop: (crop: CropPrice) => void;
}

const MarketPrices = ({ selectedCrop, onSelectCrop }: MarketPricesProps) => {
  const { t } = useI18n();
  
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

  return (
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
                  onClick={() => onSelectCrop(crop)}
                >
                  <td className="px-4 py-3 font-medium">{crop.name}</td>
                  <td className="px-4 py-3 text-right">
                    ${crop.price.toFixed(2)} <span className="text-gray-500 dark:text-gray-400 text-xs">{crop.unit}</span>
                  </td>
                  <td className={`px-4 py-3 text-right ${
                    crop.change > 0 
                      ? "text-green-600" 
                      : crop.change < 0 
                        ? "text-red-600" 
                        : "text-gray-600 dark:text-gray-400"
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
                        onSelectCrop(crop);
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
  );
};

export default MarketPrices;
