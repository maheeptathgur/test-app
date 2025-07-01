import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, UserCog, Edit3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ChatMessage, CopilotData } from "@/lib/types";

interface ChatInterfaceProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
  onToggleAttachment?: (show: boolean) => void;
}

export function ChatInterface({ isOpen, copilot, onClose, onToggleAttachment }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showProfileFields, setShowProfileFields] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAttachmentSidebar, setShowAttachmentSidebar] = useState(false);
  const [profileData, setProfileData] = useState({
    title: "Marketing Manager",
    company: "TechCorp Inc.",
    industry: "Software Technology",
    department: "Marketing",
    experience: "5-7 years",
    location: "San Francisco, CA",
    communicationStyle: "Professional, data-driven",
    goals: "Increase brand awareness and lead generation"
  });
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

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // In a real app, this would save to the backend
  };

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
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex items-center justify-between p-6 border-b bg-white">
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
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col p-6">
          {showProfileFields && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Target User Profile</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                  className="gap-2"
                >
                  {isEditingProfile ? (
                    <>
                      <Check className="h-3 w-3" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Title:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.title}
                      onChange={(e) => handleProfileChange('title', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.title}</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Company:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.company}</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Industry:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.industry}
                      onChange={(e) => handleProfileChange('industry', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.industry}</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Department:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.department}</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Experience:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.experience}
                      onChange={(e) => handleProfileChange('experience', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.experience}</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Location:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.location}</span>
                  )}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block mb-1">Communication Style:</span>
                  {isEditingProfile ? (
                    <Input
                      value={profileData.communicationStyle}
                      onChange={(e) => handleProfileChange('communicationStyle', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.communicationStyle}</span>
                  )}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block mb-1">Goals:</span>
                  {isEditingProfile ? (
                    <Textarea
                      value={profileData.goals}
                      onChange={(e) => handleProfileChange('goals', e.target.value)}
                      className="min-h-[60px]"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.goals}</span>
                  )}
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
      
      <div className="bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="h-12 px-3"
              onClick={() => {
                setShowAttachmentSidebar(!showAttachmentSidebar);
                onToggleAttachment?.(!showAttachmentSidebar);
              }}
            >
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
