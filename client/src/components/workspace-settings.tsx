import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database, MessageSquare, TrendingUp, BarChart3, Filter, Search, Image as ImageIcon, Palette, RotateCcw, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
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
  const { updateColors, resetToDefault: resetThemeToDefault } = useTheme();
  
  // Helper function to convert hex to HSL format for shadcn/ui
  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };
  
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
    },
    dark: {
      primary: "#00D2A0",
      primaryHover: "#00F5B8",
      workspaceBg: "#1A1A1A",
      contentBg: "#0F0F0F",
      cardBg: "#262626",
      primaryText: "#FFFFFF",
      secondaryText: "#A3A3A3",
      borders: "#404040",
      accent: "#003D2F"
    },
    aiCompany: {
      primary: "#6366F1",
      primaryHover: "#8B5CF6",
      workspaceBg: "#F1F5F9",
      contentBg: "#F8FAFC",
      cardBg: "#FFFFFF",
      primaryText: "#0F172A",
      secondaryText: "#475569",
      borders: "#CBD5E1",
      accent: "#E0E7FF"
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

  const applyThemeChanges = () => {
    // Apply all CSS custom properties directly to match our 9-color system
    const root = document.documentElement;
    
    // Core theme properties
    root.style.setProperty('--theme-primary', themeColors.primary);
    root.style.setProperty('--theme-primary-hover', themeColors.primaryHover);
    root.style.setProperty('--theme-primary-light', themeColors.primaryHover);
    
    // Background properties
    root.style.setProperty('--theme-background', themeColors.workspaceBg);
    root.style.setProperty('--theme-background-light', themeColors.contentBg);
    root.style.setProperty('--theme-background-dark', themeColors.borders);
    
    // Text properties
    root.style.setProperty('--theme-text', themeColors.primaryText);
    root.style.setProperty('--theme-text-muted', themeColors.secondaryText);
    root.style.setProperty('--theme-text-light', themeColors.secondaryText);
    
    // Accent properties
    root.style.setProperty('--theme-accent', themeColors.accent);
    root.style.setProperty('--theme-accent-dark', themeColors.accent);

    // Override all shadcn/ui variables for complete theme coverage (need HSL format)
    root.style.setProperty('--background', hexToHSL(themeColors.contentBg));
    root.style.setProperty('--foreground', hexToHSL(themeColors.primaryText));
    root.style.setProperty('--card', hexToHSL(themeColors.cardBg));
    root.style.setProperty('--card-foreground', hexToHSL(themeColors.primaryText));
    root.style.setProperty('--popover', hexToHSL(themeColors.cardBg));
    root.style.setProperty('--popover-foreground', hexToHSL(themeColors.primaryText));
    root.style.setProperty('--primary', hexToHSL(themeColors.primary));
    root.style.setProperty('--primary-foreground', '0 0% 100%'); // Always white
    root.style.setProperty('--secondary', hexToHSL(themeColors.workspaceBg));
    root.style.setProperty('--secondary-foreground', hexToHSL(themeColors.primaryText));
    root.style.setProperty('--muted', hexToHSL(themeColors.workspaceBg));
    root.style.setProperty('--muted-foreground', hexToHSL(themeColors.secondaryText));
    root.style.setProperty('--accent', hexToHSL(themeColors.accent));
    root.style.setProperty('--accent-foreground', hexToHSL(themeColors.primaryText));
    root.style.setProperty('--border', hexToHSL(themeColors.borders));
    root.style.setProperty('--input', hexToHSL(themeColors.borders));
    root.style.setProperty('--ring', hexToHSL(themeColors.primary));
    
    // Override sidebar variables
    root.style.setProperty('--sidebar-background', themeColors.workspaceBg);
    root.style.setProperty('--sidebar-foreground', themeColors.primaryText);
    root.style.setProperty('--sidebar-primary', themeColors.primary);
    root.style.setProperty('--sidebar-primary-foreground', '#FFFFFF');
    root.style.setProperty('--sidebar-accent', themeColors.cardBg);
    root.style.setProperty('--sidebar-accent-foreground', themeColors.primaryText);
    root.style.setProperty('--sidebar-border', themeColors.borders);
    root.style.setProperty('--sidebar-ring', themeColors.primary);

    // Also update theme context for consistency
    const themeUpdate = {
      primary: themeColors.primary,
      background: themeColors.workspaceBg,
      text: themeColors.primaryText,
      accent: themeColors.accent
    };
    updateColors(themeUpdate);
  };

  const resetToDefault = () => {
    setThemeColors(presetThemes.default);
    
    // Apply default theme manually to ensure all properties are set
    const root = document.documentElement;
    const defaultTheme = presetThemes.default;
    
    root.style.setProperty('--theme-primary', defaultTheme.primary);
    root.style.setProperty('--theme-primary-hover', defaultTheme.primaryHover);
    root.style.setProperty('--theme-primary-light', defaultTheme.primaryHover);
    root.style.setProperty('--theme-background', defaultTheme.workspaceBg);
    root.style.setProperty('--theme-background-light', defaultTheme.contentBg);
    root.style.setProperty('--theme-background-dark', defaultTheme.borders);
    root.style.setProperty('--theme-text', defaultTheme.primaryText);
    root.style.setProperty('--theme-text-muted', defaultTheme.secondaryText);
    root.style.setProperty('--theme-text-light', defaultTheme.secondaryText);
    root.style.setProperty('--theme-accent', defaultTheme.accent);
    root.style.setProperty('--theme-accent-dark', defaultTheme.accent);

    // Reset all shadcn/ui variables (need HSL format)
    root.style.setProperty('--background', hexToHSL(defaultTheme.contentBg));
    root.style.setProperty('--foreground', hexToHSL(defaultTheme.primaryText));
    root.style.setProperty('--card', hexToHSL(defaultTheme.cardBg));
    root.style.setProperty('--card-foreground', hexToHSL(defaultTheme.primaryText));
    root.style.setProperty('--popover', hexToHSL(defaultTheme.cardBg));
    root.style.setProperty('--popover-foreground', hexToHSL(defaultTheme.primaryText));
    root.style.setProperty('--primary', hexToHSL(defaultTheme.primary));
    root.style.setProperty('--primary-foreground', '0 0% 100%'); // Always white
    root.style.setProperty('--secondary', hexToHSL(defaultTheme.workspaceBg));
    root.style.setProperty('--secondary-foreground', hexToHSL(defaultTheme.primaryText));
    root.style.setProperty('--muted', hexToHSL(defaultTheme.workspaceBg));
    root.style.setProperty('--muted-foreground', hexToHSL(defaultTheme.secondaryText));
    root.style.setProperty('--accent', hexToHSL(defaultTheme.accent));
    root.style.setProperty('--accent-foreground', hexToHSL(defaultTheme.primaryText));
    root.style.setProperty('--border', hexToHSL(defaultTheme.borders));
    root.style.setProperty('--input', hexToHSL(defaultTheme.borders));
    root.style.setProperty('--ring', hexToHSL(defaultTheme.primary));
    
    // Reset sidebar variables
    root.style.setProperty('--sidebar-background', defaultTheme.workspaceBg);
    root.style.setProperty('--sidebar-foreground', defaultTheme.primaryText);
    root.style.setProperty('--sidebar-primary', defaultTheme.primary);
    root.style.setProperty('--sidebar-primary-foreground', '#FFFFFF');
    root.style.setProperty('--sidebar-accent', defaultTheme.cardBg);
    root.style.setProperty('--sidebar-accent-foreground', defaultTheme.primaryText);
    root.style.setProperty('--sidebar-border', defaultTheme.borders);
    root.style.setProperty('--sidebar-ring', defaultTheme.primary);
    
    // Also reset theme context
    resetThemeToDefault();
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
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--card-foreground))]">Workspace Information</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
                    <Label>Icon Image (1:1 ratio)</Label>
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
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-[16px] text-[hsl(var(--card-foreground))]">Workspace Preferences</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
          <Card style={{ backgroundColor: '#ffffff' }}>
            <CardHeader>
              <CardTitle className="text-[hsl(var(--card-foreground))]">Security Settings</CardTitle>
              <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--card-foreground))]">Brand Assets</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--card-foreground))]">Theme Colors</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">
                  Customize your workspace colors and visual appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Theme Selector */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Theme Preset</Label>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1">Apply a pre-designed color scheme</p>
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
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="aiCompany">AI Company (Purple & Blue)</SelectItem>
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
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.primary}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.primaryHover} 
                      onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Primary Hover</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.primaryHover}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.workspaceBg} 
                      onChange={(e) => handleColorChange('workspaceBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Workspace BG</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.workspaceBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.contentBg} 
                      onChange={(e) => handleColorChange('contentBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Content BG</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.contentBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.cardBg} 
                      onChange={(e) => handleColorChange('cardBg', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Card BG</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.cardBg}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.primaryText} 
                      onChange={(e) => handleColorChange('primaryText', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Primary Text</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.primaryText}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.secondaryText} 
                      onChange={(e) => handleColorChange('secondaryText', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Secondary Text</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.secondaryText}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.borders} 
                      onChange={(e) => handleColorChange('borders', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Borders</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.borders}</span>
                  </div>
                  
                  <div className="text-center">
                    <input 
                      type="color" 
                      value={themeColors.accent} 
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="circular-color-picker mx-auto block mb-2" 
                    />
                    <Label className="text-xs font-medium block mb-1">Accent</Label>
                    <span className="text-xs text-[var(--theme-text-muted)]">{themeColors.accent}</span>
                  </div>
                </div>

                {/* Realistic Theme Preview */}
                <Card style={{ backgroundColor: '#ffffff' }}>
                  <CardHeader>
                    <CardTitle className="text-[hsl(var(--card-foreground))]">Live Preview</CardTitle>
                    <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
                  <Button variant="outline" className="gap-2" onClick={resetToDefault}>
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                  <Button className="gap-2" style={{ backgroundColor: themeColors.primary }} onClick={applyThemeChanges}>
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
      </div>
      {/* Save Footer - Only show for General, Brand, and Security tabs */}
      {(activeTab === "general" || activeTab === "brand" || activeTab === "security") && (
        <div className="fixed bottom-0 left-64 right-0 bg-[var(--theme-background-light)] border-t border-[var(--theme-background-dark)] px-6 py-4 z-10">
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