import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Download, Wrench, Shield, Play, BarChart3, Loader2 } from "lucide-react";

// Tool Configuration Screen Component
export function ToolConfigureScreen({ tool, onBack }: { tool: any; onBack: () => void }) {
  const [isEnabled, setIsEnabled] = useState(tool?.status === 'Connected');
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  
  const handleTestConnection = () => {
    setTestResult('running');
    // Simulate API test
    setTimeout(() => {
      setTestResult('success');
      setTimeout(() => setTestResult('idle'), 3000);
    }, 2000);
  };

  if (!tool) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No tool selected</p>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isEnabled ? "default" : "secondary"} className="gap-1">
            {isEnabled ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {isEnabled ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button className="gap-2 bg-[#008062] hover:bg-[#00d2a0] text-white">
            <Download className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Connection Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Authentication Type</label>
            <Select defaultValue={tool.authType?.toLowerCase().replace(' ', '_') || 'api_key'}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api_key">API Key</SelectItem>
                <SelectItem value="oauth_2.0">OAuth 2.0</SelectItem>
                <SelectItem value="bot_token">Bot Token</SelectItem>
                <SelectItem value="service_account">Service Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {tool.authType === 'API Key' && (
            <div>
              <label className="text-sm font-medium">API Key</label>
              <Input type="password" placeholder="Enter API key..." className="mt-1" />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium">Base URL</label>
            <Input 
              defaultValue={tool.name === 'Gmail' ? 'https://gmail.googleapis.com' : 
                           tool.name === 'Slack' ? 'https://slack.com/api' :
                           tool.name === 'OpenAI API' ? 'https://api.openai.com' :
                           'https://api.example.com'}
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleTestConnection} 
              className="bg-[#008062] hover:bg-[#00d2a0] text-white"
              disabled={testResult === 'running'}
            >
              {testResult === 'running' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
            {testResult === 'success' && (
              <Badge variant="outline" className="text-green-600">
                <Check className="w-3 h-3 mr-1" />
                Connection successful
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}