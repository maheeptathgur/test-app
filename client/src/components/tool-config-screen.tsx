import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Download, Wrench, Shield, Play, BarChart3, Loader2, Globe, Key } from "lucide-react";

interface ToolConfigScreenProps {
  toolName: string;
  onBack: () => void;
}

export function ToolConfigScreen({ toolName, onBack }: ToolConfigScreenProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const handleSave = () => {
    setShowSuccess(true);
    setHasChanges(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleTestConnection = () => {
    setTestResult('running');
    setTimeout(() => {
      setTestResult('success');
      setTimeout(() => setTestResult('idle'), 3000);
    }, 2000);
  };

  const getToolConfig = (toolName: string) => {
    switch (toolName) {
      case 'Slack':
        return {
          title: 'Slack Integration',
          description: 'Configure Slack workspace connection and message automation',
          authType: 'Bot Token',
          endpoints: ['Send Message', 'Create Channel', 'Upload File'],
          fields: [
            { name: 'bot_token', label: 'Bot Token', type: 'password', required: true },
            { name: 'workspace_url', label: 'Workspace URL', type: 'text', required: true },
            { name: 'default_channel', label: 'Default Channel', type: 'text', required: false }
          ]
        };
      case 'Google Analytics':
        return {
          title: 'Google Analytics Integration',
          description: 'Connect to Google Analytics for website traffic and performance data',
          authType: 'OAuth 2.0',
          endpoints: ['Get Reports', 'Real-time Data', 'Goal Tracking'],
          fields: [
            { name: 'property_id', label: 'Property ID', type: 'text', required: true },
            { name: 'measurement_id', label: 'Measurement ID', type: 'text', required: true },
            { name: 'view_id', label: 'View ID', type: 'text', required: false }
          ]
        };
      case 'Airtable':
        return {
          title: 'Airtable Integration',
          description: 'Connect to Airtable for database operations and record management',
          authType: 'API Key',
          endpoints: ['List Records', 'Create Record', 'Update Record', 'Delete Record'],
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true },
            { name: 'base_id', label: 'Base ID', type: 'text', required: true },
            { name: 'table_name', label: 'Table Name', type: 'text', required: true }
          ]
        };
      case 'OpenAI':
        return {
          title: 'OpenAI API Integration',
          description: 'Configure OpenAI API for AI text generation and completions',
          authType: 'API Key',
          endpoints: ['Chat Completions', 'Text Generation', 'Embeddings'],
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true },
            { name: 'organization', label: 'Organization ID', type: 'text', required: false },
            { name: 'model', label: 'Default Model', type: 'select', required: true, options: ['gpt-4', 'gpt-3.5-turbo', 'text-davinci-003'] }
          ]
        };
      case 'Unsplash':
        return {
          title: 'Unsplash Integration',
          description: 'Access high-quality stock photos from Unsplash',
          authType: 'Access Key',
          endpoints: ['Search Photos', 'Get Photo', 'Download Photo'],
          fields: [
            { name: 'access_key', label: 'Access Key', type: 'password', required: true },
            { name: 'secret_key', label: 'Secret Key', type: 'password', required: false }
          ]
        };
      case 'Google Drive':
        return {
          title: 'Google Drive Integration',
          description: 'Connect to Google Drive for file storage and management',
          authType: 'OAuth 2.0',
          endpoints: ['List Files', 'Upload File', 'Download File', 'Share File'],
          fields: [
            { name: 'client_id', label: 'Client ID', type: 'text', required: true },
            { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
            { name: 'folder_id', label: 'Default Folder ID', type: 'text', required: false }
          ]
        };
      case 'Notion':
        return {
          title: 'Notion Integration',
          description: 'Connect to Notion for page and database management',
          authType: 'Internal Integration',
          endpoints: ['Query Database', 'Create Page', 'Update Page'],
          fields: [
            { name: 'integration_token', label: 'Integration Token', type: 'password', required: true },
            { name: 'database_id', label: 'Database ID', type: 'text', required: false }
          ]
        };
      default:
        return {
          title: `${toolName} Integration`,
          description: `Configure ${toolName} integration settings`,
          authType: 'API Key',
          endpoints: ['API Endpoint'],
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true }
          ]
        };
    }
  };

  const config = getToolConfig(toolName);

  return (
    <>
      <div className="h-full p-8 overflow-y-auto pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{config.title}</h1>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected
            </Badge>
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connection Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Connection Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          onChange={() => setHasChanges(true)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Permissions & Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {config.endpoints.map((endpoint) => (
                    <div key={endpoint} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{endpoint}</span>
                        <p className="text-sm text-muted-foreground">Allow access to {endpoint.toLowerCase()}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Test Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Test your {toolName} connection to ensure everything is working correctly.
                  </p>
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={handleTestConnection}
                      disabled={testResult === 'running'}
                      className="bg-[#008062] hover:bg-[#00d2a0] text-white"
                    >
                      {testResult === 'running' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        'Test Connection'
                      )}
                    </Button>
                    {testResult === 'success' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Connection successful</span>
                      </div>
                    )}
                    {testResult === 'error' && (
                      <div className="flex items-center gap-2 text-red-600">
                        <X className="w-4 h-4" />
                        <span className="text-sm font-medium">Connection failed</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Integration Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentication</span>
                  <span className="text-sm text-muted-foreground">{config.authType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Sync</span>
                  <span className="text-sm text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Calls Today</span>
                  <span className="text-sm text-muted-foreground">1,234</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Key className="w-4 h-4 mr-2" />
                  Regenerate API Key
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Usage Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
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
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button 
              className="bg-[#008062] hover:bg-[#00d2a0] text-white"
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