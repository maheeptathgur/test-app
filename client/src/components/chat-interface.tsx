import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, UserCog, Edit3, Check, FileText, Image, Music, Video, File, Copy, ThumbsUp, ThumbsDown, MessageCircle, Plus, Bot, Wrench, Workflow, MessageSquare, Mic, MicOff, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { ChatMessage, CopilotData, ProfileField } from "@/lib/types";
import { UniversalMessagingApp } from "./universal-messaging-app";

// Helper function to get conversation starters based on copilot type
const getConversationStarters = (copilotName: string): string[] => {
  switch (copilotName) {
    case 'Campaign Manager':
      return [
        'Create a product launch campaign using @HubSpot and @Mailchimp',
        'Open my @inbox for all messages',
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
  const [documentPaneWidth, setDocumentPaneWidth] = useState(320); // 320px = w-80 default
  const [isResizing, setIsResizing] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(true);
  const [expandedAttachments, setExpandedAttachments] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set());
  const [showMessagingApp, setShowMessagingApp] = useState(false);

  const [inputContent, setInputContent] = useState<string>(''); // Track raw text content
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingSupported, setRecordingSupported] = useState(false);

  // Carousel scroll state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update arrow visibility
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Carousel scroll functions
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Width of one card (w-80 = 320px)
      const newScrollPosition = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleComponentExpansion = (componentName: string) => {
    setExpandedComponents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(componentName)) {
        newSet.delete(componentName);
      } else {
        newSet.add(componentName);
      }
      return newSet;
    });
  };


  // Function to render input content with @mentions as badges (HTML for contentEditable)
  const renderInputWithBadges = () => {
    if (!inputContent) {
      return '';
    }
    
    // Create a list of all component names to match against
    const componentNames = copilot?.components?.map(c => c.name) || [];
    
    if (componentNames.length === 0) {
      return inputContent.replace(/\n/g, '<br>');
    }
    
    // Sort by length descending to match longer names first
    const sortedNames = componentNames.sort((a, b) => b.length - a.length);
    const escapedNames = sortedNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const mentionRegex = new RegExp(`@(${escapedNames.join('|')})\\b`, 'gi');
    
    let result = inputContent;
    
    // Replace @mentions with styled HTML
    result = result.replace(mentionRegex, (match, componentName) => {
      const component = copilot?.components?.find(c => 
        c.name.toLowerCase().trim() === componentName.toLowerCase().trim()
      );
      
      let badgeClass = "chat-input-badge inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded text-xs font-medium";
      
      if (component) {
        switch (component.type) {
          case 'agent':
            badgeClass += " bg-purple-100 text-purple-800 border border-purple-200";
            break;
          case 'tool':
            badgeClass += " bg-blue-100 text-blue-800 border border-blue-200";
            break;
          case 'workflow':
            badgeClass += " bg-amber-100 text-amber-800 border border-amber-200";
            break;
          default:
            badgeClass += " bg-gray-100 text-gray-600 border border-gray-200";
        }
      } else {
        badgeClass += " bg-gray-100 text-gray-600 border border-gray-200";
      }
      
      return `<span class="${badgeClass}" contenteditable="false">${componentName}</span>`;
    });
    
    // Replace newlines with <br> tags
    return result.replace(/\n/g, '<br>');
  };

  // Function to render message content with @mentions as badges
  const renderMessageWithMentions = (content: string) => {
    // Create a list of all component names to match against
    const componentNames = copilot?.components?.map(c => c.name) || [];
    
    // Create a regex that matches @ComponentName exactly
    if (componentNames.length === 0) {
      return <span className="whitespace-pre-wrap">{content}</span>;
    }
    
    // Sort by length descending to match longer names first (e.g., "Media Planner" before "Media")
    const sortedNames = componentNames.sort((a, b) => b.length - a.length);
    const escapedNames = sortedNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const mentionRegex = new RegExp(`\\b(${escapedNames.join('|')})\\b`, 'gi');
    
    const parts = content.split(mentionRegex);
    
    return (
      <span className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          // Check if this part is a mention (odd indices after split)
          if (index % 2 === 1) {
            // Find the component type for styling
            const component = copilot?.components?.find(c => 
              c.name.toLowerCase().trim() === part.toLowerCase().trim()
            );
            
            let badgeClass = "inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded text-xs font-medium align-baseline";
            let iconElement = null;
            
            if (component) {
              switch (component.type) {
                case 'agent':
                  badgeClass += " bg-purple-100 text-purple-800 border border-purple-200";
                  iconElement = <Bot className="w-2.5 h-2.5 mr-1" />;
                  break;
                case 'tool':
                  badgeClass += " bg-blue-100 text-blue-800 border border-blue-200";
                  iconElement = <Wrench className="w-2.5 h-2.5 mr-1" />;
                  break;
                case 'workflow':
                  badgeClass += " bg-amber-100 text-amber-800 border border-amber-200";
                  iconElement = <Workflow className="w-2.5 h-2.5 mr-1" />;
                  break;
              }
            } else {
              // Unknown component - still show as badge but gray
              badgeClass += " bg-gray-100 text-gray-600 border border-gray-200";
            }
            
            return (
              <span 
                key={index} 
                className={badgeClass}
              >
                {iconElement}
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };
  const [feedbackForms, setFeedbackForms] = useState<Record<string, { type: 'dislike' | 'askHuman'; text: string; visible: boolean; submitted: boolean }>>({});
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [copiedMessages, setCopiedMessages] = useState<Set<string>>(new Set());
  const [showHandleDropdown, setShowHandleDropdown] = useState(false);
  const [handleSuggestions, setHandleSuggestions] = useState<Array<{name: string; type: string}>>([]);
  const [selectedHandleIndex, setSelectedHandleIndex] = useState(0);
  const [handleTriggerPosition, setHandleTriggerPosition] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check for voice recording support
  useEffect(() => {
    const hasMediaDevices = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    const hasMediaRecorder = typeof window.MediaRecorder !== 'undefined';
    setRecordingSupported(!!(hasMediaDevices && hasMediaRecorder));
  }, []);

  // Update scroll buttons when carousel content changes
  useEffect(() => {
    updateScrollButtons();
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      // Also check on resize
      const resizeObserver = new ResizeObserver(updateScrollButtons);
      resizeObserver.observe(carousel);
      
      return () => {
        carousel.removeEventListener('scroll', updateScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, [copilot?.name]); // Re-run when copilot changes (different conversation starters)

  // Close handle dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showHandleDropdown && textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowHandleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHandleDropdown]);

  // Convert markdown to HTML for rich text display with @mention support
  const formatMarkdown = (text: string): string => {
    let formattedText = text;
    
    // Handle @inbox first
    formattedText = formattedText.replace(/@inbox\b/gi, '<span class="inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded text-xs font-medium align-baseline bg-green-100 text-green-800 border border-green-200">inbox</span>');
    
    // Handle @mentions for components
    const componentNames = copilot?.components?.map(c => c.name) || [];
    const escapedNames = componentNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length);
    
    if (escapedNames.length > 0) {
      const mentionRegex = new RegExp(`@(${escapedNames.join('|')})\\b`, 'gi');
      
      formattedText = formattedText.replace(mentionRegex, (match, componentName) => {
        const component = copilot?.components?.find(c => 
          c.name.toLowerCase().trim() === componentName.toLowerCase().trim()
        );
        
        let badgeClass = "inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded text-xs font-medium align-baseline";
        
        if (component) {
          switch (component.type) {
            case 'agent':
              badgeClass += " bg-purple-100 text-purple-800 border border-purple-200";
              break;
            case 'tool':
              badgeClass += " bg-blue-100 text-blue-800 border border-blue-200";
              break;
            case 'workflow':
              badgeClass += " bg-amber-100 text-amber-800 border border-amber-200";
              break;
          }
        } else {
          badgeClass += " bg-gray-100 text-gray-600 border border-gray-200";
        }
        
        return `<span class="${badgeClass}">${componentName}</span>`;
      });
    }
    
    // Split into lines and process each line for different markdown elements
    const lines = formattedText.split('\n');
    const processedLines = lines.map((line, index) => {
      // Skip empty lines
      if (!line.trim()) {
        return '<br/>';
      }
      
      // Handle headers
      if (line.startsWith('**') && line.endsWith('**') && line.includes(':')) {
        const headerText = line.replace(/^\*\*(.*?)\*\*$/, '$1');
        return `<div class="font-semibold text-gray-900 mt-3 mb-1">${headerText}</div>`;
      }
      
      // Handle bullet points
      if (line.trim().startsWith('- ')) {
        const content = line.substring(line.indexOf('- ') + 2);
        // Apply inline formatting to bullet point content
        const formattedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        return `<div class="flex items-start gap-2 mb-1"><span class="text-xs mt-1 flex-shrink-0">•</span><span>${formattedContent}</span></div>`;
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        const match = line.match(/^(\d+)\.\s(.+)$/);
        if (match) {
          // Apply inline formatting to numbered list content
          const formattedContent = match[2]
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
          return `<div class="flex items-start gap-2 mb-1"><span class="text-xs mt-1 flex-shrink-0">${match[1]}.</span><span>${formattedContent}</span></div>`;
        }
      }
      
      // Handle checkmarks/emojis at start of line
      if (line.trim().startsWith('✅')) {
        const content = line.substring(line.indexOf('✅') + 1).trim();
        const formattedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        return `<div class="flex items-start gap-2 mb-1"><span class="text-xs mt-1">✅</span><span>${formattedContent}</span></div>`;
      }
      
      if (line.trim().startsWith('📈')) {
        const content = line.substring(line.indexOf('📈') + 1).trim();
        const formattedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        return `<div class="flex items-start gap-2 mb-1"><span class="text-xs mt-1">📈</span><span>${formattedContent}</span></div>`;
      }
      
      if (line.trim().startsWith('⚠️')) {
        const content = line.substring(line.indexOf('⚠️') + 1).trim();
        const formattedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        return `<div class="flex items-start gap-2 mb-1"><span class="text-xs mt-1">⚠️</span><span>${formattedContent}</span></div>`;
      }
      
      // Apply inline formatting to regular lines
      let processedLine = line
        // Bold text **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic text *text*
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code `text`
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
      
      return `<div class="mb-1">${processedLine}</div>`;
    });
    
    return processedLines.join('');
  };


  // Handler functions for interaction buttons
  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessages(prev => new Set(prev).add(messageId));
    
    // Reset copy state after 2 seconds
    setTimeout(() => {
      setCopiedMessages(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }, 2000);
  };

  const handleLikeMessage = (messageId: string) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const handleDislikeMessage = (messageId: string) => {
    setFeedbackForms(prev => ({
      ...prev,
      [messageId]: {
        type: 'dislike',
        text: '',
        visible: true,
        submitted: false
      }
    }));
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Here you would typically send the audioBlob to a speech-to-text service
        // For now, we'll simulate the transcription
        setTimeout(() => {
          const simulatedTranscription = "This is a simulated voice transcription. In a real implementation, this would be the actual speech-to-text result.";
          setInputValue(simulatedTranscription);
          setInputContent(simulatedTranscription);
        }, 1000);
      });

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleAskHuman = (messageId: string) => {
    setFeedbackForms(prev => ({
      ...prev,
      [messageId]: {
        type: 'askHuman',
        text: '',
        visible: true,
        submitted: false
      }
    }));
  };

  const handleSubmitFeedback = (messageId: string) => {
    const feedback = feedbackForms[messageId];
    if (feedback && feedback.text.trim()) {
      // In a real app, this would send the feedback to a server
      console.log(`Feedback submitted for message ${messageId}:`, feedback);
      
      // Mark as submitted and hide the form
      setFeedbackForms(prev => ({
        ...prev,
        [messageId]: {
          ...prev[messageId],
          submitted: true,
          visible: false
        }
      }));
    }
  };

  const handleCloseFeedback = (messageId: string) => {
    // Close the feedback form without submitting
    setFeedbackForms(prev => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        visible: false,
        text: '' // Clear the text when closing
      }
    }));
  };

  // Handle @ mentions and autocomplete
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    setInputValue(value);
    setInputContent(value);
    
    // Check if we're typing @ and should show autocomplete
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex >= 0) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      
      // Only show if we haven't typed a space after @
      if (!textAfterAt.includes(' ') && textAfterAt.length >= 0) {
        const searchTerm = textAfterAt.toLowerCase();
        
        // Include components from copilot
        const componentSuggestions = copilot?.components?.filter(component => 
          component.name.toLowerCase().includes(searchTerm)
        ) || [];
        
        // Add special handlers like @inbox
        const specialHandlers = [];
        if ('inbox'.includes(searchTerm)) {
          specialHandlers.push({ name: 'inbox', type: 'inbox' });
        }
        
        const allSuggestions = [...componentSuggestions, ...specialHandlers];
        
        if (allSuggestions.length > 0) {
          setHandleSuggestions(allSuggestions);
          setHandleTriggerPosition(lastAtIndex);
          setShowHandleDropdown(true);
          setSelectedHandleIndex(0);
        } else {
          setShowHandleDropdown(false);
        }
      } else {
        setShowHandleDropdown(false);
      }
    } else {
      setShowHandleDropdown(false);
    }
  };

  const insertHandle = (componentName: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const textAfterCursor = inputValue.substring(cursorPosition);
    
    // Find the @ that triggered this autocomplete
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    // Build the new value by replacing from @ to cursor with @componentName
    const beforeAt = inputValue.substring(0, lastAtIndex);
    const newValue = `${beforeAt}@${componentName} ${textAfterCursor}`;
    
    setInputValue(newValue);
    setInputContent(newValue);
    setShowHandleDropdown(false);
    
    // Focus back to textarea and position cursor after the inserted component name and space
    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = beforeAt.length + componentName.length + 2; // +2 for @ and space
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 10);
  };

  const handleUpdateFeedback = (messageId: string, text: string) => {
    setFeedbackForms(prev => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        text
      }
    }));
  };

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24; // Approximate line height
      const maxHeight = lineHeight * 4; // 4 lines max
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [inputValue]);

  useEffect(() => {
    if (isOpen && copilot) {
      // Load conversation messages if available, otherwise start with empty array
      if (copilot.conversationMessages && copilot.conversationMessages.length > 0) {
        setMessages(copilot.conversationMessages);
      } else {
        setMessages([]);
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
  }, [isOpen, copilot, copilot?.conversationMessages]);

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

    // Use inputContent (which preserves @mentions) instead of inputValue
    const messageContent = inputContent || inputValue;

    // Check for @inbox handler
    const shouldShowMessagingApp = messageContent.toLowerCase().includes('@inbox');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setInputContent("");

    // If messaging-related keywords detected, show the messaging app
    if (shouldShowMessagingApp) {
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `Opening your @inbox - your universal messaging center where you can view and manage all your messages from Gmail, LinkedIn, WhatsApp, Instagram, Facebook, Twitter, Slack, and more platforms in one place.`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Show the messaging app after the bot response
        setTimeout(() => {
          setShowMessagingApp(true);
        }, 500);
      }, 1000);
    } else {
      // Regular bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `I understand you said: "${messageContent}". How can I help you with that?`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleStarterClick = (starterText: string) => {
    // Process the starter text to convert @mentions to proper format
    setInputValue(starterText);
    setInputContent(starterText);
    
    // Focus the textarea after setting the value
    setTimeout(() => {
      textareaRef.current?.focus();
      // Trigger input change to process @mentions
      const event = new Event('input', { bubbles: true });
      textareaRef.current?.dispatchEvent(event);
    }, 10);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (showHandleDropdown) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedHandleIndex(prev => 
          prev < handleSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedHandleIndex(prev => 
          prev > 0 ? prev - 1 : handleSuggestions.length - 1
        );
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (handleSuggestions[selectedHandleIndex]) {
          insertHandle(handleSuggestions[selectedHandleIndex].name);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowHandleDropdown(false);
      }
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
    if (!isEditingProfile) {
      // If not editing, enable editing mode and store initial data
      setInitialProfileData({ ...profileData });
      setIsEditingProfile(true);
    } else {
      // If editing, save the profile data and close the profile fields
      setIsEditingProfile(false);
      setShowProfileFields(false);
      console.log('Saving profile data:', profileData);
    }
  };

  // Check if profile data has changed from initial state
  const hasProfileDataChanged = () => {
    return Object.keys(profileData).some(key => 
      profileData[key] !== (initialProfileData[key] || '')
    );
  };

  const handleAddComponent = (name: string, type: string) => {
    console.log('Selected', type + ':', name);
    
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Insert the component name at cursor position (or at the end if no focus)
    const cursorPosition = textarea.selectionStart || inputValue.length;
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const textAfterCursor = inputValue.substring(cursorPosition);
    
    // Add space before if needed
    const spaceBeforeBadge = textBeforeCursor && !textBeforeCursor.endsWith(' ') ? ' ' : '';
    // Always add space after to ensure word boundary detection works
    const spaceAfterBadge = ' ';
    
    const newValue = `${textBeforeCursor}${spaceBeforeBadge}@${name}${spaceAfterBadge}${textAfterCursor}`;
    
    setInputValue(newValue);
    setInputContent(newValue);
    
    // Focus back to textarea and position cursor after the inserted component name
    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = cursorPosition + spaceBeforeBadge.length + name.length + spaceAfterBadge.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 10);
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
    
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleProfileChange(field.name, e.target.value)}
            className="min-h-[60px]"
            placeholder={field.description}
            disabled={!isEditingProfile}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleProfileChange(field.name, val)} disabled={!isEditingProfile}>
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
            disabled={!isEditingProfile}
          />
        );
      default: // text
        return (
          <Input
            value={value}
            onChange={(e) => handleProfileChange(field.name, e.target.value)}
            className="h-8"
            placeholder={field.description}
            disabled={!isEditingProfile}
          />
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
      <div className="flex-1 overflow-hidden flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Top right controls within chat area */}
          <div className="absolute top-3 right-3 z-50 flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 w-7 p-0 bg-white/90 theme-primary-hover:hover hover:text-white shadow-sm" 
              onClick={() => setShowProfileFields(!showProfileFields)}
              title="Toggle Profile Fields"
            >
              <UserCog className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose} 
              className="h-7 w-7 p-0 bg-white/90 theme-primary-hover:hover hover:text-white shadow-sm"
              title="Close Chat"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto h-full flex flex-col p-6">

              {showProfileFields && copilot?.profileFields && copilot.profileFields.length > 0 && (
                <div className="mb-6 mt-8 p-4 rounded-lg border border-gray-200" style={{ backgroundColor: '#f8fafb' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">Personalize your experience</h3>
                      <span className="text-sm text-gray-500">Help {copilot.name} provide better assistance</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowProfileFields(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <form className="space-y-4">
                    <div className="space-y-4">
                      {copilot.profileFields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <span className="flex items-center justify-between">
                              <span>
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </span>
                              {field.description && (
                                <span className="text-xs text-gray-500 font-normal">{field.description}</span>
                              )}
                            </span>
                          </label>
                          {renderProfileField(field)}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-gray-500">
                        This information helps personalize your experience
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveProfile}
                          className="gap-2"
                          disabled={isEditingProfile && !hasProfileDataChanged()}
                        >
                          {isEditingProfile ? (
                            <>
                              <Check className="h-3 w-3" />
                              Save Profile
                            </>
                          ) : (
                            <>
                              <Edit3 className="h-3 w-3" />
                              Edit Profile
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              
              <div className="flex-1 space-y-6 overflow-y-auto mt-8">
                {/* Welcome screen with available tools when no messages */}
                {messages.length === 0 && copilot && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-2xl text-center space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-900">Welcome to {copilot.name}</h2>
                        <p className="text-gray-600">{copilot.description}</p>
                      </div>
                      
                      {/* Available Tools Overview */}
                      {copilot.components && copilot.components.length > 0 && (
                        <div className="space-y-3 capabilities-section">
                          <h3 className="text-lg font-medium text-gray-900">Available Capabilities</h3>
                          <div className={`${
                            (() => {
                              const hasAgents = copilot.components.filter(c => c.type === 'agent').length > 0;
                              const hasTools = copilot.components.filter(c => c.type === 'tool').length > 0;
                              const hasWorkflows = copilot.components.filter(c => c.type === 'workflow').length > 0;
                              const columnCount = [hasAgents, hasTools, hasWorkflows].filter(Boolean).length;
                              
                              if (columnCount === 3) return 'grid grid-cols-1 md:grid-cols-3 gap-3';
                              if (columnCount === 2) return 'flex flex-col md:flex-row gap-3 justify-center max-w-2xl mx-auto';
                              return 'flex justify-center max-w-sm mx-auto';
                            })()
                          }`}>
                            {/* Agents Column */}
                            {copilot.components.filter(c => c.type === 'agent').length > 0 && (
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Bot className="w-4 h-4 text-purple-600" />
                                  <h4 className="font-medium text-purple-900 text-[15px]">Agents</h4>
                                </div>
                                <div className="space-y-1">
                                  {copilot.components.filter(c => c.type === 'agent').map((agent) => {
                                    const isExpanded = expandedComponents.has(agent.name);
                                    return (
                                      <div 
                                        key={agent.name} 
                                        className="p-2 bg-purple-50 rounded text-left border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer"
                                        onClick={() => toggleComponentExpansion(agent.name)}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium text-gray-900 truncate text-[14px]">{agent.name}</div>
                                          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                        <div className={`text-gray-600 text-[14px] ${isExpanded ? 'whitespace-normal' : 'truncate'}`}>
                                          {agent.description || 'Specialized assistant'}
                                        </div>
                                        {isExpanded && (
                                          <div className="mt-2 pt-2 border-t border-purple-200">
                                            <div className="text-xs text-gray-500">
                                              Use <code className="px-1 py-0.5 bg-purple-100 rounded text-xs border border-purple-200">@{agent.name}</code> to reference this agent
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            
                            {/* Tools Column */}
                            {copilot.components.filter(c => c.type === 'tool').length > 0 && (
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Wrench className="w-4 h-4 text-blue-600" />
                                  <h4 className="font-medium text-blue-900 text-[15px]">Tools</h4>
                                </div>
                                <div className="space-y-1">
                                  {copilot.components.filter(c => c.type === 'tool').map((tool) => {
                                    const isExpanded = expandedComponents.has(tool.name);
                                    return (
                                      <div 
                                        key={tool.name} 
                                        className="p-2 bg-blue-50 rounded text-left border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                                        onClick={() => toggleComponentExpansion(tool.name)}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium text-gray-900 truncate !text-sm">{tool.name}</div>
                                          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                        <div className={`text-gray-600 !text-sm ${isExpanded ? 'whitespace-normal' : 'truncate'}`}>
                                          {tool.description || 'Integration tool'}
                                        </div>
                                        {isExpanded && (
                                          <div className="mt-2 pt-2 border-t border-blue-200">
                                            <div className="text-xs text-gray-500">
                                              Use <code className="px-1 py-0.5 bg-blue-100 rounded text-xs border border-blue-200">@{tool.name}</code> to reference this tool
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            
                            {/* Workflows Column */}
                            {copilot.components.filter(c => c.type === 'workflow').length > 0 && (
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Workflow className="w-4 h-4 text-amber-600" />
                                  <h4 className="font-medium text-amber-900 text-[15px]">Workflows</h4>
                                </div>
                                <div className="space-y-1">
                                  {copilot.components.filter(c => c.type === 'workflow').map((workflow) => {
                                    const isExpanded = expandedComponents.has(workflow.name);
                                    return (
                                      <div 
                                        key={workflow.name} 
                                        className="p-2 bg-amber-50 rounded text-left border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer"
                                        onClick={() => toggleComponentExpansion(workflow.name)}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium text-gray-900 text-[14px] truncate">{workflow.name}</div>
                                          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                        <div className={`text-[14px] text-gray-600 leading-tight ${isExpanded ? 'whitespace-normal' : 'truncate'}`}>
                                          {workflow.description || 'Automated workflow'}
                                        </div>
                                        {isExpanded && (
                                          <div className="mt-2 pt-2 border-t border-amber-200">
                                            <div className="text-xs text-gray-500">
                                              Use <code className="px-1 py-0.5 bg-amber-100 rounded text-xs border border-amber-200">@{workflow.name}</code> to reference this workflow
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-gray-500 mt-3 text-[14px]">
                            Use the <Plus className="w-3 h-3 inline mx-1" /> button below to activate tools during our conversation.
                          </div>
                        </div>
                      )}
                      
                      {/* Conversation Starters Carousel */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Quick prompts</h4>
                        <div className="relative group">
                          {/* Left Arrow */}
                          {canScrollLeft && (
                            <button
                              onClick={() => scrollCarousel('left')}
                              className="absolute left-2 top-2 z-10 h-8 w-8 rounded-md theme-primary/80 hover:theme-primary opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center ml-[0px] mr-[0px] mt-[10px] mb-[10px]"
                            >
                              <ChevronLeft className="h-4 w-4 text-white" />
                            </button>
                          )}
                          
                          {/* Right Arrow */}
                          {canScrollRight && (
                            <button
                              onClick={() => scrollCarousel('right')}
                              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-md theme-primary/80 hover:theme-primary opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center mt-[8px] mb-[8px]"
                            >
                              <ChevronRight className="h-4 w-4 text-white" />
                            </button>
                          )}
                          
                          <div 
                            ref={carouselRef}
                            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" 
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                          >
                            {getConversationStarters(copilot.name).map((starter, index) => (
                              <button
                                key={index}
                                onClick={() => handleStarterClick(starter)}
                                className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-2 text-left transition-colors group w-80"
                              >
                                <span 
                                  className="text-xs text-gray-700 group-hover:text-gray-900 block"
                                  style={{ lineHeight: '1.75' }}
                                  dangerouslySetInnerHTML={{ 
                                    __html: formatMarkdown(starter)
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-500 text-[14px]">Or start typing below to begin our conversation.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-4 rounded-lg text-foreground pt-[6px] pb-[6px] ${
                        message.sender === 'user' ? 'max-w-[70%]' : 'w-full'
                      }`}
                      style={message.sender === 'user' ? { backgroundColor: 'var(--theme-background)' } : {}}
                    >
                      <div 
                        className="whitespace-pre-wrap" 
                        style={{ fontSize: '.9375em' }}
                        dangerouslySetInnerHTML={{ 
                          __html: formatMarkdown(message.content)
                        }}
                      />
                      
                      {/* Interaction buttons for AI responses */}
                      {message.sender === 'bot' && (
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-3 text-xs hover:bg-gray-200 hover:text-gray-900 ${
                                  copiedMessages.has(message.id) ? 'text-green-600 bg-green-50' : ''
                                }`}
                                onClick={() => handleCopyMessage(message.content, message.id)}
                              >
                                {copiedMessages.has(message.id) ? (
                                  <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-3 text-xs hover:bg-gray-200 hover:text-gray-900 ${
                                  likedMessages.has(message.id) ? 'text-green-600 bg-green-50' : ''
                                }`}
                                onClick={() => handleLikeMessage(message.id)}
                              >
                                {likedMessages.has(message.id) ? (
                                  <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Liked
                                  </>
                                ) : (
                                  <>
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    Like
                                  </>
                                )}
                              </Button>
                              {feedbackForms[message.id]?.type === 'dislike' && feedbackForms[message.id]?.submitted ? (
                                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded h-8 flex items-center">
                                  <Check className="w-3 h-3 mr-1" />
                                  Sent
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-3 text-xs hover:bg-gray-200 hover:text-gray-900"
                                  onClick={() => handleDislikeMessage(message.id)}
                                >
                                  <ThumbsDown className="w-3 h-3 mr-1" />
                                  Dislike
                                </Button>
                              )}
                            </div>
                            
                            {/* Ask a human on the far right */}
                            {feedbackForms[message.id]?.type === 'askHuman' && feedbackForms[message.id]?.submitted ? (
                              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded h-8 flex items-center">
                                <Check className="w-3 h-3 mr-1" />
                                Sent
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-xs hover:bg-gray-200 hover:text-gray-900"
                                onClick={() => handleAskHuman(message.id)}
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                Ask a human
                              </Button>
                            )}
                          </div>
                          
                          {/* Feedback form */}
                          {feedbackForms[message.id]?.visible && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium text-gray-700">
                                  {feedbackForms[message.id].type === 'dislike' 
                                    ? "What was wrong with this response?" 
                                    : "What would you like a human to help with?"}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCloseFeedback(message.id)}
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                  title="Close"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder={feedbackForms[message.id].type === 'dislike' 
                                    ? "Tell us what went wrong..." 
                                    : "Describe what you need help with..."}
                                  value={feedbackForms[message.id].text}
                                  onChange={(e) => handleUpdateFeedback(message.id, e.target.value)}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleSubmitFeedback(message.id)}
                                  disabled={!feedbackForms[message.id].text.trim()}
                                >
                                  Send
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Universal Messaging App */}
                {showMessagingApp && (
                  <div className="mt-4 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="h-[700px]">
                        <UniversalMessagingApp onClose={() => setShowMessagingApp(false)} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          
          {/* Prompt Bar - moved inside chat area */}
          <div className="bg-white relative">
            <div className="max-w-4xl mx-auto p-3 relative">
              <div className="flex gap-3 relative items-end">
                {/* Floating Attached Files Display */}
                {selectedFiles.length > 0 && (
                  <div className="absolute -top-8 left-0">
                    <div className="flex items-center gap-2 px-3 py-1 theme-primary backdrop-blur-sm rounded-full text-white text-xs mt-[-6px] mb-[-6px]">
                      <Paperclip className="w-3 h-3" />
                      <span>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(expandedAttachments ? selectedFiles : selectedFiles.slice(0, 2)).map((fileName) => (
                          <div key={fileName} className="flex items-center gap-1 bg-white/30 px-2 py-0.5 rounded-full">
                            {getFileIcon(fileName)}
                            <span className="truncate max-w-[80px]">{fileName.split('.')[0]}</span>
                          </div>
                        ))}
                        {selectedFiles.length > 2 && !expandedAttachments && (
                          <button 
                            className="bg-white/30 px-2 py-0.5 rounded-full hover:bg-white/40 transition-colors cursor-pointer"
                            onClick={() => setExpandedAttachments(true)}
                          >
                            +{selectedFiles.length - 2}
                          </button>
                        )}
                        {expandedAttachments && selectedFiles.length > 2 && (
                          <button 
                            className="bg-white/30 px-2 py-0.5 rounded-full hover:bg-white/40 transition-colors cursor-pointer"
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
                  className="h-12 px-3 self-end"
                  onClick={() => {
                    setShowAttachmentSidebar(!showAttachmentSidebar);
                    onToggleAttachment?.(!showAttachmentSidebar);
                  }}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-12 px-3 self-end"
                      title="Add Agent, Tool, or Workflow"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {/* Available Agents */}
                    {copilot?.components.filter(c => c.type === 'agent').map((agent) => (
                      <DropdownMenuItem key={agent.name} onClick={() => handleAddComponent(agent.name, 'agent')}>
                        <Bot className="w-4 h-4 mr-2" />
                        {agent.name}
                      </DropdownMenuItem>
                    ))}
                    
                    {/* Available Tools */}
                    {copilot?.components.filter(c => c.type === 'tool').map((tool) => (
                      <DropdownMenuItem key={tool.name} onClick={() => handleAddComponent(tool.name, 'tool')}>
                        <Wrench className="w-4 h-4 mr-2" />
                        {tool.name}
                      </DropdownMenuItem>
                    ))}
                    
                    {/* Available Workflows */}
                    {copilot?.components.filter(c => c.type === 'workflow').map((workflow) => (
                      <DropdownMenuItem key={workflow.name} onClick={() => handleAddComponent(workflow.name, 'workflow')}>
                        <Workflow className="w-4 h-4 mr-2" />
                        {workflow.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex-1 relative">

                  <div className="relative">
                    {/* Hybrid approach: regular input with badge overlay positioned correctly */}
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message... Use @ to mention tools, agents, or workflows"
                      className="min-h-12 max-h-24 resize-none w-full relative z-10 bg-transparent"
                      style={{ 
                        color: inputContent && (inputContent.includes('@') || (() => {
                          // Check if any component name exists as a complete word in the input
                          const componentNames = copilot?.components?.map(c => c.name) || [];
                          return componentNames.some(name => {
                            const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                            return regex.test(inputContent);
                          });
                        })()) ? 'transparent' : 'inherit'
                      }}
                      rows={1}
                    />
                    
                    {/* Badge overlay that shows when @mentions or component names are present */}
                    {inputContent && (inputContent.includes('@') || (() => {
                      // Check if any component name exists as a complete word in the input
                      const componentNames = copilot?.components?.map(c => c.name) || [];
                      return componentNames.some(name => {
                        const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                        return regex.test(inputContent);
                      });
                    })()) && (
                      <div 
                        className="absolute inset-0 px-3 py-2 text-sm pointer-events-none whitespace-pre-wrap break-words"
                        style={{ 
                          lineHeight: '1.5',
                          zIndex: 5
                        }}
                        dangerouslySetInnerHTML={{ __html: renderInputWithBadges() }}
                      />
                    )}
                    
                    {/* Handle Autocomplete Dropdown */}
                    {showHandleDropdown && handleSuggestions.length > 0 && (
                      <div 
                        className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent textarea blur
                        }}
                      >
                        {handleSuggestions.map((suggestion, index) => (
                          <div
                            key={`${suggestion.type}-${suggestion.name}`}
                            className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${
                              index === selectedHandleIndex 
                                ? 'bg-blue-50 border-l-2 border-blue-500' 
                                : 'hover:bg-gray-50'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent textarea blur
                              insertHandle(suggestion.name);
                            }}
                          >
                            {suggestion.type === 'agent' && <Bot className="w-4 h-4 text-purple-600" />}
                            {suggestion.type === 'tool' && <Wrench className="w-4 h-4 text-blue-600" />}
                            {suggestion.type === 'workflow' && <Workflow className="w-4 h-4 text-amber-600" />}
                            {suggestion.type === 'inbox' && <MessageSquare className="w-4 h-4 text-green-600" />}
                            <div className="flex-1">
                              <div className="font-medium text-sm">@{suggestion.name}</div>
                              <div className="text-xs text-gray-500 capitalize">{suggestion.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={handleSendMessage} className="h-12 w-12 p-0 self-end" title="Send Message">
                  <Send className="h-4 w-4" />
                </Button>
                {recordingSupported && (
                  <Button 
                    variant={isRecording ? "default" : "outline"}
                    className={`h-12 px-3 self-end transition-colors ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                        : 'theme-primary-hover:hover hover:text-white'
                    }`}
                    onClick={toggleRecording}
                    title={isRecording ? "Stop recording" : "Start voice input"}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
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
              className="absolute left-0 top-0 bottom-0 w-1 bg-transparent theme-primary-hover:hover cursor-col-resize transition-colors z-10"
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
              className="absolute top-1 right-1 h-5 w-5 p-0 z-20 bg-white/90 theme-primary-hover:hover shadow-md rounded-full transition-colors"
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
