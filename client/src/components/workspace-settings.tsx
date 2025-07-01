import { useState } from "react";
import { Save, Upload, Trash2, Users, Lock, Globe, Bell, Shield, CreditCard, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeSelector } from "./theme-selector";
import { useTheme } from "../contexts/theme-context";

export function WorkspaceSettings() {
  const [workspaceName, setWorkspaceName] = useState("My Workspace");
  const [workspaceDescription, setWorkspaceDescription] = useState("A comprehensive workspace for managing AI copilots and workflows");
  const [allowPublicAccess, setAllowPublicAccess] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState("90");
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
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

              <div className="space-y-2">
                <Label>Workspace Avatar</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-xl">
                    M
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
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

              <Separator />

              <div className="space-y-2">
                <Label>Color Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose a color scheme for your workspace interface
                </p>
                <div className="pt-2">
                  <ThemeSelector currentTheme={currentTheme} onThemeChange={setTheme} />
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
        </TabsContent>



        <TabsContent value="security" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}