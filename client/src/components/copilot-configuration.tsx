import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save, Settings, Bot, Users, Plus, Trash2, Upload, Image, Code, Copy, BookOpen, FileText, Link, ExternalLink, Edit3, Eye, Check, FolderOpen, Download } from "lucide-react";
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
    const newComponent = {
      name: `New ${type}`,
      type: type
    };
    handleCopilotChange('components', [...copilotData.components, newComponent]);
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

  if (!copilot) return null;

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
        <Tabs defaultValue="general" className="h-full flex flex-col">
          <div className="bg-muted/20">
            <div className="max-w-4xl mx-auto px-6 pt-4 pb-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Knowledge Base
                </TabsTrigger>
                <TabsTrigger value="user-docs" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  User Documents
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Profile Fields
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="general" className="p-0 m-0 h-full">
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key for the selected provider"
                      />
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
                          <Tabs defaultValue="javascript" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                              <TabsTrigger value="iframe">iframe</TabsTrigger>
                              <TabsTrigger value="react">React</TabsTrigger>
                            </TabsList>
                            <TabsContent value="javascript" className="mt-3">
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
                            </TabsContent>
                            <TabsContent value="iframe" className="mt-3">
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
                            </TabsContent>
                            <TabsContent value="react" className="mt-3">
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
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="components" className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
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
                  <div className="space-y-4">
                    {copilotData.components.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              component.type === 'agent' ? 'bg-purple-100 text-purple-700' :
                              component.type === 'tool' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {component.type}
                          </Badge>
                          <Input
                            value={component.name}
                            onChange={(e) => {
                              const newComponents = [...copilotData.components];
                              newComponents[index] = { ...component, name: e.target.value };
                              handleCopilotChange('components', newComponents);
                            }}
                            className="font-medium"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeComponent(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {copilotData.components.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No components added yet. Use the buttons above to add agents, tools, or workflows.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="p-0 m-0 h-full">
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
            </TabsContent>

            <TabsContent value="user-docs" className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">User Documents</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload Files
                      </Button>
                    </div>
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
            </TabsContent>

            <TabsContent value="profile" className="p-0 m-0 h-full">
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-foreground">Target User Profile</h2>
                  <p className="text-sm text-muted-foreground mb-4">Define the type of user this copilot is designed for</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Typical Job Title</Label>
                        <Input
                          id="title"
                          value={profileData.title}
                          onChange={(e) => handleProfileChange('title', e.target.value)}
                          placeholder="e.g., Senior Product Manager"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select value={profileData.industry} onValueChange={(value) => handleProfileChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Consulting">Consulting</SelectItem>
                            <SelectItem value="Media">Media</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={profileData.department} onValueChange={(value) => handleProfileChange('department', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product">Product</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="HR">Human Resources</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select value={profileData.experience} onValueChange={(value) => handleProfileChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2 years">0-2 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="6-10 years">6-10 years</SelectItem>
                            <SelectItem value="11-15 years">11-15 years</SelectItem>
                            <SelectItem value="15+ years">15+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expertise">Key Areas of Expertise</Label>
                      <Textarea
                        id="expertise"
                        value={profileData.expertise}
                        onChange={(e) => handleProfileChange('expertise', e.target.value)}
                        placeholder="e.g., Product strategy, user experience, data analysis"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">Typical Goals & Objectives</Label>
                      <Textarea
                        id="goals"
                        value={profileData.goals}
                        onChange={(e) => handleProfileChange('goals', e.target.value)}
                        placeholder="e.g., Launch innovative products that solve real user problems"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
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
    </div>
  );
}