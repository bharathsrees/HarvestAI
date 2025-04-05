
import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/use-i18n";

// Mock Q&A data
const mockQA = [
  {
    question: "How to treat leaf rust?",
    answer: "For leaf rust, I recommend applying a fungicide containing propiconazole or tebuconazole. Apply early in the morning when humidity is high but leaves are dry. Remove and destroy infected plant material to prevent spread. For organic options, try a solution of 1 tablespoon baking soda in 1 gallon of water with a few drops of dish soap."
  },
  {
    question: "Best fertilizer for wheat?",
    answer: "For wheat, a balanced NPK fertilizer (like 20-20-20) is recommended during planting. Apply nitrogen-rich fertilizer (like urea 46-0-0) during tillering stage. Typically, wheat needs 90-120 kg N/ha, 60 kg P₂O₅/ha, and 40 kg K₂O/ha. Adjust based on soil test results for optimal yields."
  },
  {
    question: "When to harvest rice?",
    answer: "Rice is typically ready for harvest 30-45 days after flowering when 80-85% of the grains have turned golden/straw-colored. The moisture content should be around 20-25%. To check, bite a grain - it should be firm but not hard. Harvesting too early results in immature grains, while delayed harvesting can cause shattering and yield loss."
  },
  {
    question: "How to control aphids?",
    answer: "To control aphids, try spraying a mixture of neem oil (2 tsp) in 1 liter of water with a few drops of dish soap. For chemical control, insecticides containing imidacloprid or pymetrozine are effective. Encourage natural predators like ladybugs and lacewings. Remove severely infested parts and maintain proper spacing between plants for air circulation."
  }
];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string) => {
    const lowerCaseQuestion = question.toLowerCase();
    
    // Find exact match first
    for (const qa of mockQA) {
      if (lowerCaseQuestion.includes(qa.question.toLowerCase())) {
        return qa.answer;
      }
    }
    
    // Find partial matches based on keywords
    const keywords = [
      { words: ["rust", "leaf", "disease"], qaIndex: 0 },
      { words: ["fertilizer", "wheat", "nutrient"], qaIndex: 1 },
      { words: ["harvest", "rice", "when"], qaIndex: 2 },
      { words: ["aphid", "insect", "pest", "control"], qaIndex: 3 },
    ];
    
    for (const keyword of keywords) {
      if (keyword.words.some(word => lowerCaseQuestion.includes(word))) {
        return mockQA[keyword.qaIndex].answer;
      }
    }
    
    // No match found
    return null;
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Find answer or use fallback
    const answer = findAnswer(inputValue);
    
    if (answer) {
      setTimeout(() => {
        simulateTyping(answer, botResponseId);
      }, 500);
    } else {
      setTimeout(() => {
        simulateTyping(
          "I don't have specific information about that. For more accurate advice, please use our 'Ask an Expert' form for personalized assistance from our agricultural specialists.",
          botResponseId
        );
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
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
            <h3 className="font-medium">{t("chatbot.title", "HarvestAI Assistant")}</h3>
            <p className="text-xs opacity-90">{t("chatbot.subtitle", "Ask me anything about farming")}</p>
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
                    : "bg-harvest-light text-harvest-dark self-start rounded-tl-none"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] p-3 rounded-lg bg-harvest-light text-harvest-dark self-start rounded-tl-none">
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
