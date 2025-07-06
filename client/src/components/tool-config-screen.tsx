import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Download, Wrench, Shield, Play, BarChart3, Loader2, Globe, Key, MessageSquare, BarChart2, Database, Bot, Image, HardDrive, FileText, Mail } from "lucide-react";
import { CardDescription } from "@/components/ui/card";

interface ToolConfigScreenProps {
  toolName: string;
  onBack: () => void;
}

export function ToolConfigScreen({ toolName, onBack }: ToolConfigScreenProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  // Set connection status based on tool name
  const getConnectionStatus = (toolName: string) => {
    if (toolName === 'Airtable' || toolName === 'Notion') {
      return 'error';
    } else if (toolName === 'Unsplash') {
      return 'off';
    } else if (['Gmail', 'Slack', 'Google Analytics', 'OpenAI', 'Google Drive'].includes(toolName)) {
      return 'connected';
    } else {
      // New tools being connected for the first time
      return 'disconnected';
    }
  };
  
  const connectionStatus = getConnectionStatus(toolName);
  const [isConnected, setIsConnected] = useState(connectionStatus === 'connected');

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
      case 'Gmail':
        return {
          title: 'Gmail Integration',
          description: 'Manage your Gmail integration settings and automation',
          authType: 'OAuth 2.0',
          endpoints: ['Send Email', 'Read Email', 'Search Email'],
          icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.703-1.603 1.582-1.636L12 10.545l10.418-6.724A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
            </svg>
          ),
          fields: [
            { name: 'account_email', label: 'Account Email', type: 'text', required: true, value: 'mandeep@knolli.ai' },
            { name: 'auth_level', label: 'Authentication Level', type: 'select', required: true, options: ['Admin', 'User'], value: 'User' }
          ]
        };
      case 'Slack':
        return {
          title: 'Slack Integration',
          description: 'Configure Slack workspace connection and message automation',
          authType: 'Bot Token',
          endpoints: ['Send Message', 'Create Channel', 'Upload File'],
          icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
          fields: [
            { name: 'bot_token', label: 'Bot Token', type: 'password', required: true, value: 'xoxb-1234567890123-1234567890123-abcdefghijklmnopqrstuvwx' },
            { name: 'workspace_url', label: 'Workspace URL', type: 'text', required: true, value: 'knolli-workspace.slack.com' },
            { name: 'default_channel', label: 'Default Channel', type: 'text', required: false, value: '#general' }
          ]
        };
      case 'Google Analytics':
        return {
          title: 'Google Analytics Integration',
          description: 'Connect to Google Analytics for website traffic and performance data',
          authType: 'OAuth 2.0',
          endpoints: ['Get Reports', 'Real-time Data', 'Goal Tracking'],
          icon: <BarChart2 className="w-8 h-8 text-orange-600" />,
          fields: [
            { name: 'property_id', label: 'Property ID', type: 'text', required: true, value: '123456789' },
            { name: 'measurement_id', label: 'Measurement ID', type: 'text', required: true, value: 'G-ABCDEFGHIJ' },
            { name: 'view_id', label: 'View ID', type: 'text', required: false, value: '987654321' }
          ]
        };
      case 'Airtable':
        return {
          title: 'Airtable Integration',
          description: 'Connect to Airtable for database operations and record management',
          authType: 'API Key',
          endpoints: ['List Records', 'Create Record', 'Update Record', 'Delete Record'],
          icon: <Database className="w-8 h-8 text-yellow-600" />,
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true, value: 'patABCDEFGHIJKLMNOPQRSTUVWXYZ.1234567890abcdefghijklmnopqr' },
            { name: 'base_id', label: 'Base ID', type: 'text', required: true, value: 'appABCDEFGHIJKLMN' },
            { name: 'table_name', label: 'Table Name', type: 'text', required: true, value: 'Customer Database' }
          ]
        };
      case 'OpenAI':
        return {
          title: 'OpenAI API Integration',
          description: 'Configure OpenAI API for AI text generation and completions',
          authType: 'API Key',
          endpoints: ['Chat Completions', 'Text Generation', 'Embeddings'],
          icon: <Bot className="w-8 h-8 text-green-600" />,
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true, value: 'sk-proj-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ' },
            { name: 'organization', label: 'Organization ID', type: 'text', required: false, value: 'org-ABCDEFGHIJKLMNOPQRSTUVWX' },
            { name: 'model', label: 'Default Model', type: 'select', required: true, options: ['gpt-4', 'gpt-3.5-turbo', 'text-davinci-003'], value: 'gpt-4' }
          ]
        };
      case 'Unsplash':
        return {
          title: 'Unsplash Integration',
          description: 'Access high-quality stock photos from Unsplash',
          authType: 'Access Key',
          endpoints: ['Search Photos', 'Get Photo', 'Download Photo'],
          icon: <Image className="w-8 h-8 text-pink-600" />,
          fields: [
            { name: 'access_key', label: 'Access Key', type: 'password', required: true, value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg' },
            { name: 'secret_key', label: 'Secret Key', type: 'password', required: false, value: 'hijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMN' }
          ]
        };
      case 'Google Drive':
        return {
          title: 'Google Drive Integration',
          description: 'Connect to Google Drive for file storage and management',
          authType: 'OAuth 2.0',
          endpoints: ['List Files', 'Upload File', 'Download File', 'Share File'],
          icon: <HardDrive className="w-8 h-8 text-blue-600" />,
          fields: [
            { name: 'client_id', label: 'Client ID', type: 'text', required: true, value: '123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com' },
            { name: 'client_secret', label: 'Client Secret', type: 'password', required: true, value: 'GOCSPX-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456' },
            { name: 'folder_id', label: 'Default Folder ID', type: 'text', required: false, value: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms' }
          ]
        };
      case 'Notion':
        return {
          title: 'Notion Integration',
          description: 'Connect to Notion for page and database management',
          authType: 'Internal Integration',
          endpoints: ['Query Database', 'Create Page', 'Update Page'],
          icon: <FileText className="w-8 h-8 text-gray-700" />,
          fields: [
            { name: 'integration_token', label: 'Integration Token', type: 'password', required: true, value: 'secret_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqr' },
            { name: 'database_id', label: 'Database ID', type: 'text', required: false, value: 'e83ac532-b029-486c-8c24-50b9abcdefgh' }
          ]
        };
      default:
        return {
          title: `${toolName} Integration`,
          description: `Configure ${toolName} integration settings`,
          authType: 'API Key',
          endpoints: ['API Endpoint'],
          icon: <Globe className="w-8 h-8 text-gray-600" />,
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true, value: 'sk-1234567890abcdefghijklmnopqrstuvwxyz' }
          ]
        };
    }
  };

  const config = getToolConfig(toolName);

  return (
    <>
      <div className="h-full overflow-y-auto px-8 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              {config.icon}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{config.title}</h1>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack} className="gap-2">
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration - Full width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Connection Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
                <CardDescription>Your {toolName} connection and authentication details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className={`flex items-center justify-between p-4 rounded-lg ${
                  connectionStatus === 'connected' ? 'bg-green-50' : 
                  connectionStatus === 'error' ? 'bg-red-50' : 
                  connectionStatus === 'disconnected' ? 'bg-yellow-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-500' : 
                      connectionStatus === 'error' ? 'bg-red-500' : 
                      connectionStatus === 'disconnected' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium">
                        {connectionStatus === 'connected' ? `Connected to ${toolName}` : 
                         connectionStatus === 'error' ? `Connection Error - ${toolName}` :
                         connectionStatus === 'disconnected' ? `Set up ${toolName} connection` :
                         `${toolName} is turned off`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {connectionStatus === 'connected' ? 'Integration is active and working' : 
                         connectionStatus === 'error' ? 'Authentication failed or API key expired' :
                         connectionStatus === 'disconnected' ? 'Configure your credentials to connect this tool' :
                         'Tool is disabled and not available for use'}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className={
                    connectionStatus === 'error' ? 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white' : 
                    connectionStatus === 'disconnected' ? 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white' : ''
                  }>
                    {connectionStatus === 'connected' ? 'Reconnect' : 
                     connectionStatus === 'error' ? 'Reconfigure' : 
                     connectionStatus === 'disconnected' ? 'Connect' : 'Enable'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <Select defaultValue={(field as any).value} onValueChange={() => setHasChanges(true)}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {(field as any).options?.map((option: string) => (
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
                          defaultValue={(field as any).value || ''}
                          disabled={field.name === 'account_email'}
                          onChange={() => setHasChanges(true)}
                        />
                      )}
                    </div>
                  ))}
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
                {config.endpoints.map((endpoint) => (
                  <div key={endpoint} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{endpoint}</p>
                      <p className="text-sm text-gray-600">Allow access to {endpoint.toLowerCase()}</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-8 py-4 z-10">
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