import { MoreVertical, Bot, MessageSquare, BarChart3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CopilotData } from "@/lib/types";
import { ComponentDetailsModal } from "./component-details-modal";
import { useState } from "react";

// Helper functions for image tiles
const getImageTileStyle = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'general':
      return 'bg-gradient-to-br from-blue-400 to-blue-600';
    case 'content':
      return 'bg-gradient-to-br from-green-400 to-green-600';
    case 'analyst':
      return 'bg-gradient-to-br from-purple-400 to-purple-600';
    case 'support':
      return 'bg-gradient-to-br from-orange-400 to-orange-600';
    default:
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
  }
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return <Bot className="w-6 h-6 text-white" />;
    case 'content':
      return <MessageSquare className="w-6 h-6 text-white" />;
    case 'analyst':
      return <BarChart3 className="w-6 h-6 text-white" />;
    case 'support':
      return <Headphones className="w-6 h-6 text-white" />;
    default:
      return <Bot className="w-6 h-6 text-white" />;
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
      {/* Image tile header */}
      <div className={`h-24 w-full ${getImageTileStyle(copilot.type)} flex items-center justify-center relative`}>
        {getTypeIcon(copilot.type)}
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

      {/* Card content */}
      <CardContent className="p-6">
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
