import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database, MessageSquare, TrendingUp, BarChart3, Filter, Search, Image as ImageIcon, Palette, RotateCcw } from "lucide-react";
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

            {/* Theme Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                  Customize your workspace colors and visual appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Customization Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#008062' }}></div>
                        <Label className="text-sm font-medium">Primary Color</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#008062" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#008062</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#00D2A0' }}></div>
                        <Label className="text-sm font-medium">Primary Hover</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#00D2A0" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#00D2A0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#E6EEEF' }}></div>
                        <Label className="text-sm font-medium">Workspace Background</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#E6EEEF" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#E6EEEF</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}></div>
                        <Label className="text-sm font-medium">Card Background</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#FFFFFF" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#FFFFFF</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#191C20' }}></div>
                        <Label className="text-sm font-medium">Primary Text</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#191C20" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#191C20</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#4E5964' }}></div>
                        <Label className="text-sm font-medium">Secondary Text</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#4E5964" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#4E5964</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#DADEE2' }}></div>
                        <Label className="text-sm font-medium">Border Color</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#DADEE2" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#DADEE2</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: '#E0FFF8' }}></div>
                        <Label className="text-sm font-medium">Accent Color</Label>
                        <div className="flex items-center gap-2 justify-center">
                          <input type="color" defaultValue="#E0FFF8" className="w-8 h-8 rounded border cursor-pointer" />
                          <span className="text-xs text-gray-500">#E0FFF8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Theme Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Preview</CardTitle>
                    <CardDescription>
                      See how your colors will look in the interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 space-y-4" style={{ backgroundColor: '#F8F6F6' }}>
                      {/* Simulated sidebar */}
                      <div className="flex gap-4">
                        <div className="w-48 h-32 rounded-lg p-3 space-y-2" style={{ backgroundColor: '#E6EEEF' }}>
                          <div className="w-full h-3 rounded" style={{ backgroundColor: '#008062' }}></div>
                          <div className="w-3/4 h-2 rounded" style={{ backgroundColor: '#4E5964' }}></div>
                          <div className="w-1/2 h-2 rounded" style={{ backgroundColor: '#4E5964' }}></div>
                        </div>
                        
                        {/* Simulated content */}
                        <div className="flex-1 space-y-2">
                          <div className="bg-white rounded-lg p-3 border" style={{ borderColor: '#DADEE2' }}>
                            <div className="w-1/3 h-3 rounded mb-2" style={{ backgroundColor: '#191C20' }}></div>
                            <div className="w-full h-2 rounded mb-1" style={{ backgroundColor: '#4E5964' }}></div>
                            <div className="w-2/3 h-2 rounded" style={{ backgroundColor: '#4E5964' }}></div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border" style={{ borderColor: '#DADEE2' }}>
                            <div className="w-1/4 h-3 rounded mb-2" style={{ backgroundColor: '#191C20' }}></div>
                            <div className="w-full h-2 rounded mb-1" style={{ backgroundColor: '#4E5964' }}></div>
                            <div className="w-1/2 h-2 rounded" style={{ backgroundColor: '#4E5964' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preset Themes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preset Themes</CardTitle>
                    <CardDescription>
                      Choose from professionally designed color schemes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Default Theme */}
                      <button className="border-2 border-[#008062] rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#008062' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E6EEEF' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#191C20' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E0FFF8' }}></div>
                        </div>
                        <p className="text-sm font-medium">Default</p>
                        <p className="text-xs text-gray-500">Current theme</p>
                      </button>

                      {/* Ocean Blue */}
                      <button className="border-2 border-transparent rounded-lg p-4 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors">
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#0066CC' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E6F3FF' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1A1A1A' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E0F0FF' }}></div>
                        </div>
                        <p className="text-sm font-medium">Ocean Blue</p>
                        <p className="text-xs text-gray-500">Professional blue</p>
                      </button>

                      {/* Forest Green */}
                      <button className="border-2 border-transparent rounded-lg p-4 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors">
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2D5016' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F0F7E6' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1A1A1A' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E8F5D8' }}></div>
                        </div>
                        <p className="text-sm font-medium">Forest Green</p>
                        <p className="text-xs text-gray-500">Natural earth</p>
                      </button>

                      {/* Purple Pro */}
                      <button className="border-2 border-transparent rounded-lg p-4 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors">
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F3F1FF' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1A1A1A' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EDE9FE' }}></div>
                        </div>
                        <p className="text-sm font-medium">Purple Pro</p>
                        <p className="text-xs text-gray-500">Creative purple</p>
                      </button>

                      {/* Sunset Orange */}
                      <button className="border-2 border-transparent rounded-lg p-4 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors">
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EA580C' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFF7ED' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1A1A1A' }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FED7AA' }}></div>
                        </div>
                        <p className="text-sm font-medium">Sunset Orange</p>
                        <p className="text-xs text-gray-500">Warm energy</p>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Button */}
                <div className="flex justify-center pt-4">
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset to Brand Default
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