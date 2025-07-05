import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Settings, Bot, Users, BookOpen, Upload, Plus, Trash2, Image } from "lucide-react";
import { CopilotData } from "@/lib/types";

interface CopilotConfigurationProps {
  copilot: CopilotData;
  onClose: () => void;
  onSave: (updatedCopilot: CopilotData) => void;
}

export function CopilotConfiguration({ copilot, onClose, onSave }: CopilotConfigurationProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [copilotData, setCopilotData] = useState<CopilotData>(copilot);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant focused on providing accurate and relevant information.");
  const [conversationStarters, setConversationStarters] = useState([
    "How can you help me today?",
    "What are your capabilities?",
    "Can you provide some examples of what you can do?"
  ]);

  const handleCopilotChange = (field: keyof CopilotData, value: any) => {
    setCopilotData(prev => ({
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

  const addComponent = (type: 'agent' | 'tool' | 'workflow') => {
    const newComponent = {
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type
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
          <div className="border-b px-6 pt-4">
            <nav className="flex space-x-8">
              {[
                { id: "general", label: "General Settings", icon: Settings },
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

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "general" && (
              <div className="p-6 space-y-6">
                {/* Copilot Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle>Copilot Configuration</CardTitle>
                    <CardDescription>Basic settings for your copilot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={copilotData.type} onValueChange={(value) => handleCopilotChange('type', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
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
                  </CardContent>
                </Card>

                {/* Advanced Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Conversation starters and additional configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "components" && (
              <div className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Components</CardTitle>
                        <CardDescription>Manage agents, tools, and workflows for this copilot</CardDescription>
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
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {copilotData.components.length > 0 ? (
                        <div className="grid gap-3">
                          {copilotData.components.map((component, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg bg-white"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  component.type === 'agent' ? 'bg-purple-100 text-purple-700' :
                                  component.type === 'tool' ? 'bg-blue-100 text-blue-700' :
                                  'bg-amber-100 text-amber-700'
                                }`}>
                                  {component.type === 'agent' ? '🤖' : component.type === 'tool' ? '🔧' : '⚡'}
                                </div>
                                <div>
                                  <div className="font-medium">{component.name}</div>
                                  <div className="text-sm text-gray-500 capitalize">{component.type}</div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeComponent(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-6 h-6 text-gray-400" />
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
              <div className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>Manage documents and knowledge sources for this copilot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">Knowledge Base</p>
                      <p className="text-sm">Knowledge base functionality would be implemented here.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "user-docs" && (
              <div className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Documents</CardTitle>
                    <CardDescription>Manage user-uploaded documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">User Documents</p>
                      <p className="text-sm">User document management would be implemented here.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Fields</CardTitle>
                    <CardDescription>Configure profile fields that users fill out for this copilot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">Profile Fields</p>
                      <p className="text-sm">Profile field configuration would be implemented here.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4 p-6 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}