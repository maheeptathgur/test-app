import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, UserCog, Edit3, Check, FileText, Image, Music, Video, File, Copy, ThumbsUp, ThumbsDown, MessageCircle, Plus, Bot, Wrench, Workflow, MessageSquare, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { ChatMessage, CopilotData, ProfileField } from "@/lib/types";

// Helper function to get conversation starters based on copilot type
const getConversationStarters = (copilotName: string): string[] => {
  switch (copilotName) {
    case 'Campaign Manager':
      return [
        'Create a product launch campaign using @HubSpot and @Mailchimp',
        'Analyze email performance with @Media Planner',
        'Set up automated posts using @Campaign Planning',
        'Build customer segments using @HubSpot'
      ];
    case 'Content Assistant':
      return [
        'Write a blog post with @Grammarly for quality check',
        'Create social captions using @SEMrush for optimization',
        'Optimize content with @SEO Optimizer agent',
        'Generate content using @Content Writer'
      ];
    case 'Social Analyst':
      return [
        'Analyze engagement trends with @Google Analytics',
        'Compare performance using @Hootsuite analytics',
        'Generate insights with @Data Analyst',
        'Find trending content with @Trend Spotter'
      ];
    case 'Customer Support':
      return [
        'Resolve billing issue using @CRM Integration',
        'Create response templates with @Knowledge Base',
        'Analyze ticket trends using @Support Analytics',
        'Set up escalation with @Workflow Automation'
      ];
    case 'Resume Assistant':
      return [
        'Optimize resume for tech role',
        'Create compelling cover letter',
        'Review LinkedIn profile structure',
        'Tailor resume for specific job posting'
      ];
    default:
      return [
        'What can you help me accomplish?',
        'Show me your capabilities',
        'Help me get started',
        'What do people use you for?'
      ];
  }
};

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
  const [initialProfileData, setInitialProfileData] = useState<Record<string, string>>({});
  const [documentPaneWidth, setDocumentPaneWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(true);
  const [expandedAttachments, setExpandedAttachments] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set());
  const [inputContent, setInputContent] = useState<string>('');
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  
  // UI interaction states
  const [copiedMessages, setCopiedMessages] = useState<Set<string>>(new Set());
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [feedbackForms, setFeedbackForms] = useState<Record<string, {
    type: 'dislike' | 'askHuman';
    text: string;
    visible: boolean;
    submitted: boolean;
  }>>({});
  
  // @mention autocomplete states
  const [showHandleDropdown, setShowHandleDropdown] = useState(false);
  const [handleSuggestions, setHandleSuggestions] = useState<Array<{name: string, type: string}>>([]);
  const [handleTriggerPosition, setHandleTriggerPosition] = useState(-1);
  const [selectedHandleIndex, setSelectedHandleIndex] = useState(0);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // For this wireframe, we'll simulate transcription
        simulateTranscription();
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const simulateTranscription = () => {
    // Simulate transcription delay
    setTimeout(() => {
      // For wireframe purposes, use sample transcriptions
      const sampleTranscriptions = [
        "Create a marketing campaign for our new product launch",
        "Can you help me analyze the social media performance data",
        "I need help writing content for our newsletter",
        "Set up an automated email workflow for new customers",
        "Generate a report on last quarter's campaign results"
      ];
      
      const randomTranscription = sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];
      setInputValue(randomTranscription);
      setInputContent(randomTranscription);
    }, 1500); // 1.5 second delay to simulate processing
  };

  // Basic chat functionality
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
    setInputContent("");

    // Simple bot response simulation
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand you'd like help with that. In a real implementation, this would connect to an AI service to provide a relevant response based on your request.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleStarterClick = (starter: string) => {
    setInputValue(starter);
    setInputContent(starter);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setInputContent(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simplified badge rendering for @mentions
  const formatMarkdown = (text: string) => {
    if (!copilot?.components) return text;

    let result = text;
    
    // Replace @mentions with badges
    copilot.components.forEach(component => {
      const mentionRegex = new RegExp(`@${component.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const colorClass = component.type === 'agent' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        component.type === 'tool' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-amber-100 text-amber-800 border-amber-200';
      
      result = result.replace(mentionRegex, 
        `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}">@${component.name}</span>`
      );
    });

    return result;
  };

  if (!isOpen || !copilot) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-40">
      {/* Header */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setShowProfileFields(!showProfileFields)}
          title="Profile Settings"
        >
          <UserCog className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClose}
          title="Close Chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ marginTop: '40px' }}>
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to {copilot.name}</h1>
                <p className="text-gray-600">{copilot.description}</p>
              </div>
              
              {/* Quick prompts */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900">Quick prompts to get started</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getConversationStarters(copilot.name).map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(starter)}
                      className="p-2 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors group text-xs"
                    >
                      <div className="flex items-start gap-1.5">
                        <MessageSquare className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span 
                          className="text-gray-700 group-hover:text-gray-900 leading-tight"
                          dangerouslySetInnerHTML={{ 
                            __html: formatMarkdown(starter)
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-4 rounded-lg max-w-[70%] ${
                  message.sender === 'user' 
                    ? 'bg-[#e6eeef] text-gray-900' 
                    : 'bg-white text-gray-900'
                }`}
              >
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(message.content)
                  }}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <Button 
                variant="outline" 
                className="h-12 px-3"
                onClick={() => setShowAttachmentSidebar(!showAttachmentSidebar)}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message or use voice input..."
                  className="min-h-12 max-h-24 resize-none w-full"
                  rows={1}
                />
              </div>
              
              <Button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`h-12 w-12 p-0 mr-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                variant={isRecording ? "default" : "outline"}
                title={isRecording ? "Stop Recording" : "Voice Message"}
              >
                {isRecording ? <Square className="h-4 w-4 text-white" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button 
                onClick={handleSendMessage} 
                className="h-12 w-12 p-0" 
                title="Send Message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="flex items-center justify-center mt-2 text-red-600 text-sm">
                <div className="animate-pulse mr-2">🔴</div>
                Recording... Click the stop button when finished
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}