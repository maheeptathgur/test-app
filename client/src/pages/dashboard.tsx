import { useState, useEffect } from "react";
import { Monitor, Users, Settings, BarChart3, BookOpen, UserCog, CreditCard, MessageSquare, TrendingUp, Shield, Grid, List, Search, Filter, ArrowUpDown, PanelLeftClose, PanelLeftOpen, Upload, FileText, Music, Video, Image, File, X, ChevronDown, LogOut, User, Trash2, Check, LayoutDashboard, Bot, Headphones } from "lucide-react";
import { SiGoogledrive } from "react-icons/si";
import knolliLogo from "@assets/image_1751267938774.png";
import knolliIcon from "@assets/favicon-256_1751332849559.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import { WorkspaceSettings } from "@/components/workspace-settings";
import { UserView } from "@/components/user-view";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";
import { Workspace, CopilotData, NavigationSection } from "@/lib/types";

const workspaces: Workspace[] = [
  { id: '1', name: 'My Workspace', type: 'Personal', avatar: 'M', color: 'bg-blue-500' },
  { id: '2', name: 'Team Alpha', type: 'Shared', avatar: 'T', color: 'bg-green-500' },
  { id: '3', name: 'Enterprise', type: 'Organization', avatar: 'E', color: 'bg-purple-500' },
];

const recentConversations = [
  {
    id: '1',
    title: 'Marketing Campaign Ideas',
    copilot: 'Content Assistant',
    lastMessage: 'Here are 5 creative campaign concepts for the Q2 launch...',
    timestamp: '2 hours ago',
    isActive: false,
    messages: [
      {
        id: '1-1',
        content: 'Hi! I need help brainstorming marketing campaign ideas for our Q2 product launch. The product is a new fitness tracking app.',
        sender: 'user' as const,
        timestamp: '2 hours ago'
      },
      {
        id: '1-2',
        content: 'Great! I\'d love to help you brainstorm marketing campaign ideas for your fitness tracking app. Here are 5 creative campaign concepts for the Q2 launch:\n\n**1. "Track Your Journey" Challenge Campaign**\n- 30-day social media challenge where users share their fitness progress\n- Gamification with weekly prizes and ultimate grand prize\n- User-generated content builds community and social proof\n\n**2. "Fitness Without Borders" Influencer Collaboration**\n- Partner with micro-influencers from different countries\n- Showcase diverse fitness cultures and routines\n- Create localized content for different markets\n\n**3. "From Couch to 5K" Transformation Stories**\n- Document real users\' transformation journeys\n- Before/after testimonials and progress tracking\n- Emotional storytelling approach\n\n**4. "Smart Goals, Smarter Results" Educational Series**\n- Weekly fitness tips and goal-setting workshops\n- Expert collaborations with trainers and nutritionists\n- Position your app as the smart choice for goal achievement\n\n**5. "Workout Buddy" Referral Program**\n- Incentivize users to invite friends\n- Collaborative challenges for friend groups\n- Social features highlighting community aspect\n\nWhich of these resonates most with your brand vision?',
        sender: 'bot' as const,
        timestamp: '2 hours ago'
      },
      {
        id: '1-3',
        content: 'I love the "Track Your Journey" challenge idea! Can you help me develop this concept further? What specific mechanics would work best?',
        sender: 'user' as const,
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: '2',
    title: 'Product Pricing Strategy',
    copilot: 'Business Analyst',
    lastMessage: 'Based on the competitive analysis, I recommend...',
    timestamp: 'Yesterday',
    isActive: false,
    messages: [
      {
        id: '2-1',
        content: 'I need help developing a pricing strategy for our SaaS product. We\'re competing with established players but offer unique AI features.',
        sender: 'user' as const,
        timestamp: 'Yesterday'
      },
      {
        id: '2-2',
        content: 'Based on the competitive analysis, I recommend a value-based pricing strategy with three tiers:\n\n**Starter Plan - $29/month**\n- Core features without AI\n- Up to 5 users\n- Basic support\n- Position as entry point for small teams\n\n**Professional Plan - $79/month** (Most Popular)\n- All core features + AI capabilities\n- Up to 25 users\n- Priority support + training\n- Sweet spot for growing businesses\n\n**Enterprise Plan - $199/month**\n- Full feature set + advanced AI\n- Unlimited users\n- Dedicated success manager\n- Custom integrations\n\n**Key considerations:**\n- Price anchoring with the high-end plan\n- Clear value differentiation through AI features\n- Room for annual discount (15-20%)\n- Freemium option to drive adoption\n\nThis positions you 15-20% below premium competitors while highlighting your AI advantage. Would you like me to break down the revenue projections?',
        sender: 'bot' as const,
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: '3',
    title: 'Customer Support Guidelines',
    copilot: 'Customer Support',
    lastMessage: 'I\'ve drafted the new response templates for...',
    timestamp: '2 days ago',
    isActive: false,
    messages: [
      {
        id: '3-1',
        content: 'We need to update our customer support guidelines to be more empathetic and solution-focused. Can you help draft new response templates?',
        sender: 'user' as const,
        timestamp: '2 days ago'
      },
      {
        id: '3-2',
        content: 'I\'ve drafted new response templates for common support scenarios, focusing on empathy and solutions:\n\n**For Technical Issues:**\n"I understand how frustrating technical issues can be, especially when you\'re trying to [specific task]. Let me help you resolve this right away. I\'ve found that [solution] typically resolves this issue within minutes. If that doesn\'t work, I\'ll personally ensure we find an alternative solution for you."\n\n**For Billing Concerns:**\n"I completely understand your concern about this charge, and I want to make sure we get this sorted out for you today. Let me review your account details and explain exactly what happened. [Specific explanation]. Here\'s what I\'ll do to make this right..."\n\n**For Feature Requests:**\n"Thank you for taking the time to share this suggestion! It\'s feedback like yours that helps us improve our product. I\'ve added your request to our product roadmap for consideration. In the meantime, here are a couple of workarounds that might help you achieve what you\'re looking for..."\n\nEach template includes acknowledgment, empathy, immediate action, and follow-up commitment. Would you like me to develop templates for specific scenarios?',
        sender: 'bot' as const,
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: '4',
    title: 'Q4 Performance Review',
    copilot: 'Business Analyst',
    lastMessage: 'The quarterly metrics show significant growth in...',
    timestamp: '1 week ago',
    isActive: false,
    messages: [
      {
        id: '4-1',
        content: 'Can you help me analyze our Q4 performance metrics and prepare a summary for the board meeting?',
        sender: 'user' as const,
        timestamp: '1 week ago'
      },
      {
        id: '4-2',
        content: 'The quarterly metrics show significant growth in key areas:\n\n**Revenue Performance:**\n- Q4 Revenue: $2.8M (32% YoY growth)\n- Recurring Revenue: $2.1M (94% of total)\n- New Customer Acquisition: 847 customers (+28%)\n\n**Operational Efficiency:**\n- Customer Acquisition Cost: $89 (down 15%)\n- Lifetime Value: $1,247 (up 22%)\n- Churn Rate: 3.2% (industry best-in-class)\n\n**Key Highlights:**\n- Exceeded revenue targets by 12%\n- Improved unit economics across all metrics\n- Strong product-market fit indicators\n- Successful expansion into two new markets\n\n**Areas for Focus:**\n- Scale customer success team (growing satisfaction scores)\n- Invest in product development (high feature request volume)\n- Expand marketing in high-performing channels\n\nThe data supports continued growth trajectory and validates our strategic investments. Ready for detailed breakdown by segment?',
        sender: 'bot' as const,
        timestamp: '1 week ago'
      }
    ]
  },
  {
    id: '5',
    title: 'Blog Content Calendar',
    copilot: 'Content Assistant',
    lastMessage: 'I\'ve created a 30-day content schedule focusing on...',
    timestamp: '1 week ago',
    isActive: false,
    messages: [
      {
        id: '5-1',
        content: 'I need help creating a content calendar for our company blog. We want to publish 3 times per week and focus on thought leadership.',
        sender: 'user' as const,
        timestamp: '1 week ago'
      },
      {
        id: '5-2',
        content: 'I\'ve created a 30-day content schedule focusing on thought leadership:\n\n**Week 1: Industry Insights**\n- Monday: "The Future of Remote Work: 5 Trends Shaping 2024"\n- Wednesday: "AI in Business: Beyond the Hype to Real Applications"\n- Friday: "Customer Experience Revolution: What We Learned from 1000+ Surveys"\n\n**Week 2: Expert Perspectives**\n- Monday: "Interview: How [Industry Leader] Built a $100M Company"\n- Wednesday: "Data-Driven Decision Making: A Framework for Startups"\n- Friday: "The Psychology of User Adoption: Behavioral Insights"\n\n**Week 3: Deep Dives**\n- Monday: "Complete Guide to Product-Market Fit Validation"\n- Wednesday: "Building High-Performance Teams: 7 Non-Negotiable Principles"\n- Friday: "Scaling Customer Success: From 10 to 10,000 Customers"\n\n**Week 4: Forward-Looking**\n- Monday: "Predictions: How Technology Will Transform Your Industry"\n- Wednesday: "Building for the Next Decade: Strategic Planning"\n- Friday: "Monthly Roundup: Key Insights and What\'s Next"\n\nEach post includes SEO optimization, social media snippets, and email newsletter integration. Would you like me to develop specific outlines for any of these topics?',
        sender: 'bot' as const,
        timestamp: '1 week ago'
      }
    ]
  },
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
    favorite: true,
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
    favorite: true,
    components: [
      { name: 'Campaign Planning', type: 'workflow' },
      { name: 'Media Planner', type: 'agent' },
      { name: 'HubSpot', type: 'tool' },
      { name: 'Mailchimp', type: 'tool' },
    ],
    profileFields: [
      {
        id: 'title',
        name: 'title',
        label: 'Job Title',
        type: 'text',
        required: true,
        description: 'Your current position or role'
      },
      {
        id: 'company',
        name: 'company',
        label: 'Company',
        type: 'text',
        required: true,
        description: 'Name of your organization'
      },
      {
        id: 'industry',
        name: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        description: 'Primary business sector',
        options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Other']
      },
      {
        id: 'budget',
        name: 'budget',
        label: 'Marketing Budget',
        type: 'select',
        required: false,
        description: 'Monthly marketing budget range',
        options: ['Under $10K', '$10K-$50K', '$50K-$100K', '$100K-$500K', '$500K+']
      },
      {
        id: 'goals',
        name: 'goals',
        label: 'Campaign Goals',
        type: 'textarea',
        required: true,
        description: 'What do you want to achieve with your campaigns?'
      },
      {
        id: 'target_audience',
        name: 'target_audience',
        label: 'Target Audience',
        type: 'textarea',
        required: false,
        description: 'Describe your ideal customers'
      }
    ]
  },
  {
    id: '3',
    name: 'Social Analyst',
    description: 'Analyzes social media performance, tracks trends, and provides insights for optimization.',
    status: 'archived',
    avatar: 'SA',
    avatarColor: 'bg-orange-100 text-orange-600',
    type: 'analyst',
    favorite: false,
    components: [
      { name: 'Data Analyst', type: 'agent' },
      { name: 'Trend Spotter', type: 'agent' },
      { name: 'Google Analytics', type: 'tool' },
      { name: 'Hootsuite', type: 'tool' },
    ],
  },
  {
    id: '4',
    name: 'Customer Support',
    description: 'Provides 24/7 customer support with intelligent ticket routing and automated responses.',
    status: 'active',
    avatar: 'CS',
    avatarColor: 'bg-purple-100 text-purple-600',
    type: 'support',
    favorite: false,
    components: [
      { name: 'Support Agent', type: 'agent' },
      { name: 'Ticket Router', type: 'agent' },
      { name: 'Zendesk', type: 'tool' },
      { name: 'Intercom', type: 'tool' },
      { name: 'Escalation Flow', type: 'workflow' },
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
  { id: 'workspace-settings', label: 'Workspace Settings', icon: Settings },
  { id: 'user-view', label: 'User View', icon: User },
] as const;

// Helper functions for copilot avatars (copied from CopilotCard)
const getImageUrl = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
    case 'content':
      return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&auto=format';
    case 'analyst':
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format';
    case 'support':
      return 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&auto=format';
    default:
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
  }
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return <Bot className="w-4 h-4 text-white drop-shadow-md" />;
    case 'content':
      return <MessageSquare className="w-4 h-4 text-white drop-shadow-md" />;
    case 'analyst':
      return <BarChart3 className="w-4 h-4 text-white drop-shadow-md" />;
    case 'support':
      return <Headphones className="w-4 h-4 text-white drop-shadow-md" />;
    default:
      return <Bot className="w-4 h-4 text-white drop-shadow-md" />;
  }
};

// Table Avatar Component with solid colors and icons
const TableAvatar = ({ copilot }: { copilot: CopilotData }) => {
  const getAvatarStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'general':
        return 'bg-blue-500';
      case 'content':
        return 'bg-green-500';
      case 'analyst':
        return 'bg-purple-500';
      case 'support':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-10 h-10 aspect-square rounded-full flex items-center justify-center flex-shrink-0 ${getAvatarStyle(copilot.type)}`}>
      {getTypeIcon(copilot.type)}
    </div>
  );
};

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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [copilotToDelete, setCopilotToDelete] = useState<CopilotData | null>(null);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  
  // State for tracking which specific agent/tool/workflow to configure
  const [configureAgent, setConfigureAgent] = useState<{id: string, name: string} | null>(null);
  const [configureTool, setConfigureTool] = useState<{id: string, name: string} | null>(null);
  const [configureWorkflow, setConfigureWorkflow] = useState<{id: string, name: string} | null>(null);

  const [conversations, setConversations] = useState(recentConversations);
  const { toast } = useToast();

  // Handle navigation events from copilot configuration
  useEffect(() => {
    const handleAgentConfigure = (event: CustomEvent) => {
      setConfigureAgent(event.detail);
      setActiveSection('agents');
      setConfiguringCopilot(null); // Close copilot config
    };

    const handleToolConfigure = (event: CustomEvent) => {
      setConfigureTool(event.detail);
      setActiveSection('tools');
      setConfiguringCopilot(null); // Close copilot config
    };

    const handleWorkflowConfigure = (event: CustomEvent) => {
      setConfigureWorkflow(event.detail);
      setActiveSection('workflows');
      setConfiguringCopilot(null); // Close copilot config
    };

    // Handle clearing selected files from document preview pane
    const handleClearSelectedFiles = () => {
      setSelectedFiles([]);
    };

    window.addEventListener('navigate-to-agent-configure', handleAgentConfigure as EventListener);
    window.addEventListener('navigate-to-tool-configure', handleToolConfigure as EventListener);
    window.addEventListener('navigate-to-workflow-edit', handleWorkflowConfigure as EventListener);
    window.addEventListener('clearSelectedFiles', handleClearSelectedFiles);

    return () => {
      window.removeEventListener('navigate-to-agent-configure', handleAgentConfigure as EventListener);
      window.removeEventListener('navigate-to-tool-configure', handleToolConfigure as EventListener);
      window.removeEventListener('navigate-to-workflow-edit', handleWorkflowConfigure as EventListener);
      window.removeEventListener('clearSelectedFiles', handleClearSelectedFiles);
    };
  }, []);

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
    // Clear conversation history for new chats
    setConversationHistory([]);
  };

  const handleLoadConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      // Find the copilot that matches this conversation
      const copilot = copilots.find(c => c.name === conversation.copilot);
      if (copilot) {
        setChatCopilot(copilot);
        // Set the conversation history to load existing messages
        setConversationHistory(conversation.messages);
      }
    }
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
    setCopilots(prev => prev.map(c => 
      c.id === copilot.id 
        ? { ...c, status: c.status === 'active' ? 'archived' : 'active' }
        : c
    ));
    const newStatus = copilot.status === 'active' ? 'archived' : 'active';
    showNotification(`${newStatus === 'archived' ? 'Archived' : 'Restored'} copilot: ${copilot.name}`);
  };

  const handleDeleteCopilot = (copilot: CopilotData) => {
    setCopilotToDelete(copilot);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (copilotToDelete) {
      setCopilots(prev => prev.filter(c => c.id !== copilotToDelete.id));
      showNotification(`Deleted ${copilotToDelete.name}`);
      setCopilotToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setCopilotToDelete(null);
    setDeleteConfirmOpen(false);
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
      favorite: false,
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

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    showNotification('Conversation deleted');
  };

  const handleToggleFavorite = (copilotId: string) => {
    setCopilots(prev => prev.map(copilot =>
      copilot.id === copilotId
        ? { ...copilot, favorite: !copilot.favorite }
        : copilot
    ));
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
            selectedFiles={selectedFiles}
            initialMessages={conversationHistory}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                              <TableAvatar copilot={copilot} />
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
          content: <SampleScreen 
            section="agents" 
            configureAgent={configureAgent}
            onClearConfigureAgent={() => setConfigureAgent(null)}
          />,
        };
      case 'tools':
        return {
          title: 'Tools',
          subtitle: 'External tools and integrations available to your copilots',
          content: <SampleScreen 
            section="tools" 
            configureTool={configureTool}
            onClearConfigureTool={() => setConfigureTool(null)}
          />,
        };
      case 'workflows':
        return {
          title: 'Workflows',
          subtitle: 'Automated workflows and processes for your copilots',
          content: <SampleScreen 
            section="workflows" 
            configureWorkflow={configureWorkflow}
            onClearConfigureWorkflow={() => setConfigureWorkflow(null)}
          />,
        };
      case 'knowledge-base':
        return {
          title: 'Knowledge Base',
          subtitle: 'Manage knowledge articles and documentation for your copilots',
          content: <SampleScreen section="knowledge-base" />,
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
      case 'pricing':
        return {
          title: 'Pricing Plans',
          subtitle: 'Choose the plan that fits your needs',
          content: <SampleScreen section="pricing" />,
        };
      case 'workspace-settings':
        return {
          title: 'Workspace Settings',
          subtitle: 'Configure your workspace preferences and integrations',
          content: <WorkspaceSettings />,
        };
      case 'user-view':
        return {
          title: 'User View Preview',
          subtitle: 'See what your workspace looks like to end users',
          content: <UserView 
            copilots={copilots}
            onToggleFavorite={handleToggleFavorite}
            onStartChat={handleStartChat}
          />,
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                              <TableAvatar copilot={copilot} />
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
        <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'}`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'flex-col gap-3' : 'justify-between'} mb-4`}>
            <img 
              src={sidebarCollapsed ? knolliIcon : knolliLogo}
              alt="Knolli Logo" 
              className={sidebarCollapsed ? "h-8 w-8 rounded-full" : "h-8 w-auto"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-sidebar-foreground hover:text-sidebar-primary"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </Button>
          </div>
          {!sidebarCollapsed && (activeSection !== 'user-view' || (activeSection === 'user-view' && chatCopilot)) && (
            <WorkspaceSelector
              currentWorkspace={currentWorkspace}
              workspaces={workspaces}
              onWorkspaceChange={handleWorkspaceChange}
              copilots={copilots}
              isInChatMode={!!chatCopilot}
              onCopilotSelect={handleStartChat}
            />
          )}

        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-6'} py-6 overflow-y-auto`}>
          {activeSection === 'user-view' && !chatCopilot ? (
            // User View: Simplified navigation for end users
            (<div className="space-y-6">
              {!sidebarCollapsed && (
                <>
                  {/* Quick Access Assistants */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-sidebar-foreground">Your Assistants</h3>
                    <div className="space-y-2">
                      {copilots.filter(c => c.status === 'active' && c.favorite).slice(0, 4).map((copilot) => (
                        <Button
                          key={copilot.id}
                          variant="ghost"
                          onClick={() => handleStartChat(copilot)}
                          className="w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent p-3"
                        >
                          <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-xs font-semibold`}>
                            {copilot.avatar}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-sm font-medium truncate">{copilot.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{copilot.type}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>


                </>
              )}
              {sidebarCollapsed && (
                <div className="space-y-4">
                  {/* Assistant Icons */}
                  {copilots.filter(c => c.status === 'active' && c.favorite).slice(0, 4).map((copilot) => (
                    <Button
                      key={copilot.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStartChat(copilot)}
                      className="w-full p-2 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
                      title={copilot.name}
                    >
                      <div className={`w-6 h-6 ${copilot.avatarColor} rounded text-xs font-semibold flex items-center justify-center`}>
                        {copilot.avatar}
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>)
          ) : chatCopilot ? (
            // Recent Conversations List
            (<div className="space-y-3">
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-sidebar-foreground">Recent Conversations</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatCopilot(null)}
                    className="text-sidebar-foreground hover:text-sidebar-primary"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {sidebarCollapsed && (
                <div className="flex justify-center mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatCopilot(null)}
                    className="text-sidebar-foreground hover:text-sidebar-primary"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`${sidebarCollapsed ? 'p-2' : 'p-3'} rounded-lg transition-all group cursor-pointer ${
                      conversation.isActive 
                        ? 'bg-sidebar-accent text-sidebar-primary' 
                        : 'hover:bg-sidebar-accent hover:text-sidebar-primary'
                    }`}
                    title={sidebarCollapsed ? conversation.title : undefined}
                    onClick={() => handleLoadConversation(conversation.id)}
                  >
                    {sidebarCollapsed ? (
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-6 rounded bg-sidebar-primary/20 flex items-center justify-center cursor-pointer">
                          <MessageSquare className="w-3 h-3" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          title="Delete conversation"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0 cursor-pointer">
                            <h4 className="text-sm font-medium truncate">{conversation.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conversation.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              title="Delete conversation"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate cursor-pointer">{conversation.lastMessage}</p>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-xs text-muted-foreground">{conversation.copilot}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>)
          ) : (
            // Regular Admin Navigation Menu
            (<ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      onClick={() => handleSectionChange(item.id as NavigationSection)}
                      className={`w-full ${sidebarCollapsed ? 'justify-center px-0 py-3' : 'justify-start gap-3'} ${
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
            </ul>)
          )}
        </nav>

        {/* Pricing Plans Button and User Profile */}
        <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'} space-y-3`}>
          {/* Pricing Plans Button - Hidden in user view */}
          {activeSection !== 'user-view' && (
            <>
              {!sidebarCollapsed && (
                <Button 
                  variant="outline"
                  className="w-full bg-white border-2 border-[#008062] text-[#008062] hover:bg-[#008062] hover:text-white transition-colors"
                  onClick={() => handleSectionChange('pricing')}
                >
                  Pricing Plans
                </Button>
              )}
              {sidebarCollapsed && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full bg-white border-2 border-[#008062] text-[#008062] hover:bg-[#008062] hover:text-white transition-colors"
                  title="Pricing Plans"
                  onClick={() => handleSectionChange('pricing')}
                >
                  $
                </Button>
              )}
            </>
          )}

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {sidebarCollapsed ? (
                <div className="w-8 h-8 rounded-full overflow-hidden mx-auto border-2 border-[#008062] cursor-pointer hover:border-[#00d2a0] transition-colors" title="John Doe">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format&face=center" 
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  className="w-full p-3 h-auto bg-[#008062] hover:bg-[#00d2a0] text-white justify-start"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format&face=center" 
                        alt="John Doe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-medium text-white truncate">John Doe</div>
                      <div className="text-xs text-white/80 truncate">john.doe@company.com</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/80" />
                  </div>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {activeSection === 'user-view' ? (
                // Simplified user profile options
                (<>
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleSectionChange('copilots')}
                    className="text-[#008062] hover:text-[#00d2a0]"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Back to Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </>)
              ) : (
                // Admin profile options
                (<>
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </>)
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Attachment Sidebar */}
      {showAttachmentSidebar && (
        <div className="w-64 border-r border-sidebar-border flex flex-col h-full" style={{ backgroundColor: '#f3f4f7' }}>
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Files</h3>
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
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Documents - Takes up most of the space */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0">
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
            <div className="p-4 space-y-2 flex-shrink-0">
              <Button className="w-full justify-start gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 google-drive-btn">
                <SiGoogledrive className="w-4 h-4 google-drive-icon transition-colors" />
                Import from Google Drive
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: '#f2f2f2' }}>
        {/* Combined scrollable content */}
        <div className={`${chatCopilot || configuringCopilot ? 'h-full' : 'h-full p-8 overflow-y-auto'}`}>
          {/* Top Bar - Hidden when in chat, configuration, or user-view mode */}
          {!chatCopilot && !configuringCopilot && activeSection !== 'user-view' && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">{sectionContent.title}</h1>
                    {activeSection === 'copilots' && (
                      <Badge variant="secondary" className="text-sm" style={{ color: '#008062' }}>
                        {copilots.length} Copilots
                      </Badge>
                    )}
                  </div>
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
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        copilotName={copilotToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
