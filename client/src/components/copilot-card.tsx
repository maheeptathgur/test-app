import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CopilotData } from "@/lib/types";

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
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${copilot.avatarColor} rounded-xl flex items-center justify-center`}>
              <span className="text-lg font-semibold">{copilot.avatar}</span>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{copilot.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${copilot.status === 'online' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                <span className="text-sm text-muted-foreground capitalize">{copilot.status}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
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
        
        <p className="text-muted-foreground text-sm mb-4">{copilot.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {copilot.components.map((component, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs font-medium ${
                component.type === 'agent' ? 'bg-purple-100 text-purple-700' :
                component.type === 'tool' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}
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
    </Card>
  );
}
