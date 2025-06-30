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
  // Agents
  "Content Generator": {
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
  "Customer Support Agent": {
    type: "agent" as const,
    description: "Intelligent customer service agent that handles inquiries, resolves issues, and escalates complex cases.",
    capabilities: ["Issue Resolution", "FAQ Responses", "Ticket Creation", "Sentiment Analysis"],
    configuration: {
      "Response Time": "< 30 seconds",
      "Escalation Threshold": "3 failed attempts",
      "Knowledge Base": "Customer Support KB",
      "Languages": "English, Spanish, French"
    },
    icon: MessageSquare
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

  // Tools
  "SEO Tool": {
    type: "tool" as const,
    description: "Comprehensive SEO analysis and optimization tool for improving search engine rankings.",
    capabilities: ["Keyword Analysis", "Content Optimization", "Meta Tag Generation", "Competition Analysis"],
    configuration: {
      "API Integration": "Google Search Console",
      "Keyword Database": "Semrush, Ahrefs",
      "Analysis Depth": "Comprehensive",
      "Report Format": "Detailed Dashboard"
    },
    icon: Search
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

  // Workflows
  "Content Workflow": {
    type: "workflow" as const,
    description: "End-to-end content creation workflow from ideation to publication with review stages.",
    capabilities: ["Content Planning", "Draft Generation", "Review Process", "Publication"],
    configuration: {
      "Stages": "Ideation → Draft → Review → Publish",
      "Approvers": "Content Manager, SEO Specialist",
      "Automation": "Auto-scheduling, SEO checks",
      "Integration": "CMS, Social Media platforms"
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
  if (!details) return null;

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
            <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{details.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Capabilities</h3>
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
            <h3 className="text-sm font-medium text-gray-900 mb-3">Configuration</h3>
            <div className="space-y-3">
              {Object.entries(details.configuration).map(([key, value], index) => (
                <div key={index} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700 flex-shrink-0 w-1/3">{key}:</span>
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