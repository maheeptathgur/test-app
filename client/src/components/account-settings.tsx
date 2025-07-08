import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Shield, Key, Smartphone, Trash2, Download, Eye, EyeOff, Copy, Check, Plus, X, Calendar, CreditCard, Globe, Bell, Lock, Zap } from "lucide-react";

export function AccountSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [dataExport, setDataExport] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const connectedApps = [
    {
      id: '1',
      name: 'Google Workspace',
      description: 'Gmail, Drive, Calendar integration',
      icon: '🟢',
      connected: true,
      lastUsed: '2 hours ago'
    },
    {
      id: '2',
      name: 'Slack',
      description: 'Team communication and notifications',
      icon: '🟣',
      connected: true,
      lastUsed: 'Yesterday'
    },
    {
      id: '3',
      name: 'Microsoft 365',
      description: 'Office apps and OneDrive',
      icon: '🔵',
      connected: false,
      lastUsed: 'Never'
    },
    {
      id: '4',
      name: 'Salesforce',
      description: 'CRM data synchronization',
      icon: '🔷',
      connected: true,
      lastUsed: '3 days ago'
    }
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      description: 'Main API access for production environment',
      created: 'Jan 15, 2024',
      lastUsed: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API Key',
      description: 'API access for development and testing',
      created: 'Dec 8, 2023',
      lastUsed: '1 week ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Legacy Integration',
      description: 'Deprecated key for old integrations',
      created: 'Sep 22, 2023',
      lastUsed: '2 months ago',
      status: 'inactive'
    }
  ];

  const loginSessions = [
    {
      id: '1',
      device: 'MacBook Pro - Chrome',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'iPhone 15 - Safari',
      location: 'San Francisco, CA',
      ip: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: '3',
      device: 'Windows PC - Edge',
      location: 'Los Angeles, CA',
      ip: '10.0.0.50',
      lastActive: '3 days ago',
      current: false
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePasswordChange = () => {
    // In a real app, this would validate and update the password
    console.log('Password change requested');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Account Settings</h1>
        <p className="text-gray-600">Manage your account security, privacy, and connected services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>Protect your account with strong security measures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Password</Label>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Last updated 3 months ago</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handlePasswordChange} className="theme-primary theme-primary-hover:hover">
                          Update Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {twoFactorEnabled ? "Extra security with authenticator app" : "Enhance account security"}
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              <Separator />

              {/* Security Alerts */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Security Alerts</Label>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Get notified of suspicious activity</p>
                </div>
                <Switch
                  checked={securityAlerts}
                  onCheckedChange={setSecurityAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API keys for integrations and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{key.name}</h4>
                      <Badge variant={key.status === 'active' ? "default" : "secondary"}>
                        {key.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{key.description}</p>
                    <p className="text-xs text-gray-400">Created {key.created} • Last used {key.lastUsed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy('sk-1234567890abcdef', key.id)}
                    >
                      {copied === key.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Connected Apps & Sessions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Connected Applications
              </CardTitle>
              <CardDescription>Manage third-party app connections and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{app.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{app.name}</h4>
                        <Badge variant={app.connected ? "default" : "secondary"}>
                          {app.connected ? "Connected" : "Disconnected"}
                        </Badge>
                      </div>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{app.description}</p>
                      <p className="text-xs text-gray-400">Last used {app.lastUsed}</p>
                    </div>
                  </div>
                  <Button 
                    variant={app.connected ? "outline" : "default"}
                    size="sm"
                    className={app.connected ? "text-red-600 hover:text-red-700" : "theme-primary theme-primary-hover:hover"}
                  >
                    {app.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>Manage your active login sessions across devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loginSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{session.device}</h4>
                      {session.current && (
                        <Badge variant="default">Current Session</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{session.location}</p>
                    <p className="text-xs text-gray-400">IP: {session.ip} • {session.lastActive}</p>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                Sign Out All Other Sessions
              </Button>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>Control your data and account management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Export */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Export Account Data</Label>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Download a copy of your data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <Separator />

              {/* Delete Account */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium text-red-600">Danger Zone</Label>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Irreversible actions that affect your account</p>
                </div>
                <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Delete Account
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>This will delete:</strong>
                        </p>
                        <ul className="text-sm text-red-700 mt-1 ml-4 list-disc">
                          <li>All your copilots and configurations</li>
                          <li>Chat history and conversations</li>
                          <li>API keys and integrations</li>
                          <li>Profile and account settings</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmDelete">Type "DELETE" to confirm</Label>
                        <Input
                          id="confirmDelete"
                          placeholder="Type DELETE here"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteAccountOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}