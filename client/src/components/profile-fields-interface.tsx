import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { X, Save, Settings, Bot, Users, Workflow, Database, Plus, Trash2 } from "lucide-react";
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
  const [copilotData, setCopilotData] = useState<CopilotData>(copilot);
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

  const handleSave = () => {
    onSave(copilotData);
    onClose();
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
              <button
                onClick={() => setActiveTab("general")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === "general"
                    ? "border-[#008062] text-[#008062]"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                <Settings className="w-4 h-4" />
                General
              </button>
              <button
                onClick={() => setActiveTab("components")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === "components"
                    ? "border-[#008062] text-[#008062]"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                <Bot className="w-4 h-4" />
                Components
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === "profile"
                    ? "border-[#008062] text-[#008062]"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                <Users className="w-4 h-4" />
                Profile Fields
              </button>
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "general" && (
            <div className="p-6 m-0 h-full">
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={copilotData.name}
                          onChange={(e) => handleCopilotChange('name', e.target.value)}
                          placeholder="Copilot name"
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
                  </CardContent>
                </Card>
              </div>
            </div>
            )}

            {activeTab === "components" && (
            <div className="p-6 m-0 h-full">
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Components
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
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </div>
            </div>
            )}

            {activeTab === "profile" && (
            <div className="p-6 m-0 h-full">
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Target User Profile</CardTitle>
                    <p className="text-sm text-muted-foreground">Define the type of user this copilot is designed for</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
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
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
}