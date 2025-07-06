import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Download, Wrench, Shield, Play, BarChart3, Loader2, Globe, Key } from "lucide-react";
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
      case 'Slack':
        return {
          title: 'Slack Integration',
          description: 'Configure Slack workspace connection and message automation',
          authType: 'Bot Token',
          endpoints: ['Send Message', 'Create Channel', 'Upload File'],
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
          fields: [
            { name: 'api_key', label: 'API Key', type: 'password', required: true, value: 'sk-1234567890abcdefghijklmnopqrstuvwxyz' }
          ]
        };
    }
  };

  const config = getToolConfig(toolName);

  return (
    <>
      <div className="h-full p-8 pb-24 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{config.title}</h1>
            <p className="text-sm text-muted-foreground">{config.description}</p>
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
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Connection Settings
                </CardTitle>
                <CardDescription>Configure your {toolName} connection and authentication details</CardDescription>
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
                
                <div className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <Select defaultValue={(field as any).value}>
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