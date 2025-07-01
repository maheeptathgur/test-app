import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { NavigationSection } from "@/lib/types";
import { Users, Bot, Wrench, GitBranch, BookOpen, UserCog, CreditCard, MessageSquare, BarChart3, Shield, Plus, FileText, Link, Trash2, Eye, Edit3, Check, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { PricingScreen } from "./pricing-screen";

interface SampleScreenProps {
  section: NavigationSection;
}

export function SampleScreen({ section }: SampleScreenProps) {
  switch (section) {
    case 'agents':
      return <AgentsScreen />;
    case 'tools':
      return <ToolsScreen />;
    case 'workflows':
      return <WorkflowsScreen />;
    case 'knowledge-base':
      return <KnowledgeBaseScreen />;
    case 'profile-fields':
      return <ProfileFieldsScreen />;
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
}

function AgentsScreen() {
  const agents = [
    { id: 1, name: "Customer Support Agent", type: "Support", status: "Active", requests: 245 },
    { id: 2, name: "Sales Assistant", type: "Sales", status: "Active", requests: 189 },
    { id: 3, name: "Technical Helper", type: "Technical", status: "Inactive", requests: 67 },
    { id: 4, name: "Content Reviewer", type: "Content", status: "Active", requests: 123 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <Bot className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">9</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Requests Today</p>
                <p className="text-2xl font-bold text-gray-900">624</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">1.2s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{agent.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.requests}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
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

function ToolsScreen() {
  const tools = [
    { id: 1, name: "Document Parser", category: "Processing", usage: 89, status: "Active" },
    { id: 2, name: "Email Generator", category: "Communication", usage: 67, status: "Active" },
    { id: 3, name: "Data Validator", category: "Analysis", usage: 45, status: "Inactive" },
    { id: 4, name: "Image Analyzer", category: "AI/ML", usage: 78, status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <Wrench className="w-4 h-4 mr-2" />
          Add Tool
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <CardDescription>{tool.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usage</span>
                    <span>{tool.usage}%</span>
                  </div>
                  <Progress value={tool.usage} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={tool.status === 'Active' ? 'default' : 'secondary'}>
                    {tool.status}
                  </Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WorkflowsScreen() {
  const workflows = [
    { id: 1, name: "Customer Onboarding", steps: 8, status: "Running", executions: 156 },
    { id: 2, name: "Support Ticket Routing", steps: 5, status: "Paused", executions: 89 },
    { id: 3, name: "Content Approval", steps: 12, status: "Running", executions: 234 },
    { id: 4, name: "Data Backup", steps: 3, status: "Running", executions: 45 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <GitBranch className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{workflow.name}</CardTitle>
                <Badge variant={workflow.status === 'Running' ? 'default' : 'secondary'}>
                  {workflow.status}
                </Badge>
              </div>
              <CardDescription>{workflow.steps} steps • {workflow.executions} executions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Run</Button>
                <Button variant="outline" size="sm">History</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function KnowledgeBaseScreen() {
  const [suggestDocsOpen, setSuggestDocsOpen] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">32</p>
              <p className="text-sm text-muted-foreground">Total Documents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">18</p>
              <p className="text-sm text-muted-foreground">Workspace Docs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">9</p>
              <p className="text-sm text-muted-foreground">Copilot Docs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-muted-foreground">User Uploads</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="copilots">Copilots</TabsTrigger>
          <TabsTrigger value="uploads">User Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Workspace Documents */}
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Company Handbook</div>
                    <div className="text-sm text-muted-foreground">Complete guide to company policies and procedures</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by Jennifer Walsh</span>
                    <span>•</span>
                    <span>5 days ago</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">Workspace</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PDF</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Copilot Document */}
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Product Documentation</div>
                    <div className="text-sm text-muted-foreground">Comprehensive guide for product features</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>From Marketing Assistant</span>
                    <span>•</span>
                    <span>2 days ago</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Copilot</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PDF</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* User Upload */}
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Sales Training Materials</div>
                    <div className="text-sm text-muted-foreground">Training presentations and sales methodologies</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Uploaded by Sarah Martinez</span>
                    <span>•</span>
                    <span>4 hours ago</span>
                    <span>•</span>
                    <span className="text-orange-600 font-medium">User Upload</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PPTX</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-4 mt-6">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Company Handbook</div>
                    <div className="text-sm text-muted-foreground">Complete guide to company policies and procedures</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by Jennifer Walsh</span>
                    <span>•</span>
                    <span>5 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PDF</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Development Guidelines</div>
                    <div className="text-sm text-muted-foreground">Coding standards and development best practices</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created by David Park</span>
                    <span>•</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">MD</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="copilots" className="space-y-4 mt-6">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Product Documentation</div>
                    <div className="text-sm text-muted-foreground">Comprehensive guide for product features</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>From Marketing Assistant</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PDF</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">FAQ Document</div>
                    <div className="text-sm text-muted-foreground">Frequently asked questions and answers</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>From Customer Support</span>
                    <span>•</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">DOCX</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">API Integration Guide</div>
                    <div className="text-sm text-muted-foreground">Step-by-step integration documentation</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>From Content Writer</span>
                    <span>•</span>
                    <span>3 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">MD</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4 mt-6">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Sales Training Materials</div>
                    <div className="text-sm text-muted-foreground">Training presentations and sales methodologies</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Uploaded by Sarah Martinez</span>
                    <span>•</span>
                    <span>4 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">PPTX</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Q4 Financial Report</div>
                    <div className="text-sm text-muted-foreground">Quarterly financial analysis and projections</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Uploaded by Michael Chen</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">XLSX</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="font-medium">Project Timeline Template</div>
                    <div className="text-sm text-muted-foreground">Gantt chart template for project management</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Uploaded by Lisa Wang</span>
                    <span>•</span>
                    <span>1 day ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="text-xs">XLSX</Badge>
                <Button variant="ghost" size="sm" title="View/Edit">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Rename">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
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
        </TabsContent>
      </Tabs>

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

function ProfileFieldsScreen() {
  const fields = [
    { id: 1, name: "Company Size", type: "Select", required: true, active: true },
    { id: 2, name: "Industry", type: "Text", required: true, active: true },
    { id: 3, name: "Phone Number", type: "Phone", required: false, active: true },
    { id: 4, name: "Department", type: "Select", required: false, active: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <UserCog className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Fields</CardTitle>
          <CardDescription>Manage additional profile information fields</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell className="font-medium">{field.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{field.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={field.required ? 'destructive' : 'secondary'}>
                      {field.required ? 'Required' : 'Optional'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={field.active ? 'default' : 'secondary'}>
                      {field.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
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