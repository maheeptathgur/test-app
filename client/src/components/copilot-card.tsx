import { MoreVertical, Bot, MessageSquare, BarChart3, Headphones, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CopilotData } from "@/lib/types";
import campaignManagerImage from "@assets/campaignmanager_1751580871679.png";
import contentAssistantImage from "@assets/contentassistant_1751581306148.png";
import newCopilotImage from "@assets/image_1751664430496.png";

// Helper functions for image tiles
const getImageUrl = (type: string, name?: string): string => {
  // Special cases for specific copilots
  if (name === 'Campaign Manager') {
    return campaignManagerImage;
  }
  if (name === 'Content Assistant') {
    return newCopilotImage;
  }
  
  switch (type.toLowerCase()) {
    case 'general':
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
    case 'content':
      return 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop&auto=format';
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
}

export function CopilotCard({ copilot, onStartChat, onEdit, onDuplicate, onArchive, onDelete }: CopilotCardProps) {
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
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30">
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
          <Badge variant={copilot.status === 'active' ? 'default' : 'secondary'} className="text-xs capitalize">
            {copilot.status}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{copilot.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4 items-start">
          <TooltipProvider>
            {copilot.components.map((component, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div>
                    <Badge
                      variant="secondary"
                      className={`text-xs font-medium cursor-default hover:shadow-md transition-shadow !items-start ${
                        component.type === 'agent' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                        component.type === 'tool' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                        'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {component.name}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{component.description || `${component.type} component`}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
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
