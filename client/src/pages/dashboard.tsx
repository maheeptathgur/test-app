import { useState, useEffect } from "react";
import { Monitor, Users, Settings, BarChart3, BookOpen, UserCog, CreditCard, MessageSquare, TrendingUp, Shield } from "lucide-react";
import knolliLogo from "@assets/image_1751267938774.png";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WorkspaceSelector } from "@/components/workspace-selector";
import { CopilotCard } from "@/components/copilot-card";
import { ChatInterface } from "@/components/chat-interface";
import { CreateCopilotModal } from "@/components/create-copilot-modal";
import { EditCopilotModal } from "@/components/edit-copilot-modal";
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
    status: 'online',
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
    status: 'online',
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
    status: 'offline',
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
  { id: 'profile-fields', label: 'Profile Fields', icon: UserCog },
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
    showNotification(`Started chat with ${copilot.name}`);
  };

  const handleEditCopilot = (copilot: CopilotData) => {
    setEditingCopilot(copilot);
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
      status: 'online',
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

  const getSectionContent = (): { title: string; subtitle: string; content: React.ReactNode } => {
    switch (activeSection) {
      case 'copilots':
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {copilots.map((copilot) => (
                <CopilotCard
                  key={copilot.id}
                  copilot={copilot}
                  onStartChat={handleStartChat}
                  onEdit={handleEditCopilot}
                  onDuplicate={handleDuplicateCopilot}
                  onDelete={handleDeleteCopilot}
                />
              ))}
            </div>
          ),
        };
      case 'agents':
        return {
          title: 'Agents',
          subtitle: 'Individual AI agents that can be combined into copilots',
          content: (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No agents configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first agent.</p>
            </div>
          ),
        };
      case 'tools':
        return {
          title: 'Tools',
          subtitle: 'External tools and integrations available to your copilots',
          content: (
            <div className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No tools configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">Connect external tools to enhance your copilots.</p>
            </div>
          ),
        };
      case 'workflows':
        return {
          title: 'Workflows',
          subtitle: 'Automated workflows and processes for your copilots',
          content: (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No workflows configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create automated workflows to streamline your processes.</p>
            </div>
          ),
        };
      case 'knowledge-base':
        return {
          title: 'Knowledge Base',
          subtitle: 'Manage knowledge articles and documentation for your copilots',
          content: (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No knowledge articles</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create knowledge articles to help your copilots provide better responses.</p>
            </div>
          ),
        };
      case 'profile-fields':
        return {
          title: 'Profile Fields',
          subtitle: 'Custom fields to collect additional user information',
          content: (
            <div className="text-center py-12">
              <UserCog className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No profile fields configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add custom fields to gather more information from your users.</p>
            </div>
          ),
        };
      case 'subscriptions':
        return {
          title: 'Subscriptions',
          subtitle: 'Manage user subscriptions and billing information',
          content: (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No active subscriptions</h3>
              <p className="mt-1 text-sm text-muted-foreground">View and manage user subscription plans and billing.</p>
            </div>
          ),
        };
      case 'conversations':
        return {
          title: 'Conversations',
          subtitle: 'View and manage all user conversations with copilots',
          content: (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No conversations yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">User conversations with copilots will appear here.</p>
            </div>
          ),
        };
      case 'analytics':
        return {
          title: 'Analytics',
          subtitle: 'Performance metrics and insights for your copilots',
          content: (
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No analytics data</h3>
              <p className="mt-1 text-sm text-muted-foreground">Analytics and performance metrics will be displayed here.</p>
            </div>
          ),
        };
      case 'users':
        return {
          title: 'Users',
          subtitle: 'Manage user accounts and permissions',
          content: (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No users configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add and manage user accounts and their permissions.</p>
            </div>
          ),
        };
      default:
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {copilots.map((copilot) => (
                <CopilotCard
                  key={copilot.id}
                  copilot={copilot}
                  onStartChat={handleStartChat}
                  onEdit={handleEditCopilot}
                  onDuplicate={handleDuplicateCopilot}
                  onDelete={handleDeleteCopilot}
                />
              ))}
            </div>
          ),
        };
    }
  };

  const sectionContent = getSectionContent();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-sidebar-border flex flex-col bg-[#e6eeef]">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={knolliLogo}
              alt="Knolli Logo" 
              className="h-8 w-auto"
            />
          </div>
          <WorkspaceSelector
            currentWorkspace={currentWorkspace}
            workspaces={workspaces}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    onClick={() => handleSectionChange(item.id as NavigationSection)}
                    className={`w-full justify-start gap-3 ${
                      isActive 
                        ? 'text-sidebar-primary bg-sidebar-accent' 
                        : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">John Doe</div>
              <div className="text-xs text-muted-foreground truncate">john.doe@company.com</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{sectionContent.title}</h1>
              <p className="text-muted-foreground mt-1">{sectionContent.subtitle}</p>
            </div>
            {(activeSection === 'copilots' || activeSection === 'knowledge-base' || activeSection === 'profile-fields') && (
              <CreateCopilotModal onCreateCopilot={handleCreateCopilot} />
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 overflow-y-auto">
          {sectionContent.content}
        </div>
      </div>
      {/* Chat Interface */}
      <ChatInterface
        isOpen={!!chatCopilot}
        copilot={chatCopilot}
        onClose={() => setChatCopilot(null)}
      />
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
