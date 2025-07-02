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
  const [documentPaneWidth, setDocumentPaneWidth] = useState(320); // 320px = w-80 default
  const [isResizing, setIsResizing] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(true);
  const [expandedAttachments, setExpandedAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && copilot) {
      // Check if we have conversation messages to load, otherwise show default greeting
      if (copilot.conversationMessages && copilot.conversationMessages.length > 0) {
        setMessages(copilot.conversationMessages);
      } else {
        setMessages([
          {
            id: '1',
            content: `Hello! I'm ${copilot.name}. How can I help you today?`,
            sender: 'bot',
            timestamp: new Date().toISOString(),
          }
        ]);
      }
      
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

  // Reset document preview visibility when files change
  useEffect(() => {
    if (selectedFiles.length > 0) {
      setShowDocumentPreview(true);
    }
    // Reset expanded attachments when files change
    setExpandedAttachments(false);
  }, [selectedFiles]);

  // Handle mouse events for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      // Calculate new width based on mouse position from the right edge
      const newWidth = window.innerWidth - e.clientX;
      // Constrain width between 200px and 600px
      const constrainedWidth = Math.max(200, Math.min(600, newWidth));
      setDocumentPaneWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isResizing) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);



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
    <div 
      className="flex flex-col h-full overflow-hidden bg-white transition-all duration-300"
      style={{ 
        marginRight: selectedFiles.length > 0 && showDocumentPreview ? `${documentPaneWidth}px` : '0px' 
      }}
    >
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-xs font-semibold`}>
            {copilot.avatar}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{copilot.name}</h1>
            <p className="text-xs text-muted-foreground">{copilot.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="sm"
            className="h-7 w-7 p-0" 
            onClick={() => setShowProfileFields(!showProfileFields)}
            title="Toggle Profile Fields"
          >
            <UserCog className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClose} 
            className="h-7 w-7 p-0"
            title="Close Chat"
          >
            <X className="h-3 w-3" />
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
          <div className="bg-white relative">
            <div className="max-w-2xl mx-auto p-3 relative">
              <div className="flex gap-3 relative">
                {/* Floating Attached Files Display */}
                {selectedFiles.length > 0 && (
                  <div className="absolute -top-8 left-0">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs mt-[-6px] mb-[-6px]">
                      <Paperclip className="w-3 h-3" />
                      <span>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(expandedAttachments ? selectedFiles : selectedFiles.slice(0, 2)).map((fileName) => (
                          <div key={fileName} className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                            {getFileIcon(fileName)}
                            <span className="truncate max-w-[80px]">{fileName.split('.')[0]}</span>
                          </div>
                        ))}
                        {selectedFiles.length > 2 && !expandedAttachments && (
                          <button 
                            className="bg-white/20 px-2 py-0.5 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                            onClick={() => setExpandedAttachments(true)}
                          >
                            +{selectedFiles.length - 2}
                          </button>
                        )}
                        {expandedAttachments && selectedFiles.length > 2 && (
                          <button 
                            className="bg-white/20 px-2 py-0.5 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                            onClick={() => setExpandedAttachments(false)}
                          >
                            −
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                <Button onClick={handleSendMessage} className="h-12 w-12 p-0" title="Send Message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* File Preview Pane */}
        {selectedFiles.length > 0 && showDocumentPreview && (
          <div 
            className="fixed top-0 right-0 bottom-0 border-l border-border bg-muted/20 flex flex-col z-50"
            style={{ width: `${documentPaneWidth}px` }}
          >
            {/* Resize Handle */}
            <div
              ref={resizeRef}
              className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#00d2a0] cursor-col-resize transition-colors z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
              }}
              title="Drag to resize"
            />
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 h-5 w-5 p-0 z-20 bg-white/90 hover:bg-[#00d2a0] shadow-md rounded-full transition-colors"
              onClick={() => {
                // Only hide the document preview, keep the attachment display
                setShowDocumentPreview(false);
              }}
              title="Close Preview"
            >
              <X className="h-3 w-3 hover:text-white transition-colors" />
            </Button>
            {/* Document Content */}
            <div className="flex-1 p-4 overflow-y-auto min-h-0">
              {(() => {
                const lastFile = selectedFiles[selectedFiles.length - 1];
                const extension = lastFile.toLowerCase().split('.').pop();
                
                switch (extension) {
                  case 'pdf':
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
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
                        <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed">
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
                      </div>
                    );
                  case 'jpg':
                  case 'jpeg':
                  case 'png':
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">sample_image.png</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              1920x1080 • 856 KB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col p-4">
                          <div className="flex-1 aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center mb-4">
                            <Image className="w-16 h-16 text-gray-400" />
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p><strong>Dimensions:</strong> 1920x1080</p>
                            <p><strong>Size:</strong> 856 KB</p>
                            <p><strong>Format:</strong> PNG</p>
                          </div>
                        </div>
                      </div>
                    );
                  case 'mp3':
                  case 'wav':
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Music className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-medium">audio_track.mp3</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              3:24 • 4.8 MB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col p-4">
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
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium">video_file.mp4</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              5:42 • 24.5 MB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col p-4">
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
                  case 'pptx':
                  case 'ppt':
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-orange-500" />
                              <span className="text-sm font-medium">presentation.pptx</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              15 slides • 3.2 MB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                          <div className="space-y-6">
                            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                              <div className="text-center">
                                <h1 className="text-lg font-bold text-gray-900">Q1 Marketing Strategy</h1>
                                <p className="text-gray-600 mt-1">Presentation Deck</p>
                                <p className="text-sm text-gray-500 mt-2">Slide 1 of 15</p>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-4">
                              <h2 className="font-semibold text-gray-900 mb-2">Agenda</h2>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Market Analysis Overview</li>
                                <li>• Target Audience Segmentation</li>
                                <li>• Campaign Strategy & Timeline</li>
                                <li>• Budget Allocation</li>
                                <li>• Success Metrics & KPIs</li>
                              </ul>
                              <p className="text-xs text-gray-500 mt-2">Slide 2 of 15</p>
                            </div>
                            
                            <div className="border rounded-lg p-4">
                              <h2 className="font-semibold text-gray-900 mb-2">Market Analysis</h2>
                              <p className="text-sm text-gray-700 mb-2">Key findings from Q4 performance:</p>
                              <div className="bg-gray-50 p-3 rounded text-sm">
                                <p>📈 25% increase in brand awareness</p>
                                <p>🎯 Target demographics shifted to 25-40 age group</p>
                                <p>📱 Mobile engagement up 40%</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">Slide 3 of 15</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case 'csv':
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">data_export.csv</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              1,247 rows • 540 KB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                          <table className="w-full text-xs">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="p-2 text-left border-r">Customer ID</th>
                                <th className="p-2 text-left border-r">Name</th>
                                <th className="p-2 text-left border-r">Email</th>
                                <th className="p-2 text-left border-r">Purchase Date</th>
                                <th className="p-2 text-left">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b hover:bg-gray-50">
                                <td className="p-2 border-r">CUST001</td>
                                <td className="p-2 border-r">Sarah Johnson</td>
                                <td className="p-2 border-r">sarah.j@email.com</td>
                                <td className="p-2 border-r">2024-01-15</td>
                                <td className="p-2">$299.99</td>
                              </tr>
                              <tr className="border-b hover:bg-gray-50">
                                <td className="p-2 border-r">CUST002</td>
                                <td className="p-2 border-r">Mike Chen</td>
                                <td className="p-2 border-r">mike.chen@email.com</td>
                                <td className="p-2 border-r">2024-01-15</td>
                                <td className="p-2">$149.50</td>
                              </tr>
                              <tr className="border-b hover:bg-gray-50">
                                <td className="p-2 border-r">CUST003</td>
                                <td className="p-2 border-r">Emily Davis</td>
                                <td className="p-2 border-r">emily.d@email.com</td>
                                <td className="p-2 border-r">2024-01-14</td>
                                <td className="p-2">$89.99</td>
                              </tr>
                              <tr className="border-b hover:bg-gray-50">
                                <td className="p-2 border-r">CUST004</td>
                                <td className="p-2 border-r">James Wilson</td>
                                <td className="p-2 border-r">j.wilson@email.com</td>
                                <td className="p-2 border-r">2024-01-14</td>
                                <td className="p-2">$399.00</td>
                              </tr>
                              <tr className="border-b hover:bg-gray-50">
                                <td className="p-2 border-r">CUST005</td>
                                <td className="p-2 border-r">Lisa Anderson</td>
                                <td className="p-2 border-r">lisa.a@email.com</td>
                                <td className="p-2 border-r">2024-01-13</td>
                                <td className="p-2">$199.99</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div className="h-full bg-white flex flex-col">
                        <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{lastFile}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {extension?.toUpperCase()} • 540 KB
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed">
                          <div className="space-y-4">
                            <div className="text-center border-b pb-4">
                              <h1 className="text-xl font-bold text-gray-900">Document Content</h1>
                              <p className="text-gray-600 mt-2">{extension?.toUpperCase()} File Preview</p>
                            </div>
                            
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900 mb-2">Document Overview</h2>
                              <p className="text-gray-700 mb-3">
                                This document contains important information and data relevant to the current project. 
                                The content has been formatted for easy reading and reference.
                              </p>
                            </div>
                            
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Points</h2>
                              <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700">• Comprehensive analysis and findings</p>
                                <p className="text-gray-700">• Strategic recommendations</p>
                                <p className="text-gray-700">• Implementation guidelines</p>
                                <p className="text-gray-700">• Next steps and timeline</p>
                              </div>
                            </div>
                            
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900 mb-2">Additional Information</h2>
                              <p className="text-gray-700">
                                For complete details and full content access, this document contains all necessary 
                                information for review and decision making...
                              </p>
                            </div>
                          </div>
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
