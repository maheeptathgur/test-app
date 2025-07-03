import { MoreVertical, Bot, MessageSquare, BarChart3, Headphones, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CopilotData } from "@/lib/types";
import { ComponentDetailsModal } from "./component-details-modal";
import { useState } from "react";

// Helper functions for image tiles
const getImageUrl = (type: string, name?: string): string => {
  // Special case for Campaign Manager
  if (name === 'Campaign Manager') {
    return '/attached_assets/campaignmanager_1751580871679.png';
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
  const [selectedComponent, setSelectedComponent] = useState<{ name: string; type: 'agent' | 'tool' | 'workflow' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComponentClick = (component: { name: string; type: 'agent' | 'tool' | 'workflow' }) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };
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
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {getTypeIcon(copilot.type)}
          </div>

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
        
        <div className="flex flex-wrap gap-2 mb-4">
          {copilot.components.map((component, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs font-medium cursor-pointer hover:shadow-md transition-shadow ${
                component.type === 'agent' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                component.type === 'tool' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
              onClick={() => handleComponentClick(component)}
            >
              {component.name}
            </Badge>
          ))}
        </div>
        
        <Button 
          onClick={() => onStartChat(copilot)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Chat
        </Button>
      </CardContent>

      <ComponentDetailsModal
        isOpen={isModalOpen}
        component={selectedComponent}
        onClose={closeModal}
      />
    </Card>
  );
}
