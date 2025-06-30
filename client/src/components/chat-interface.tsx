import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, UserCog } from "lucide-react";
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
  const [showProfileFields, setShowProfileFields] = useState(false);
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
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-6 border-b bg-muted/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-sm font-semibold`}>
            {copilot.avatar}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{copilot.name}</h1>
            <p className="text-sm text-muted-foreground">{copilot.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowProfileFields(!showProfileFields)}>
            <UserCog className="h-4 w-4" />
            Profile Fields
          </Button>
          <Button variant="outline" onClick={onClose} className="gap-2">
            <X className="h-4 w-4" />
            Close Chat
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {showProfileFields && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
              <h3 className="font-semibold mb-3 text-foreground">Target User Profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Title:</span>
                  <span className="ml-2 text-foreground">Marketing Manager</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Company:</span>
                  <span className="ml-2 text-foreground">TechCorp Inc.</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="ml-2 text-foreground">Software Technology</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <span className="ml-2 text-foreground">Marketing</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="ml-2 text-foreground">5-7 years</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2 text-foreground">San Francisco, CA</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Communication Style:</span>
                  <span className="ml-2 text-foreground">Professional, data-driven</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Goals:</span>
                  <span className="ml-2 text-foreground">Increase brand awareness and lead generation</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-6 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <div className="border-t bg-muted/50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-3">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 h-12"
            />
            <Button onClick={handleSendMessage} className="h-12 px-6">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
