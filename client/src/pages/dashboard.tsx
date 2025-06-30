import { useState, useEffect } from "react";
import { Monitor, Users, Settings, BarChart3, BookOpen, UserCog, CreditCard, MessageSquare, TrendingUp, Shield, Grid, List, Search, Filter, ArrowUpDown, PanelLeftClose, PanelLeftOpen, Upload, FileText, Music, Video, Image, File, X } from "lucide-react";
import knolliLogo from "@assets/image_1751267938774.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { WorkspaceSelector } from "@/components/workspace-selector";
import { CopilotCard } from "@/components/copilot-card";
import { ChatInterface } from "@/components/chat-interface";
import { CreateCopilotModal } from "@/components/create-copilot-modal";
import { EditCopilotModal } from "@/components/edit-copilot-modal";
import { CopilotConfiguration } from "@/components/copilot-configuration";
import { SampleScreen } from "@/components/sample-screens";
import { Workspace, CopilotData, NavigationSection } from "@/lib/types";

const workspaces: Workspace[] = [
  { id: '1', name: 'My Workspace', type: 'Personal', avatar: 'M', color: 'bg-blue-500' },
  { id: '2', name: 'Team Alpha', type: 'Shared', avatar: 'T', color: 'bg-green-500' },
  { id: '3', name: 'Enterprise', type: 'Organization', avatar: 'E', color: 'bg-purple-500' },
];

const mockCopilots: CopilotData[] = [
  {
    id: '1',
    name: 'Content Assistant',
    description: 'Helps with blog posts, social media content, and marketing copy. Optimized for brand voice and SEO.',
    status: 'active',
    avatar: 'CA',
    avatarColor: 'bg-blue-100 text-blue-600',
    type: 'content',
    components: [
      { name: 'Content Writer', type: 'agent' },
      { name: 'SEO Optimizer', type: 'agent' },
      { name: 'Grammarly', type: 'tool' },
      { name: 'SEMrush', type: 'tool' },
    ],
  },
  {
    id: '2',
    name: 'Campaign Manager',
    description: 'Plans and executes marketing campaigns across multiple channels with automated workflows.',
    status: 'active',
    avatar: 'CM',
    avatarColor: 'bg-green-100 text-green-600',
    type: 'general',
    components: [
      { name: 'Campaign Planning', type: 'workflow' },
      { name: 'Media Planner', type: 'agent' },
      { name: 'HubSpot', type: 'tool' },
      { name: 'Mailchimp', type: 'tool' },
    ],
  },
  {
    id: '3',
    name: 'Social Analyst',
    description: 'Analyzes social media performance, tracks trends, and provides insights for optimization.',
    status: 'archived',
    avatar: 'SA',
    avatarColor: 'bg-orange-100 text-orange-600',
    type: 'analyst',
    components: [
      { name: 'Data Analyst', type: 'agent' },
      { name: 'Trend Spotter', type: 'agent' },
      { name: 'Google Analytics', type: 'tool' },
      { name: 'Hootsuite', type: 'tool' },
    ],
  },
];

const navigationItems = [
  { id: 'copilots', label: 'Copilots', icon: Monitor },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'tools', label: 'Tools', icon: Settings },
  { id: 'workflows', label: 'Workflows', icon: BarChart3 },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'users', label: 'Users', icon: Shield },
] as const;

export default function Dashboard() {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[0]);
  const [activeSection, setActiveSection] = useState<NavigationSection>('copilots');
  const [copilots, setCopilots] = useState<CopilotData[]>(mockCopilots);
  const [chatCopilot, setChatCopilot] = useState<CopilotData | null>(null);
  const [editingCopilot, setEditingCopilot] = useState<CopilotData | null>(null);
  const [configuringCopilot, setConfiguringCopilot] = useState<CopilotData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'status'>('name');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAttachmentSidebar, setShowAttachmentSidebar] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const showNotification = (message: string) => {
    toast({
      description: message,
      duration: 3000,
    });
  };

  const handleWorkspaceChange = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    showNotification(`Switched to ${workspace.name}`);
  };

  const handleSectionChange = (section: NavigationSection) => {
    setActiveSection(section);
    showNotification(`Switched to ${section.charAt(0).toUpperCase() + section.slice(1)}`);
  };

  const handleStartChat = (copilot: CopilotData) => {
    setChatCopilot(copilot);
  };

  const handleEditCopilot = (copilot: CopilotData) => {
    setConfiguringCopilot(copilot);
  };

  const handleDuplicateCopilot = (copilot: CopilotData) => {
    const newCopilot: CopilotData = {
      ...copilot,
      id: Date.now().toString(),
      name: `${copilot.name} (Copy)`,
    };
    setCopilots(prev => [...prev, newCopilot]);
    showNotification(`Duplicated ${copilot.name}`);
  };

  const handleArchiveCopilot = (copilot: CopilotData) => {
    showNotification(`Archived copilot: ${copilot.name}`);
  };

  const handleDeleteCopilot = (copilot: CopilotData) => {
    if (confirm(`Are you sure you want to delete ${copilot.name}?`)) {
      setCopilots(prev => prev.filter(c => c.id !== copilot.id));
      showNotification(`Deleted ${copilot.name}`);
    }
  };

  const handleCreateCopilot = (data: { name: string; description: string; type: string }) => {
    const avatarInitials = data.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600'];
    
    const newCopilot: CopilotData = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      status: 'active',
      avatar: avatarInitials,
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      type: data.type,
      components: [],
    };
    
    setCopilots(prev => [...prev, newCopilot]);
    showNotification(`Created new copilot: ${data.name}`);
  };

  const handleUpdateCopilot = (data: { name: string; description: string; type: string }) => {
    if (!editingCopilot) return;
    
    setCopilots(prev => prev.map(copilot => 
      copilot.id === editingCopilot.id 
        ? { ...copilot, name: data.name, description: data.description, type: data.type }
        : copilot
    ));
    showNotification(`Updated copilot: ${data.name}`);
    setEditingCopilot(null);
  };

  const handleSaveCopilotConfiguration = (updatedCopilot: CopilotData) => {
    setCopilots(prev => prev.map(copilot => 
      copilot.id === updatedCopilot.id ? updatedCopilot : copilot
    ));
    showNotification(`Updated configuration for: ${updatedCopilot.name}`);
    setConfiguringCopilot(null);
  };

  const handleToggleAttachment = (show: boolean) => {
    setShowAttachmentSidebar(show);
    // Collapse the main sidebar when attachment sidebar is shown
    if (show) {
      setSidebarCollapsed(true);
    }
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  // Filter and sort copilots
  const getFilteredAndSortedCopilots = () => {
    let filtered = copilots.filter(copilot => {
      const matchesSearch = copilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           copilot.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || copilot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredCopilots = getFilteredAndSortedCopilots();

  const getSectionContent = (): { title: string; subtitle: string; content: React.ReactNode } => {
    // If chat is open, show chat interface instead of section content
    if (chatCopilot) {
      return {
        title: `Chat with ${chatCopilot.name}`,
        subtitle: chatCopilot.description,
        content: (
          <ChatInterface
            isOpen={true}
            copilot={chatCopilot}
            onClose={() => setChatCopilot(null)}
            onToggleAttachment={handleToggleAttachment}
          />
        ),
      };
    }

    // If configuring a copilot, show configuration interface
    if (configuringCopilot) {
      return {
        title: `Configure ${configuringCopilot.name}`,
        subtitle: 'Edit copilot settings, components, and profile fields',
        content: (
          <CopilotConfiguration
            copilot={configuringCopilot}
            onClose={() => setConfiguringCopilot(null)}
            onSave={handleSaveCopilotConfiguration}
          />
        ),
      };
    }

    switch (activeSection) {
      case 'copilots':
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search copilots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'archived') => setStatusFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="w-4 h-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortBy('name')}>
                          Sort by Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('type')}>
                          Sort by Type
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('status')}>
                          Sort by Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* View Toggle */}
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCopilots.map((copilot) => (
                    <CopilotCard
                      key={copilot.id}
                      copilot={copilot}
                      onStartChat={handleStartChat}
                      onEdit={handleEditCopilot}
                      onDuplicate={handleDuplicateCopilot}
                      onArchive={handleArchiveCopilot}
                      onDelete={handleDeleteCopilot}
                    />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCopilots.map((copilot) => (
                        <TableRow key={copilot.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-xs font-semibold`}>
                                {copilot.avatar}
                              </div>
                              {copilot.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {copilot.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${copilot.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <span className="capitalize">{copilot.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {copilot.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleStartChat(copilot)}>
                                Chat
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditCopilot(copilot)}>
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    More
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleDuplicateCopilot(copilot)}>
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteCopilot(copilot)} className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Empty State */}
              {filteredCopilots.length === 0 && (
                <div className="text-center py-12">
                  <Monitor className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No copilots found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by creating your first copilot'
                    }
                  </p>
                </div>
              )}
            </div>
          ),
        };
      case 'agents':
        return {
          title: 'Agents',
          subtitle: 'Individual AI agents that can be combined into copilots',
          content: <SampleScreen section="agents" />,
        };
      case 'tools':
        return {
          title: 'Tools',
          subtitle: 'External tools and integrations available to your copilots',
          content: <SampleScreen section="tools" />,
        };
      case 'workflows':
        return {
          title: 'Workflows',
          subtitle: 'Automated workflows and processes for your copilots',
          content: <SampleScreen section="workflows" />,
        };
      case 'knowledge-base':
        return {
          title: 'Knowledge Base',
          subtitle: 'Manage knowledge articles and documentation for your copilots',
          content: <SampleScreen section="knowledge-base" />,
        };
      case 'profile-fields':
        return {
          title: 'Profile Fields',
          subtitle: 'Custom fields to collect additional user information',
          content: <SampleScreen section="profile-fields" />,
        };
      case 'subscriptions':
        return {
          title: 'Subscriptions',
          subtitle: 'Manage user subscriptions and billing information',
          content: <SampleScreen section="subscriptions" />,
        };
      case 'conversations':
        return {
          title: 'Conversations',
          subtitle: 'View and manage all user conversations with copilots',
          content: <SampleScreen section="conversations" />,
        };
      case 'analytics':
        return {
          title: 'Analytics',
          subtitle: 'Performance metrics and insights for your copilots',
          content: <SampleScreen section="analytics" />,
        };
      case 'users':
        return {
          title: 'Users',
          subtitle: 'Manage user accounts and permissions',
          content: <SampleScreen section="users" />,
        };
      default:
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search copilots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'archived') => setStatusFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="w-4 h-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortBy('name')}>
                          Sort by Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('type')}>
                          Sort by Type
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('status')}>
                          Sort by Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* View Toggle */}
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCopilots.map((copilot) => (
                    <CopilotCard
                      key={copilot.id}
                      copilot={copilot}
                      onStartChat={handleStartChat}
                      onEdit={handleEditCopilot}
                      onDuplicate={handleDuplicateCopilot}
                      onArchive={handleArchiveCopilot}
                      onDelete={handleDeleteCopilot}
                    />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCopilots.map((copilot) => (
                        <TableRow key={copilot.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-xs font-semibold`}>
                                {copilot.avatar}
                              </div>
                              {copilot.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {copilot.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${copilot.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <span className="capitalize">{copilot.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {copilot.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleStartChat(copilot)}>
                                Chat
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditCopilot(copilot)}>
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    More
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleDuplicateCopilot(copilot)}>
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteCopilot(copilot)} className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Empty State */}
              {filteredCopilots.length === 0 && (
                <div className="text-center py-12">
                  <Monitor className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No copilots found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by creating your first copilot'
                    }
                  </p>
                </div>
              )}
            </div>
          ),
        };
    }
  };

  const sectionContent = getSectionContent();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-sidebar-border flex flex-col bg-[#e6eeef] transition-all duration-300`}>
        {/* Logo and Toggle */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            {!sidebarCollapsed && (
              <img 
                src={knolliLogo}
                alt="Knolli Logo" 
                className="h-8 w-auto"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-sidebar-foreground hover:text-sidebar-primary"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </Button>
          </div>
          {!sidebarCollapsed && (
            <WorkspaceSelector
              currentWorkspace={currentWorkspace}
              workspaces={workspaces}
              onWorkspaceChange={handleWorkspaceChange}
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    onClick={() => handleSectionChange(item.id as NavigationSection)}
                    className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start gap-3'} ${
                      isActive 
                        ? 'text-sidebar-primary bg-sidebar-accent' 
                        : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {!sidebarCollapsed && item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-sidebar-border">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center" title={sidebarCollapsed ? "John Doe" : undefined}>
              <span className="text-sm font-medium text-muted-foreground">JD</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-sidebar-foreground truncate">John Doe</div>
                <div className="text-xs text-muted-foreground truncate">john.doe@company.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Attachment Sidebar */}
      {showAttachmentSidebar && (
        <div className="w-80 border-r border-sidebar-border flex flex-col" style={{ backgroundColor: '#f3f4f7' }}>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Attachments</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAttachmentSidebar(false);
                setSidebarCollapsed(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 flex flex-col">
            {/* All Files - Takes up most of the space */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <h4 className="text-sm font-medium text-foreground">All Files</h4>
              <div className="space-y-2">
                <div 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFiles.includes('Project_Brief.pdf') 
                      ? 'bg-white hover:bg-muted/30' 
                      : 'bg-white hover:bg-muted/30'
                  }`}
                  style={{
                    borderColor: selectedFiles.includes('Project_Brief.pdf') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('Project_Brief.pdf')}
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Project_Brief.pdf</div>
                    <div className="text-xs text-muted-foreground">2 hours ago • 1.2 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('logo_design.png') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('logo_design.png')}
                >
                  <Image className="w-4 h-4 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">logo_design.png</div>
                    <div className="text-xs text-muted-foreground">Yesterday • 856 KB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('background_music.mp3') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('background_music.mp3')}
                >
                  <Music className="w-4 h-4 text-purple-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">background_music.mp3</div>
                    <div className="text-xs text-muted-foreground">3 days ago • 4.8 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('demo_video.mp4') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('demo_video.mp4')}
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">demo_video.mp4</div>
                    <div className="text-xs text-muted-foreground">1 week ago • 24.5 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('presentation.pptx') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('presentation.pptx')}
                >
                  <FileText className="w-4 h-4 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">presentation.pptx</div>
                    <div className="text-xs text-muted-foreground">1 week ago • 3.2 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('data_export.csv') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('data_export.csv')}
                >
                  <File className="w-4 h-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">data_export.csv</div>
                    <div className="text-xs text-muted-foreground">2 weeks ago • 540 KB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('screenshot_2024.jpg') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('screenshot_2024.jpg')}
                >
                  <Image className="w-4 h-4 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">screenshot_2024.jpg</div>
                    <div className="text-xs text-muted-foreground">2 weeks ago • 1.8 MB</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Import Options - Fixed at bottom */}
            <div className="border-t p-4 space-y-2">
              <Button className="w-full justify-start gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Import from Google Drive
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f2f2f2' }}>
        {/* Combined scrollable content */}
        <div className={`${chatCopilot || configuringCopilot ? 'h-full' : 'p-8'}`}>
          {/* Top Bar - Hidden when in chat or configuration mode */}
          {!chatCopilot && !configuringCopilot && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{sectionContent.title}</h1>
                  <p className="text-muted-foreground mt-1">{sectionContent.subtitle}</p>
                </div>
                {activeSection === 'copilots' && (
                  <CreateCopilotModal onCreateCopilot={handleCreateCopilot} />
                )}
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className={chatCopilot || configuringCopilot ? 'h-full' : ''}>
            {sectionContent.content}
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      <EditCopilotModal
        isOpen={!!editingCopilot}
        copilot={editingCopilot}
        onClose={() => setEditingCopilot(null)}
        onUpdateCopilot={handleUpdateCopilot}
      />
    </div>
  );
}
