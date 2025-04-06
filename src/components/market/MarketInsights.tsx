import { TrendingUp, TrendingDown, Minus, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCropDetails } from "@/utils/marketAPI";
import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/use-i18n";

interface MarketInsightsProps {
  cropId: string | null;
}

const MarketInsights = ({ cropId }: MarketInsightsProps) => {
  const { t } = useI18n();
  const [cropDetails, setCropDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cropId) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          const details = await getCropDetails(cropId);
          setCropDetails(details);
        } catch (error) {
          console.error("Error loading crop details:", error);
        } finally {
          setLoading(false);
        }
      };
      loadDetails();
    } else {
      setCropDetails(null);
    }
  }, [cropId]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case "stable":
        return <Minus className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getAnalysisText = (cropName: string, trend: string) => {
    switch (trend) {
      case "up":
        return t("market.analysis.up", `${cropName} prices are trending upward due to increased demand and lower supplies. Consider holding if you can store safely.`);
      case "down":
        return t("market.analysis.down", `${cropName} prices are declining due to seasonal harvests increasing supply. Consider selling soon if quality might degrade.`);
      case "stable":
        return t("market.analysis.stable", `${cropName} prices are stable with consistent demand. Good time for regular selling.`);
      default:
        return "";
    }
  };

  const getTradingTip = (trend: string) => {
    switch (trend) {
      case "up":
        return t("market.tradingTip.up", "Consider forward contracts to lock in current high prices for future production.");
      case "down":
        return t("market.tradingTip.down", "Look into value-added processing options to increase profit margins during low price periods.");
      case "stable":
        return t("market.tradingTip.stable", "Diversify your selling strategy with a mix of spot market sales and forward contracts.");
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="h-80 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-harvest-primary mb-3" />
        <p className="text-gray-500 dark:text-gray-300">
          {t("market.loadingInsights", "Loading market insights...")}
        </p>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>{t("market.insights", "Market Insights")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cropDetails ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("market.currentPrice", "Current Price")}
              </h3>
              <div className="flex items-center">
                <span className={`text-2xl font-semibold ${
                  cropDetails.change > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : cropDetails.change < 0 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  ₹{cropDetails.currentPrice.toFixed(2)}
                </span>
                <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">
                  {cropDetails.unit}
                </span>
              </div>
              <div className="mt-1 text-sm">
                <span className={`font-medium ${
                  cropDetails.change > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : cropDetails.change < 0 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {cropDetails.change > 0 ? '+' : ''}{cropDetails.change.toFixed(2)}%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  {t("market.fromPreviousDay", "from previous day")}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("market.analysis", "Market Analysis")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getAnalysisText(cropDetails.name, cropDetails.trend)}
              </p>
            </div>

            <div className="bg-harvest-light/30 dark:bg-harvest-light/10 p-4 rounded-lg border border-harvest-primary/20">
              <h3 className="text-sm font-medium text-harvest-secondary dark:text-harvest-primary mb-2">
                {t("market.tradingTip", "Trading Tip")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getTradingTip(cropDetails.trend)}
              </p>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
              {t("market.lastUpdated", "Last updated")}: {new Date(cropDetails.lastUpdated).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4">
              <TrendingUp className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              {t("market.selectCrop", "Select a Crop")}
            </h3>
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
