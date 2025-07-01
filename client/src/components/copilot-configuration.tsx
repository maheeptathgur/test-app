import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save, Settings, Bot, Users, Plus, Trash2, Upload, Image, Code, Copy, BookOpen, FileText, Link, ExternalLink, Edit3, Eye, Check, FolderOpen, Download, Search, Filter, SortAsc, PenTool, BarChart, Zap, GitBranch } from "lucide-react";
import { SiGmail, SiSlack } from "react-icons/si";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CopilotData } from "@/lib/types";

interface CopilotConfigurationProps {
  copilot: CopilotData;
  onClose: () => void;
  onSave: (updatedCopilot: CopilotData) => void;
}

interface ProfileData {
  title: string;
  company: string;
  industry: string;
  department: string;
  experience: string;
  location: string;
  timezone: string;
  communicationStyle: string;
  expertise: string;
  goals: string;
  preferences: string;
}

export function CopilotConfiguration({ copilot, onClose, onSave }: CopilotConfigurationProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [codeTab, setCodeTab] = useState("javascript");
  const [copilotData, setCopilotData] = useState<CopilotData>(copilot);

  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant focused on providing accurate and relevant information.");
  const [conversationStarters, setConversationStarters] = useState([
    "How can you help me today?",
    "What are your capabilities?",
    "Can you provide some examples of what you can do?"
  ]);
  const [scope, setScope] = useState("private");
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [aiProvider, setAiProvider] = useState("OpenAI");
  const [aiModel, setAiModel] = useState("gpt-4");
  const [apiKey, setApiKey] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>({
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    industry: "Technology",
    department: "Product",
    experience: "8 years",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    communicationStyle: "Direct and concise",
    expertise: "Product strategy, user experience, data analysis",
    goals: "Launch innovative products that solve real user problems",
    preferences: "Prefer data-driven decisions and collaborative approaches"
  });
  const [suggestDocsOpen, setSuggestDocsOpen] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [addFieldModalOpen, setAddFieldModalOpen] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldDescription, setNewFieldDescription] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [editFieldModalOpen, setEditFieldModalOpen] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [deleteFieldModalOpen, setDeleteFieldModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);
  
  // Knowledge Base filters and search
  const [kbSearchTerm, setKbSearchTerm] = useState('');
  const [kbSortBy, setKbSortBy] = useState('updated');
  const [kbFilterType, setKbFilterType] = useState('all');
  
  // User Documents filters and search
  const [docsSearchTerm, setDocsSearchTerm] = useState('');
  const [docsSortBy, setDocsSortBy] = useState('updated');
  const [docsFilterType, setDocsFilterType] = useState('all');
  
  // Component selection modal state
  const [componentModalOpen, setComponentModalOpen] = useState(false);
  const [componentModalType, setComponentModalType] = useState<'agent' | 'tool' | 'workflow'>('agent');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  // Available workspace components
  const workspaceComponents = {
    agents: [
      { 
        id: 'content-creator', 
        name: 'Content Creator', 
        description: 'Creates and optimizes marketing content',
        specialization: 'Content Creation',
        tools: [
          { name: 'OpenAI', color: 'bg-green-100 text-green-700' },
          { name: 'Unsplash', color: 'bg-blue-100 text-blue-700' },
          { name: 'Google Drive', color: 'bg-yellow-100 text-yellow-700' }
        ],
        workflows: [
          { name: 'Content Pipeline', color: 'bg-amber-100 text-amber-700' },
          { name: 'Publishing Flow', color: 'bg-purple-100 text-purple-700' }
        ],
        tasks: 156
      },
      { 
        id: 'data-analyst', 
        name: 'Data Analyst', 
        description: 'Analyzes data and generates insights',
        specialization: 'Data Analysis',
        tools: [
          { name: 'Google Analytics', color: 'bg-orange-100 text-orange-700' },
          { name: 'Airtable', color: 'bg-red-100 text-red-700' },
          { name: 'Excel', color: 'bg-green-100 text-green-700' },
          { name: 'Python', color: 'bg-blue-100 text-blue-700' }
        ],
        workflows: [
          { name: 'Data Processing', color: 'bg-green-100 text-green-700' },
          { name: 'Report Generation', color: 'bg-blue-100 text-blue-700' },
          { name: 'Analytics Dashboard', color: 'bg-purple-100 text-purple-700' }
        ],
        tasks: 89
      },
      { 
        id: 'customer-support', 
        name: 'Customer Support Agent', 
        description: 'Handles customer inquiries and support',
        specialization: 'Customer Support',
        tools: [
          { name: 'Gmail', color: 'bg-red-100 text-red-700' },
          { name: 'Slack', color: 'bg-blue-100 text-blue-700' }
        ],
        workflows: [
          { name: 'Support Ticket', color: 'bg-green-100 text-green-700' }
        ],
        tasks: 234
      }
    ],
    tools: [
      { 
        id: 'gmail', 
        name: 'Gmail', 
        description: 'Email management and communication',
        status: 'Connected',
        apiCalls: 1234,
        auth: 'OAuth 2.0'
      },
      { 
        id: 'slack', 
        name: 'Slack', 
        description: 'Team communication and collaboration',
        status: 'Connected',
        apiCalls: 856,
        auth: 'Bot Token'
      },
      { 
        id: 'analytics', 
        name: 'Google Analytics', 
        description: 'Website and app analytics',
        status: 'Connected',
        apiCalls: 445,
        auth: 'Service Account'
      },
      { 
        id: 'openai', 
        name: 'OpenAI', 
        description: 'AI model access and completions',
        status: 'Connected',
        apiCalls: 2156,
        auth: 'API Key'
      }
    ],
    workflows: [
      { 
        id: 'content-pipeline', 
        name: 'Content Pipeline', 
        description: 'Automated content creation and publishing',
        source: 'n8n',
        steps: 5,
        successRate: 98.2,
        executions: 245
      },
      { 
        id: 'data-processing', 
        name: 'Data Processing', 
        description: 'Automated data collection and analysis',
        source: 'Make.com',
        steps: 8,
        successRate: 94.7,
        executions: 67
      },
      { 
        id: 'email-automation', 
        name: 'Email Automation', 
        description: 'Automated email campaigns and responses',
        source: 'Zapier',
        steps: 3,
        successRate: 99.1,
        executions: 189
      }
    ]
  };

  // Sample AI-suggested documents
  const suggestedDocs = [
    {
      id: "onboarding-guide",
      title: "User Onboarding Guide",
      description: "Step-by-step guide to help new users get started with your product",
      category: "User Experience"
    },
    {
      id: "troubleshooting-faq",
      title: "Common Troubleshooting FAQ",
      description: "Frequently asked questions and solutions for common issues",
      category: "Support"
    },
    {
      id: "api-reference",
      title: "API Reference Documentation",
      description: "Complete reference for all available API endpoints and parameters",
      category: "Technical"
    },
    {
      id: "best-practices",
      title: "Best Practices Guide",
      description: "Industry best practices and recommendations for optimal usage",
      category: "Guidelines"
    },
    {
      id: "integration-examples",
      title: "Integration Code Examples",
      description: "Code samples and examples for common integration scenarios",
      category: "Technical"
    },
    {
      id: "feature-comparison",
      title: "Feature Comparison Matrix",
      description: "Detailed comparison of features across different plans or versions",
      category: "Product"
    }
  ];

  const handleCopilotChange = (field: keyof CopilotData, value: any) => {
    setCopilotData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConversationStarterChange = (index: number, value: string) => {
    const updated = [...conversationStarters];
    updated[index] = value;
    setConversationStarters(updated);
  };

  const addConversationStarter = () => {
    if (conversationStarters.length < 5) {
      setConversationStarters([...conversationStarters, ""]);
    }
  };

  const removeConversationStarter = (index: number) => {
    if (conversationStarters.length > 1) {
      setConversationStarters(conversationStarters.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (type: 'icon' | 'banner', file: File | null) => {
    if (type === 'icon') {
      setIconImage(file);
    } else {
      setBannerImage(file);
    }
  };

  const getAvailableModels = (provider: string) => {
    const models = {
      "OpenAI": ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
      "Anthropic": ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
      "Google": ["gemini-pro", "gemini-pro-vision", "gemini-ultra"],
      "Meta": ["llama-2-70b", "llama-2-13b", "llama-2-7b"],
      "Mistral": ["mistral-large", "mistral-medium", "mistral-small"]
    };
    return models[provider as keyof typeof models] || [];
  };

  const addComponent = (type: 'agent' | 'tool' | 'workflow') => {
    setComponentModalType(type);
    setSelectedComponents([]);
    setComponentModalOpen(true);
  };

  const toggleComponentSelection = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleSaveSelectedComponents = () => {
    const componentsToAdd = selectedComponents.map(id => {
      const allComponents = [
        ...workspaceComponents.agents.map(a => ({ ...a, type: 'agent' })),
        ...workspaceComponents.tools.map(t => ({ ...t, type: 'tool' })),
        ...workspaceComponents.workflows.map(w => ({ ...w, type: 'workflow' }))
      ];
      const component = allComponents.find(c => c.id === id);
      return {
        name: component?.name || '',
        type: component?.type || ''
      };
    });

    handleCopilotChange('components', [...copilotData.components, ...componentsToAdd]);
    setComponentModalOpen(false);
    setSelectedComponents([]);
  };

  const removeComponent = (index: number) => {
    const newComponents = copilotData.components.filter((_, i) => i !== index);
    handleCopilotChange('components', newComponents);
  };

  const handleSave = () => {
    onSave(copilotData);
    onClose();
  };

  const handleSuggestionToggle = (suggestionId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestionId) 
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const handleGenerateSelectedDocs = () => {
    // In a real implementation, this would call an API to generate the documents
    console.log('Generating documents:', selectedSuggestions);
    setSuggestDocsOpen(false);
    setSelectedSuggestions([]);
    // Show success message
  };

  const startEditing = (docId: string, currentTitle: string, currentDescription: string) => {
    setEditingDocument(docId);
    setTempTitle(currentTitle);
    setTempDescription(currentDescription);
  };

  const saveEditing = () => {
    // In a real implementation, this would save to the backend
    console.log('Saving document:', { title: tempTitle, description: tempDescription });
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  const cancelEditing = () => {
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  // Navigation handlers dispatch custom events
  const handleAgentConfigure = (agent: any) => {
    onClose(); // Close the copilot configuration
    window.dispatchEvent(new CustomEvent('navigate-to-agent-configure', { 
      detail: { id: agent.id, name: agent.name } 
    }));
  };

  const handleToolConfigure = (tool: any) => {
    onClose(); // Close the copilot configuration
    window.dispatchEvent(new CustomEvent('navigate-to-tool-configure', { 
      detail: { id: tool.id, name: tool.name } 
    }));
  };

  const handleWorkflowConfigure = (workflow: any) => {
    onClose(); // Close the copilot configuration
    window.dispatchEvent(new CustomEvent('navigate-to-workflow-edit', { 
      detail: { id: workflow.id, name: workflow.name } 
    }));
  };

  const handleAddField = () => {
    setAddFieldModalOpen(true);
  };

  const handleSaveNewField = () => {
    // In a real implementation, this would save the new field to the backend
    console.log('Saving new field:', {
      name: newFieldName,
      description: newFieldDescription,
      type: newFieldType,
      required: newFieldRequired
    });
    
    // Reset form and close modal
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setAddFieldModalOpen(false);
  };

  const handleCancelAddField = () => {
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setAddFieldModalOpen(false);
  };

  const handleEditField = (fieldId: string) => {
    // Mock field data - in a real app, this would come from state/props
    const fieldData = {
      'job-title': { name: 'Job Title', description: "User's current job title or role", type: 'text', required: true },
      'industry': { name: 'Industry', description: 'Industry sector the user works in', type: 'select', required: false },
      'experience': { name: 'Experience Level', description: 'Years of professional experience', type: 'select', required: true },
      'expertise': { name: 'Areas of Expertise', description: 'Key skills and areas of expertise', type: 'textarea', required: false },
      'company-size': { name: 'Company Size', description: "Number of employees at user's company", type: 'text', required: false },
      'goals': { name: 'Goals & Objectives', description: 'Professional goals and objectives', type: 'textarea', required: false }
    };

    const field = fieldData[fieldId as keyof typeof fieldData];
    if (field) {
      setNewFieldName(field.name);
      setNewFieldDescription(field.description);
      setNewFieldType(field.type);
      setNewFieldRequired(field.required);
      setEditingFieldId(fieldId);
      setEditFieldModalOpen(true);
    }
  };

  const handleSaveEditField = () => {
    // In a real implementation, this would update the field in the backend
    console.log('Updating field:', editingFieldId, {
      name: newFieldName,
      description: newFieldDescription,
      type: newFieldType,
      required: newFieldRequired
    });
    
    // Reset form and close modal
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setEditingFieldId(null);
    setEditFieldModalOpen(false);
  };

  const handleCancelEditField = () => {
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setEditingFieldId(null);
    setEditFieldModalOpen(false);
  };

  const handleDeleteField = (fieldId: string) => {
    setFieldToDelete(fieldId);
    setDeleteFieldModalOpen(true);
  };

  const handleConfirmDeleteField = () => {
    // In a real implementation, this would delete the field from the backend
    console.log('Deleting field:', fieldToDelete);
    
    setFieldToDelete(null);
    setDeleteFieldModalOpen(false);
  };

  const handleCancelDeleteField = () => {
    setFieldToDelete(null);
    setDeleteFieldModalOpen(false);
  };

  if (!copilot) return null;

  // Navigation handlers dispatch custom events instead of showing inline screens

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-muted/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${copilotData.avatarColor} rounded-lg flex items-center justify-center text-sm font-semibold`}>
            {copilotData.avatar}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Configure {copilotData.name}</h1>
            <p className="text-sm text-muted-foreground">Edit copilot settings, components, and profile fields</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="bg-muted/20">
            <div className="max-w-4xl mx-auto px-6 pt-4 pb-4">
              {/* Configuration Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: "general", label: "General", icon: Settings },
                    { id: "components", label: "Components", icon: Bot },
                    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
                    { id: "user-docs", label: "User Documents", icon: Upload },
                    { id: "profile", label: "Profile Fields", icon: Users }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === tab.id
                            ? 'border-[#008062] text-[#008062]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "general" && (
            <div className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Copilot Configuration */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-foreground">Copilot Configuration</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Copilot Name</Label>
                        <Input
                          id="name"
                          value={copilotData.name}
                          onChange={(e) => handleCopilotChange('name', e.target.value)}
                          placeholder="Enter copilot name"
                        />
                      </div>

                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Copilot Description</Label>
                      <Textarea
                        id="description"
                        value={copilotData.description}
                        onChange={(e) => handleCopilotChange('description', e.target.value)}
                        placeholder="Describe what this copilot does"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="systemPrompt">System Prompt</Label>
                      <Textarea
                        id="systemPrompt"
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="Enter the system prompt that defines how the copilot behaves"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Icon Image (1:1 ratio)</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                          <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground mb-2">
                            Upload icon image
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('icon', e.target.files?.[0] || null)}
                            className="hidden"
                            id="icon-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('icon-upload')?.click()}
                            className="gap-2"
                          >
                            <Upload className="h-3 w-3" />
                            Choose File
                          </Button>
                          {iconImage && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {iconImage.name}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Banner Image (16:9 ratio)</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                          <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground mb-2">
                            Upload banner image
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('banner', e.target.files?.[0] || null)}
                            className="hidden"
                            id="banner-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('banner-upload')?.click()}
                            className="gap-2"
                          >
                            <Upload className="h-3 w-3" />
                            Choose File
                          </Button>
                          {bannerImage && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {bannerImage.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Settings */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-foreground">Advanced Settings</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aiProvider">AI Provider</Label>
                        <Select value={aiProvider} onValueChange={(value) => {
                          setAiProvider(value);
                          setAiModel(getAvailableModels(value)[0] || '');
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OpenAI">OpenAI</SelectItem>
                            <SelectItem value="Anthropic">Anthropic</SelectItem>
                            <SelectItem value="Google">Google</SelectItem>
                            <SelectItem value="Meta">Meta</SelectItem>
                            <SelectItem value="Mistral">Mistral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="aiModel">AI Model</Label>
                        <Select value={aiModel} onValueChange={setAiModel}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableModels(aiProvider).map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Conversation Starters</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addConversationStarter}
                          disabled={conversationStarters.length >= 5}
                          className="gap-2"
                        >
                          <Plus className="h-3 w-3" />
                          Add Starter
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {conversationStarters.map((starter, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={starter}
                              onChange={(e) => handleConversationStarterChange(index, e.target.value)}
                              placeholder={`Conversation starter ${index + 1}`}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeConversationStarter(index)}
                              disabled={conversationStarters.length <= 1}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Scope */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Scope</Label>
                      <p className="text-sm text-muted-foreground">
                        Control who can access this copilot
                      </p>
                      <RadioGroup value={scope} onValueChange={setScope} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private" className="text-sm">
                            Private - Only you can access this copilot
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="public" id="public" />
                          <Label htmlFor="public" className="text-sm">
                            Public - Anyone with the link can access this copilot
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="embedded" id="embedded" />
                          <Label htmlFor="embedded" className="text-sm">
                            Embedded - Can be embedded in websites and applications
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {/* Code generation for public/embedded */}
                      {(scope === 'public' || scope === 'embedded') && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            <Label className="text-sm font-medium">Integration Code</Label>
                          </div>
                          <div className="w-full">
                            <nav className="flex space-x-8 border-b border-border">
                              <button
                                onClick={() => setCodeTab("javascript")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                  codeTab === "javascript"
                                    ? "border-[#008062] text-[#008062]"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                }`}
                              >
                                JavaScript
                              </button>
                              <button
                                onClick={() => setCodeTab("iframe")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                  codeTab === "iframe"
                                    ? "border-[#008062] text-[#008062]"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                }`}
                              >
                                iframe
                              </button>
                              <button
                                onClick={() => setCodeTab("react")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                  codeTab === "react"
                                    ? "border-[#008062] text-[#008062]"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                }`}
                              >
                                React
                              </button>
                            </nav>
                            {codeTab === "javascript" && (
                            <div className="mt-3">
                              <div className="relative">
                                <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                                  <code>{`<!-- Add this to your HTML -->
<div id="knolli-copilot"></div>
<script src="https://embed.knolli.com/widget.js"></script>
<script>
  KnolliWidget.init({
    copilotId: '${copilot.id}',
    container: '#knolli-copilot',
    theme: 'light'
  });
</script>`}</code>
                                </pre>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    const code = `<!-- Add this to your HTML -->
<div id="knolli-copilot"></div>
<script src="https://embed.knolli.com/widget.js"></script>
<script>
  KnolliWidget.init({
    copilotId: '${copilot.id}',
    container: '#knolli-copilot',
    theme: 'light'
  });
</script>`;
                                    navigator.clipboard.writeText(code);
                                  }}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            )}
                            {codeTab === "iframe" && (
                            <div className="mt-3">
                              <div className="relative">
                                <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                                  <code>{`<iframe 
  src="https://embed.knolli.com/copilot/${copilot.id}"
  width="400"
  height="600"
  frameborder="0"
  allow="microphone">
</iframe>`}</code>
                                </pre>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    const code = `<iframe 
  src="https://embed.knolli.com/copilot/${copilot.id}"
  width="400"
  height="600"
  frameborder="0"
  allow="microphone">
</iframe>`;
                                    navigator.clipboard.writeText(code);
                                  }}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            )}
                            {codeTab === "react" && (
                            <div className="mt-3">
                              <div className="relative">
                                <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                                  <code>{`import { KnolliWidget } from '@knolli/react';

function MyComponent() {
  return (
    <KnolliWidget
      copilotId="${copilot.id}"
      theme="light"
      width="400px"
      height="600px"
    />
  );
}`}</code>
                                </pre>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    const code = `import { KnolliWidget } from '@knolli/react';

function MyComponent() {
  return (
    <KnolliWidget
      copilotId="${copilot.id}"
      theme="light"
      width="400px"
      height="600px"
    />
  );
}`;
                                    navigator.clipboard.writeText(code);
                                  }}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === "components" && (
            <div className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Components</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => addComponent('agent')}>
                        <Plus className="w-4 h-4 mr-1" />
                        Agent
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addComponent('tool')}>
                        <Plus className="w-4 h-4 mr-1" />
                        Tool
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addComponent('workflow')}>
                        <Plus className="w-4 h-4 mr-1" />
                        Workflow
                      </Button>
                    </div>
                  </div>

                  {/* Agents Section */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-md font-medium text-gray-900">Agents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Content Creator</div>
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 mt-1">Agent</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Specialization:</span>
                            <span className="font-medium">Content Creation</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tools:</span>
                            <span className="font-medium">3 connected</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Workflows:</span>
                            <span className="font-medium">2 active</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tasks:</span>
                            <span className="font-medium">156 completed</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleAgentConfigure({ 
                              id: 'content-creator', 
                              name: 'Content Creator', 
                              description: 'Creates and manages content across platforms',
                              specialization: 'Content Creation'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <BarChart className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Data Analyst</div>
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 mt-1">Agent</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Specialization:</span>
                            <span className="font-medium">Data Analysis</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tools:</span>
                            <span className="font-medium">4 connected</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Workflows:</span>
                            <span className="font-medium">3 active</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tasks:</span>
                            <span className="font-medium">89 completed</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleAgentConfigure({ 
                              id: 'data-analyst', 
                              name: 'Data Analyst', 
                              description: 'Analyzes data and generates insights',
                              specialization: 'Data Analysis'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-md font-medium text-gray-900">Tools</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <SiGmail className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Gmail</div>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 mt-1">Tool</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge variant="default" className="text-xs bg-green-100 text-green-700">Connected</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>API Calls:</span>
                            <span className="font-medium">1,234 today</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Auth:</span>
                            <span className="font-medium">OAuth 2.0</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleToolConfigure({ 
                              id: 'gmail', 
                              name: 'Gmail', 
                              description: 'Email management and communication',
                              status: 'Connected'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <SiSlack className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Slack</div>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 mt-1">Tool</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge variant="default" className="text-xs bg-green-100 text-green-700">Connected</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>API Calls:</span>
                            <span className="font-medium">856 today</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Auth:</span>
                            <span className="font-medium">Bot Token</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleToolConfigure({ 
                              id: 'slack', 
                              name: 'Slack', 
                              description: 'Team communication and collaboration',
                              status: 'Connected'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workflows Section */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-900">Workflows</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Content Pipeline</div>
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 mt-1">Workflow</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Source:</span>
                            <span className="font-medium">n8n</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Steps:</span>
                            <span className="font-medium">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span className="font-medium text-green-600">98.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Executions:</span>
                            <span className="font-medium">245 today</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleWorkflowConfigure({ 
                              id: 'content-pipeline', 
                              name: 'Content Pipeline', 
                              description: 'Automated content creation and publishing workflow'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                            <GitBranch className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Data Processing</div>
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 mt-1">Workflow</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Source:</span>
                            <span className="font-medium">Make.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Steps:</span>
                            <span className="font-medium">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span className="font-medium text-green-600">94.7%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Executions:</span>
                            <span className="font-medium">67 today</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                            onClick={() => handleWorkflowConfigure({ 
                              id: 'data-processing', 
                              name: 'Data Processing', 
                              description: 'Automated data analysis and reporting workflow'
                            })}
                          >
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {copilotData.components.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">No components added yet</p>
                      <p className="text-sm">Use the buttons above to add agents, tools, or workflows to your copilot.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {activeTab === "knowledge" && (
            <div className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Document
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="w-4 h-4 mr-1" />
                        Add URL
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Create MD
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSuggestDocsOpen(true)}>
                        <Bot className="w-4 h-4 mr-1" />
                        AI Suggestions
                      </Button>
                    </div>
                  </div>
                  
                  {/* Search and Filter Controls */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search knowledge base..."
                        value={kbSearchTerm}
                        onChange={(e) => setKbSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={kbFilterType} onValueChange={setKbFilterType}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="document">Documents</SelectItem>
                        <SelectItem value="url">URLs</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={kbSortBy} onValueChange={setKbSortBy}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SortAsc className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="updated">Last Updated</SelectItem>
                        <SelectItem value="created">Date Created</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="size">File Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Sample knowledge base items */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            {editingDocument === 'doc1' ? (
                              <div className="space-y-2">
                                <Input
                                  value={tempTitle}
                                  onChange={(e) => setTempTitle(e.target.value)}
                                  className="font-medium"
                                  placeholder="Document title"
                                />
                                <Input
                                  value={tempDescription}
                                  onChange={(e) => setTempDescription(e.target.value)}
                                  className="text-sm"
                                  placeholder="Document description"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="font-medium">Product Documentation</div>
                                <div className="text-sm text-muted-foreground">Comprehensive guide for product features</div>
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Created by Sarah Chen</span>
                              <span>•</span>
                              <span>2 days ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">PDF</Badge>
                          {editingDocument === 'doc1' ? (
                            <>
                              <Button variant="ghost" size="sm" onClick={saveEditing}>
                                <Check className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                                <X className="w-4 h-4 text-gray-600" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" title="View/Edit">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => startEditing('doc1', 'Product Documentation', 'Comprehensive guide for product features')}
                                title="Rename"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            {editingDocument === 'doc2' ? (
                              <div className="space-y-2">
                                <Input
                                  value={tempTitle}
                                  onChange={(e) => setTempTitle(e.target.value)}
                                  className="font-medium"
                                  placeholder="Document title"
                                />
                                <Input
                                  value={tempDescription}
                                  onChange={(e) => setTempDescription(e.target.value)}
                                  className="text-sm"
                                  placeholder="Document description"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="font-medium">FAQ Document</div>
                                <div className="text-sm text-muted-foreground">Frequently asked questions and answers</div>
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Created by Mike Torres</span>
                              <span>•</span>
                              <span>1 week ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">DOCX</Badge>
                          {editingDocument === 'doc2' ? (
                            <>
                              <Button variant="ghost" size="sm" onClick={saveEditing}>
                                <Check className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                                <X className="w-4 h-4 text-gray-600" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" title="View/Edit">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => startEditing('doc2', 'FAQ Document', 'Frequently asked questions and answers')}
                                title="Rename"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            {editingDocument === 'doc3' ? (
                              <div className="space-y-2">
                                <Input
                                  value={tempTitle}
                                  onChange={(e) => setTempTitle(e.target.value)}
                                  className="font-medium"
                                  placeholder="Document title"
                                />
                                <Input
                                  value={tempDescription}
                                  onChange={(e) => setTempDescription(e.target.value)}
                                  className="text-sm"
                                  placeholder="Document description"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="font-medium">API Integration Guide</div>
                                <div className="text-sm text-muted-foreground">Step-by-step integration documentation</div>
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Created by Alex Kim</span>
                              <span>•</span>
                              <span>3 days ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">MD</Badge>
                          {editingDocument === 'doc3' ? (
                            <>
                              <Button variant="ghost" size="sm" onClick={saveEditing}>
                                <Check className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                                <X className="w-4 h-4 text-gray-600" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" title="View/Edit">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => startEditing('doc3', 'API Integration Guide', 'Step-by-step integration documentation')}
                                title="Rename"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === "user-docs" && (
            <div className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">User Documents</h2>
                  
                  {/* Search and Filter Controls */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search user documents..."
                        value={docsSearchTerm}
                        onChange={(e) => setDocsSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={docsFilterType} onValueChange={setDocsFilterType}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="xlsx">Excel Files</SelectItem>
                        <SelectItem value="docx">Word Documents</SelectItem>
                        <SelectItem value="pdf">PDF Files</SelectItem>
                        <SelectItem value="pptx">PowerPoint</SelectItem>
                        <SelectItem value="txt">Text Files</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={docsSortBy} onValueChange={setDocsSortBy}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SortAsc className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="updated">Last Updated</SelectItem>
                        <SelectItem value="created">Date Uploaded</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="size">File Size</SelectItem>
                        <SelectItem value="uploader">Uploader</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Sample user documents */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">customer-feedback-q4.xlsx</div>
                            <div className="text-sm text-muted-foreground">Q4 customer satisfaction survey results</div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Uploaded by John Smith</span>
                              <span>•</span>
                              <span>2 days ago</span>
                              <span>•</span>
                              <span>1.2 MB</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">XLSX</Badge>
                          <Badge variant="default" className="text-xs bg-green-100 text-green-700">Active</Badge>
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">product-requirements.docx</div>
                            <div className="text-sm text-muted-foreground">Detailed product requirements document</div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Uploaded by Sarah Johnson</span>
                              <span>•</span>
                              <span>5 days ago</span>
                              <span>•</span>
                              <span>845 KB</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">DOCX</Badge>
                          <Badge variant="default" className="text-xs bg-green-100 text-green-700">Active</Badge>
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">team-meeting-notes.pdf</div>
                            <div className="text-sm text-muted-foreground">Weekly team meeting notes and action items</div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Uploaded by Mike Chen</span>
                              <span>•</span>
                              <span>1 week ago</span>
                              <span>•</span>
                              <span>564 KB</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">PDF</Badge>
                          <Badge variant="outline" className="text-xs text-orange-600">Processing</Badge>
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">user-research-findings.pptx</div>
                            <div className="text-sm text-muted-foreground">User research insights and recommendations</div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Uploaded by Emma Wilson</span>
                              <span>•</span>
                              <span>3 days ago</span>
                              <span>•</span>
                              <span>3.1 MB</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="secondary" className="text-xs">PPTX</Badge>
                          <Badge variant="default" className="text-xs bg-green-100 text-green-700">Active</Badge>
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === "profile" && (
            <div className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Profile Fields</h2>
                      <p className="text-sm text-muted-foreground">Configure which profile fields this copilot should collect from users</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAddField}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Sample profile fields */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Text</Badge>
                          <div>
                            <div className="font-medium">Job Title</div>
                            <div className="text-sm text-muted-foreground">User's current job title or role</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-green-600">Required</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('job-title')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('job-title')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Select</Badge>
                          <div>
                            <div className="font-medium">Industry</div>
                            <div className="text-sm text-muted-foreground">Industry sector the user works in</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-blue-600">Optional</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('industry')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('industry')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Select</Badge>
                          <div>
                            <div className="font-medium">Experience Level</div>
                            <div className="text-sm text-muted-foreground">Years of professional experience</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-green-600">Required</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('experience')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('experience')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Text Area</Badge>
                          <div>
                            <div className="font-medium">Areas of Expertise</div>
                            <div className="text-sm text-muted-foreground">Key skills and areas of expertise</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-blue-600">Optional</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('expertise')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('expertise')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Text</Badge>
                          <div>
                            <div className="font-medium">Company Size</div>
                            <div className="text-sm text-muted-foreground">Number of employees at user's company</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-blue-600">Optional</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('company-size')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('company-size')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">Text Area</Badge>
                          <div>
                            <div className="font-medium">Goals & Objectives</div>
                            <div className="text-sm text-muted-foreground">Professional goals and objectives</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-blue-600">Optional</Badge>
                          <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('goals')}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('goals')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/50 p-6">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* AI Document Suggestions Modal */}
      <Dialog open={suggestDocsOpen} onOpenChange={setSuggestDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Document Suggestions
            </DialogTitle>
            <DialogDescription>
              Select the documents you'd like our AI to generate for your knowledge base. These will be customized based on your copilot's purpose and configuration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {suggestedDocs.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={doc.id}
                  checked={selectedSuggestions.includes(doc.id)}
                  onCheckedChange={() => handleSuggestionToggle(doc.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                      {doc.title}
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {doc.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedSuggestions.length} document{selectedSuggestions.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSuggestDocsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateSelectedDocs}
                disabled={selectedSuggestions.length === 0}
                className="gap-2"
              >
                <Bot className="w-4 h-4" />
                Generate Selected ({selectedSuggestions.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Component Selection Modal */}
      <Dialog open={componentModalOpen} onOpenChange={setComponentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add {componentModalType.charAt(0).toUpperCase() + componentModalType.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Choose from available {componentModalType}s in your workspace to add to this copilot.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {componentModalType === 'agent' && workspaceComponents.agents.map((agent) => (
              <div key={agent.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedComponents.includes(agent.id)}
                    onCheckedChange={() => toggleComponentSelection(agent.id)}
                    className="mt-1"
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">{agent.description}</div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Specialization: {agent.specialization}</span>
                      <span>•</span>
                      <span>{agent.tasks} tasks completed</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs text-muted-foreground">Tools:</span>
                      {agent.tools.map((tool, idx) => (
                        <Badge key={idx} variant="secondary" className={`text-xs ${tool.color}`}>
                          {tool.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs text-muted-foreground">Workflows:</span>
                      {agent.workflows.map((workflow, idx) => (
                        <Badge key={idx} variant="secondary" className={`text-xs ${workflow.color}`}>
                          {workflow.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">Agent</Badge>
                    <Button variant="outline" size="sm" className="text-xs">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {componentModalType === 'tool' && workspaceComponents.tools.map((tool) => (
              <div key={tool.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedComponents.includes(tool.id)}
                    onCheckedChange={() => toggleComponentSelection(tool.id)}
                    className="mt-1"
                  />
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tool.name === 'Gmail' && <SiGmail className="w-5 h-5 text-red-600" />}
                    {tool.name === 'Slack' && <SiSlack className="w-5 h-5 text-blue-600" />}
                    {tool.name === 'Google Analytics' && <BarChart className="w-5 h-5 text-orange-600" />}
                    {tool.name === 'OpenAI' && <Bot className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-muted-foreground">{tool.description}</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Status: {tool.status}</span>
                      <span>•</span>
                      <span>{tool.apiCalls.toLocaleString()} API calls today</span>
                      <span>•</span>
                      <span>Auth: {tool.auth}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">Tool</Badge>
                    <Button variant="outline" size="sm" className="text-xs">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {componentModalType === 'workflow' && workspaceComponents.workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedComponents.includes(workflow.id)}
                    onCheckedChange={() => toggleComponentSelection(workflow.id)}
                    className="mt-1"
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{workflow.name}</div>
                    <div className="text-sm text-muted-foreground">{workflow.description}</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Source: {workflow.source}</span>
                      <span>•</span>
                      <span>{workflow.steps} steps</span>
                      <span>•</span>
                      <span>Success Rate: {workflow.successRate}%</span>
                      <span>•</span>
                      <span>{workflow.executions} executions today</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">Workflow</Badge>
                    <Button variant="outline" size="sm" className="text-xs">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedComponents.length} component{selectedComponents.length !== 1 ? 's' : ''} selected
            </p>
            <Button 
              onClick={handleSaveSelectedComponents}
              disabled={selectedComponents.length === 0}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Add Selected ({selectedComponents.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Field Modal */}
      <Dialog open={addFieldModalOpen} onOpenChange={setAddFieldModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Profile Field
            </DialogTitle>
            <DialogDescription>
              Create a new profile field that this copilot will collect from users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="field-name">Field Name</Label>
              <Input
                id="field-name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="e.g., Job Title, Company, Department"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="field-description">Description</Label>
              <Textarea
                id="field-description"
                value={newFieldDescription}
                onChange={(e) => setNewFieldDescription(e.target.value)}
                placeholder="Describe what information this field collects..."
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="field-type">Field Type</Label>
              <Select value={newFieldType} onValueChange={setNewFieldType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="field-required"
                checked={newFieldRequired}
                onCheckedChange={(checked) => setNewFieldRequired(checked === true)}
              />
              <Label htmlFor="field-required" className="text-sm">
                This field is required
              </Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancelAddField}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewField}
              disabled={!newFieldName.trim() || !newFieldDescription.trim()}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Add Field
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Field Modal */}
      <Dialog open={editFieldModalOpen} onOpenChange={setEditFieldModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Edit Profile Field
            </DialogTitle>
            <DialogDescription>
              Update the profile field configuration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-field-name">Field Name</Label>
              <Input
                id="edit-field-name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="e.g., Job Title, Company, Department"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-field-description">Description</Label>
              <Textarea
                id="edit-field-description"
                value={newFieldDescription}
                onChange={(e) => setNewFieldDescription(e.target.value)}
                placeholder="Describe what information this field collects..."
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-field-type">Field Type</Label>
              <Select value={newFieldType} onValueChange={setNewFieldType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-field-required"
                checked={newFieldRequired}
                onCheckedChange={(checked) => setNewFieldRequired(checked === true)}
              />
              <Label htmlFor="edit-field-required" className="text-sm">
                This field is required
              </Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancelEditField}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEditField}
              disabled={!newFieldName.trim() || !newFieldDescription.trim()}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Field Confirmation Modal */}
      <Dialog open={deleteFieldModalOpen} onOpenChange={setDeleteFieldModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Delete Profile Field
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this profile field? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancelDeleteField}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDeleteField}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Field
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}