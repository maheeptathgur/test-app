import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database, MessageSquare, TrendingUp, BarChart3, Filter, Search } from "lucide-react";
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
    <div className="space-y-6">
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
            onClick={() => setActiveTab("subscriptions")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "subscriptions"
                ? "border-[#008062] text-[#008062]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            Subscriptions
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
        <div className="space-y-6 mt-6">
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Icon (1:1)</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                      <Upload className="w-6 h-6" />
                    </div>
                    <Button variant="outline" size="sm" className="bg-[#008062] text-white hover:bg-[#00d2a0]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Icon
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Square format (1:1) • Recommended: 256x256px
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Logo (2:1)</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                      <Upload className="w-6 h-6" />
                    </div>
                    <Button variant="outline" size="sm" className="bg-[#008062] text-white hover:bg-[#00d2a0]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Wide format (2:1) • Recommended: 512x256px
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Banner (16:9)</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-[108px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                      <Upload className="w-6 h-6" />
                    </div>
                    <Button variant="outline" size="sm" className="bg-[#008062] text-white hover:bg-[#00d2a0]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Banner
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Widescreen format (16:9) • Recommended: 1920x1080px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <SelectTrigger className="w-48">
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

          <div className="flex justify-end">
            <Button className="bg-[#008062] hover:bg-[#00d2a0]">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
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

        {activeTab === "subscriptions" && (
          <div className="mt-6">
            <SampleScreen section={"subscriptions" as any} />
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
    </div>
  );
}