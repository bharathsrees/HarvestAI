import { Layers, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CropPrice {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
}

interface MarketInsightsProps {
  selectedCrop: CropPrice | null;
}

const MarketInsights = ({ selectedCrop }: MarketInsightsProps) => {
  const { t } = useI18n();

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
                <span className={`ml-1 font-medium ${
                  selectedCrop.change > 0 
                    ? "text-green-600" 
                    : selectedCrop.change < 0 
                      ? "text-red-600" 
                      : "text-gray-600 dark:text-gray-400"
                }`}>
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
                        style={{ height: `${height}%` }}
                      >
                        <div 
                          className={`w-full h-full rounded-t ${
                            i === 11 ? 'bg-harvest-primary' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
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
                    ? t("market.analysis.up", `${selectedCrop.name} prices are trending upward due to increased demand and lower supplies. Consider holding if you can store safely.`)
                    : selectedCrop.trend === "down"
                      ? t("market.analysis.down", `${selectedCrop.name} prices are declining due to seasonal harvests increasing supply. Consider selling soon if quality might degrade.`)
                      : t("market.analysis.stable", `${selectedCrop.name} prices are stable with consistent demand. Good time for regular selling.`)
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
  );
};

export default MarketInsights;
