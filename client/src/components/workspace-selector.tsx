import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3 bg-gray-50 hover:bg-gray-100">
          <div className={`w-8 h-8 ${currentWorkspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
            {currentWorkspace.avatar}
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-gray-900">{currentWorkspace.name}</div>
            <div className="text-xs text-gray-500">{currentWorkspace.type}</div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="start">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => onWorkspaceChange(workspace)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              workspace.id === currentWorkspace.id ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <div className={`w-8 h-8 ${workspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
              {workspace.avatar}
            </div>
            <div>
              <div className="text-sm font-medium">{workspace.name}</div>
              <div className="text-xs text-gray-500">{workspace.type}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
