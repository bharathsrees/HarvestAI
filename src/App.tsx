
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/context/ThemeProvider";
import { I18nProvider } from "@/hooks/use-i18n";
import Chatbot from "@/components/common/Chatbot";
import Index from "./pages/Index";
import ScanPage from "./pages/ScanPage";
import WeatherPage from "./pages/WeatherPage";
import MarketPage from "./pages/MarketPage";
import ExpertPage from "./pages/ExpertPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/expert" element={<ExpertPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
