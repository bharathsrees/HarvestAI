import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/use-i18n";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Gemini AI API key input modal
interface GeminiKeyInputProps {
  onSubmit: (key: string) => void;
  isOpen: boolean;
}

const GeminiKeyInput = ({ onSubmit, isOpen }: GeminiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium mb-4 dark:text-white">{t("chatbot.geminiSetup", "Set Up Gemini AI")}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {t("chatbot.geminiKeyDesc", "Enter your Gemini API key to enable AI-powered chat capabilities.")}
        </p>
        <Input 
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API Key"
          type="password"
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onSubmit("")}>
            {t("chatbot.cancel", "Cancel")}
          </Button>
          <Button onClick={() => onSubmit(apiKey)} disabled={!apiKey}>
            {t("chatbot.save", "Save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Database of common farming knowledge - mock database for AI responses
const farmingKnowledge = [
  {
    topic: "leaf rust",
    keywords: ["rust", "leaf", "orange", "spots", "fungus"],
    response: "For leaf rust, I recommend applying a fungicide containing propiconazole or tebuconazole. Apply early in the morning when humidity is high but leaves are dry. Remove and destroy infected plant material to prevent spread. For organic options, try a solution of 1 tablespoon baking soda in 1 gallon of water with a few drops of dish soap."
  },
  {
    topic: "wheat fertilizer",
    keywords: ["wheat", "fertilizer", "nutrient", "feed"],
    response: "For wheat, a balanced NPK fertilizer (like 20-20-20) is recommended during planting. Apply nitrogen-rich fertilizer (like urea 46-0-0) during tillering stage. Typically, wheat needs 90-120 kg N/ha, 60 kg P₂O₅/ha, and 40 kg K₂O/ha. Adjust based on soil test results for optimal yields."
  },
  {
    topic: "rice harvest",
    keywords: ["rice", "harvest", "when", "ready"],
    response: "Rice is typically ready for harvest 30-45 days after flowering when 80-85% of the grains have turned golden/straw-colored. The moisture content should be around 20-25%. To check, bite a grain - it should be firm but not hard. Harvesting too early results in immature grains, while delayed harvesting can cause shattering and yield loss."
  },
  {
    topic: "aphid control",
    keywords: ["aphid", "insect", "pest", "control", "bugs"],
    response: "To control aphids, try spraying a mixture of neem oil (2 tsp) in 1 liter of water with a few drops of dish soap. For chemical control, insecticides containing imidacloprid or pymetrozine are effective. Encourage natural predators like ladybugs and lacewings. Remove severely infested parts and maintain proper spacing between plants for air circulation."
  },
  {
    topic: "irrigation",
    keywords: ["water", "irrigation", "drought", "dry"],
    response: "For efficient irrigation, consider drip systems which can save up to 60% water compared to surface irrigation. Water deeply but infrequently to encourage deeper root growth. Early morning is the best time to irrigate to minimize evaporation. For most crops, maintain soil moisture at 50-70% of field capacity for optimal growth."
  },
  {
    topic: "crop rotation",
    keywords: ["rotation", "crop", "cycle", "soil health"],
    response: "Crop rotation helps break pest cycles and improve soil health. Alternate between crops with different nutrient needs and root depths. A common practice is to rotate between legumes (which add nitrogen) and heavy feeders like corn. A three-year rotation of grains, legumes, and diverse crops is often effective for pest management and soil improvement."
  },
  {
    topic: "organic farming",
    keywords: ["organic", "natural", "chemical-free", "sustainable"],
    response: "For organic farming, focus on building soil health through compost and cover crops. Use companion planting and beneficial insects for pest management. Rotate crops regularly to prevent disease buildup. Consider mulching to suppress weeds and conserve soil moisture. Foliar sprays like compost tea can provide nutrients and beneficial microorganisms to strengthen plant immunity."
  }
];

// Simulate AI response with Gemini
const simulateGeminiResponse = async (prompt: string, apiKey: string | null): Promise<string> => {
  // In a real implementation, this would call the Gemini API
  // For simulation purposes, we'll use our knowledge base
  
  // Add processing delay for realism
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!apiKey) {
    return "To access advanced AI capabilities, please set up your Gemini API key in the settings.";
  }
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for match in our knowledge base
  for (const entry of farmingKnowledge) {
    if (entry.keywords.some(keyword => lowerPrompt.includes(keyword))) {
      return entry.response;
    }
  }
  
  // Default response if no match found
  return "I don't have specific information about that query. For more detailed information, you might want to consult with a local agricultural expert or extension office. They can provide region-specific advice tailored to your growing conditions.";
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your HarvestAI assistant. How can I help you with your farming questions today?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGeminiSetup, setShowGeminiSetup] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useLocalStorage<string | null>("gemini-api-key", null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  
  // Check if first time using the chatbot
  useEffect(() => {
    if (!geminiApiKey) {
      setShowGeminiSetup(true);
    }
  }, [geminiApiKey]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGeminiKeySubmit = (key: string) => {
    if (key) {
      setGeminiApiKey(key);
      
      // Add confirmation message
      const newMessage: Message = {
        id: Date.now().toString(),
        text: "Gemini AI integration activated! You can now ask more complex farming questions.",
        isUser: false,
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
    
    setShowGeminiSetup(false);
  };

  const simulateTyping = (text: string, messageId: string) => {
    setIsTyping(true);
    
    let i = 0;
    const speed = 15; // ms per character
    let displayText = "";
    
    const typing = setInterval(() => {
      if (i < text.length) {
        displayText += text.charAt(i);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, text: displayText } : msg
          )
        );
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, speed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Create placeholder for bot response
    const botResponseId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botResponseId,
      text: "",
      isUser: false,
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    try {
      // Get AI response
      const response = await simulateGeminiResponse(inputValue, geminiApiKey);
      
      // Simulate typing effect
      simulateTyping(response, botResponseId);
    } catch (error) {
      console.error("Chat error:", error);
      
      // Update error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botResponseId 
            ? { ...msg, text: "Sorry, there was an error processing your request. Please try again." } 
            : msg
        )
      );
      
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Gemini API Key setup */}
      <GeminiKeyInput 
        onSubmit={handleGeminiKeySubmit} 
        isOpen={showGeminiSetup} 
      />
      
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
          !isOpen && "animate-pulse-slow"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in">
          {/* Chat header */}
          <div className="bg-harvest-primary p-3 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t("chatbot.title", "HarvestAI Assistant")}</h3>
                <p className="text-xs opacity-90">{t("chatbot.subtitle", "Ask me anything about farming")}</p>
              </div>
              {geminiApiKey && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs text-white hover:bg-white/20"
                  onClick={() => setShowGeminiSetup(true)}
                >
                  {t("chatbot.settings", "Settings")}
                </Button>
              )}
            </div>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[80%] p-3 rounded-lg",
                  message.isUser
                    ? "bg-muted self-end rounded-tr-none"
                    : "bg-harvest-light text-harvest-dark self-start rounded-tl-none dark:bg-gray-700 dark:text-gray-100"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] p-3 rounded-lg bg-harvest-light text-harvest-dark self-start rounded-tl-none dark:bg-gray-700 dark:text-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-harvest-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-harvest-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-harvest-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("chatbot.inputPlaceholder", "Type your question...")}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
