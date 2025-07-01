import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Workspace } from "@/lib/types";

interface WorkspaceSelectorProps {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  onWorkspaceChange: (workspace: Workspace) => void;
}

export function WorkspaceSelector({ currentWorkspace, workspaces, onWorkspaceChange }: WorkspaceSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3 bg-sidebar-accent hover:bg-card">
          <div className={`w-8 h-8 ${currentWorkspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
            {currentWorkspace.avatar}
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-sidebar-foreground">{currentWorkspace.name}</div>
            <div className="text-xs text-muted-foreground">{currentWorkspace.type}</div>
          </div>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="start">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => onWorkspaceChange(workspace)}
            className={`flex items-center gap-3 p-3 mb-1 rounded-lg cursor-pointer ${
              workspace.id === currentWorkspace.id ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <div className={`w-8 h-8 ${workspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
              {workspace.avatar}
            </div>
            <div>
              <div className="text-sm font-medium">{workspace.name}</div>
              <div className="text-xs text-muted-foreground">{workspace.type}</div>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem
          onClick={() => {
            // Placeholder action for adding workspace
            console.log('Add workspace clicked');
          }}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: '#008062' }}>Add Workspace</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
