import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database, MessageSquare, TrendingUp, BarChart3, Filter, Search, Image as ImageIcon, Palette, RotateCcw } from "lucide-react";
import avatarImagePath from "@assets/image_1751745994194.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SampleScreen } from "@/components/sample-screens";

export function WorkspaceSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [workspaceName, setWorkspaceName] = useState("GTM Team");
  const [workspaceDescription, setWorkspaceDescription] = useState("A comprehensive workspace for managing AI copilots and workflows");
  const [allowPublicAccess, setAllowPublicAccess] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState("90");
  
  // Branding colors - defaults to current brand colors
  const [primaryColor, setPrimaryColor] = useState("#008062");
  const [contentBgColor, setContentBgColor] = useState("#ffffff");
  const [sidebarBgColor, setSidebarBgColor] = useState("#e6eeef");
  const [accentColor, setAccentColor] = useState("#00d2a0");
  const [borderColor, setBorderColor] = useState("#e5e7eb");

  // Helper function to determine if text should be light or dark based on background
  const getTextColor = (bgColor: string) => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155 ? '#000000' : '#ffffff';
  };

  // Helper function to generate percentage shading of colors
  const generateShade = (color: string, percentage: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const adjustedR = Math.round(r + (255 - r) * (percentage / 100));
    const adjustedG = Math.round(g + (255 - g) * (percentage / 100));
    const adjustedB = Math.round(b + (255 - b) * (percentage / 100));
    
    return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
  };

  // Reset to default brand colors
  const resetToDefaults = () => {
    setPrimaryColor("#008062");
    setContentBgColor("#ffffff");
    setSidebarBgColor("#e6eeef");
    setAccentColor("#00d2a0");
    setBorderColor("#e5e7eb");
  };

  return (
    <div className={`space-y-6 ${(activeTab === "general" || activeTab === "security" || activeTab === "branding") ? "pb-24" : ""}`}>
      <div className="w-full">
        <nav className="flex space-x-8 border-b border-border">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "general"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "security"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("branding")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "branding"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Branding
          </button>

          <button
            onClick={() => setActiveTab("conversations")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "conversations"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Conversations
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "users"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Users
          </button>
        </nav>

        {activeTab === "general" && (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Workspace Information - 2/3 column */}
          <div className="col-span-2">
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
          </div>

          {/* Workspace Preferences - 1/3 column */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-[16px]">Workspace Preferences</CardTitle>
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
        <div className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access controls
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
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Single Sign-On (SSO)</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable SSO authentication via SAML/OAuth
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="24">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>IP Whitelist</Label>
                <Textarea
                  placeholder="Enter IP addresses or ranges (one per line)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Restrict access to specific IP addresses or ranges
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {activeTab === "branding" && (
        <div className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Workspace Theme Colors
              </CardTitle>
              <CardDescription>
                Customize your workspace colors to match your brand identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Picker Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Used for buttons, links, and accent elements
                  </p>
                  <div className="space-y-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full h-12 rounded-md border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="text-sm"
                      placeholder="#008062"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="content-bg-color">Content Background</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Main content area background color
                  </p>
                  <div className="space-y-2">
                    <Input
                      id="content-bg-color"
                      type="color"
                      value={contentBgColor}
                      onChange={(e) => setContentBgColor(e.target.value)}
                      className="w-full h-12 rounded-md border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={contentBgColor}
                      onChange={(e) => setContentBgColor(e.target.value)}
                      className="text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sidebar-bg-color">Sidebar Background</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Navigation sidebar background color
                  </p>
                  <div className="space-y-2">
                    <Input
                      id="sidebar-bg-color"
                      type="color"
                      value={sidebarBgColor}
                      onChange={(e) => setSidebarBgColor(e.target.value)}
                      className="w-full h-12 rounded-md border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={sidebarBgColor}
                      onChange={(e) => setSidebarBgColor(e.target.value)}
                      className="text-sm"
                      placeholder="#e6eeef"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Used for highlights, badges, and notifications
                  </p>
                  <div className="space-y-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full h-12 rounded-md border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="text-sm"
                      placeholder="#00d2a0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="border-color">Border Color</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Used for card borders and dividers
                  </p>
                  <div className="space-y-2">
                    <Input
                      id="border-color"
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-full h-12 rounded-md border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="text-sm"
                      placeholder="#e5e7eb"
                    />
                  </div>
                </div>
              </div>

              {/* Color Preview Section */}
              <div className="space-y-3">
                <Label>Color Preview</Label>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex h-48">
                    {/* Sidebar Preview */}
                    <div 
                      className="w-1/4 flex flex-col p-4 space-y-2"
                      style={{ 
                        backgroundColor: sidebarBgColor,
                        color: getTextColor(sidebarBgColor)
                      }}
                    >
                      <div className="text-sm font-medium">Navigation</div>
                      <div className="space-y-1">
                        <div 
                          className="px-2 py-1 rounded text-xs flex items-center justify-between"
                          style={{ backgroundColor: generateShade(sidebarBgColor, 15) }}
                        >
                          <span>Copilots</span>
                          <div 
                            className="w-4 h-3 rounded-full text-xs flex items-center justify-center"
                            style={{ 
                              backgroundColor: accentColor,
                              color: getTextColor(accentColor)
                            }}
                          >
                            3
                          </div>
                        </div>
                        <div 
                          className="px-2 py-1 rounded text-xs"
                          style={{ 
                            backgroundColor: primaryColor,
                            color: getTextColor(primaryColor)
                          }}
                        >
                          Active Item
                        </div>
                        <div 
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: generateShade(sidebarBgColor, 15) }}
                        >
                          Settings
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Preview */}
                    <div 
                      className="flex-1 p-4 space-y-3"
                      style={{ 
                        backgroundColor: contentBgColor,
                        color: getTextColor(contentBgColor)
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">Dashboard</div>
                        <button 
                          className="px-3 py-1 rounded text-sm font-medium"
                          style={{ 
                            backgroundColor: primaryColor,
                            color: getTextColor(primaryColor)
                          }}
                        >
                          Primary Button
                        </button>
                      </div>
                      <div 
                        className="p-3 rounded border"
                        style={{ 
                          backgroundColor: generateShade(contentBgColor, 5),
                          borderColor: borderColor
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Sample Card</div>
                          <div 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              backgroundColor: accentColor,
                              color: getTextColor(accentColor)
                            }}
                          >
                            Badge
                          </div>
                        </div>
                        <div className="text-xs opacity-75 mb-2">Content with custom border color</div>
                        <div 
                          className="h-px mb-2"
                          style={{ backgroundColor: borderColor }}
                        ></div>
                        <div className="flex gap-2">
                          <div 
                            className="px-2 py-1 rounded text-xs"
                            style={{ backgroundColor: generateShade(accentColor, 85) }}
                          >
                            Accent 85%
                          </div>
                          <div 
                            className="px-2 py-1 rounded text-xs"
                            style={{ backgroundColor: generateShade(primaryColor, 80) }}
                          >
                            Primary 80%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset to Defaults */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <div className="text-sm font-medium">Reset to Brand Defaults</div>
                  <div className="text-sm text-muted-foreground">
                    Restore the original Knolli brand color theme
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={resetToDefaults}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Colors
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {activeTab === "conversations" && (
          <div className="mt-6">
            <SampleScreen section={"conversations" as any} />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="mt-6">
            <SampleScreen section={"analytics" as any} />
          </div>
        )}

        {activeTab === "users" && (
          <div className="mt-6">
            <SampleScreen section={"users" as any} />
          </div>
        )}
      </div>
      
      {/* Save Footer - Only show for General, Security, and Branding tabs */}
      {(activeTab === "general" || activeTab === "security" || activeTab === "branding") && (
        <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Cancel
            </Button>
            <Button className="bg-[#008062] hover:bg-[#006b54]">
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}