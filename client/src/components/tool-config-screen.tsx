import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, MessageSquare, BarChart2, Database, Bot, Image, HardDrive, FileText, Mail, Globe } from "lucide-react";

interface ToolConfigScreenProps {
  toolName: string;
  onBack: () => void;
  onBackToBrowseIntegrations?: () => void;
}

export function ToolConfigScreen({ toolName, onBack, onBackToBrowseIntegrations }: ToolConfigScreenProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Define which tools are actually connected
  const connectedTools = ['Gmail', 'Slack', 'Google Workspace', 'Zoom', 'Figma', 'Notion', 'Google Analytics', 'HubSpot'];
  const isConnected = connectedTools.includes(toolName);

  const handleSave = () => {
    setShowSuccess(true);
    setHasChanges(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBack = () => {
    // For unconnected tools, go back to Browse Integrations if available
    if (!isConnected && onBackToBrowseIntegrations) {
      onBackToBrowseIntegrations();
    } else {
      onBack();
    }
  };

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case 'Gmail':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.703-1.603 1.582-1.636L12 10.545l10.418-6.724A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
          </svg>
        );
      case 'Slack':
        return <MessageSquare className="w-8 h-8 text-purple-600" />;
      case 'Google Analytics':
        return <BarChart2 className="w-8 h-8 text-orange-600" />;
      case 'Airtable':
        return <Database className="w-8 h-8 text-yellow-600" />;
      case 'OpenAI':
      case 'OpenAI API':
        return <Bot className="w-8 h-8 text-green-600" />;
      case 'Unsplash':
        return <Image className="w-8 h-8 text-pink-600" />;
      case 'Google Drive':
        return <HardDrive className="w-8 h-8 text-blue-600" />;
      case 'Notion':
        return <FileText className="w-8 h-8 text-[hsl(var(--foreground))]" />;
      default:
        return <Globe className="w-8 h-8 text-gray-600" />;
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto px-8 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              {getToolIcon(toolName)}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{toolName} Configuration</h1>
              <p className="text-sm text-muted-foreground">Manage your {toolName} integration settings and automation</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>
        
        {/* Connection Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Your {toolName} account connection and authentication details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isConnected ? (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Connected to {toolName}</p>
                    <p className="text-sm text-gray-600">mandeep@knolli.ai</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Reconnect
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Not Connected</p>
                    <p className="text-sm text-gray-600">Click Connect to authenticate your {toolName} account</p>
                  </div>
                </div>
                <Button className="theme-primary theme-primary-hover:hover text-white" size="sm">
                  Connect
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Email</label>
                <Input 
                  value={isConnected ? "mandeep@knolli.ai" : ""} 
                  placeholder={isConnected ? "" : "Connect to see account details"}
                  disabled 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Authentication Level</label>
                <Select 
                  defaultValue={isConnected ? "user" : ""} 
                  onValueChange={() => setHasChanges(true)}
                  disabled={!isConnected}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isConnected ? "User" : "Connect first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions & Scopes */}
        <Card>
          <CardHeader>
            <CardTitle>Permissions & Scopes</CardTitle>
            <CardDescription>Control what actions this integration can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between p-3 border rounded-lg ${!isConnected ? 'opacity-50' : ''}`}>
              <div>
                <p className="font-medium">Read Data</p>
                <p className="text-sm text-gray-600">Access and read data from {toolName}</p>
              </div>
              <Switch 
                defaultChecked={isConnected} 
                disabled={!isConnected}
                onCheckedChange={() => setHasChanges(true)} 
              />
            </div>
            <div className={`flex items-center justify-between p-3 border rounded-lg ${!isConnected ? 'opacity-50' : ''}`}>
              <div>
                <p className="font-medium">Write Data</p>
                <p className="text-sm text-gray-600">Create and modify data in {toolName}</p>
              </div>
              <Switch 
                defaultChecked={isConnected} 
                disabled={!isConnected}
                onCheckedChange={() => setHasChanges(true)} 
              />
            </div>
            <div className={`flex items-center justify-between p-3 border rounded-lg ${!isConnected ? 'opacity-50' : ''}`}>
              <div>
                <p className="font-medium">Delete Data</p>
                <p className="text-sm text-gray-600">Remove data from {toolName}</p>
              </div>
              <Switch 
                defaultChecked={false} 
                disabled={!isConnected}
                onCheckedChange={() => setHasChanges(true)} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-[hsl(var(--border))] px-8 py-4 z-10">
        <div className="flex justify-between items-center">
          {/* Success Message */}
          <div className="flex-1">
            {showSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Changes saved successfully</span>
              </div>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button 
              className="theme-primary theme-primary-hover:hover text-white border-0"
              disabled={!hasChanges}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}