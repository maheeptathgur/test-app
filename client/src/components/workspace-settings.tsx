import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Upload, Shield, CreditCard, Users, HelpCircle, 
         Image as ImageIcon, User, ChevronDown, UserCheck, Settings } from "lucide-react";
import avatarImagePath from "@assets/targeted_element_1751664027551.png";

export function WorkspaceSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [workspaceName, setWorkspaceName] = useState("Knolli Workspace");
  const [workspaceDescription, setWorkspaceDescription] = useState("AI-powered workspace for enhanced productivity");
  const [allowPublicAccess, setAllowPublicAccess] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState("365");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your workspace settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-[#008062] text-[#008062]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workspace Information - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Information</CardTitle>
                  <CardDescription>
                    Basic information about your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workspace-name">Workspace Name</Label>
                      <Input
                        id="workspace-name"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        placeholder="Enter workspace name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workspace-type">Workspace Type</Label>
                      <Select defaultValue="personal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workspace-description">Description</Label>
                    <Textarea
                      id="workspace-description"
                      value={workspaceDescription}
                      onChange={(e) => setWorkspaceDescription(e.target.value)}
                      placeholder="Describe your workspace"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Icon Image (1:1 ratio)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground mb-2">
                          Upload icon image
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Upload className="h-3 w-3" />
                          Choose File
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Logo Image (2:1 ratio)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground mb-2">
                          Upload logo image
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Upload className="h-3 w-3" />
                          Choose File
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Avatar Image (1:1 ratio)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <img 
                          src={avatarImagePath} 
                          alt="Avatar" 
                          className="h-8 w-8 mx-auto mb-2"
                        />
                        <div className="text-sm text-muted-foreground mb-2">
                          Avatar uploaded
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Upload className="h-3 w-3" />
                          Change File
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Banner Image (16:9 ratio)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground mb-2">
                          Upload banner image
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Upload className="h-3 w-3" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-[#008062] hover:bg-[#00d2a0]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Workspace Preferences - 1/3 width */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Preferences</CardTitle>
                  <CardDescription>
                    Configure how your workspace behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anyone with the link to view public copilots
                      </p>
                    </div>
                    <Switch
                      checked={allowPublicAccess}
                      onCheckedChange={setAllowPublicAccess}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about workspace activity
                      </p>
                    </div>
                    <Switch
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention (days)</Label>
                    <Select value={dataRetention} onValueChange={setDataRetention}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage access and security for your workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all workspace members
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow third-party applications to access workspace data
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select defaultValue="8">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}