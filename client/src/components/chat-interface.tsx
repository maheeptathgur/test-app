import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage, CopilotData } from "@/lib/types";

interface ChatInterfaceProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
}

export function ChatInterface({ isOpen, copilot, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && copilot) {
      setMessages([
        {
          id: '1',
          content: `Hello! I'm ${copilot.name}. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        }
      ]);
    }
  }, [isOpen, copilot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I understand you said: "${inputValue}". How can I help you with that?`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen || !copilot) return null;

  return (
    <Card className="fixed bottom-5 right-5 w-96 h-[500px] flex flex-col shadow-2xl z-50 animate-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-gray-900">{copilot.name}</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
              style={message.sender === 'user' ? { backgroundColor: 'hsl(var(--primary))' } : {}}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
