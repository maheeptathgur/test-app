import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Settings, Bot, BookOpen, Upload, Users, Copy, Plus, Trash2, FileText, Image, Code, Save, PenTool, BarChart } from "lucide-react";
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
  const [copilotData, setCopilotData] = useState(copilot);
  
  const handleCopilotChange = (field: string, value: string) => {
    setCopilotData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configure {copilotData.name}</h1>
          <p className="text-gray-600">Edit copilot settings, components, and profile fields</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>

      {/* Configuration Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "general", label: "General Settings" },
            { id: "components", label: "Components" },
            { id: "knowledge", label: "Knowledge Base" },
            { id: "user-docs", label: "User Documents" },
            { id: "profile", label: "Profile Fields" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#008062] text-[#008062]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic configuration for {copilotData.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    placeholder="Enter the system prompt that defines how the copilot behaves"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008062]"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked={copilotData.status === "active"} />
                  <Label htmlFor="active" className="text-sm font-medium">Copilot is active</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "components" && (
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>Manage agents, tools, and workflows for {copilotData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Agent
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Tool
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Workflow
                      </Button>
                    </div>
                  </div>

                  {/* Sample Component */}
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
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "knowledge" && (
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Manage knowledge sources for {copilotData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Knowledge Source
                  </Button>
                  <p className="text-sm text-gray-500 text-center py-8">
                    No knowledge sources configured yet
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "user-docs" && (
            <Card>
              <CardHeader>
                <CardTitle>User Documents</CardTitle>
                <CardDescription>Manage user-uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 text-center py-8">
                    No user documents uploaded yet
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Fields</CardTitle>
                <CardDescription>Configure user profile questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Profile Field
                  </Button>
                  <p className="text-sm text-gray-500 text-center py-8">
                    No profile fields configured yet
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={() => onSave(copilotData)}>Save Changes</Button>
      </div>
    </div>
  );
}