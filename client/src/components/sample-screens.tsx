import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import n8nLogo from "@assets/n8n-color_1751393955985.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { NavigationSection } from "@/lib/types";
import { Users, Bot, Wrench, GitBranch, BookOpen, UserCog, CreditCard, MessageSquare, BarChart3, Shield, Plus, FileText, Link, Trash2, Eye, Edit3, Check, X, Search, Filter, SortAsc, ArrowUpDown, Mail, MessageCircle, TrendingUp, Database, Camera, Cloud, FileImage, Globe, PenTool, SearchIcon, BarChart, Binoculars, Tags, HelpCircle, ArrowLeft, Copy, Download, Loader2, Play, RotateCcw, Upload, Activity } from "lucide-react";
import { 
  SiGmail,
  SiSlack,
  SiGoogleanalytics,
  SiAirtable,
  SiOpenai,
  SiUnsplash,
  SiGoogledrive,
  SiNotion
} from 'react-icons/si';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PricingScreen } from "./pricing-screen";
import { AgentConfigureScreen, AgentTestScreen } from "./agent-screens";
import { WorkflowEditor } from "./workflow-editor";
import { ToolConfigureScreen } from "./tool-configure-screen";

interface SampleScreenProps {
  section: NavigationSection;
  configureAgent?: {id: string, name: string} | null;
  onClearConfigureAgent?: () => void;
  onConfigureAgent?: (agent: any) => void;
  configureTool?: {id: string, name: string} | null;
  onClearConfigureTool?: () => void;
  configureWorkflow?: {id: string, name: string} | null;
  onClearConfigureWorkflow?: () => void;

}

export function SampleScreen({ 
  section, 
  configureAgent: externalConfigureAgent, 
  onClearConfigureAgent,
  onConfigureAgent,
  configureTool: externalConfigureTool,
  onClearConfigureTool,
  configureWorkflow: externalConfigureWorkflow,
  onClearConfigureWorkflow
}: SampleScreenProps) {
  const [localConfigureAgent, setLocalConfigureAgent] = useState<any>(null);
  const [editWorkflow, setEditWorkflow] = useState<string | undefined>(undefined);
  const [localConfigureTool, setLocalConfigureTool] = useState<any>(null);
  const [showConnectNewTool, setShowConnectNewTool] = useState(false);
  const [showBrowseIntegrations, setShowBrowseIntegrations] = useState(false);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);

  // Clear local state when section changes or when external clear functions are triggered
  useEffect(() => {
    // Clear all local configuration states when section changes
    setLocalConfigureAgent(null);
    setEditWorkflow(undefined);
    setLocalConfigureTool(null);
    setShowConnectNewTool(false);
    setShowBrowseIntegrations(false);
    setShowAddWorkspace(false);
  }, [section]);

  // Clear local state when external clear functions are called
  useEffect(() => {
    if (onClearConfigureAgent) {
      setLocalConfigureAgent(null);
    }
  }, [onClearConfigureAgent]);

  useEffect(() => {
    if (onClearConfigureTool) {
      setLocalConfigureTool(null);
    }
  }, [onClearConfigureTool]);

  useEffect(() => {
    if (onClearConfigureWorkflow) {
      setEditWorkflow(undefined);
    }
  }, [onClearConfigureWorkflow]);

  const handleAgentConfigure = (agent: any) => {
    if (onConfigureAgent) {
      onConfigureAgent(agent);
    } else {
      setLocalConfigureAgent(agent);
    }
  };

  const handleBackToAgents = () => {
    setLocalConfigureAgent(null);
    onClearConfigureAgent?.();
  };

  const handleWorkflowEdit = (workflowId: string) => {
    setEditWorkflow(workflowId);
  };

  const handleBackToWorkflows = () => {
    setEditWorkflow(undefined);
    onClearConfigureWorkflow?.();
  };

  const handleToolConfigure = (tool: any) => {
    setLocalConfigureTool(tool);
  };

  const handleBackToTools = () => {
    setLocalConfigureTool(null);
    onClearConfigureTool?.();
  };

  // Show Configure screen if an agent is being configured
  // All conditional rendering moved to the JSX return to ensure modals are always included
  
  // Add modals after the main render but before the function ends
  // This is a wrapper div to contain the modals alongside the main content
  return (
    <>
      {(() => {
        // Determine which agent/tool/workflow to configure (external from copilot config or local from screen)
        const agentToConfig = externalConfigureAgent || localConfigureAgent;
        const toolToConfig = externalConfigureTool || localConfigureTool;
        const workflowToConfig = externalConfigureWorkflow || (editWorkflow ? { id: editWorkflow, name: editWorkflow } : null);

        if (agentToConfig) {
          return <AgentConfigureScreen agent={agentToConfig} onBack={handleBackToAgents} />;
        }



        if (workflowToConfig) {
          return <WorkflowEditor workflowId={workflowToConfig.id} onBack={handleBackToWorkflows} />;
        }

        if (toolToConfig) {
          return <ToolConfigureScreen tool={toolToConfig} onBack={handleBackToTools} />;
        }

        switch (section) {
          case 'agents':
            return <AgentsScreen onAgentConfigure={handleAgentConfigure} />;
          case 'tools':
            return <ToolsScreen 
              onToolConfigure={handleToolConfigure} 
              onConnectNewTool={() => {
                console.log('Connect New Tool clicked - setting state to true');
                setShowConnectNewTool(true);
                console.log('showConnectNewTool state:', true);
              }}
              onBrowseIntegrations={() => {
                console.log('Browse Integrations clicked - setting state to true');
                setShowBrowseIntegrations(true);
                console.log('showBrowseIntegrations state:', true);
              }}
            />;
          case 'workflows':
            return <WorkflowsScreen onWorkflowEdit={handleWorkflowEdit} />;
          case 'knowledge-base':
            return <KnowledgeBaseScreen />;
          case 'subscriptions':
            return <SubscriptionsScreen />;
          case 'conversations':
            return <ConversationsScreen />;
          case 'analytics':
            return <AnalyticsScreen />;
          case 'users':
            return <UsersScreen />;
          case 'pricing':
            return <PricingScreen />;
          default:
            return <div>Unknown section</div>;
        }
      })()}

      {/* Connect New Tool Modal */}
      {console.log('Rendering Connect New Tool Modal, open:', showConnectNewTool)}
      <Dialog open={showConnectNewTool} onOpenChange={(open) => {
        console.log('Dialog onOpenChange called with:', open);
        setShowConnectNewTool(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect New Tool</DialogTitle>
            <DialogDescription>
              Connect a new third-party service or API to extend your copilots' capabilities
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Zapier', icon: '⚡', category: 'Automation' },
                { name: 'Microsoft Teams', icon: '💬', category: 'Communication' },
                { name: 'Salesforce', icon: '☁️', category: 'CRM' },
                { name: 'HubSpot', icon: '🎯', category: 'Marketing' },
                { name: 'Jira', icon: '🔧', category: 'Project Management' },
                { name: 'GitHub', icon: '🐙', category: 'Development' },
              ].map((tool) => (
                <Card key={tool.name} className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-medium text-sm">{tool.name}</div>
                    <div className="text-xs text-gray-500">{tool.category}</div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Custom Integration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Service Name</label>
                  <Input placeholder="Enter service name..." className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">API Endpoint</label>
                  <Input placeholder="https://api.example.com" className="mt-1" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConnectNewTool(false)}>
                Cancel
              </Button>
              <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
                Connect Tool
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Browse Integrations Modal */}
      {console.log('Rendering Browse Integrations Modal, open:', showBrowseIntegrations)}
      <Dialog open={showBrowseIntegrations} onOpenChange={setShowBrowseIntegrations}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Browse Integrations</DialogTitle>
            <DialogDescription>
              Explore available integrations and tools from our marketplace
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Search integrations..." className="w-full" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Slack', description: 'Team communication and collaboration', price: 'Free', users: '10M+' },
                    { name: 'Google Workspace', description: 'Email, docs, and productivity suite', price: 'Free', users: '3B+' },
                    { name: 'Microsoft 365', description: 'Office apps and cloud services', price: 'Paid', users: '1.3B+' },
                    { name: 'Zoom', description: 'Video conferencing and meetings', price: 'Freemium', users: '300M+' },
                    { name: 'Trello', description: 'Project management and collaboration', price: 'Freemium', users: '50M+' },
                    { name: 'Asana', description: 'Work management and team coordination', price: 'Freemium', users: '100M+' },
                  ].map((integration) => (
                    <Card key={integration.name} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge variant="secondary" className="text-xs">{integration.price}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{integration.users} users</span>
                        <Button size="sm" className="bg-[#008062] hover:bg-[#00d2a0] text-white">
                          Connect
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Recently Added</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Linear', description: 'Issue tracking and project planning', price: 'Paid', new: true },
                    { name: 'Figma', description: 'Design collaboration and prototyping', price: 'Freemium', new: true },
                    { name: 'Loom', description: 'Video messaging and screen recording', price: 'Freemium', new: true },
                  ].map((integration) => (
                    <Card key={integration.name} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{integration.name}</h4>
                        <div className="flex gap-2">
                          {integration.new && <Badge className="text-xs bg-green-100 text-green-700">New</Badge>}
                          <Badge variant="secondary" className="text-xs">{integration.price}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                      <Button size="sm" className="w-full bg-[#008062] hover:bg-[#00d2a0] text-white">
                        Connect
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowBrowseIntegrations(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AgentsScreen({ onAgentConfigure }: { onAgentConfigure?: (agent: any) => void; } = {}) {
  const agents = [
    { 
      id: 1, 
      name: "SEO Writer", 
      copilot: "Content Manager", 
      description: "Creates optimized blog posts and articles",
      tools: ["Content Research", "Keyword Analysis"],
      workflows: ["Blog Post Generation", "Meta Description"],
      status: "Active", 
      requests: 156,
      knowledgeBase: "SEO Guidelines",
      lastActive: "2 min ago"
    },
    { 
      id: 2, 
      name: "SEO Optimizer", 
      copilot: "Content Manager", 
      description: "Optimizes existing content for search engines",
      tools: ["SEO Analyzer", "Keyword Density"],
      workflows: ["Content Optimization", "SERP Analysis"],
      status: "Active", 
      requests: 89,
      knowledgeBase: "SEO Best Practices",
      lastActive: "5 min ago"
    },
    { 
      id: 3, 
      name: "Performance Analyst", 
      copilot: "Business Intelligence", 
      description: "Analyzes website and content performance metrics",
      tools: ["Analytics API", "Report Builder"],
      workflows: ["Performance Report", "Traffic Analysis"],
      status: "Active", 
      requests: 234,
      knowledgeBase: "Analytics Guidelines",
      lastActive: "1 min ago"
    },
    { 
      id: 4, 
      name: "Competitor Researcher", 
      copilot: "Business Intelligence", 
      description: "Researches competitor strategies and market trends",
      tools: ["Web Scraper", "Market Data API"],
      workflows: ["Competitor Analysis", "Market Research"],
      status: "Active", 
      requests: 67,
      knowledgeBase: "Market Research Data",
      lastActive: "8 min ago"
    },
    { 
      id: 5, 
      name: "Ticket Classifier", 
      copilot: "Customer Support", 
      description: "Categorizes and prioritizes support tickets",
      tools: ["NLP Classifier", "Priority Scorer"],
      workflows: ["Ticket Routing", "Escalation Rules"],
      status: "Active", 
      requests: 445,
      knowledgeBase: "Support Categories",
      lastActive: "30 sec ago"
    },
    { 
      id: 6, 
      name: "FAQ Generator", 
      copilot: "Customer Support", 
      description: "Creates and updates FAQ content from tickets",
      tools: ["Content Extractor", "FAQ Builder"],
      workflows: ["FAQ Creation", "Content Updates"],
      status: "Inactive", 
      requests: 23,
      knowledgeBase: "Support Documentation",
      lastActive: "2 hours ago"
    }
  ];

  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'Active').length;
  const totalRequests = agents.reduce((sum, agent) => sum + agent.requests, 0);

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
            Create New Agent
          </Button>
          <Button variant="outline">
            Import Agent Template
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* All Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => {
          // Get appropriate icon for each agent based on their function
          const getAgentIcon = (agentName: string) => {
            switch (agentName) {
              case 'Content Writer':
                return <PenTool className="w-8 h-8 text-purple-600" />;
              case 'SEO Optimizer':
                return <TrendingUp className="w-8 h-8 text-green-600" />;
              case 'Performance Analyst':
                return <BarChart className="w-8 h-8 text-blue-600" />;
              case 'Competitor Researcher':
                return <Binoculars className="w-8 h-8 text-orange-600" />;
              case 'Ticket Classifier':
                return <Tags className="w-8 h-8 text-red-600" />;
              case 'FAQ Generator':
                return <HelpCircle className="w-8 h-8 text-indigo-600" />;
              default:
                return <Bot className="w-8 h-8 text-gray-600" />;
            }
          };

          return (
          <Card key={agent.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                {getAgentIcon(agent.name)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{agent.name}</h3>
                  <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'} className="text-xs mb-2">
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4 flex-grow">{agent.description}</p>
              
              <div className="space-y-4 mt-auto">
                
                
                
                
                
                
                <div className="pt-2">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => onAgentConfigure?.(agent)}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>
    </div>
  );
}

function ToolsScreen({ 
  onToolConfigure, 
  onConnectNewTool, 
  onBrowseIntegrations 
}: { 
  onToolConfigure?: (tool: any) => void;
  onConnectNewTool?: () => void;
  onBrowseIntegrations?: () => void;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const allTools = [
    {
      id: 1,
      name: "Gmail",
      description: "Send emails, read inbox, create drafts",
      provider: "Google",
      type: "API Integration",
      category: "Communication",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support"],
      lastUsed: "5 min ago",
      totalCalls: 1204,
      authType: "OAuth 2.0",
      endpoints: ["Send Email", "Read Inbox", "Create Draft"]
    },
    {
      id: 2,
      name: "Slack",
      description: "Send messages, create channels, manage notifications",
      provider: "Slack Technologies",
      type: "Webhook",
      category: "Communication",
      status: "Connected",
      usedBy: ["Customer Support"],
      lastUsed: "12 min ago",
      totalCalls: 567,
      authType: "Bot Token",
      endpoints: ["Send Message", "Create Channel", "Upload File"]
    },
    {
      id: 3,
      name: "Google Analytics",
      description: "Retrieve website traffic and performance data",
      provider: "Google",
      type: "API Integration",
      category: "Data & Analytics",
      status: "Connected",
      usedBy: ["Business Intelligence"],
      lastUsed: "2 min ago",
      totalCalls: 892,
      authType: "Service Account",
      endpoints: ["Get Reports", "Get Real-time Data", "Get Dimensions"]
    },
    {
      id: 4,
      name: "Airtable",
      description: "Create records, update databases, manage tables",
      provider: "Airtable",
      type: "API Integration",
      category: "Data & Analytics",
      status: "Disconnected",
      usedBy: [],
      lastUsed: "2 days ago",
      totalCalls: 156,
      authType: "API Key",
      endpoints: ["Create Record", "Update Record", "List Records"]
    },
    {
      id: 5,
      name: "OpenAI API",
      description: "Generate text, images, and embeddings",
      provider: "OpenAI",
      type: "API Integration",
      category: "Content & Media",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support", "Business Intelligence"],
      lastUsed: "30 sec ago",
      totalCalls: 5647,
      authType: "API Key",
      endpoints: ["Chat Completion", "Image Generation", "Embeddings"]
    },
    {
      id: 6,
      name: "Unsplash",
      description: "Search and download high-quality stock photos",
      provider: "Unsplash",
      type: "API Integration",
      category: "Content & Media",
      status: "Connected",
      usedBy: ["Content Manager"],
      lastUsed: "1 hour ago",
      totalCalls: 234,
      authType: "API Key",
      endpoints: ["Search Photos", "Download Photo", "Get Collections"]
    },
    {
      id: 7,
      name: "Google Drive",
      description: "Upload, download, and manage files and folders",
      provider: "Google",
      type: "API Integration",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support"],
      lastUsed: "15 min ago",
      totalCalls: 445,
      authType: "OAuth 2.0",
      endpoints: ["Upload File", "Download File", "Create Folder"]
    },
    {
      id: 8,
      name: "Notion",
      description: "Create pages, update databases, manage content",
      provider: "Notion",
      type: "API Integration",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Content Manager"],
      lastUsed: "45 min ago",
      totalCalls: 678,
      authType: "OAuth 2.0",
      endpoints: ["Create Page", "Update Database", "Query Database"]
    },
    {
      id: 9,
      name: "n8n",
      description: "Create and manage automated workflows between services",
      provider: "n8n",
      type: "Webhook",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Marketing Copilot", "Customer Support"],
      lastUsed: "8 min ago",
      totalCalls: 1456,
      authType: "API Key",
      endpoints: ["Trigger Workflow", "Get Executions", "Manage Workflows"]
    }
  ];

  const categories = ["All Categories", "Communication", "Data & Analytics", "Content & Media", "Productivity"];
  
  const filteredTools = selectedCategory === "All Categories" 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  const totalTools = allTools.length;
  const connectedTools = allTools.filter(tool => tool.status === 'Connected').length;
  const totalCalls = allTools.reduce((sum, tool) => sum + tool.totalCalls, 0);

  return (
    <div className="space-y-6">
      

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button 
            className="bg-[#008062] hover:bg-[#00d2a0] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - Connect New Tool', onConnectNewTool);
              onConnectNewTool?.();
            }}
          >
            Connect New Tool
          </Button>
          <Button 
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - Browse Integrations', onBrowseIntegrations);
              onBrowseIntegrations?.();
            }}
          >
            Browse Integrations
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {selectedCategory === "All Categories" ? "All Tools" : `${selectedCategory} Tools`}
        </h2>
        <Badge variant="secondary">{filteredTools.length} integrations</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => {
                // Define real platform logos for each tool
                const getToolLogo = (toolName: string) => {
                  switch (toolName.toLowerCase()) {
                    case 'gmail':
                      return <SiGmail className="w-8 h-8 text-red-500" />;
                    case 'slack':
                      return <SiSlack className="w-8 h-8 text-purple-500" />;
                    case 'google analytics':
                      return <SiGoogleanalytics className="w-8 h-8 text-orange-500" />;
                    case 'airtable':
                      return <SiAirtable className="w-8 h-8 text-yellow-600" />;
                    case 'openai api':
                      return <SiOpenai className="w-8 h-8 text-green-600" />;
                    case 'unsplash':
                      return <SiUnsplash className="w-8 h-8 text-black" />;
                    case 'google drive':
                      return <SiGoogledrive className="w-8 h-8 text-blue-500" />;
                    case 'notion':
                      return <SiNotion className="w-8 h-8 text-black" />;
                    case 'n8n':
                      return <img src={n8nLogo} alt="n8n" className="w-8 h-8" />;
                    default:
                      return <Globe className="w-8 h-8 text-gray-500" />;
                  }
                };

                return (
                  <Card key={tool.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        {getToolLogo(tool.name)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{tool.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">by {tool.provider}</p>
                          <Badge variant={tool.status === 'Connected' ? 'default' : 'secondary'} className="text-xs">
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{tool.description}</p>
                      
                      <div className="space-y-4 mt-auto">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Used by Copilots</p>
                          <div className="flex flex-wrap gap-1">
                            {tool.usedBy.length > 0 ? tool.usedBy.slice(0, 2).map((copilot, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {copilot}
                              </Badge>
                            )) : (
                              <span className="text-sm text-gray-400">Not in use</span>
                            )}
                            {tool.usedBy.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{tool.usedBy.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">{tool.totalCalls.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">API calls</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">{tool.authType}</p>
                            <p className="text-xs text-gray-500">Authentication</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 border-t pt-3">
                          Last used: {tool.lastUsed}
                        </div>
                        
                        <div className="pt-2">
                          {tool.status === 'Connected' ? (
                            <Button variant="outline" size="sm" className="w-full" onClick={() => onToolConfigure?.(tool)}>Configure</Button>
                          ) : (
                            <Button size="sm" className="w-full bg-[#008062] hover:bg-[#00d2a0] text-white">
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
    </div>
  );
}

function WorkflowsScreen({ onWorkflowEdit }: { onWorkflowEdit?: (workflowId: string) => void } = {}) {
  const workflowsByType = {
    "Imported Workflows": [
      {
        id: 1,
        name: "Lead Qualification Pipeline",
        description: "Automatically qualifies and routes incoming leads through multiple channels",
        source: "n8n",
        trigger: "New form submission",
        steps: ["Validate Data", "Score Lead", "Enrich Contact", "Route to Sales", "Send Welcome Email"],
        tools: ["HubSpot", "Clearbit", "Gmail"],
        agents: ["Lead Scorer"],
        status: "Active",
        executions: 1456,
        successRate: 94,
        lastRun: "2 min ago",
        avgDuration: "45s",
        usedBy: ["Marketing Copilot"],
        schedule: "Real-time trigger"
      },
      {
        id: 2,
        name: "Content Publishing Automation",
        description: "Schedules and publishes content across multiple social media platforms",
        source: "Make.com",
        trigger: "Content approval",
        steps: ["Format Content", "Schedule Posts", "Cross-post", "Track Engagement", "Generate Report"],
        tools: ["Buffer", "Twitter API", "LinkedIn API", "Google Analytics"],
        agents: ["Content Formatter", "Engagement Tracker"],
        status: "Active",
        executions: 892,
        successRate: 98,
        lastRun: "15 min ago",
        avgDuration: "2m 30s",
        usedBy: ["Content Manager"],
        schedule: "Daily at 9 AM"
      },
      {
        id: 3,
        name: "Customer Support Escalation",
        description: "Automatically escalates high-priority tickets to appropriate team members",
        source: "n8n",
        trigger: "Ticket priority change",
        steps: ["Analyze Ticket", "Determine Priority", "Assign Specialist", "Notify Team", "Update Customer"],
        tools: ["Zendesk", "Slack", "Gmail"],
        agents: ["Ticket Classifier", "Priority Scorer"],
        status: "Paused",
        executions: 567,
        successRate: 87,
        lastRun: "3 hours ago",
        avgDuration: "1m 15s",
        usedBy: ["Customer Support"],
        schedule: "Real-time trigger"
      }
    ],
    "Custom Workflows": [
      {
        id: 4,
        name: "SEO Content Optimization",
        description: "Automated SEO analysis and optimization of blog posts",
        source: "Custom Chain",
        trigger: "New draft published",
        steps: ["Extract Content", "Keyword Analysis", "SEO Score", "Generate Suggestions", "Apply Optimizations"],
        tools: ["OpenAI API", "SEMrush API"],
        agents: ["SEO Writer", "SEO Optimizer", "Content Reviewer"],
        status: "Active",
        executions: 234,
        successRate: 91,
        lastRun: "8 min ago",
        avgDuration: "3m 45s",
        usedBy: ["Content Manager"],
        schedule: "On-demand"
      },
      {
        id: 5,
        name: "Performance Data Collection",
        description: "Gathers and consolidates performance metrics from multiple sources",
        source: "Custom Chain",
        trigger: "Daily schedule",
        steps: ["Collect Analytics", "Process Data", "Generate Insights", "Create Dashboard", "Send Report"],
        tools: ["Google Analytics", "Google Search Console", "Airtable"],
        agents: ["Performance Analyst", "Report Generator"],
        status: "Active",
        executions: 67,
        successRate: 96,
        lastRun: "1 hour ago",
        avgDuration: "5m 20s",
        usedBy: ["Business Intelligence"],
        schedule: "Daily at 6 AM"
      },
      {
        id: 6,
        name: "Knowledge Base Auto-Update",
        description: "Automatically updates FAQ and knowledge base from support conversations",
        source: "Custom Chain",
        trigger: "Support conversation end",
        steps: ["Analyze Conversation", "Extract Key Info", "Check Existing Docs", "Generate Updates", "Review & Publish"],
        tools: ["Notion", "OpenAI API"],
        agents: ["FAQ Generator", "Content Reviewer"],
        status: "Draft",
        executions: 0,
        successRate: 0,
        lastRun: "Never",
        avgDuration: "N/A",
        usedBy: [],
        schedule: "Real-time trigger"
      }
    ]
  };

  const totalWorkflows = Object.values(workflowsByType).flat().length;
  const activeWorkflows = Object.values(workflowsByType).flat().filter(wf => wf.status === 'Active').length;
  const totalExecutions = Object.values(workflowsByType).flat().reduce((sum, wf) => sum + wf.executions, 0);
  const avgSuccessRate = Math.round(
    Object.values(workflowsByType).flat()
      .filter(wf => wf.executions > 0)
      .reduce((sum, wf) => sum + wf.successRate, 0) / 
    Object.values(workflowsByType).flat().filter(wf => wf.executions > 0).length
  );

  return (
    <div className="space-y-6">
      

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
            Create Custom Workflow
          </Button>
          <Button variant="outline">
            Import from n8n
          </Button>
          <Button variant="outline">
            Import from Make.com
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Workflows by Type */}
      {Object.entries(workflowsByType).map(([type, workflows]) => (
        <div key={type} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{type}</h2>
            <Badge variant="secondary">{workflows.length} workflows</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-8 h-8 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{workflow.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">Source: <span className="font-medium">{workflow.source}</span></p>
                      <Badge variant={workflow.status === 'Active' ? 'default' : workflow.status === 'Paused' ? 'secondary' : 'outline'} className="text-xs">
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{workflow.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tools & Agents</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workflow.tools.slice(0, 2).map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {workflow.tools.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{workflow.tools.length - 2} tools
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {workflow.agents.slice(0, 1).map((agent, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                        {workflow.agents.length > 1 && (
                          <Badge variant="outline" className="text-xs">
                            +{workflow.agents.length - 1} agents
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">{workflow.executions.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Executions</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{workflow.successRate}%</p>
                        <p className="text-xs text-gray-500">Success rate</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">{workflow.steps.length} steps</p>
                      <p className="text-xs text-gray-500">{workflow.trigger}</p>
                    </div>
                    
                    <div className="text-sm text-gray-500 border-t pt-3">
                      Last run: {workflow.lastRun} • Avg: {workflow.avgDuration}
                    </div>
                    
                    <div className="pt-2">
                      {workflow.status === 'Active' ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => console.log('Pausing workflow:', workflow.name)}>Pause</Button>
                        </div>
                      ) : workflow.status === 'Paused' ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button size="sm" className="flex-1 bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={() => console.log('Resuming workflow:', workflow.name)}>Resume</Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button size="sm" className="flex-1 bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={() => console.log('Deploying workflow:', workflow.name)}>Deploy</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KnowledgeBaseScreen() {
  const [suggestDocsOpen, setSuggestDocsOpen] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  
  // Search and filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  // Sample AI-suggested documents
  const suggestedDocs = [
    {
      id: "workspace-onboarding",
      title: "Workspace Onboarding Guide",
      description: "Complete guide for new team members joining the workspace",
      category: "User Experience"
    },
    {
      id: "company-policies",
      title: "Company Policies & Guidelines",
      description: "Essential policies and guidelines for all team members",
      category: "Guidelines"
    },
    {
      id: "tech-standards",
      title: "Technical Standards Documentation",
      description: "Development standards and best practices for the team",
      category: "Technical"
    },
    {
      id: "project-templates",
      title: "Project Management Templates",
      description: "Standardized templates for project planning and execution",
      category: "Templates"
    }
  ];

  const handleSuggestionToggle = (suggestionId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestionId) 
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const handleGenerateSelectedDocs = () => {
    console.log('Generating workspace documents:', selectedSuggestions);
    setSuggestDocsOpen(false);
    setSelectedSuggestions([]);
  };

  const startEditing = (docId: string, currentTitle: string, currentDescription: string) => {
    setEditingDocument(docId);
    setTempTitle(currentTitle);
    setTempDescription(currentDescription);
  };

  const saveEditing = () => {
    console.log('Saving workspace document:', { title: tempTitle, description: tempDescription });
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
    <div className="space-y-6">
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
          <Button variant="outline" size="sm" onClick={() => setSuggestDocsOpen(true)}>
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

      <div className="space-y-4">
        {/* Knowledge base documents */}
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                {editingDocument === 'workspace1' ? (
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
                    <div className="font-medium">Company Handbook</div>
                    <div className="text-sm text-muted-foreground">Complete guide to company policies and procedures</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by Jennifer Walsh</span>
                  <span>•</span>
                  <span>5 days ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">PDF</Badge>
              {editingDocument === 'workspace1' ? (
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
                    onClick={() => startEditing('workspace1', 'Company Handbook', 'Complete guide to company policies and procedures')}
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
                {editingDocument === 'workspace2' ? (
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
                    <div className="font-medium">Development Guidelines</div>
                    <div className="text-sm text-muted-foreground">Coding standards and development best practices</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by David Park</span>
                  <span>•</span>
                  <span>1 week ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">MD</Badge>
              {editingDocument === 'workspace2' ? (
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
                    onClick={() => startEditing('workspace2', 'Development Guidelines', 'Coding standards and development best practices')}
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
                {editingDocument === 'workspace3' ? (
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
                    <div className="font-medium">Security Protocols</div>
                    <div className="text-sm text-muted-foreground">Security guidelines and access management procedures</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by Lisa Chen</span>
                  <span>•</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">DOCX</Badge>
              {editingDocument === 'workspace3' ? (
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
                    onClick={() => startEditing('workspace3', 'Security Protocols', 'Security guidelines and access management procedures')}
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
              <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                {editingDocument === 'workspace4' ? (
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
                    <div className="font-medium">Team Onboarding Checklist</div>
                    <div className="text-sm text-muted-foreground">Step-by-step checklist for new team member onboarding</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by Rachel Green</span>
                  <span>•</span>
                  <span>6 days ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">PDF</Badge>
              {editingDocument === 'workspace4' ? (
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
                    onClick={() => startEditing('workspace4', 'Team Onboarding Checklist', 'Step-by-step checklist for new team member onboarding')}
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

      {/* AI Document Suggestions Modal */}
      <Dialog open={suggestDocsOpen} onOpenChange={setSuggestDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Workspace Document Suggestions
            </DialogTitle>
            <DialogDescription>
              Select the documents you'd like our AI to generate for your workspace knowledge base. These will be customized for your team's needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {suggestedDocs.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={doc.id}
                  checked={selectedSuggestions.includes(doc.id)}
                  onCheckedChange={() => handleSuggestionToggle(doc.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                      {doc.title}
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {doc.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedSuggestions.length} document{selectedSuggestions.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSuggestDocsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateSelectedDocs}
                disabled={selectedSuggestions.length === 0}
                className="gap-2"
              >
                <Bot className="w-4 h-4" />
                Generate Selected ({selectedSuggestions.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



function SubscriptionsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <CreditCard className="w-4 h-4 mr-2" />
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Professional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Cost</span>
                <span className="font-semibold">$49/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Billing</span>
                <span className="font-semibold">Jan 15, 2025</span>
              </div>
              <Badge className="w-full justify-center">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span>15,234 / 25,000</span>
                </div>
                <Progress value={61} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>3.2 GB / 10 GB</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <span className="text-sm">•••• 4242</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConversationsScreen() {
  const conversations = [
    { id: 1, user: "John Doe", copilot: "Support Bot", messages: 12, lastActive: "2 min ago", status: "Active" },
    { id: 2, user: "Jane Smith", copilot: "Sales Assistant", messages: 8, lastActive: "15 min ago", status: "Resolved" },
    { id: 3, user: "Mike Johnson", copilot: "Tech Helper", messages: 24, lastActive: "1 hour ago", status: "Active" },
    { id: 4, user: "Sarah Wilson", copilot: "Content Bot", messages: 6, lastActive: "3 hours ago", status: "Pending" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">247</p>
              <p className="text-sm text-gray-600">Total Conversations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">23</p>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">189</p>
              <p className="text-sm text-gray-600">Resolved Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">4.2</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Copilot</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map((conversation) => (
                <TableRow key={conversation.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{conversation.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.user}
                    </div>
                  </TableCell>
                  <TableCell>{conversation.copilot}</TableCell>
                  <TableCell>{conversation.messages}</TableCell>
                  <TableCell>{conversation.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={conversation.status === 'Active' ? 'default' : conversation.status === 'Resolved' ? 'secondary' : 'outline'}>
                      {conversation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <BarChart3 className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold text-gray-900">12,467</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Session Time</p>
                <p className="text-2xl font-bold text-gray-900">8.5m</p>
                <p className="text-xs text-red-600">-2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-xs text-green-600">+1.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Daily interactions over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Chart placeholder - Usage trends visualization</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Copilots</CardTitle>
            <CardDescription>Ranked by user satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Customer Support Bot</span>
                <div className="flex items-center gap-2">
                  <Progress value={95} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Sales Assistant</span>
                <div className="flex items-center gap-2">
                  <Progress value={87} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">87%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Technical Helper</span>
                <div className="flex items-center gap-2">
                  <Progress value={82} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">82%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Content Reviewer</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UsersScreen() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "User", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Carol Davis", email: "carol@company.com", role: "Manager", status: "Inactive", lastLogin: "5 days ago" },
    { id: 4, name: "David Wilson", email: "david@company.com", role: "User", status: "Active", lastLogin: "3 hours ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <Users className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">47</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">42</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-600">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-gray-600">Pending Invites</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Permissions</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}