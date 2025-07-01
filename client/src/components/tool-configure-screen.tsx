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
  const [activeTab, setActiveTab] = useState('settings');
  const [isEnabled, setIsEnabled] = useState(tool?.status === 'Connected');
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  
  const tabs = [
    { id: 'settings', label: 'Connection Settings', icon: Wrench },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'testing', label: 'Testing', icon: Play },
    { id: 'usage', label: 'Usage & Logs', icon: BarChart3 }
  ];

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
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f2f2f2' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white">
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

      {/* Tab Navigation */}
      <div className="flex border-b px-6 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#008062] text-[#008062]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Connection Settings</h2>
              <p className="text-sm text-gray-600">Configure authentication and connection parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authentication</CardTitle>
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
                      <Input 
                        type="password" 
                        placeholder="Enter your API key..." 
                        className="mt-1"
                        defaultValue="sk-••••••••••••••••••••••••"
                      />
                    </div>
                  )}
                  
                  {tool.authType === 'OAuth 2.0' && (
                    <>
                      <div>
                        <label className="text-sm font-medium">Client ID</label>
                        <Input placeholder="Enter client ID..." className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Client Secret</label>
                        <Input type="password" placeholder="Enter client secret..." className="mt-1" />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <div>
                    <label className="text-sm font-medium">Timeout (seconds)</label>
                    <Input type="number" defaultValue="30" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Rate Limit (requests/minute)</label>
                    <Input type="number" defaultValue="60" className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="p-6 space-y-6" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Permissions & Access</h2>
              <p className="text-sm text-gray-600">Configure which copilots can use this tool</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Copilot Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {['Marketing Copilot', 'Content Manager', 'Customer Support', 'Business Intelligence'].map((copilot) => (
                    <div key={copilot} className="flex items-center justify-between">
                      <label className="text-sm font-medium">{copilot}</label>
                      <Switch 
                        defaultChecked={tool.usedBy?.includes(copilot)} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Available Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tool.endpoints?.map((endpoint: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{endpoint}</span>
                      <Badge variant="outline" className="text-xs">Enabled</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="p-6 space-y-6" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Tool Testing</h2>
              <p className="text-sm text-gray-600">Test the connection and functionality</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Connection Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Test the basic connection to {tool.name} API
                  </div>
                  
                  <Button 
                    onClick={handleTestConnection}
                    disabled={testResult === 'running'}
                    className="w-full gap-2 bg-[#008062] hover:bg-[#00d2a0] text-white"
                  >
                    {testResult === 'running' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Test Connection
                      </>
                    )}
                  </Button>

                  {testResult === 'success' && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-green-900">Connection Successful</div>
                        <div className="text-sm text-green-600">API responded in 0.8 seconds</div>
                      </div>
                    </div>
                  )}

                  {testResult === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <X className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-medium text-red-900">Connection Failed</div>
                        <div className="text-sm text-red-600">Invalid API key or network error</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Endpoint Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Test specific API endpoints
                  </div>
                  
                  <div className="space-y-2">
                    {tool.endpoints?.slice(0, 3).map((endpoint: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{endpoint}</span>
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Connection test passed</div>
                        <div className="text-sm text-gray-600">2 minutes ago • 0.8s response</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Success</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Endpoint test completed</div>
                        <div className="text-sm text-gray-600">1 hour ago • All endpoints OK</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Success</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="p-6 space-y-6" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Usage Analytics & Logs</h2>
              <p className="text-sm text-gray-600">Monitor API usage and review request logs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{tool.totalCalls?.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total API Calls</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">99.8%</div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">0.9s</div>
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent API Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({length: 5}).map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg text-sm">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">GET</Badge>
                        <span className="font-mono">/api/v1/{tool.endpoints?.[0]?.toLowerCase().replace(/\s+/g, '-')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Badge variant="outline" className="text-xs text-green-600">200</Badge>
                        <span>{Math.floor(Math.random() * 60)} min ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}