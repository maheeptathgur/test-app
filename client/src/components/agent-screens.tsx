import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Download, Loader2, Play, Plus, RotateCcw, Upload, MessageSquare } from "lucide-react";

// Agent Configuration Screen
export function AgentConfigureScreen({ agent, onBack }: { agent: any; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agents
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configure {agent.name}</h1>
          <p className="text-gray-600">Customize agent behavior, tools, and capabilities</p>
        </div>
      </div>

      {/* Configuration Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "general", label: "General Settings" },
            { id: "behavior", label: "Behavior & Prompts" },
            { id: "tools", label: "Tools & Integrations" },
            { id: "knowledge", label: "Knowledge Base" },
            { id: "permissions", label: "Permissions" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#008062] text-[#008062]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic configuration for {agent.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agent Name</label>
                  <Input 
                    type="text" 
                    defaultValue={agent.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    defaultValue={agent.description}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008062]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization</label>
                  <Select defaultValue={agent.specialization}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content-creation">Content Creation</SelectItem>
                      <SelectItem value="data-analysis">Data Analysis</SelectItem>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="automation">Process Automation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked={agent.status === "Active"} />
                  <label htmlFor="active" className="text-sm font-medium">Agent is active</label>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "behavior" && (
            <Card>
              <CardHeader>
                <CardTitle>Behavior & Prompts</CardTitle>
                <CardDescription>Define how {agent.name} interacts and responds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Prompt</label>
                  <textarea 
                    placeholder="You are a helpful AI assistant specialized in..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008062]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Response Style</label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="technical">Technical & Detailed</SelectItem>
                      <SelectItem value="concise">Concise & Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Creativity Level</label>
                  <div className="px-3 py-2 border border-gray-300 rounded-md">
                    <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "tools" && (
            <Card>
              <CardHeader>
                <CardTitle>Tools & Integrations</CardTitle>
                <CardDescription>Manage which tools {agent.name} can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.tools.map((tool: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox defaultChecked />
                        <div>
                          <p className="font-medium">{tool}</p>
                          <p className="text-sm text-gray-500">Connected and configured</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "knowledge" && (
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Manage {agent.name}'s knowledge sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-2">Choose Files</Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Connected Knowledge Sources</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Company Documentation (45 docs)</span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">FAQ Database (128 entries)</span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "permissions" && (
            <Card>
              <CardHeader>
                <CardTitle>Permissions & Access</CardTitle>
                <CardDescription>Control what {agent.name} can access and modify</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Read company data", enabled: true },
                    { name: "Send emails", enabled: true },
                    { name: "Create calendar events", enabled: false },
                    { name: "Access customer information", enabled: true },
                    { name: "Modify databases", enabled: false },
                    { name: "Generate reports", enabled: true }
                  ].map((permission, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{permission.name}</span>
                      <Checkbox defaultChecked={permission.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar - Agent Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agent Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    {agent.icon}
                  </div>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Current Configuration</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Tools: {agent.tools.length} connected</p>
                    <p>• Workflows: {agent.workflows.length} active</p>
                    <p>• Knowledge sources: 3 connected</p>
                    <p>• Last updated: Just now</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Test Agent
              </Button>
              <Button variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Clone Configuration
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button variant="outline" onClick={onBack}>Cancel</Button>
        <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">Save Changes</Button>
      </div>
    </div>
  );
}

// Agent Testing Screen
export function AgentTestScreen({ agent, onBack }: { agent: any; onBack: () => void }) {
  const [testMessage, setTestMessage] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = () => {
    if (!testMessage.trim()) return;
    
    setIsRunning(true);
    
    // Simulate test execution
    setTimeout(() => {
      const newResult = {
        id: Date.now(),
        input: testMessage,
        output: `I understand you want me to help with "${testMessage}". As ${agent.name}, I would analyze this request and provide specialized assistance based on my ${agent.specialization} capabilities. Let me break down how I would approach this task...`,
        timestamp: new Date().toLocaleTimeString(),
        success: true,
        responseTime: Math.floor(Math.random() * 2000) + 500,
        tokensUsed: Math.floor(Math.random() * 500) + 100
      };
      
      setTestResults([newResult, ...testResults]);
      setTestMessage("");
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agents
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test {agent.name}</h1>
          <p className="text-gray-600">Run tests to validate agent behavior and responses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Test Input */}
          <Card>
            <CardHeader>
              <CardTitle>Test Input</CardTitle>
              <CardDescription>Enter a message or scenario to test {agent.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Type your test message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008062]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={runTest}
                    disabled={isRunning || !testMessage.trim()}
                    className="bg-[#008062] hover:bg-[#00d2a0] text-white"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running Test...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Test
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setTestResults([])}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Results
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Review agent responses and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {testResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No test results yet. Run a test to see how {agent.name} responds.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Test at {result.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={result.success ? "default" : "destructive"}>
                            {result.success ? "Success" : "Failed"}
                          </Badge>
                          <span className="text-xs text-gray-500">{result.responseTime}ms</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Input:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{result.input}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Output:</p>
                          <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{result.output}</p>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Tokens used: {result.tokensUsed}</span>
                          <span>Response time: {result.responseTime}ms</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Agent Info & Quick Tests */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agent Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    {agent.icon}
                  </div>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Capabilities</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Specialization: {agent.specialization}</p>
                    <p>• Connected tools: {agent.tools.length}</p>
                    <p>• Active workflows: {agent.workflows.length}</p>
                    <p>• Serves: {agent.serves}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Test Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "How would you help with content optimization?",
                "Explain your main capabilities",
                "What tools do you have access to?",
                "How do you handle complex requests?"
              ].map((scenario, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2"
                  onClick={() => setTestMessage(scenario)}
                >
                  <span className="text-xs">{scenario}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Avg Response Time</span>
                  <span className="font-medium">1.2s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Success Rate</span>
                  <span className="font-medium text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Tests Run</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Test</span>
                  <span className="font-medium">2 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}