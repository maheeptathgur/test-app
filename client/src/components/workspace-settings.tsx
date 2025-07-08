import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database, MessageSquare, TrendingUp, BarChart3, Filter, Search, Image as ImageIcon, Palette, RotateCcw, ChevronDown } from "lucide-react";
import { ThemeCustomizer } from "@/components/theme-customizer";
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
  
  // Theme colors state
  const [themeColors, setThemeColors] = useState({
    primary: "#008062",
    primaryHover: "#00D2A0", 
    workspaceBg: "#E6EEEF",
    contentBg: "#F8F6F6",
    cardBg: "#FFFFFF",
    primaryText: "#191C20",
    secondaryText: "#4E5964",
    borders: "#DADEE2",
    accent: "#E0FFF8"
  });

  // Preset themes
  const presetThemes = {
    default: {
      primary: "#008062",
      primaryHover: "#00D2A0",
      workspaceBg: "#E6EEEF", 
      contentBg: "#F8F6F6",
      cardBg: "#FFFFFF",
      primaryText: "#191C20",
      secondaryText: "#4E5964",
      borders: "#DADEE2",
      accent: "#E0FFF8"
    },
    ocean: {
      primary: "#0066CC",
      primaryHover: "#0080FF",
      workspaceBg: "#E6F3FF",
      contentBg: "#F0F8FF",
      cardBg: "#FFFFFF", 
      primaryText: "#1A1A1A",
      secondaryText: "#4A5568",
      borders: "#BEE3F8",
      accent: "#E0F0FF"
    },
    forest: {
      primary: "#2D5016",
      primaryHover: "#38A169",
      workspaceBg: "#F0F7E6",
      contentBg: "#F8FBF4",
      cardBg: "#FFFFFF",
      primaryText: "#1A1A1A", 
      secondaryText: "#4A5568",
      borders: "#C6F6D5",
      accent: "#E8F5D8"
    },
    purple: {
      primary: "#7C3AED",
      primaryHover: "#8B5CF6",
      workspaceBg: "#F3F1FF",
      contentBg: "#F9F7FF",
      cardBg: "#FFFFFF",
      primaryText: "#1A1A1A",
      secondaryText: "#4A5568", 
      borders: "#E9D8FD",
      accent: "#EDE9FE"
    },
    sunset: {
      primary: "#EA580C", 
      primaryHover: "#FB923C",
      workspaceBg: "#FFF7ED",
      contentBg: "#FFFAF7",
      cardBg: "#FFFFFF",
      primaryText: "#1A1A1A",
      secondaryText: "#4A5568",
      borders: "#FDBA74",
      accent: "#FED7AA"
    }
  };

  const handlePresetChange = (preset: string) => {
    if (presetThemes[preset as keyof typeof presetThemes]) {
      setThemeColors(presetThemes[preset as keyof typeof presetThemes]);
    }
  };

  const handleColorChange = (colorKey: keyof typeof themeColors, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };
  const [workspaceName, setWorkspaceName] = useState("GTM Team");
  const [workspaceDescription, setWorkspaceDescription] = useState("A comprehensive workspace for managing AI copilots and workflows");
  const [allowPublicAccess, setAllowPublicAccess] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState("90");

  return (
    <div className={`space-y-6 ${(activeTab === "general" || activeTab === "brand" || activeTab === "security" || activeTab === "theme") ? "pb-24" : ""}`}>
      <div className="w-full">
        <nav className="flex space-x-8 border-b border-border">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "general"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("brand")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "brand"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Brand
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "security"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("theme")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "theme"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Theme
          </button>

          <button
            onClick={() => setActiveTab("conversations")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "conversations"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Conversations
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "users"
                ? "border-[var(--theme-primary)] text-[var(--theme-primary)]"
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

                {/* Avatar and Banner Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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



        {activeTab === "conversations" && (
          <div className="mt-6">
            <SampleScreen section={"conversations" as any} />
          </div>
        )}

        {activeTab === "brand" && (
          <div className="space-y-6 mt-6">
            {/* Brand Assets */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
                <CardDescription>
                  Upload your workspace logos and visual identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                </div>
              </CardContent>
            </Card>

            {/* Theme Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                  Customize your workspace colors and visual appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Theme Selector */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Theme Preset</Label>
                    <p className="text-xs text-gray-500 mt-1">Apply a pre-designed color scheme</p>
                  </div>
                  <Select defaultValue="default" onValueChange={handlePresetChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (Teal Green)</SelectItem>
                      <SelectItem value="ocean">Ocean Blue</SelectItem>
                      <SelectItem value="forest">Forest Green</SelectItem>
                      <SelectItem value="purple">Purple Pro</SelectItem>
                      <SelectItem value="sunset">Sunset Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Customization Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.primary} 
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Primary</Label>
                    <span className="text-xs text-gray-500">{themeColors.primary}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.primaryHover} 
                      onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Primary Hover</Label>
                    <span className="text-xs text-gray-500">{themeColors.primaryHover}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.workspaceBg} 
                      onChange={(e) => handleColorChange('workspaceBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Workspace BG</Label>
                    <span className="text-xs text-gray-500">{themeColors.workspaceBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.contentBg} 
                      onChange={(e) => handleColorChange('contentBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Content BG</Label>
                    <span className="text-xs text-gray-500">{themeColors.contentBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.cardBg} 
                      onChange={(e) => handleColorChange('cardBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Card BG</Label>
                    <span className="text-xs text-gray-500">{themeColors.cardBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.primaryText} 
                      onChange={(e) => handleColorChange('primaryText', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Primary Text</Label>
                    <span className="text-xs text-gray-500">{themeColors.primaryText}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.secondaryText} 
                      onChange={(e) => handleColorChange('secondaryText', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Secondary Text</Label>
                    <span className="text-xs text-gray-500">{themeColors.secondaryText}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.borders} 
                      onChange={(e) => handleColorChange('borders', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Borders</Label>
                    <span className="text-xs text-gray-500">{themeColors.borders}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.accent} 
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Accent</Label>
                    <span className="text-xs text-gray-500">{themeColors.accent}</span>
                  </div>
                </div>

                {/* Realistic Theme Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See how your theme looks in the actual interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden" style={{ backgroundColor: themeColors.contentBg }}>
                      <div className="flex">
                        {/* Simulated Sidebar */}
                        <div className="w-64 h-80 p-4 space-y-3" style={{ backgroundColor: themeColors.workspaceBg }}>
                          {/* Logo area */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: themeColors.primary }}></div>
                            <div className="w-16 h-3 rounded" style={{ backgroundColor: themeColors.primaryText }}></div>
                          </div>
                          
                          {/* Navigation items */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 rounded-md" style={{ backgroundColor: themeColors.primary }}>
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: themeColors.cardBg }}></div>
                              <div className="w-16 h-2 rounded" style={{ backgroundColor: themeColors.cardBg }}></div>
                            </div>
                            <div className="flex items-center gap-2 p-2">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-14 h-2 rounded" style={{ backgroundColor: themeColors.secondaryText }}></div>
                            </div>
                            <div className="flex items-center gap-2 p-2">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-12 h-2 rounded" style={{ backgroundColor: themeColors.secondaryText }}></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Simulated Main Content */}
                        <div className="flex-1 p-4 space-y-4" style={{ backgroundColor: themeColors.contentBg }}>
                          {/* Header */}
                          <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${themeColors.borders}` }}>
                            <div className="w-24 h-4 rounded" style={{ backgroundColor: themeColors.primaryText }}></div>
                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: themeColors.primary }}></div>
                          </div>
                          
                          {/* Content Cards */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg p-3 border" style={{ backgroundColor: themeColors.cardBg, borderColor: themeColors.borders }}>
                              <div className="w-20 h-3 rounded mb-2" style={{ backgroundColor: themeColors.primaryText }}></div>
                              <div className="w-full h-2 rounded mb-1" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-3/4 h-2 rounded mb-2" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-16 h-6 rounded" style={{ backgroundColor: themeColors.primary }}></div>
                            </div>
                            
                            <div className="rounded-lg p-3 border" style={{ backgroundColor: themeColors.cardBg, borderColor: themeColors.borders }}>
                              <div className="w-16 h-3 rounded mb-2" style={{ backgroundColor: themeColors.primaryText }}></div>
                              <div className="w-full h-2 rounded mb-1" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-2/3 h-2 rounded mb-2" style={{ backgroundColor: themeColors.secondaryText }}></div>
                              <div className="w-12 h-6 rounded" style={{ backgroundColor: themeColors.accent }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                  <Button className="gap-2" style={{ backgroundColor: themeColors.primary }}>
                    Apply Theme Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
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

        {activeTab === "theme" && (
          <div className="mt-6">
            <ThemeCustomizer />
          </div>
        )}
      </div>
      
      {/* Save Footer - Only show for General, Brand, and Security tabs */}
      {(activeTab === "general" || activeTab === "brand" || activeTab === "security") && (
        <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Cancel
            </Button>
            <Button className="theme-primary hover:bg-[var(--theme-primary-hover)]">
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}