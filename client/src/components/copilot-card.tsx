import { MoreVertical, Bot, MessageSquare, BarChart3, Headphones, Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CopilotData } from "@/lib/types";
import campaignManagerImage from "@assets/campaignmanager_1751580871679.png";
import contentAssistantImage from "@assets/contentassistant_1751581306148.png";
import newCopilotImage from "@assets/image_1751664430496.png";
import workspaceImage from "@assets/image_1751923707146.png";
import newCampaignManagerImage from "@assets/image_1751925400273.png";
import customerSupportImage from "@assets/image_1751925913677.png";
import socialAnalystImage from "@assets/image_1751926960404.png";
import resumeAssistantImage from "@assets/image_1751926805510.png";
import contentAssistantNewImage from "@assets/image_1751927977089.png";

// Helper functions for image tiles
const getImageUrl = (type: string, name?: string): string => {
  // Use specific images for certain copilots
  if (name === 'Campaign Manager') {
    return newCampaignManagerImage;
  }
  if (name === 'Customer Support') {
    return customerSupportImage;
  }
  if (name === 'Social Analyst') {
    return socialAnalystImage;
  }
  if (name === 'Resume Assistant') {
    return resumeAssistantImage;
  }
  if (name === 'Content Assistant') {
    return contentAssistantNewImage;
  }
  // Use the new workspace image for all other copilots
  return workspaceImage;
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return <Bot className="w-6 h-6 text-white drop-shadow-md" />;
    case 'content':
      return <MessageSquare className="w-6 h-6 text-white drop-shadow-md" />;
    case 'analyst':
      return <BarChart3 className="w-6 h-6 text-white drop-shadow-md" />;
    case 'support':
      return <Headphones className="w-6 h-6 text-white drop-shadow-md" />;
    default:
      return <Bot className="w-6 h-6 text-white drop-shadow-md" />;
  }
};

interface CopilotCardProps {
  copilot: CopilotData;
  onStartChat: (copilot: CopilotData) => void;
  onEdit: (copilot: CopilotData) => void;
  onDuplicate: (copilot: CopilotData) => void;
  onArchive: (copilot: CopilotData) => void;
  onDelete: (copilot: CopilotData) => void;
  onToggleStatus: (copilot: CopilotData) => void;
}

export function CopilotCard({ copilot, onStartChat, onEdit, onDuplicate, onArchive, onDelete, onToggleStatus }: CopilotCardProps) {
  const [isComponentsExpanded, setIsComponentsExpanded] = useState(false);
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card content */}
      <CardContent className="p-6">
        {/* Image tile header */}
        <div className="relative h-36 w-full rounded-lg overflow-hidden mb-4">
          <img 
            src={getImageUrl(copilot.type, copilot.name)} 
            alt={`${copilot.type} copilot`}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-[#008062]/80 hover:bg-[#008062]">
                  <MoreVertical className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(copilot)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(copilot)}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive(copilot)}>Archive</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(copilot)} className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-card-foreground mb-2">{copilot.name}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleStatus(copilot)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#008062] focus:ring-offset-2 ${
                copilot.status === 'active' ? 'bg-[#008062]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  copilot.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs text-gray-600">{copilot.status === 'active' ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{copilot.description}</p>
        
        <div className="mb-4">
          <button
            onClick={() => setIsComponentsExpanded(!isComponentsExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-2"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isComponentsExpanded ? 'rotate-180' : ''}`} />
            Components ({copilot.components.length})
          </button>
          
          {isComponentsExpanded && (
            <div className="flex flex-wrap gap-2 items-start">
              <TooltipProvider>
                {copilot.components.map((component, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div>
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium cursor-help hover:shadow-md transition-shadow !items-start ${
                            component.type === 'agent' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                            component.type === 'tool' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                            'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          {component.name}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs" style={{ backgroundColor: '#E0FFF8' }}>
                      <p className="text-sm">{component.description || `${component.type} component`}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onStartChat(copilot)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Chat
        </Button>
      </CardContent>
    </Card>
  );
}
