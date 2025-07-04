import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Download, Loader2, Play, Plus, RotateCcw, Upload, MessageSquare, FileText, Link, Bot, Search, Filter, SortAsc, Eye, Edit3, Check, X, Trash2, BarChart } from "lucide-react";
import { SiGmail, SiSlack } from "react-icons/si";

// Agent Configuration Screen
export function AgentConfigureScreen({ agent, onBack }: { agent: any; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("general");
  const [testMessage, setTestMessage] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [quickInputs, setQuickInputs] = useState([
    "How would you help with content optimization?",
    "Explain your main capabilities",
    "What tools do you have access to?",
    "How do you handle complex requests?"
  ]);
  const [newQuickInput, setNewQuickInput] = useState("");

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

  const addQuickInput = () => {
    if (!newQuickInput.trim()) return;
    setQuickInputs([...quickInputs, newQuickInput.trim()]);
    setNewQuickInput("");
  };

  const removeQuickInput = (index: number) => {
    setQuickInputs(quickInputs.filter((_, i) => i !== index));
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
          <h1 className="text-2xl font-bold text-gray-900">Configure {agent.name}</h1>
          <p className="text-gray-600">Customize agent behavior, tools, and capabilities</p>
        </div>
      </div>

      {/* Configuration Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "general", label: "General Settings" },
            { id: "tools", label: "Tools & Integrations" },
            { id: "knowledge", label: "Knowledge Base" },
            { id: "test", label: "Test" }
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
      <div className="grid grid-cols-1 gap-6">
        <div>
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
                  <label className="text-sm font-medium">System Prompt</label>
                  <textarea 
                    placeholder="You are a helpful AI assistant specialized in..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008062]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked={agent.status === "Active"} />
                  <label htmlFor="active" className="text-sm font-medium">Agent is active</label>
                </div>

                {/* Quick Test Inputs Section */}
                <div className="space-y-4 pt-6 border-t">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Quick Test Inputs</h3>
                    <p className="text-sm text-gray-600">Manage pre-defined test scenarios that appear in the Test tab</p>
                  </div>
                  
                  {/* Add new quick input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a quick test scenario..."
                      value={newQuickInput}
                      onChange={(e) => setNewQuickInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addQuickInput();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={addQuickInput} disabled={!newQuickInput.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {/* List of current quick inputs */}
                  <div className="space-y-2">
                    {quickInputs.map((input, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 flex-1">{input}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuickInput(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {quickInputs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No quick test inputs configured</p>
                    </div>
                  )}
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
                <div className="space-y-6">
                  {/* Available Tools Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Gmail Tool */}
                    <div className="p-4 border rounded-lg bg-white flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <SiGmail className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">Gmail</h3>
                            <p className="text-sm text-[#4E5964]">Email Management</p>
                          </div>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex-1 space-y-2 text-sm text-[#4E5964]">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-green-600">Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Auth:</span>
                          <span className="font-medium">OAuth 2.0</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Slack Tool */}
                    <div className="p-4 border rounded-lg bg-white flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <SiSlack className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">Slack</h3>
                            <p className="text-sm text-[#4E5964]">Team Communication</p>
                          </div>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex-1 space-y-2 text-sm text-[#4E5964]">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-green-600">Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Auth:</span>
                          <span className="font-medium">Bot Token</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Google Analytics Tool */}
                    <div className="p-4 border rounded-lg bg-white flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <BarChart className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">Google Analytics</h3>
                            <p className="text-sm text-[#4E5964]">Data Analytics</p>
                          </div>
                        </div>
                        <Checkbox />
                      </div>
                      <div className="flex-1 space-y-2 text-sm text-[#4E5964]">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-yellow-600">Not Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>API Calls:</span>
                          <span className="font-medium">0 today</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Auth:</span>
                          <span className="font-medium">Service Account</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* OpenAI Tool */}
                    <div className="p-4 border rounded-lg bg-white flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">OpenAI</h3>
                            <p className="text-sm text-[#4E5964]">AI Processing</p>
                          </div>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex-1 space-y-2 text-sm text-[#4E5964]">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-green-600">Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>API Calls:</span>
                          <span className="font-medium">2,450 today</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Auth:</span>
                          <span className="font-medium">API Key</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Add New Tool Button */}
                  <div className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Tool Integration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "knowledge" && (
            <KnowledgeBaseTab agentName={agent.name} />
          )}


          {activeTab === "test" && (
            <div className="space-y-6">
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
                      <div className="space-y-4">
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
                        
                        {/* Quick Test Scenarios */}
                        {quickInputs.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Quick Test Scenarios:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {quickInputs.map((scenario, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="text-left justify-start h-auto p-2"
                                  onClick={() => setTestMessage(scenario)}
                                >
                                  <span className="text-xs">{scenario}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
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
          )}
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

// Knowledge Base Tab Component
function KnowledgeBaseTab({ agentName }: { agentName: string }) {
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  
  // Search and filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const startEditing = (docId: string, currentTitle: string, currentDescription: string) => {
    setEditingDocument(docId);
    setTempTitle(currentTitle);
    setTempDescription(currentDescription);
  };

  const saveEditing = () => {
    console.log('Saving agent document:', { title: tempTitle, description: tempDescription });
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  const cancelEditing = () => {
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>Manage {agentName}'s knowledge sources and documentation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Document
            </Button>
            <Button variant="outline" size="sm">
              <Link className="w-4 h-4 mr-1" />
              Add URL
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Create MD
            </Button>
            <Button variant="outline" size="sm">
              <Bot className="w-4 h-4 mr-1" />
              AI Suggestions
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="url">URLs</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="creator">Creator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Knowledge Base Documents */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  {editingDocument === 'agent1' ? (
                    <div className="space-y-2">
                      <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="font-medium"
                        placeholder="Document title"
                      />
                      <Input
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        className="text-sm"
                        placeholder="Document description"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">Agent Training Guide</div>
                      <div className="text-sm text-muted-foreground">Comprehensive guide for agent behavior and capabilities</div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by System Admin</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PDF</Badge>
                {editingDocument === 'agent1' ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={saveEditing}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={cancelEditing}>
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" title="View/Edit">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEditing('agent1', 'Agent Training Guide', 'Comprehensive guide for agent behavior and capabilities')}
                      title="Rename"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  {editingDocument === 'agent2' ? (
                    <div className="space-y-2">
                      <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="font-medium"
                        placeholder="Document title"
                      />
                      <Input
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        className="text-sm"
                        placeholder="Document description"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">Knowledge Base Endpoints</div>
                      <div className="text-sm text-muted-foreground">API documentation and endpoint references for the agent</div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by Tech Lead</span>
                    <span>•</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">MD</Badge>
                {editingDocument === 'agent2' ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={saveEditing}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={cancelEditing}>
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" title="View/Edit">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEditing('agent2', 'Knowledge Base Endpoints', 'API documentation and endpoint references for the agent')}
                      title="Rename"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  {editingDocument === 'agent3' ? (
                    <div className="space-y-2">
                      <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="font-medium"
                        placeholder="Document title"
                      />
                      <Input
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        className="text-sm"
                        placeholder="Document description"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">Specialized Workflows</div>
                      <div className="text-sm text-muted-foreground">Documentation of specialized workflows this agent can execute</div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by Product Manager</span>
                    <span>•</span>
                    <span>4 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">DOCX</Badge>
                {editingDocument === 'agent3' ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={saveEditing}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={cancelEditing}>
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" title="View/Edit">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEditing('agent3', 'Specialized Workflows', 'Documentation of specialized workflows this agent can execute')}
                      title="Rename"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}