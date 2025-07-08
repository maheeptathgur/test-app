import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot, Wrench, Workflow, Settings, Zap, FileText, MessageSquare, Database, Search, Calendar, Mail, Phone, Globe, BarChart3, Shield, Users } from "lucide-react";

interface ComponentDetailsModalProps {
  isOpen: boolean;
  component: {
    name: string;
    type: 'agent' | 'tool' | 'workflow';
  } | null;
  onClose: () => void;
}

// Mock data for component details
const componentDetails = {
  // Agents - matching the actual sample data
  "Content Writer": {
    type: "agent" as const,
    description: "AI-powered content creation agent that generates high-quality articles, blog posts, and marketing copy.",
    capabilities: ["Article Writing", "SEO Optimization", "Tone Adaptation", "Multi-language Support"],
    configuration: {
      "Model": "GPT-4 Turbo",
      "Max Tokens": "4,000",
      "Temperature": "0.7",
      "Response Style": "Professional"
    },
    icon: FileText
  },
  "SEO Optimizer": {
    type: "agent" as const,
    description: "Advanced SEO specialist agent that optimizes content for search engines and improves rankings.",
    capabilities: ["Keyword Research", "Content Optimization", "Meta Tag Generation", "Technical SEO"],
    configuration: {
      "SEO Framework": "Technical + Content",
      "Keyword Database": "Semrush, Ahrefs",
      "Optimization Level": "Advanced",
      "Languages": "Multi-language support"
    },
    icon: Search
  },
  "Media Planner": {
    type: "agent" as const,
    description: "Strategic media planning agent that creates and optimizes advertising campaigns across channels.",
    capabilities: ["Campaign Strategy", "Budget Allocation", "Channel Selection", "Performance Optimization"],
    configuration: {
      "Channels": "Google Ads, Facebook, LinkedIn",
      "Budget Management": "Automated optimization",
      "Targeting": "Advanced audience segmentation",
      "Reporting": "Real-time performance tracking"
    },
    icon: BarChart3
  },
  "Trend Spotter": {
    type: "agent" as const,
    description: "Social media trend analysis agent that identifies viral content and emerging patterns.",
    capabilities: ["Trend Detection", "Viral Content Analysis", "Hashtag Research", "Audience Insights"],
    configuration: {
      "Data Sources": "Twitter, Instagram, TikTok, LinkedIn",
      "Analysis Frequency": "Real-time monitoring",
      "Trend Categories": "Industry-specific + General",
      "Alert System": "Instant notifications for emerging trends"
    },
    icon: Globe
  },
  "Data Analyst": {
    type: "agent" as const,
    description: "Advanced analytics agent that processes data, generates insights, and creates comprehensive reports.",
    capabilities: ["Data Processing", "Statistical Analysis", "Visualization", "Trend Identification"],
    configuration: {
      "Data Sources": "PostgreSQL, API Endpoints",
      "Analysis Depth": "Advanced",
      "Report Format": "PDF, Excel, JSON",
      "Update Frequency": "Real-time"
    },
    icon: BarChart3
  },
  "Help Desk Agent": {
    type: "agent" as const,
    description: "Technical support agent specialized in troubleshooting and providing step-by-step solutions.",
    capabilities: ["Technical Troubleshooting", "Documentation Search", "Solution Guidance", "Ticket Management"],
    configuration: {
      "Expertise Level": "Expert",
      "Response Mode": "Interactive",
      "Documentation Access": "Full Technical Library",
      "Escalation Path": "L2 Technical Support"
    },
    icon: Shield
  },

  // Tools - matching sample data
  "Grammarly": {
    type: "tool" as const,
    description: "Advanced grammar and writing assistant that improves content quality and readability.",
    capabilities: ["Grammar Checking", "Style Suggestions", "Plagiarism Detection", "Tone Analysis"],
    configuration: {
      "Integration": "Real-time API",
      "Languages": "30+ languages supported",
      "Writing Goals": "Audience-specific optimization",
      "Premium Features": "Advanced suggestions enabled"
    },
    icon: FileText
  },
  "SEMrush": {
    type: "tool" as const,
    description: "Comprehensive SEO and digital marketing toolkit for competitive analysis and optimization.",
    capabilities: ["Keyword Research", "Competitor Analysis", "Site Audit", "Rank Tracking"],
    configuration: {
      "API Access": "Professional tier",
      "Database Size": "25+ billion keywords", 
      "Geographic Coverage": "Global + Local markets",
      "Report Types": "Automated + Custom dashboards"
    },
    icon: Search
  },
  "HubSpot": {
    type: "tool" as const,
    description: "All-in-one CRM and marketing automation platform for lead management and nurturing.",
    capabilities: ["CRM Management", "Email Marketing", "Lead Scoring", "Pipeline Tracking"],
    configuration: {
      "Plan": "Marketing Hub Professional",
      "Contacts": "Unlimited contact storage",
      "Automation": "Advanced workflow builder",
      "Integration": "1000+ app connections"
    },
    icon: Users
  },
  "Mailchimp": {
    type: "tool" as const,
    description: "Email marketing platform with automation, analytics, and audience management features.",
    capabilities: ["Email Campaigns", "Automation Workflows", "A/B Testing", "Analytics"],
    configuration: {
      "Plan": "Standard tier",
      "Contacts": "50,000 subscriber limit",
      "Sends": "500,000 emails/month",
      "Features": "Advanced segmentation + reporting"
    },
    icon: Mail
  },
  "Google Analytics": {
    type: "tool" as const,
    description: "Web analytics platform that tracks and reports website traffic and user behavior.",
    capabilities: ["Traffic Analysis", "User Behavior", "Conversion Tracking", "Custom Reports"],
    configuration: {
      "Version": "Google Analytics 4",
      "Properties": "Multiple site tracking",
      "Data Retention": "14 months",
      "Goals": "Custom conversion events"
    },
    icon: BarChart3
  },
  "Hootsuite": {
    type: "tool" as const,
    description: "Social media management platform for scheduling, monitoring, and analyzing social content.",
    capabilities: ["Content Scheduling", "Social Listening", "Analytics", "Team Collaboration"],
    configuration: {
      "Plan": "Professional",
      "Accounts": "10 social profiles",
      "Scheduling": "Unlimited posts",
      "Team Members": "5 user access"
    },
    icon: Globe
  },
  "Knowledge Base Tool": {
    type: "tool" as const,
    description: "Intelligent knowledge management system that organizes and retrieves information efficiently.",
    capabilities: ["Document Indexing", "Semantic Search", "Auto-categorization", "Version Control"],
    configuration: {
      "Storage Backend": "Vector Database",
      "Search Method": "Semantic + Keyword",
      "Document Types": "PDF, DOCX, HTML, MD",
      "Access Control": "Role-based"
    },
    icon: Database
  },
  "Ticket Tool": {
    type: "tool" as const,
    description: "Advanced ticketing system for managing customer inquiries and support requests.",
    capabilities: ["Ticket Creation", "Priority Assignment", "Status Tracking", "SLA Management"],
    configuration: {
      "Integration": "Zendesk, Freshdesk",
      "Auto-assignment": "Skill-based routing",
      "SLA Tracking": "Real-time monitoring",
      "Escalation Rules": "Priority-based"
    },
    icon: Settings
  },
  "Report Tool": {
    type: "tool" as const,
    description: "Powerful reporting engine that generates customizable reports and dashboards.",
    capabilities: ["Custom Reports", "Automated Scheduling", "Data Visualization", "Export Options"],
    configuration: {
      "Report Types": "Standard, Custom, Ad-hoc",
      "Scheduling": "Hourly, Daily, Weekly, Monthly",
      "Export Formats": "PDF, Excel, CSV, JSON",
      "Distribution": "Email, Slack, API"
    },
    icon: FileText
  },
  "Email Tool": {
    type: "tool" as const,
    description: "Automated email management system for sending, tracking, and analyzing email communications.",
    capabilities: ["Template Management", "Bulk Sending", "Tracking Analytics", "A/B Testing"],
    configuration: {
      "Email Provider": "SendGrid, Mailgun",
      "Template Engine": "Handlebars",
      "Tracking": "Opens, Clicks, Bounces",
      "Rate Limiting": "Configured per provider"
    },
    icon: Mail
  },
  "Calendar Tool": {
    type: "tool" as const,
    description: "Smart scheduling tool that manages appointments, meetings, and automated booking systems.",
    capabilities: ["Appointment Scheduling", "Calendar Integration", "Automated Reminders", "Availability Management"],
    configuration: {
      "Calendar Sync": "Google Calendar, Outlook",
      "Booking Rules": "Custom availability windows",
      "Reminders": "Email, SMS, Push notifications",
      "Time Zones": "Automatic detection and conversion"
    },
    icon: Calendar
  },

  // Workflows - matching sample data
  "Campaign Planning": {
    type: "workflow" as const,
    description: "Strategic marketing campaign workflow that plans, executes, and optimizes multi-channel campaigns.",
    capabilities: ["Campaign Strategy", "Budget Planning", "Timeline Management", "Performance Tracking"],
    configuration: {
      "Stages": "Strategy → Planning → Execution → Analysis",
      "Channels": "Email, Social, Paid Ads, Content",
      "Budget Management": "Automated allocation and tracking",
      "Approval Process": "Multi-stage campaign approvals"
    },
    icon: Workflow
  },
  "Support Workflow": {
    type: "workflow" as const,
    description: "Customer support workflow that routes, prioritizes, and resolves customer inquiries efficiently.",
    capabilities: ["Auto-routing", "Priority Assignment", "Escalation Management", "Resolution Tracking"],
    configuration: {
      "Routing Rules": "Skill-based, Load balancing",
      "Priority Levels": "Low, Medium, High, Critical",
      "Escalation Time": "2 hours for high priority",
      "SLA Targets": "Response: 1hr, Resolution: 24hr"
    },
    icon: Users
  },
  "Escalation Workflow": {
    type: "workflow" as const,
    description: "Automated escalation system that handles complex issues requiring higher-level intervention.",
    capabilities: ["Issue Detection", "Auto-escalation", "Stakeholder Notification", "Resolution Tracking"],
    configuration: {
      "Trigger Conditions": "Time-based, Complexity-based",
      "Escalation Levels": "L1 → L2 → L3 → Management",
      "Notification Methods": "Email, Slack, SMS",
      "Response SLA": "30 minutes for critical issues"
    },
    icon: Zap
  },
  "Analysis Workflow": {
    type: "workflow" as const,
    description: "Comprehensive data analysis workflow that processes data, generates insights, and distributes reports.",
    capabilities: ["Data Collection", "Processing", "Analysis", "Report Generation"],
    configuration: {
      "Data Sources": "Multiple databases and APIs",
      "Processing Schedule": "Hourly data sync",
      "Analysis Types": "Descriptive, Predictive, Prescriptive",
      "Report Distribution": "Automated to stakeholders"
    },
    icon: BarChart3
  },
  "Notification Workflow": {
    type: "workflow" as const,
    description: "Multi-channel notification system that delivers timely alerts and updates across platforms.",
    capabilities: ["Multi-channel Delivery", "Smart Routing", "Delivery Tracking", "Failure Handling"],
    configuration: {
      "Channels": "Email, SMS, Slack, Push notifications",
      "Routing Logic": "User preferences, Urgency level",
      "Retry Policy": "3 attempts with backoff",
      "Delivery Reports": "Real-time status tracking"
    },
    icon: Globe
  }
};

export function ComponentDetailsModal({ isOpen, component, onClose }: ComponentDetailsModalProps) {
  if (!component) return null;

  const details = componentDetails[component.name as keyof typeof componentDetails];
  
  // Fallback for unknown components
  if (!details) {
    const fallbackDetails = {
      type: component.type,
      description: `${component.type.charAt(0).toUpperCase() + component.type.slice(1)} component that provides specialized functionality for your copilot.`,
      capabilities: ["Custom Integration", "Automated Processing", "Real-time Updates", "Advanced Configuration"],
      configuration: {
        "Status": "Active",
        "Integration": "Custom API",
        "Configuration": "Default settings applied",
        "Last Updated": "Recently configured"
      },
      icon: component.type === 'agent' ? Bot : component.type === 'tool' ? Wrench : Workflow
    };
    
    const Icon = fallbackDetails.icon;
    const typeColor = component.type === 'agent' ? 'bg-purple-100 text-purple-700' :
                     component.type === 'tool' ? 'bg-blue-100 text-blue-700' :
                     'bg-amber-100 text-amber-700';

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${typeColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-semibold">{component.name}</span>
                <Badge variant="secondary" className={`ml-2 text-xs ${typeColor}`}>
                  {component.type}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{fallbackDetails.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Capabilities</h3>
              <div className="grid grid-cols-2 gap-2">
                {fallbackDetails.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    <span className="text-gray-600">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Configuration</h3>
              <div className="space-y-3">
                {Object.entries(fallbackDetails.configuration).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))] flex-shrink-0 w-1/3">{key}:</span>
                    <span className="text-sm text-gray-600 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const Icon = details.icon;
  const typeColor = component.type === 'agent' ? 'bg-purple-100 text-purple-700' :
                   component.type === 'tool' ? 'bg-blue-100 text-blue-700' :
                   'bg-amber-100 text-amber-700';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${typeColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-semibold">{component.name}</span>
              <Badge variant="secondary" className={`ml-2 text-xs ${typeColor}`}>
                {component.type}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{details.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Capabilities</h3>
            <div className="grid grid-cols-2 gap-2">
              {details.capabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                  <span className="text-gray-600">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Configuration</h3>
            <div className="space-y-3">
              {Object.entries(details.configuration).map(([key, value], index) => (
                <div key={index} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-[hsl(var(--foreground))] flex-shrink-0 w-1/3">{key}:</span>
                  <span className="text-sm text-gray-600 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}