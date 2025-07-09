import { useState, useEffect } from "react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X, Save, Settings, Wrench, UserCircle, Plus, Trash2, Files, Upload, Image, Code, Copy, BookOpen, FileText, Link, ExternalLink, Edit3, Eye, Check, FolderOpen, Download, Search, Filter, SortAsc, PenTool, BarChart, Zap, GitBranch, HelpCircle, MessageCircle } from "lucide-react";
import { SiGmail, SiSlack } from "react-icons/si";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CopilotData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import newCampaignManagerImage from "@assets/image_1751925400273.png";
import customerSupportImage from "@assets/image_1751925913677.png";
import socialAnalystImage from "@assets/image_1751926960404.png";
import resumeAssistantImage from "@assets/image_1751926805510.png";
import contentAssistantNewImage from "@assets/image_1751927977089.png";
import workspaceImage from "@assets/image_1751923707146.png";
import defaultIconImage from "@assets/image_1752019289491.png";
import campaignManagerIconImage from "@assets/image_1752019378986.png";

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
  const [hasChanges, setHasChanges] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const { toast } = useToast();

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
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldDescription, setNewFieldDescription] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);
  const [deleteDocumentModalOpen, setDeleteDocumentModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [previewDocument, setPreviewDocument] = useState<string | null>(null);
  
  // Knowledge Base modals
  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false);
  const [addUrlModalOpen, setAddUrlModalOpen] = useState(false);
  const [createMdModalOpen, setCreateMdModalOpen] = useState(false);
  
  // Human Support configuration
  const [humanSupportEnabled, setHumanSupportEnabled] = useState(true);
  const [adminEmail, setAdminEmail] = useState("admin@company.com");
  const [escalationTimeout, setEscalationTimeout] = useState("15");
  const [autoResponseMessage, setAutoResponseMessage] = useState("Thank you for reaching out. Your request has been forwarded to our support team. We'll get back to you within 24 hours.");
  const [humanSupportWorkflow, setHumanSupportWorkflow] = useState("email"); // email, slack, ticket
  const [mdEditorOpen, setMdEditorOpen] = useState(false);
  const [mdEditorTab, setMdEditorTab] = useState<'markdown' | 'preview' | 'rtf'>('markdown');
  const [mdContent, setMdContent] = useState('# New Document\n\nStart writing your markdown content here...');
  const [mdTitle, setMdTitle] = useState('');
  const [mdDescription, setMdDescription] = useState('');
  
  // Knowledge Base filters and search
  const [kbSearchTerm, setKbSearchTerm] = useState('');
  const [kbSortBy, setKbSortBy] = useState('updated');
  const [kbFilterType, setKbFilterType] = useState('all');
  
  // Advanced Settings toggles
  const [isDiscoverable, setIsDiscoverable] = useState(false);
  const [documentPaneEnabled, setDocumentPaneEnabled] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [promptRequired, setPromptRequired] = useState(true);
  const [promptLabel, setPromptLabel] = useState('');
  
  // User Documents filters and search
  const [docsSearchTerm, setDocsSearchTerm] = useState('');
  const [docsSortBy, setDocsSortBy] = useState('updated');
  const [docsFilterType, setDocsFilterType] = useState('all');
  
  // Component selection modal state
  const [componentModalOpen, setComponentModalOpen] = useState(false);
  
  // Component deletion state
  const [deleteComponentModalOpen, setDeleteComponentModalOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<{id: string, name: string, type: string} | null>(null);
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
    setHasChanges(true);
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
    setHasChanges(true);
  };

  const addConversationStarter = () => {
    if (conversationStarters.length < 5) {
      setConversationStarters([...conversationStarters, ""]);
      setHasChanges(true);
    }
  };

  const removeConversationStarter = (index: number) => {
    if (conversationStarters.length > 1) {
      setConversationStarters(conversationStarters.filter((_, i) => i !== index));
      setHasChanges(true);
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
    setHasChanges(false);
    setShowSavedMessage(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
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

  // Component deletion handlers
  const handleDeleteComponent = (id: string, name: string, type: string) => {
    setComponentToDelete({ id, name, type });
    setDeleteComponentModalOpen(true);
  };

  const handleConfirmDeleteComponent = () => {
    if (componentToDelete) {
      console.log(`Removing ${componentToDelete.type} "${componentToDelete.name}" from copilot`);
      // In a real implementation, this would update the copilot's components
      // For now, we'll just close the modal
      setDeleteComponentModalOpen(false);
      setComponentToDelete(null);
    }
  };

  const handleCancelDeleteComponent = () => {
    setDeleteComponentModalOpen(false);
    setComponentToDelete(null);
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
    setIsAddingField(true);
  };

  const handleSaveNewField = () => {
    // In a real implementation, this would save the new field to the backend
    console.log('Saving new field:', {
      name: newFieldName,
      description: newFieldDescription,
      type: newFieldType,
      required: newFieldRequired
    });
    
    // Reset form and close inline form
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setIsAddingField(false);
  };

  const handleCancelAddField = () => {
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setIsAddingField(false);
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
    
    // Reset form and close inline editing
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setEditingFieldId(null);
  };

  const handleCancelEditField = () => {
    setNewFieldName("");
    setNewFieldDescription("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setEditingFieldId(null);
  };

  const handleDeleteField = (fieldId: string) => {
    // In a real implementation, this would delete the field immediately
    // or show an inline confirmation
    console.log('Deleting field:', fieldId);
    setFieldToDelete(fieldId);
  };

  const handleConfirmDeleteField = () => {
    // In a real implementation, this would delete the field from the backend
    console.log('Confirming delete field:', fieldToDelete);
    setFieldToDelete(null);
  };

  const handleCancelDeleteField = () => {
    setFieldToDelete(null);
  };

  // User Documents handlers
  const handleDownloadDocument = (fileName: string) => {
    console.log('Downloading document:', fileName);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
  };

  const handleViewDocument = (fileName: string) => {
    console.log('Viewing document:', fileName);
    setPreviewDocument(fileName);
  };

  const handleExitPreview = () => {
    setPreviewDocument(null);
  };

  // Knowledge Base handlers
  const handleAddDocument = () => {
    setAddDocumentModalOpen(true);
  };

  const handleAddUrl = () => {
    setAddUrlModalOpen(true);
  };

  const handleCreateMd = () => {
    setMdEditorOpen(true);
    setMdEditorTab('markdown');
    setMdContent('# New Document\n\nStart writing your markdown content here...');
    setMdTitle('');
    setMdDescription('');
  };

  const handlePreviewToggle = () => {
    setMdEditorTab(mdEditorTab === 'preview' ? 'markdown' : 'preview');
  };

  const handleDeleteDocument = (fileName: string) => {
    setDocumentToDelete(fileName);
    setDeleteDocumentModalOpen(true);
  };

  const handleConfirmDeleteDocument = () => {
    console.log('Document deleted:', documentToDelete);
    setDocumentToDelete(null);
    setDeleteDocumentModalOpen(false);
  };

  const handleCancelDeleteDocument = () => {
    setDocumentToDelete(null);
    setDeleteDocumentModalOpen(false);
  };

  if (!copilot) return null;

  // Navigation handlers dispatch custom events instead of showing inline screens

  // If markdown editor is open, show it instead of main config
  if (mdEditorOpen) {
    return (
      <div className="min-h-full bg-background">
        {/* Markdown Editor Header */}
        <div className="flex items-center justify-between p-6 bg-muted/50 border-b" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[var(--theme-primary)]" />
            <div>
              <h1 className="font-semibold text-foreground text-[24px]">Markdown Editor</h1>
              <p className="text-muted-foreground text-[16px]">Create and edit markdown documents for {copilotData.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setMdEditorOpen(false)} 
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Close Editor
            </Button>
            <Button 
              type="button"
              className="gap-2 theme-primary hover:bg-[var(--theme-primary-hover)]"
              onClick={() => {
                // Save markdown document logic here
                console.log('Saving markdown document:', { title: mdTitle, description: mdDescription, content: mdContent });
                setMdEditorOpen(false);
              }}
            >
              <Save className="h-4 w-4" />
              Save Document
            </Button>
          </div>
        </div>

        {/* Markdown Editor Content */}
        <div className="flex flex-col h-[calc(100vh-120px)]">
          {/* Document Info */}
          <div className="p-6 bg-white border-b" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="md-title">Document Title</Label>
                <Input
                  id="md-title"
                  value={mdTitle}
                  onChange={(e) => setMdTitle(e.target.value)}
                  placeholder="Enter document title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="md-description">Description</Label>
                <Input
                  id="md-description"
                  value={mdDescription}
                  onChange={(e) => setMdDescription(e.target.value)}
                  placeholder="Brief description of the document"
                />
              </div>
            </div>

            {/* Editor Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg inline-flex">
              <button
                type="button"
                onClick={() => setMdEditorTab('markdown')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mdEditorTab === 'markdown' 
                    ? 'bg-white text-[var(--theme-primary)] shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code className="w-4 h-4 mr-1 inline" />
                Markdown
              </button>
              <button
                type="button"
                onClick={() => setMdEditorTab('rtf')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mdEditorTab === 'rtf' 
                    ? 'bg-white text-[var(--theme-primary)] shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <PenTool className="w-4 h-4 mr-1 inline" />
                Rich Text
              </button>
              <button
                type="button"
                onClick={() => setMdEditorTab('preview')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mdEditorTab === 'preview' 
                    ? 'bg-white text-[var(--theme-primary)] shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Eye className="w-4 h-4 mr-1 inline" />
                Preview
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex">
            {mdEditorTab === 'markdown' && (
              <div className="w-full p-6">
                <Textarea
                  value={mdContent}
                  onChange={(e) => setMdContent(e.target.value)}
                  placeholder="Start writing your markdown content here..."
                  className="w-full h-full min-h-[500px] font-mono text-sm resize-none"
                />
              </div>
            )}

            {mdEditorTab === 'rtf' && (
              <div className="w-full p-6">
                <div className="border rounded-lg min-h-[500px] bg-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:border-primary transition-all" style={{ borderColor: 'hsl(187, 18%, 80%)' }}>
                  {/* RTF Toolbar */}
                  <div className="border-b p-3 bg-muted/30 flex items-center gap-2 flex-wrap rounded-t-lg" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = textarea.value.substring(start, end);
                            const newText = `**${selectedText}**`;
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
                            }, 0);
                          }
                        }}
                      >
                        <strong>B</strong>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 italic"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = textarea.value.substring(start, end);
                            const newText = `*${selectedText}*`;
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
                            }, 0);
                          }
                        }}
                      >
                        I
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = textarea.value.substring(start, end);
                            const newText = `~~${selectedText}~~`;
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
                            }, 0);
                          }
                        }}
                      >
                        <span className="line-through">S</span>
                      </Button>
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-[hsl(var(--border))]" />
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const newText = '- ';
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(start);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + newText.length, start + newText.length);
                            }, 0);
                          }
                        }}
                      >
                        • List
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const newText = '1. ';
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(start);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + newText.length, start + newText.length);
                            }, 0);
                          }
                        }}
                      >
                        1. List
                      </Button>
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-[hsl(var(--border))]" />
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const newText = '# ';
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(start);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + newText.length, start + newText.length);
                            }, 0);
                          }
                        }}
                      >
                        H1
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const newText = '## ';
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(start);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + newText.length, start + newText.length);
                            }, 0);
                          }
                        }}
                      >
                        H2
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const textarea = document.getElementById('rtf-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const newText = '### ';
                            const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(start);
                            setMdContent(newValue);
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + newText.length, start + newText.length);
                            }, 0);
                          }
                        }}
                      >
                        H3
                      </Button>
                    </div>
                  </div>
                  
                  {/* RTF Editor */}
                  <Textarea
                    id="rtf-textarea"
                    value={mdContent}
                    onChange={(e) => setMdContent(e.target.value)}
                    placeholder="Start writing your content here... Use the toolbar buttons to add formatting."
                    className="w-full h-[450px] border-0 resize-none focus-visible:ring-0 focus:ring-0 focus:outline-none rounded-none rounded-b-lg bg-white focus:bg-white"
                    style={{ 
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                      backgroundColor: 'white',
                      boxShadow: 'none'
                    }}
                  />
                </div>
              </div>
            )}
            
            {mdEditorTab === 'preview' && (
              <div className="w-full p-6 bg-white">
                <div className="prose max-w-none">
                  {mdContent ? (
                    <div className="whitespace-pre-wrap">{mdContent}</div>
                  ) : (
                    <p className="text-muted-foreground italic">Start writing in the markdown or rich text tab to see preview here...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
            <img 
              src={iconImage ? URL.createObjectURL(iconImage) : (copilotData.name === 'Campaign Manager' ? campaignManagerIconImage : defaultIconImage)} 
              alt="Copilot icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-[24px]">Configure {copilotData.name}</h1>
            <p className="text-muted-foreground text-[16px]">Edit copilot settings, components, and profile fields</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>
      {/* Tabs */}
      <div className="bg-muted/20">
        <div className="px-6 pt-4 pb-4">
          <div className="border-b" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "components", label: "Tools", icon: Wrench },
                { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
                { id: "user-docs", label: "User Documents", icon: Files },
                { id: "profile", label: "Profile Fields", icon: UserCircle },
                { id: "human-support", label: "Human Support", icon: MessageCircle }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                        : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--border))]'
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
      {/* Content */}
      <div>
        {activeTab === "general" && (
            <div className="p-6 pb-24">
              <div className="grid grid-cols-3 gap-6">
                {/* Copilot Configuration - 2/3 width */}
                <div className="col-span-2">
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h2 className="font-semibold text-foreground text-[24px]">Copilot Configuration</h2>
                        <p className="text-sm text-muted-foreground">Manage basic copilot settings and behavior</p>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Copilot Name</Label>
                          <Input
                            id="name"
                            value={copilotData.name}
                            onChange={(e) => handleCopilotChange('name', e.target.value)}
                            placeholder="Enter copilot name"
                          />
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
                            onChange={(e) => {
                              setSystemPrompt(e.target.value);
                              setHasChanges(true);
                            }}
                            placeholder="Enter the system prompt that defines how the copilot behaves"
                            rows={4}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Tile Image (4:3 ratio)</Label>
                            {(() => {
                              // Get current image URL based on copilot type and name (same logic as copilot card)
                              const getImageUrl = (type: string, name?: string): string => {
                                // Use specific images for certain copilots
                                if (name === 'Campaign Manager') {
                                  return newCampaignManagerImage;
                                }
                                if (name === 'Customer Support') {
                                  return customerSupportImage;
                                }
                                if (name === 'Social Analyst') {
                                  return socialAnalystImage;
                                }
                                if (name === 'Resume Assistant') {
                                  return resumeAssistantImage;
                                }
                                if (name === 'Content Assistant') {
                                  return contentAssistantNewImage;
                                }
                                // Use the default workspace image for all other copilots
                                return workspaceImage;
                              };
                              
                              const currentImageUrl = getImageUrl(copilotData.type, copilotData.name);
                              
                              return (
                                <div className="border border-muted-foreground/25 rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-colors">
                                  <div className="aspect-[4/3] relative p-3 bg-[#ffffff]">
                                    <img 
                                      src={currentImageUrl} 
                                      alt={`${copilotData.type} copilot tile`}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </div>
                                  <div className="p-3 text-center bg-muted/20">
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
                                      Change Image
                                    </Button>
                                    {bannerImage && (
                                      <div className="mt-2 text-xs text-muted-foreground">
                                        New: {bannerImage.name}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Icon Image (1:1 ratio)</Label>
                            <div className="border border-muted-foreground/25 rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-colors">
                              <div className="h-36 relative p-3 bg-[#ffffff] flex items-center justify-center">
                                <div className="w-24 h-24 bg-gray-50 rounded overflow-hidden flex items-center justify-center mx-auto">
                                  <img 
                                    src={iconImage ? URL.createObjectURL(iconImage) : (copilotData.name === 'Campaign Manager' ? campaignManagerIconImage : defaultIconImage)} 
                                    alt="Copilot icon"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </div>
                              <div className="p-3 text-center bg-muted/20">
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
                                  Change Image
                                </Button>
                                {iconImage && (
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    New: {iconImage.name}
                                  </div>
                                )}
                              </div>
                            </div>
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
                          <RadioGroup value={scope} onValueChange={(value) => {
                            setScope(value);
                            setHasChanges(true);
                          }} className="space-y-3">
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
                                <nav className="flex space-x-8 border-b border-[hsl(var(--border))]">
                                  <button
                                    onClick={() => setCodeTab("javascript")}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                      codeTab === "javascript"
                                        ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                    }`}
                                  >
                                    JavaScript
                                  </button>
                                  <button
                                    onClick={() => setCodeTab("iframe")}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                      codeTab === "iframe"
                                        ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                    }`}
                                  >
                                    iframe
                                  </button>
                                  <button
                                    onClick={() => setCodeTab("react")}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                      codeTab === "react"
                                        ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
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
                    </CardContent>
                  </Card>
                </div>
                
                {/* Advanced Settings - 1/3 width */}
                <div className="col-span-1">
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h2 className="font-semibold text-foreground text-[24px]">Advanced Settings</h2>
                        <p className="text-sm text-muted-foreground">Configure AI models and advanced features</p>
                      </div>
                      
                      {/* Configuration Toggles */}
                      <div className="space-y-4 pb-6 border-b mb-6" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
                        
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Document Pane</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#e0fff8] text-[hsl(var(--foreground))] max-w-xs" style={{ borderColor: '#85FFE2' }}>
                                <p>Show a document preview pane alongside the chat interface</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <button 
                            onClick={() => {
                              setDocumentPaneEnabled(!documentPaneEnabled);
                              setHasChanges(true);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 ${
                              documentPaneEnabled ? 'theme-primary' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              documentPaneEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Show Sources</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#e0fff8] text-[hsl(var(--foreground))] max-w-xs" style={{ borderColor: '#85FFE2' }}>
                                <p>Display source references and citations in AI responses</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <button 
                            onClick={() => {
                              setShowSources(!showSources);
                              setHasChanges(true);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 ${
                              showSources ? 'theme-primary' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              showSources ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Featured</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#e0fff8] text-[hsl(var(--foreground))] max-w-xs" style={{ borderColor: '#85FFE2' }}>
                                <p>Highlight this copilot in featured listings and recommendations</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <button 
                            onClick={() => {
                              setIsFeatured(!isFeatured);
                              setHasChanges(true);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 ${
                              isFeatured ? 'theme-primary' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isFeatured ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Prompt required</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#e0fff8] text-[hsl(var(--foreground))] max-w-xs" style={{ borderColor: '#85FFE2' }}>
                                <p>Require users to enter a custom prompt before starting conversations</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <button 
                            onClick={() => {
                              setPromptRequired(!promptRequired);
                              setHasChanges(true);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 ${
                              promptRequired ? 'theme-primary' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              promptRequired ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        {promptRequired && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Prompt label</label>
                            <Input 
                              type="text" 
                              value={promptLabel}
                              onChange={(e) => {
                                setPromptLabel(e.target.value);
                                setHasChanges(true);
                              }}
                              placeholder="Enter prompt label..."
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="aiProvider">AI Provider</Label>
                          <Select value={aiProvider} onValueChange={(value) => {
                            setAiProvider(value);
                            setAiModel(getAvailableModels(value)[0] || '');
                            setHasChanges(true);
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
                          <Select value={aiModel} onValueChange={(value) => {
                            setAiModel(value);
                            setHasChanges(true);
                          }}>
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
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Save Footer */}
              <div className="fixed bottom-0 left-64 right-0 bg-white border-t px-6 py-4 z-10" style={{ borderTopColor: 'hsl(187, 18%, 80%)' }}>
                <div className="flex justify-between items-center">
                  <div></div>
                  <div className="flex items-center gap-6">
                    {showSavedMessage && (
                      <div className="text-lg text-[var(--theme-primary)] font-semibold">
                        Your changes have been saved.
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave} 
                        disabled={!hasChanges}
                        className="theme-primary hover:bg-[var(--theme-primary-hover)] disabled:bg-[#DADEE2] disabled:text-[#78838D] disabled:cursor-not-allowed"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === "components" && (
            <div className="p-6 pb-24">
              <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-semibold text-foreground text-[24px]">Components</h2>
                      <p className="text-sm text-muted-foreground">Manage agents, tools, and workflows for this copilot</p>
                    </div>
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
                    <h3 className="text-md font-medium text-[hsl(var(--foreground))]">Agents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('content-creator', 'Content Creator', 'agent')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <PenTool className="w-8 h-8 text-purple-600" />
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Content Creator</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Creates and manages content across platforms with AI-powered writing tools</p>
                          
                          <div className="space-y-4 mt-auto">
                            
                            
                            <div className="pt-2">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => handleAgentConfigure({ 
                                    id: 'content-creator', 
                                    name: 'Content Creator', 
                                    description: 'Creates and manages content across platforms',
                                    specialization: 'Content Creation'
                                  })}
                                >
                                  Configure
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('data-analyst', 'Data Analyst', 'agent')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <BarChart className="w-8 h-8 text-blue-600" />
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Data Analyst</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Analyzes data and generates insights for performance optimization</p>
                          
                          <div className="space-y-4 mt-auto">
                            
                            
                            <div className="pt-2">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => handleAgentConfigure({ 
                                    id: 'data-analyst', 
                                    name: 'Data Analyst', 
                                    description: 'Analyzes data and generates insights',
                                    specialization: 'Data Analysis'
                                  })}
                                >
                                  Configure
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-md font-medium text-[hsl(var(--foreground))]">Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('gmail', 'Gmail', 'tool')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded flex items-center justify-center">
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.703-1.603 1.582-1.636L12 10.545l10.418-6.724A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Gmail</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Send emails, read messages, organize inbox, and manage labels</p>
                          
                          <div className="pt-2 mt-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleToolConfigure({ 
                                id: 'gmail', 
                                name: 'Gmail', 
                                description: 'Email management and communication',
                                status: 'Connected'
                              })}
                            >
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('slack', 'Slack', 'tool')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded flex items-center justify-center">
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                                <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                                <path d="M18.956 8.834a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.521V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                                <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Slack</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Send messages, create channels, and manage team notifications</p>
                          
                          <div className="pt-2 mt-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleToolConfigure({ 
                                id: 'slack', 
                                name: 'Slack', 
                                description: 'Team communication and collaboration',
                                status: 'Connected'
                              })}
                            >
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Workflows Section */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-[hsl(var(--foreground))]">Workflows</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('content-pipeline', 'Content Pipeline', 'workflow')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <Zap className="w-8 h-8 text-amber-600" />
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Content Pipeline</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Automated content creation and publishing workflow with 5 steps</p>
                          
                          <div className="space-y-4 mt-auto">
                            <div className="pt-2">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => handleWorkflowConfigure({ 
                                    id: 'content-pipeline', 
                                    name: 'Content Pipeline', 
                                    description: 'Automated content creation and publishing workflow'
                                  })}
                                >
                                  Configure
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow h-full flex flex-col relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-8 h-8 p-0 z-10"
                          title="Remove from copilot"
                          onClick={() => handleDeleteComponent('data-processing', 'Data Processing', 'workflow')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3">
                            <GitBranch className="w-8 h-8 text-green-600" />
                            <div className="flex-1 min-w-0 pr-8">
                              <h3 className="font-semibold text-[hsl(var(--foreground))] text-base mb-1 truncate">Data Processing</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <button
                                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors theme-primary"
                                >
                                  <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-5" />
                                </button>
                                <span className="text-xs text-gray-600">Active</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-4 flex-grow">Automated data analysis and reporting workflow with 8 steps</p>
                          
                          <div className="space-y-4 mt-auto">
                            <div className="pt-2">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => handleWorkflowConfigure({ 
                                    id: 'data-processing', 
                                    name: 'Data Processing', 
                                    description: 'Automated data analysis and reporting workflow'
                                  })}
                                >
                                  Configure
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {copilotData.components.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">No components added yet</p>
                      <p className="text-sm">Use the buttons above to add agents, tools, or workflows to your copilot.</p>
                    </div>
                  )}
                </div>
                </CardContent>
              </Card>
            </div>
            )}

            {activeTab === "knowledge" && (
            <div className="p-6 pb-24">
              <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                <div>
                  <div className="mb-6">
                    <h2 className="font-semibold text-foreground text-[24px]">Knowledge Base</h2>
                    <p className="text-sm text-muted-foreground">Manage Competitor Researcher's knowledge sources and documentation</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 mb-6">
                    <Button variant="outline" size="sm" onClick={handleAddDocument}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Document
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleAddUrl}>
                      <Link className="w-4 h-4 mr-1" />
                      Add URL
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCreateMd}>
                      <FileText className="w-4 h-4 mr-1" />
                      Create MD
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSuggestDocsOpen(true)}>
                      <PenTool className="w-4 h-4 mr-1" />
                      AI Suggestions
                    </Button>
                    <Button variant="outline" size="sm">
                      Go to Marketplace
                    </Button>
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
                </CardContent>
              </Card>
            </div>
            )}

            {activeTab === "user-docs" && !previewDocument && (
            <div className="p-6 pb-24">
              <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                <div>
                  <div className="mb-6">
                    <h2 className="font-semibold text-foreground text-[24px]">User Documents</h2>
                    <p className="text-sm text-muted-foreground">Manage user-uploaded documents and files</p>
                  </div>
                  
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
                          <Button variant="ghost" size="sm" title="Download" onClick={() => handleDownloadDocument('quarterly-sales-data.xlsx')}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View" onClick={() => handleViewDocument('quarterly-sales-data.xlsx')}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteDocument('quarterly-sales-data.xlsx')}>
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
                          <Button variant="ghost" size="sm" title="Download" onClick={() => handleDownloadDocument('product-requirements.docx')}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View" onClick={() => handleViewDocument('product-requirements.docx')}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteDocument('product-requirements.docx')}>
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
                          <Button variant="ghost" size="sm" title="Download" onClick={() => handleDownloadDocument('team-meeting-notes.pdf')}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View" onClick={() => handleViewDocument('team-meeting-notes.pdf')}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteDocument('team-meeting-notes.pdf')}>
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
                          <Button variant="ghost" size="sm" title="Download" onClick={() => handleDownloadDocument('user-research-findings.pptx')}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View" onClick={() => handleViewDocument('user-research-findings.pptx')}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteDocument('user-research-findings.pptx')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
            )}

            {activeTab === "user-docs" && previewDocument && (
            <div className="p-0 m-0">
              <div className="max-w-6xl mx-auto p-6 flex flex-col">
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderBottomColor: 'hsl(187, 18%, 80%)' }}>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleExitPreview}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Exit Preview
                    </Button>
                    <div className="h-6 w-px bg-border"></div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{previewDocument}</h2>
                      <p className="text-sm text-muted-foreground">Document Preview</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(previewDocument)} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2" 
                      onClick={() => handleDeleteDocument(previewDocument)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Document Content Preview */}
                <div className="flex-1 bg-white border rounded-lg overflow-hidden" style={{ borderColor: 'hsl(187, 18%, 80%)' }}>
                  <div className="h-full p-8 overflow-y-auto">
                    {previewDocument?.endsWith('.xlsx') && (
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Quarterly Sales Data</h3>
                          <p className="text-muted-foreground">Excel Spreadsheet - 1.2 MB</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Sheet Preview: Q1 2024 Sales</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-[hsl(var(--border))]">
                              <thead>
                                <tr className="bg-[hsl(var(--muted))]">
                                  <th className="border border-[hsl(var(--border))] p-2 text-left">Region</th>
                                  <th className="border border-[hsl(var(--border))] p-2 text-left">Product</th>
                                  <th className="border border-[hsl(var(--border))] p-2 text-left">Sales Rep</th>
                                  <th className="border border-[hsl(var(--border))] p-2 text-right">Revenue</th>
                                  <th className="border border-[hsl(var(--border))] p-2 text-right">Units Sold</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-[hsl(var(--border))] p-2">North America</td>
                                  <td className="border border-[hsl(var(--border))] p-2">Product A</td>
                                  <td className="border border-[hsl(var(--border))] p-2">John Smith</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">$125,000</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">250</td>
                                </tr>
                                <tr>
                                  <td className="border border-[hsl(var(--border))] p-2">Europe</td>
                                  <td className="border border-[hsl(var(--border))] p-2">Product B</td>
                                  <td className="border border-[hsl(var(--border))] p-2">Sarah Wilson</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">$89,500</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">179</td>
                                </tr>
                                <tr>
                                  <td className="border border-[hsl(var(--border))] p-2">Asia Pacific</td>
                                  <td className="border border-[hsl(var(--border))] p-2">Product C</td>
                                  <td className="border border-[hsl(var(--border))] p-2">Mike Chen</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">$156,200</td>
                                  <td className="border border-[hsl(var(--border))] p-2 text-right">312</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewDocument?.endsWith('.docx') && (
                      <div className="space-y-6 max-w-4xl">
                        <div className="text-center py-8">
                          <FileText className="w-16 h-16 mx-auto text-green-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Product Requirements Document</h3>
                          <p className="text-muted-foreground">Word Document - 845 KB</p>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <h1>Product Requirements Document</h1>
                          <h2>Executive Summary</h2>
                          <p>This document outlines the detailed requirements for our next-generation analytics platform. The platform aims to provide real-time insights and automated reporting capabilities for enterprise customers.</p>
                          
                          <h2>Product Vision</h2>
                          <p>To create an intuitive, powerful analytics platform that empowers businesses to make data-driven decisions quickly and confidently.</p>
                          
                          <h2>Key Features</h2>
                          <ul>
                            <li>Real-time data processing and visualization</li>
                            <li>Customizable dashboard creation</li>
                            <li>Advanced filtering and segmentation</li>
                            <li>Automated alert system</li>
                            <li>Integration with popular business tools</li>
                          </ul>
                          
                          <h2>User Stories</h2>
                          <h3>Data Analyst</h3>
                          <p>As a data analyst, I want to create custom visualizations so that I can present insights effectively to stakeholders.</p>
                          
                          <h3>Business Manager</h3>
                          <p>As a business manager, I want to receive automated alerts when key metrics change so that I can respond quickly to business opportunities.</p>
                        </div>
                      </div>
                    )}

                    {previewDocument?.endsWith('.pdf') && (
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <FileText className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Team Meeting Notes</h3>
                          <p className="text-muted-foreground">PDF Document - 564 KB</p>
                        </div>
                        <div className="border rounded-lg p-6 bg-[hsl(var(--muted))]">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg">Weekly Team Meeting - March 15, 2024</h4>
                              <p className="text-sm text-muted-foreground">Attendees: Mike Chen, Sarah Johnson, Emma Wilson, John Smith</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium">Agenda Items</h5>
                              <ul className="list-disc ml-6 space-y-1">
                                <li>Product roadmap review</li>
                                <li>Q1 performance metrics</li>
                                <li>Upcoming feature releases</li>
                                <li>Team capacity planning</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium">Key Decisions</h5>
                              <ul className="list-disc ml-6 space-y-1">
                                <li>Approved budget increase for analytics platform</li>
                                <li>Decided to prioritize mobile app development</li>
                                <li>Set launch date for Q2 feature release</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium">Action Items</h5>
                              <ul className="list-disc ml-6 space-y-1">
                                <li>Sarah: Update project timeline by March 20</li>
                                <li>Mike: Review technical specifications</li>
                                <li>Emma: Conduct user research interviews</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewDocument?.endsWith('.pptx') && (
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <FileText className="w-16 h-16 mx-auto text-orange-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">User Research Findings</h3>
                          <p className="text-muted-foreground">PowerPoint Presentation - 3.1 MB</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border rounded-lg p-4 bg-white">
                            <div className="aspect-video bg-blue-50 rounded border-2 border-dashed border-blue-200 flex items-center justify-center mb-3">
                              <div className="text-center">
                                <h4 className="font-semibold text-blue-700">Slide 1</h4>
                                <p className="text-sm text-blue-600">Research Overview</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Introduction to user research methodology and objectives</p>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-white">
                            <div className="aspect-video bg-green-50 rounded border-2 border-dashed border-green-200 flex items-center justify-center mb-3">
                              <div className="text-center">
                                <h4 className="font-semibold text-green-700">Slide 2</h4>
                                <p className="text-sm text-green-600">Key Insights</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Primary findings from user interviews and surveys</p>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-white">
                            <div className="aspect-video bg-purple-50 rounded border-2 border-dashed border-purple-200 flex items-center justify-center mb-3">
                              <div className="text-center">
                                <h4 className="font-semibold text-purple-700">Slide 3</h4>
                                <p className="text-sm text-purple-600">User Personas</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Detailed personas based on research data</p>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-white">
                            <div className="aspect-video bg-orange-50 rounded border-2 border-dashed border-orange-200 flex items-center justify-center mb-3">
                              <div className="text-center">
                                <h4 className="font-semibold text-orange-700">Slide 4</h4>
                                <p className="text-sm text-orange-600">Recommendations</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Actionable recommendations for product improvements</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === "profile" && (
            <div className="p-6 pb-24">
              <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                <div>
                  <div className="mb-6">
                    <h2 className="font-semibold text-foreground text-[24px]">Profile Fields</h2>
                    <p className="text-sm text-muted-foreground">Configure which profile fields this copilot should collect from users</p>
                  </div>
                  
                  <div className="flex justify-end mb-6">
                    <Button variant="outline" size="sm" onClick={handleAddField}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Add new field form - inline */}
                    {isAddingField && (
                      <div className="p-6 border-2 border-dashed border-muted rounded-lg bg-muted/20">
                        <div className="space-y-4">
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
                          
                          <div className="flex justify-end gap-2 pt-2">
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
                        </div>
                      </div>
                    )}
                    
                    {/* Job Title field - Sample profile field */}
                    {editingFieldId === 'job-title' ? (
                      <div className="p-6 border-2 rounded-lg" style={{ backgroundColor: 'var(--theme-accent)', borderColor: 'var(--theme-primary)' }}>
                        <div className="space-y-4">
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
                          
                          <div className="flex justify-end gap-2 pt-2">
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
                        </div>
                      </div>
                    ) : fieldToDelete === 'job-title' ? (
                      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">Text</Badge>
                            <div>
                              <div className="font-medium">Job Title</div>
                              <div className="text-sm text-muted-foreground">User's current job title or role</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-red-600 font-medium">Delete this field?</span>
                            <Button variant="outline" size="sm" onClick={handleCancelDeleteField}>
                              Cancel
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleConfirmDeleteField}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}

                    {/* Industry field */}
                    {editingFieldId === 'industry' ? (
                      <div className="p-6 border-2 rounded-lg" style={{ backgroundColor: 'var(--theme-accent)', borderColor: 'var(--theme-primary)' }}>
                        <div className="space-y-4">
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
                          
                          <div className="flex justify-end gap-2 pt-2">
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
                        </div>
                      </div>
                    ) : fieldToDelete === 'industry' ? (
                      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">Select</Badge>
                            <div>
                              <div className="font-medium">Industry</div>
                              <div className="text-sm text-muted-foreground">Industry sector the user works in</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-red-600 font-medium">Delete this field?</span>
                            <Button variant="outline" size="sm" onClick={handleCancelDeleteField}>
                              Cancel
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleConfirmDeleteField}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                            <Badge variant="outline" className="text-xs" style={{ color: 'var(--theme-primary)' }}>Optional</Badge>
                            <Button variant="ghost" size="sm" title="Edit Field" onClick={() => handleEditField('industry')}>
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDeleteField('industry')}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Experience Level field */}
                    {editingFieldId === 'experience' ? (
                      <div className="p-6 border-2 rounded-lg" style={{ backgroundColor: 'var(--theme-accent)', borderColor: 'var(--theme-primary)' }}>
                        <div className="space-y-4">
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
                          
                          <div className="flex justify-end gap-2 pt-2">
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
                        </div>
                      </div>
                    ) : fieldToDelete === 'experience' ? (
                      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">Select</Badge>
                            <div>
                              <div className="font-medium">Experience Level</div>
                              <div className="text-sm text-muted-foreground">Years of professional experience</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-red-600 font-medium">Delete this field?</span>
                            <Button variant="outline" size="sm" onClick={handleCancelDeleteField}>
                              Cancel
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleConfirmDeleteField}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}

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
                          <Badge variant="outline" className="text-xs" style={{ color: 'var(--theme-primary)' }}>Optional</Badge>
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
                          <Badge variant="outline" className="text-xs" style={{ color: 'var(--theme-primary)' }}>Optional</Badge>
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
                          <Badge variant="outline" className="text-xs" style={{ color: 'var(--theme-primary)' }}>Optional</Badge>
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
                </CardContent>
              </Card>
            </div>
            )}

            {activeTab === "human-support" && (
            <div className="p-6 pb-24">
              <div className="grid grid-cols-3 gap-6">
                {/* Recent Requests - 2/3 width */}
                <div className="col-span-2">
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h2 className="font-semibold text-foreground text-[24px]">Recent Requests</h2>
                        <p className="text-sm text-muted-foreground">Latest human support escalations</p>
                      </div>
                      
                      {humanSupportEnabled ? (
                        <div className="space-y-4">
                          {/* Sample Recent Requests */}
                          {[
                            {
                              id: 1,
                              user: "john@example.com",
                              message: "I need help with my campaign setup",
                              time: "2 hours ago",
                              status: "pending"
                            },
                            {
                              id: 2,
                              user: "sarah@company.com",
                              message: "The analytics data seems incorrect",
                              time: "1 day ago",
                              status: "resolved"
                            },
                            {
                              id: 3,
                              user: "mike@startup.io",
                              message: "Can't connect to my email account",
                              time: "3 days ago",
                              status: "resolved"
                            }
                          ].map((request) => (
                            <div key={request.id} className="p-3 border rounded-lg space-y-2" style={{ borderColor: 'hsl(187, 18%, 80%)' }}>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{request.user}</span>
                                <Badge 
                                  variant={request.status === 'pending' ? 'destructive' : 'default'}
                                  className="text-xs"
                                >
                                  {request.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {request.message}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                {request.time}
                              </div>
                            </div>
                          ))}
                          
                          <div className="pt-4 border-t" style={{ borderTopColor: 'hsl(187, 18%, 80%)' }}>
                            <Button variant="outline" size="sm" className="w-full">
                              View All Requests
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Enable human support to see escalation requests
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Configuration - 1/3 width */}
                <div className="col-span-1">
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h2 className="font-semibold text-foreground text-[24px]">Human Support Configuration</h2>
                        <p className="text-sm text-muted-foreground">Configure how users can escalate to human support</p>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Enable/Disable Toggle */}
                        <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'hsl(187, 18%, 80%)' }}>
                          <div>
                            <h3 className="font-medium text-foreground">Enable Human Support</h3>
                            <p className="text-sm text-muted-foreground">Allow users to escalate conversations to human support</p>
                          </div>
                          <button 
                            onClick={() => {
                              setHumanSupportEnabled(!humanSupportEnabled);
                              setHasChanges(true);
                            }}
                            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                              backgroundColor: humanSupportEnabled ? 'var(--theme-primary)' : '#e5e7eb',
                              focusRingColor: 'var(--theme-primary)'
                            }}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              humanSupportEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        {humanSupportEnabled && (
                          <>
                            {/* Admin Configuration */}
                            <div className="space-y-4">
                              <h3 className="font-medium text-foreground">Admin Contact</h3>
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <Label htmlFor="admin-email">Admin Email Address</Label>
                                  <Input
                                    id="admin-email"
                                    type="email"
                                    value={adminEmail}
                                    onChange={(e) => {
                                      setAdminEmail(e.target.value);
                                      setHasChanges(true);
                                    }}
                                    placeholder="admin@company.com"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    This email will receive all human support requests
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            )}
      </div>
      {/* AI Document Suggestions Modal */}
      <Dialog open={suggestDocsOpen} onOpenChange={setSuggestDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5" />
              AI Document Suggestions
            </DialogTitle>
            <DialogDescription>
              Select the documents you'd like our AI to generate for your knowledge base. These will be customized based on your copilot's purpose and configuration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {suggestedDocs.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors" style={{ borderColor: 'hsl(187, 18%, 80%)' }}>
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
          
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderTopColor: 'hsl(187, 18%, 80%)' }}>
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
                <PenTool className="w-4 h-4" />
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
                    {tool.name === 'OpenAI' && <PenTool className="w-5 h-5 text-green-600" />}
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
          
          <div className="flex justify-between items-center pt-4 border-t border-[hsl(var(--border))]">
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

      {/* Delete Document Confirmation Modal */}
      <Dialog open={deleteDocumentModalOpen} onOpenChange={setDeleteDocumentModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Delete Document
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentToDelete}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancelDeleteDocument}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDeleteDocument}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add Document Modal */}
      <Dialog open={addDocumentModalOpen} onOpenChange={setAddDocumentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-500" />
              Add Document
            </DialogTitle>
            <DialogDescription>
              Upload a document to your knowledge base for this copilot.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="doc-title">Document Title</Label>
                <Input
                  id="doc-title"
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <Label htmlFor="doc-description">Description</Label>
                <Textarea
                  id="doc-description"
                  placeholder="Brief description of the document"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setAddDocumentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Adding document to knowledge base');
              setAddDocumentModalOpen(false);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add URL Modal */}
      <Dialog open={addUrlModalOpen} onOpenChange={setAddUrlModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link className="w-5 h-5 text-green-500" />
              Add URL
            </DialogTitle>
            <DialogDescription>
              Add a website or online resource to your knowledge base.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="url-input">Website URL</Label>
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="url-title">Title</Label>
              <Input
                id="url-title"
                placeholder="Enter a title for this resource"
              />
            </div>
            <div>
              <Label htmlFor="url-description">Description</Label>
              <Textarea
                id="url-description"
                placeholder="Brief description of the content"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setAddUrlModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Adding URL to knowledge base');
              setAddUrlModalOpen(false);
            }}>
              <Link className="w-4 h-4 mr-2" />
              Add URL
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Create MD Modal */}
      <Dialog open={createMdModalOpen} onOpenChange={setCreateMdModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Create Markdown Document
            </DialogTitle>
            <DialogDescription>
              Create a new markdown document for your knowledge base.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 flex-1 overflow-visible min-h-0 p-1">
            <div className="space-y-4 px-1">
              <div>
                <Label htmlFor="md-title">Document Title</Label>
                <Input
                  id="md-title"
                  placeholder="Enter document title"
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Label htmlFor="md-description">Description</Label>
                <Input
                  id="md-description"
                  placeholder="Brief description of the document"
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </div>
            </div>
            
            {/* Editor Tabs */}
            <div className="border-b border-[hsl(var(--border))]">
              <div className="flex space-x-1">
                <button
                  onClick={() => setMdEditorTab('markdown')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    mdEditorTab === 'markdown'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Markdown
                </button>
                <button
                  onClick={() => setMdEditorTab('rtf')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    mdEditorTab === 'rtf'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Rich Text
                </button>
                <button
                  onClick={() => setMdEditorTab('preview')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    mdEditorTab === 'preview'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Preview
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 min-h-0 max-h-96">
              {mdEditorTab === 'markdown' && (
                <div className="h-full max-h-96">
                  <Textarea
                    value={mdContent}
                    onChange={(e) => setMdContent(e.target.value)}
                    placeholder="# Your Markdown Content

Write your markdown content here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `Code snippets`

## Sections

Add sections, lists, and more..."
                    className="font-mono text-sm h-96 resize-none"
                  />
                </div>
              )}
              
              {mdEditorTab === 'preview' && (
                <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-white">
                  <div className="prose prose-sm max-w-none">
                    {mdContent ? (
                      <div dangerouslySetInnerHTML={{ 
                        __html: mdContent
                          .replace(/^# (.+)/gm, '<h1>$1</h1>')
                          .replace(/^## (.+)/gm, '<h2>$1</h2>')
                          .replace(/^### (.+)/gm, '<h3>$1</h3>')
                          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.+?)\*/g, '<em>$1</em>')
                          .replace(/`(.+?)`/g, '<code>$1</code>')
                          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
                          .replace(/^- (.+)/gm, '<li>$1</li>')
                          .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
                          .replace(/\n/g, '<br>')
                      }} />
                    ) : (
                      <p className="text-muted-foreground">Start typing in the Markdown tab to see a preview here.</p>
                    )}
                  </div>
                </div>
              )}
              
              {mdEditorTab === 'rtf' && (
                <div className="h-96 overflow-y-auto border rounded-lg">
                  <div className="border-b p-2 bg-[hsl(var(--muted))] flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <strong>B</strong>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <em>I</em>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <u>U</u>
                    </Button>
                    <div className="h-6 w-px bg-border mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      H1
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      H2
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Link
                    </Button>
                  </div>
                  <div 
                    contentEditable
                    className="p-4 focus:outline-none prose prose-sm max-w-none overflow-y-auto"
                    style={{ height: '320px' }}
                    onInput={(e) => {
                      const content = e.currentTarget.textContent || '';
                      setMdContent(content);
                    }}
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ 
                      __html: mdContent || '<p class="text-muted-foreground">Start typing your rich text content here...</p>'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-[hsl(var(--border))] flex-shrink-0">
            <Button variant="outline" onClick={() => setCreateMdModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Creating markdown document with content:', mdContent);
              setCreateMdModalOpen(false);
            }}>
              <FileText className="w-4 h-4 mr-2" />
              Create Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Component Confirmation Modal */}
      <Dialog open={deleteComponentModalOpen} onOpenChange={setDeleteComponentModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Remove Component
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{componentToDelete?.name}" from this copilot? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancelDeleteComponent}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDeleteComponent}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Component
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  );
}