import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Paperclip, UserCog, Plus, Bot, Wrench, Workflow, ThumbsUp, ThumbsDown, Copy, User, Check, CheckCheck, User2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CopilotData, ChatMessage, ProfileField } from '@/lib/types';

interface ChatInterfaceProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
  onToggleAttachment?: (show: boolean) => void;
  selectedFiles?: string[];
}

export function ChatInterface({ isOpen, copilot, onClose, onToggleAttachment, selectedFiles = [] }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showProfileFields, setShowProfileFields] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, any>>({});
  const [showAttachmentSidebar, setShowAttachmentSidebar] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState<Array<{name: string, type: 'agent' | 'tool' | 'workflow'}>>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showHumanForm, setShowHumanForm] = useState<string | null>(null);
  const [humanRequestText, setHumanRequestText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load initial conversation if copilot has messages
  useEffect(() => {
    if (copilot?.conversationMessages) {
      setMessages(copilot.conversationMessages);
    } else {
      setMessages([]);
    }
  }, [copilot]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load profile data from copilot
  useEffect(() => {
    if (copilot?.formInputs) {
      setProfileData(copilot.formInputs);
    }
  }, [copilot]);

  const handleSendMessage = () => {
    if (message.trim() && copilot) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `Thank you for your message. I'm **${copilot.name}** and I'm here to help you with ${copilot.description.toLowerCase()}. How can I assist you today?`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showMentions && mentionSuggestions.length > 0) {
        handleMentionSelect(mentionSuggestions[selectedMentionIndex]);
      } else {
        handleSendMessage();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      // Show all suggestions when @ is typed
      const allComponents = copilot?.components || [];
      setMentionSuggestions(allComponents.map(comp => ({ name: comp.name, type: comp.type })));
      setMentionQuery('');
      setShowMentions(true);
      setSelectedMentionIndex(0);
    } else if (atIndex !== -1 && atIndex < value.length - 1) {
      // Filter suggestions based on query
      const query = value.slice(atIndex + 1);
      if (query.includes(' ')) {
        setShowMentions(false);
      } else {
        const allComponents = copilot?.components || [];
        const filtered = allComponents
          .filter(comp => comp.name.toLowerCase().includes(query.toLowerCase()))
          .map(comp => ({ name: comp.name, type: comp.type }));
        setMentionSuggestions(filtered);
        setMentionQuery(query);
        setShowMentions(filtered.length > 0);
        setSelectedMentionIndex(0);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (suggestion: {name: string, type: 'agent' | 'tool' | 'workflow'}) => {
    const atIndex = message.lastIndexOf('@');
    const newMessage = message.slice(0, atIndex) + `@${suggestion.name} `;
    setMessage(newMessage);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const handleMentionKeyDown = (e: React.KeyboardEvent) => {
    if (!showMentions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedMentionIndex(prev => Math.min(prev + 1, mentionSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedMentionIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (mentionSuggestions.length > 0) {
        handleMentionSelect(mentionSuggestions[selectedMentionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowMentions(false);
    }
  };

  const formatMessageContent = (content: string) => {
    if (!copilot?.components) return content;

    // Create badges for @mentions
    let formattedContent = content;
    const components = copilot.components;
    
    // Sort by name length to avoid partial matches
    const sortedComponents = [...components].sort((a, b) => b.name.length - a.name.length);
    
    sortedComponents.forEach(component => {
      const escapedName = component.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`@${escapedName}\\b`, 'g');
      
      const getIcon = (type: string) => {
        switch (type) {
          case 'agent': return '🤖';
          case 'tool': return '🔧';
          case 'workflow': return '⚙️';
          default: return '🔧';
        }
      };

      const getColor = (type: string) => {
        switch (type) {
          case 'agent': return 'bg-purple-100 text-purple-800';
          case 'tool': return 'bg-blue-100 text-blue-800';
          case 'workflow': return 'bg-amber-100 text-amber-800';
          default: return 'bg-gray-100 text-gray-800';
        }
      };

      formattedContent = formattedContent.replace(regex, 
        `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getColor(component.type)}">${getIcon(component.type)} ${component.name}</span>`
      );
    });

    // Format markdown
    formattedContent = formattedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');

    return formattedContent;
  };

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  const isConsecutiveMessage = (currentIndex: number) => {
    if (currentIndex === 0) return false;
    const current = messages[currentIndex];
    const previous = messages[currentIndex - 1];
    
    if (current.sender !== previous.sender) return false;
    
    // Check if messages are within 5 minutes
    const currentTime = new Date(`2024-01-01 ${current.timestamp}`);
    const previousTime = new Date(`2024-01-01 ${previous.timestamp}`);
    const timeDiff = Math.abs(currentTime.getTime() - previousTime.getTime());
    
    return timeDiff < 5 * 60 * 1000; // 5 minutes
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    setShowProfileFields(false);
    // Here you would typically save the profile data
  };

  if (!isOpen || !copilot) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex-1 overflow-hidden flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Top right controls */}
          <div className="absolute top-3 right-3 z-50 flex items-center gap-1">
            {copilot.profileFields && copilot.profileFields.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 w-7 p-0 bg-white/90 hover:bg-[#00d2a0] hover:text-white shadow-sm" 
                onClick={() => setShowProfileFields(!showProfileFields)}
                title="Toggle Profile Fields"
              >
                <UserCog className="h-3 w-3" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose} 
              className="h-7 w-7 p-0 bg-white/90 hover:bg-[#00d2a0] hover:text-white shadow-sm"
              title="Close Chat"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="w-full h-full flex flex-col p-6">
              {/* Profile Fields Section */}
              {showProfileFields && copilot?.profileFields && copilot.profileFields.length > 0 && (
                <div className="mb-6 mt-8 p-4 rounded-lg border border-gray-200" style={{ backgroundColor: '#f8fafb' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Tell us about yourself</h3>
                      <p className="text-sm text-gray-500">Help {copilot.name} provide better assistance</p>
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
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.description && (
                            <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                          )}
                          {field.type === 'textarea' ? (
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                              rows={3}
                              disabled={!isEditingProfile}
                              value={profileData[field.name] || ''}
                              onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                            />
                          ) : field.type === 'select' ? (
                            <select
                              className="w-full p-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
                              disabled={!isEditingProfile}
                              value={profileData[field.name] || ''}
                              onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                            >
                              <option value="">Select {field.label.toLowerCase()}</option>
                              {field.options?.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : field.type === 'number' ? (
                            <input
                              type="number"
                              className="w-full p-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                              disabled={!isEditingProfile}
                              value={profileData[field.name] || ''}
                              onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                            />
                          ) : (
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                              disabled={!isEditingProfile}
                              value={profileData[field.name] || ''}
                              onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end pt-2">
                      {isEditingProfile ? (
                        <Button
                          type="button"
                          onClick={handleProfileSave}
                          className="bg-[#008062] hover:bg-[#00d2a0] text-white"
                          disabled={!Object.values(profileData).some(value => value)}
                        >
                          Save Profile
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-[#008062] hover:bg-[#00d2a0] text-white"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Welcome Screen or Messages */}
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">{copilot.name}</h2>
                    <p className="text-gray-600 max-w-md">{copilot.description}</p>
                  </div>
                  
                  <div className="w-full max-w-4xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Capabilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Agents Column */}
                      {copilot.components.filter(c => c.type === 'agent').length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <h4 className="font-medium text-purple-700">
                              Agents ({copilot.components.filter(c => c.type === 'agent').length})
                            </h4>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {copilot.components.filter(c => c.type === 'agent').map((component, index) => (
                              <div key={index} className="p-3 bg-purple-50 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer">
                                <div className="font-medium text-sm text-purple-900">{component.name}</div>
                                <div className="text-xs text-purple-700 mt-1 line-clamp-2">{component.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tools Column */}
                      {copilot.components.filter(c => c.type === 'tool').length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <h4 className="font-medium text-blue-700">
                              Tools ({copilot.components.filter(c => c.type === 'tool').length})
                            </h4>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {copilot.components.filter(c => c.type === 'tool').map((component, index) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer">
                                <div className="font-medium text-sm text-blue-900">{component.name}</div>
                                <div className="text-xs text-blue-700 mt-1 line-clamp-2">{component.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Workflows Column */}
                      {copilot.components.filter(c => c.type === 'workflow').length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <h4 className="font-medium text-amber-700">
                              Workflows ({copilot.components.filter(c => c.type === 'workflow').length})
                            </h4>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {copilot.components.filter(c => c.type === 'workflow').map((component, index) => (
                              <div key={index} className="p-3 bg-amber-50 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer">
                                <div className="font-medium text-sm text-amber-900">{component.name}</div>
                                <div className="text-xs text-amber-700 mt-1 line-clamp-2">{component.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Messages Area */
                <div className="flex-1 space-y-4 pb-4">
                  {messages.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    const isConsecutive = isConsecutiveMessage(index);
                    
                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mt-1' : 'mt-4'}`}>
                        <div className={`flex items-end gap-2 max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          {/* Avatar */}
                          {!isConsecutive && (
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                              isUser ? 'bg-[#008062]' : 'bg-gray-200'
                            }`}>
                              {isUser ? (
                                <User2 className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                          )}
                          {isConsecutive && <div className="w-8"></div>}
                          
                          {/* Message Bubble */}
                          <div className={`relative px-3 py-2 rounded-2xl ${
                            isUser 
                              ? `bg-[#DCF8C6] ${isConsecutive ? 'rounded-br-md' : 'rounded-br-sm'}` 
                              : `bg-white border ${isConsecutive ? 'rounded-bl-md' : 'rounded-bl-sm'}`
                          }`}>
                            <div 
                              className="text-sm break-words"
                              dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }}
                            />
                            
                            <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                              <span className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
                              {isUser && (
                                <CheckCheck className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            
                            {/* Bot message actions */}
                            {!isUser && (
                              <div className="flex items-center gap-1 mt-2 pt-1 border-t border-gray-100">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => copyToClipboard(msg.content)}
                                >
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => setShowFeedbackForm(msg.id)}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => setShowHumanForm(msg.id)}
                                >
                                  <User className="w-3 h-3 mr-1" />
                                  Ask Human
                                </Button>
                              </div>
                            )}
                            
                            {/* Feedback Forms */}
                            {showFeedbackForm === msg.id && (
                              <div className="mt-2 p-2 bg-gray-50 rounded border">
                                <p className="text-xs text-gray-600 mb-2">What could be improved?</p>
                                <div className="flex gap-2">
                                  <Input
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="Your feedback..."
                                    className="text-xs h-8"
                                  />
                                  <Button
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => {
                                      setShowFeedbackForm(null);
                                      setFeedbackText('');
                                    }}
                                  >
                                    Send
                                  </Button>
                                </div>
                              </div>
                            )}
                            
                            {showHumanForm === msg.id && (
                              <div className="mt-2 p-2 bg-gray-50 rounded border">
                                <p className="text-xs text-gray-600 mb-2">Describe what you need help with:</p>
                                <div className="flex gap-2">
                                  <Input
                                    value={humanRequestText}
                                    onChange={(e) => setHumanRequestText(e.target.value)}
                                    placeholder="I need help with..."
                                    className="text-xs h-8"
                                  />
                                  <Button
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => {
                                      setShowHumanForm(null);
                                      setHumanRequestText('');
                                    }}
                                  >
                                    Send
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="bg-white relative">
            <div className="w-full p-3 relative">
              <div className="flex gap-3 relative items-end">
                {/* Floating Attached Files Display */}
                {selectedFiles.length > 0 && (
                  <div className="absolute -top-8 left-0">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#008062] backdrop-blur-sm rounded-full text-white text-xs">
                      <Paperclip className="w-3 h-3" />
                      <span>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}</span>
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
                    {copilot?.components.filter(c => c.type === 'agent').map((agent) => (
                      <DropdownMenuItem key={agent.name} onClick={() => setMessage(prev => prev + `@${agent.name} `)}>
                        <Bot className="w-4 h-4 mr-2" />
                        {agent.name}
                      </DropdownMenuItem>
                    ))}
                    {copilot?.components.filter(c => c.type === 'tool').map((tool) => (
                      <DropdownMenuItem key={tool.name} onClick={() => setMessage(prev => prev + `@${tool.name} `)}>
                        <Wrench className="w-4 h-4 mr-2" />
                        {tool.name}
                      </DropdownMenuItem>
                    ))}
                    {copilot?.components.filter(c => c.type === 'workflow').map((workflow) => (
                      <DropdownMenuItem key={workflow.name} onClick={() => setMessage(prev => prev + `@${workflow.name} `)}>
                        <Workflow className="w-4 h-4 mr-2" />
                        {workflow.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      handleMentionKeyDown(e);
                      handleKeyPress(e);
                    }}
                    placeholder="Type a message..."
                    className="h-12 pr-12 resize-none"
                  />
                  
                  {/* Mention Suggestions Dropdown */}
                  {showMentions && mentionSuggestions.length > 0 && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border rounded-lg shadow-lg max-h-32 overflow-y-auto z-50">
                      {mentionSuggestions.map((suggestion, index) => (
                        <div
                          key={suggestion.name}
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                            index === selectedMentionIndex ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleMentionSelect(suggestion)}
                        >
                          {suggestion.type === 'agent' && <Bot className="w-4 h-4 text-purple-600" />}
                          {suggestion.type === 'tool' && <Wrench className="w-4 h-4 text-blue-600" />}
                          {suggestion.type === 'workflow' && <Workflow className="w-4 h-4 text-amber-600" />}
                          <span className="text-sm">{suggestion.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="absolute right-1 top-1 h-10 w-10 p-0 bg-[#008062] hover:bg-[#00d2a0]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}