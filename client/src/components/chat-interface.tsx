import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, UserCog, Edit3, Check, FileText, Image, Music, Video, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChatMessage, CopilotData, ProfileField } from "@/lib/types";

interface ChatInterfaceProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
  onToggleAttachment?: (show: boolean) => void;
  selectedFiles?: string[];
}

export function ChatInterface({ isOpen, copilot, onClose, onToggleAttachment, selectedFiles = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showProfileFields, setShowProfileFields] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAttachmentSidebar, setShowAttachmentSidebar] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, string>>({});
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
      
      // Initialize profile data with empty values for each field
      if (copilot.profileFields) {
        const initialData: Record<string, string> = {};
        copilot.profileFields.forEach(field => {
          initialData[field.name] = '';
        });
        setProfileData(initialData);
      }
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

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Here you would typically save the profile data to a backend
    console.log('Saving profile data:', profileData);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText className="w-4 h-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-4 h-4" />;
      case 'mp3':
      case 'wav':
      case 'aac':
        return <Music className="w-4 h-4" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const renderProfileField = (field: ProfileField) => {
    const value = profileData[field.name] || '';
    
    if (isEditingProfile) {
      switch (field.type) {
        case 'textarea':
          return (
            <Textarea
              value={value}
              onChange={(e) => handleProfileChange(field.name, e.target.value)}
              className="min-h-[60px]"
              placeholder={field.description}
            />
          );
        case 'select':
          return (
            <Select value={value} onValueChange={(val) => handleProfileChange(field.name, val)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        case 'number':
          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => handleProfileChange(field.name, e.target.value)}
              className="h-8"
              placeholder={field.description}
            />
          );
        default: // text
          return (
            <Input
              value={value}
              onChange={(e) => handleProfileChange(field.name, e.target.value)}
              className="h-8"
              placeholder={field.description}
            />
          );
      }
    } else {
      return (
        <span className="text-foreground">
          {value || (field.required ? 'Required field - please add information' : 'Not specified')}
        </span>
      );
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
      
      <div className="flex-1 overflow-hidden flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto h-full flex flex-col p-6">
              {showProfileFields && copilot.profileFields && copilot.profileFields.length > 0 && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">Target User Profile</h3>
                    <div className="flex items-center gap-2">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowProfileFields(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {copilot.profileFields.map((field) => (
                      <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-muted-foreground block">{field.label}:</span>
                          {field.required && <span className="text-red-500">*</span>}
                        </div>
                        {field.description && (
                          <p className="text-xs text-muted-foreground mb-2">{field.description}</p>
                        )}
                        {renderProfileField(field)}
                      </div>
                    ))}
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
          
          {/* Prompt Bar - moved inside chat area */}
          <div className="bg-white relative border-t">
            <div className="max-w-2xl mx-auto p-3">
              {/* Floating Attached Files Display */}
              {selectedFiles.length > 0 && (
                <div className="absolute -top-4 left-[3.75rem] flex items-center">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs">
                    <Paperclip className="w-3 h-3" />
                    <span>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-1">
                      {selectedFiles.slice(0, 2).map((fileName) => (
                        <div key={fileName} className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                          {getFileIcon(fileName)}
                          <span className="truncate max-w-[80px]">{fileName.split('.')[0]}</span>
                        </div>
                      ))}
                      {selectedFiles.length > 2 && (
                        <span className="bg-white/20 px-2 py-0.5 rounded-full">+{selectedFiles.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
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
        
        {/* File Preview Pane */}
        {selectedFiles.length > 0 && (
          <div className="w-80 border-l border-border bg-muted/20 flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto min-h-0">
              {(() => {
                const lastFile = selectedFiles[selectedFiles.length - 1];
                const extension = lastFile.toLowerCase().split('.').pop();
                
                switch (extension) {
                  case 'pdf':
                    return (
                      <div className="space-y-4">
                        <div className="bg-white border rounded-lg overflow-hidden">
                          <div className="p-3 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-medium">Project_Brief.pdf</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                12 pages • 1.2 MB
                              </div>
                            </div>
                          </div>
                          <div className="h-96 bg-white overflow-y-auto p-6 text-sm leading-relaxed">
                            <div className="space-y-4">
                              <div className="text-center border-b pb-4">
                                <h1 className="text-xl font-bold text-gray-900">Project Brief: Q1 Marketing Campaign</h1>
                                <p className="text-gray-600 mt-2">Strategic Planning Document</p>
                              </div>
                              
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Executive Summary</h2>
                                <p className="text-gray-700 mb-3">
                                  This document outlines the key strategies and initiatives for the first quarter marketing campaign. 
                                  Our primary focus will be on brand awareness, customer acquisition, and market expansion.
                                </p>
                                <p className="text-gray-700 mb-3">
                                  The campaign targets a 25% increase in brand recognition and a 15% growth in customer base 
                                  through integrated digital and traditional marketing channels.
                                </p>
                              </div>
                              
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Budget Allocation</h2>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-gray-700">• Digital Advertising: $150,000 (60%)</p>
                                  <p className="text-gray-700">• Content Creation: $50,000 (20%)</p>
                                  <p className="text-gray-700">• Events & PR: $35,000 (14%)</p>
                                  <p className="text-gray-700">• Analytics & Tools: $15,000 (6%)</p>
                                </div>
                              </div>
                              
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h2>
                                <p className="text-gray-700">
                                  Campaign launch scheduled for January 15th, with key milestones throughout the quarter...
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border-t bg-gray-50">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                Download
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                Full Screen
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case 'jpg':
                  case 'jpeg':
                  case 'png':
                    return (
                      <div className="space-y-4">
                        <div className="bg-white border rounded-lg p-4">
                          <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center mb-4">
                            <Image className="w-16 h-16 text-gray-400" />
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1 mb-4">
                            <p><strong>Dimensions:</strong> 1920x1080</p>
                            <p><strong>Size:</strong> 856 KB</p>
                            <p><strong>Format:</strong> PNG</p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            View Image
                          </Button>
                        </div>
                      </div>
                    );
                  case 'mp3':
                  case 'wav':
                    return (
                      <div className="space-y-4">
                        <div className="bg-white border rounded-lg p-4">
                          <div className="text-center mb-4">
                            <Music className="w-16 h-16 mx-auto text-purple-500 mb-2" />
                            <h4 className="font-semibold">Audio File</h4>
                          </div>
                          <div className="space-y-3">
                            <audio controls className="w-full">
                              <source src="#" type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><strong>Duration:</strong> 3:24</p>
                              <p><strong>Size:</strong> 4.8 MB</p>
                              <p><strong>Format:</strong> MP3</p>
                              <p><strong>Bitrate:</strong> 320 kbps</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case 'mp4':
                  case 'avi':
                    return (
                      <div className="space-y-4">
                        <div className="bg-white border rounded-lg p-4">
                          <div className="text-center mb-4">
                            <Video className="w-16 h-16 mx-auto text-red-500 mb-2" />
                            <h4 className="font-semibold">Video File</h4>
                          </div>
                          <div className="space-y-3">
                            <video controls className="w-full rounded">
                              <source src="#" type="video/mp4" />
                              Your browser does not support the video element.
                            </video>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><strong>Duration:</strong> 5:42</p>
                              <p><strong>Size:</strong> 24.5 MB</p>
                              <p><strong>Resolution:</strong> 1080p</p>
                              <p><strong>Format:</strong> MP4</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div className="space-y-4">
                        <div className="bg-white border rounded-lg p-4">
                          <div className="text-center mb-4">
                            <File className="w-16 h-16 mx-auto text-gray-500 mb-2" />
                            <h4 className="font-semibold">Document</h4>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1 mb-4">
                            <p><strong>Type:</strong> {extension?.toUpperCase()}</p>
                            <p><strong>Size:</strong> 540 KB</p>
                            <p><strong>Modified:</strong> 2 weeks ago</p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            Open File
                          </Button>
                        </div>
                      </div>
                    );
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
