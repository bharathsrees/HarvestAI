
import { useState, useEffect } from "react";
import { 
  Cloud, 
  Droplet, 
  Thermometer, 
  Wind, 
  Clock, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  wind: number;
  rainfall: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "foggy" | "snowy";
}

const WeatherPage = () => {
  const [location, setLocation] = useState("Coimbatore");
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    date: new Date().toLocaleDateString(),
    temperature: 24,
    humidity: 65,
    wind: 12,
    rainfall: 0,
    condition: "sunny"
  });
  
  const [forecast, setForecast] = useState<WeatherData[]>([
    {
      date: new Date(Date.now() + 86400000).toLocaleDateString(),
      temperature: 26,
      humidity: 55,
      wind: 8,
      rainfall: 0,
      condition: "sunny"
    },
    {
      date: new Date(Date.now() + 172800000).toLocaleDateString(),
      temperature: 22,
      humidity: 75,
      wind: 15,
      rainfall: 20,
      condition: "rainy"
    },
    {
      date: new Date(Date.now() + 259200000).toLocaleDateString(),
      temperature: 20,
      humidity: 80,
      wind: 18,
      rainfall: 35,
      condition: "rainy"
    }
  ]);
  
  const getWeatherIcon = (condition: string, size: number = 24) => {
    switch (condition) {
      case "sunny":
        return <Sun size={size} className="text-yellow-500" />;
      case "cloudy":
        return <Cloud size={size} className="text-gray-500" />;
      case "rainy":
        return <CloudRain size={size} className="text-blue-500" />;
      case "stormy":
        return <CloudLightning size={size} className="text-purple-500" />;
      case "foggy":
        return <CloudFog size={size} className="text-gray-400" />;
      case "snowy":
        return <CloudSnow size={size} className="text-blue-200" />;
      default:
        return <Cloud size={size} className="text-gray-500" />;
    }
  };
  
  const getIrrigationRecommendation = () => {
    const { humidity, rainfall, temperature } = currentWeather;
    const forecastRain = forecast.some(day => day.rainfall > 10);
    
    if (rainfall > 15) {
      return {
        shouldIrrigate: false,
        message: "Recent rainfall is sufficient. Skip irrigation today."
      };
    }
    
    if (forecastRain && humidity > 70) {
      return {
        shouldIrrigate: false,
        message: "Rain is expected in the next 3 days. Consider delaying irrigation."
      };
    }
    
    if (temperature > 28 && humidity < 50) {
      return {
        shouldIrrigate: true,
        message: "Hot and dry conditions. Irrigation recommended to prevent water stress."
      };
    }
    
    if (humidity < 60 && !forecastRain) {
      return {
        shouldIrrigate: true,
        message: "Moderate irrigation recommended based on current conditions."
      };
    }
    
    return {
      shouldIrrigate: false,
      message: "Current soil moisture levels should be adequate."
    };
  };
  
  const recommendation = getIrrigationRecommendation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Weather Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track weather patterns and get smart irrigation recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/80 text-sm flex items-center">
                        <Clock size={14} className="mr-1" />
                        {new Date().toLocaleDateString(undefined, { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <h2 className="text-2xl font-bold mt-1">{location}</h2>
                    </div>
                    <div className="flex items-center">
                      {getWeatherIcon(currentWeather.condition, 48)}
                      <span className="text-4xl font-bold ml-2">
                        {currentWeather.temperature}°C
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-xl font-semibold">{currentWeather.temperature}°C</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Droplet className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Wind className="h-6 w-6 text-cyan-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Wind Speed</p>
                      <p className="text-xl font-semibold">{currentWeather.wind} km/h</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <CloudRain className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Rainfall</p>
                      <p className="text-xl font-semibold">{currentWeather.rainfall} mm</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">3-Day Forecast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {forecast.map((day, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</p>
                            {getWeatherIcon(day.condition)}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>{day.temperature}°C</span>
                            <span className="text-blue-500">{day.rainfall > 0 ? `${day.rainfall} mm` : 'No rain'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5 text-harvest-primary" />
                    <span>Irrigation Advisor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Soil Moisture Estimate</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Dry</span>
                          <span>Optimal</span>
                          <span>Wet</span>
                        </div>
                        <Progress 
                          value={100 - currentWeather.humidity} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Evapotranspiration</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                        <Progress 
                          value={currentWeather.temperature * 2} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Today's Recommendation</h3>
                      <div className={`text-sm p-2 rounded-md ${
                        recommendation.shouldIrrigate 
                          ? "bg-orange-100 text-orange-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {recommendation.message}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Precipitation Forecast</h3>
                      <div className="space-y-2">
                        {forecast.map((day, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                            <div className="flex items-center space-x-2">
                              <CloudRain className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{day.rainfall} mm</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-harvest-light rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Water Conservation Tip</h3>
                      <p className="text-sm text-gray-600">
                        Consider drip irrigation for row crops to reduce water usage by up to 60% compared to sprinkler systems.
                      </p>
                    </div>
                  </div>
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

export default WeatherPage;
