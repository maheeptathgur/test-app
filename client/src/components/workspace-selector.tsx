import { useState } from "react";
import { ChevronDown, Plus, Play, Search, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Workspace, CopilotData } from "@/lib/types";

interface WorkspaceSelectorProps {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  onWorkspaceChange: (workspace: Workspace) => void;
  copilots?: CopilotData[];
  isInChatMode?: boolean;
  onCopilotSelect?: (copilot: CopilotData) => void;
}

export function WorkspaceSelector({ currentWorkspace, workspaces, onWorkspaceChange, copilots, isInChatMode, onCopilotSelect }: WorkspaceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort copilots: favorites first, then others
  const getFilteredCopilots = () => {
    if (!copilots) return [];
    
    const activeCopilots = copilots.filter(c => c.status === 'active');
    
    // Filter by search query
    const searchFiltered = activeCopilots.filter(copilot =>
      copilot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      copilot.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Separate favorites and non-favorites
    const favorites = searchFiltered.filter(c => c.favorite).sort((a, b) => a.name.localeCompare(b.name));
    const nonFavorites = searchFiltered.filter(c => !c.favorite).sort((a, b) => a.name.localeCompare(b.name));
    
    // Return favorites first, then non-favorites
    return [...favorites, ...nonFavorites];
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3 bg-sidebar-accent hover:bg-card">
          <div className={`w-8 h-8 ${currentWorkspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
            {currentWorkspace.avatar}
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-sidebar-foreground">{currentWorkspace.name}</div>
            <div className="text-xs text-muted-foreground">
              {isInChatMode && copilots ? `${copilots.length} Copilots` : currentWorkspace.type}
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="start">
        {isInChatMode && copilots && onCopilotSelect ? (
          // Show copilots from current workspace when in chat mode
          <>
            {/* Search Input */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assistants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border focus:border-[#008062] h-8 text-sm"
                />
              </div>
            </div>
            
            {/* Copilot List */}
            <div className="max-h-64 overflow-y-auto">
              {getFilteredCopilots().length === 0 ? (
                <div className="p-3 text-center text-muted-foreground text-sm">
                  No assistants found
                </div>
              ) : (
                getFilteredCopilots().map((copilot) => (
                  <DropdownMenuItem
                    key={copilot.id}
                    onClick={() => {
                      onCopilotSelect(copilot);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-3 mb-1 rounded-lg cursor-pointer hover:bg-accent"
                  >
                    <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center font-semibold text-sm`}>
                      {copilot.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium truncate">{copilot.name}</div>
                        {copilot.favorite && (
                          <Heart className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">{copilot.type}</div>
                    </div>
                    <Play className="w-4 h-4 text-muted-foreground" />
                  </DropdownMenuItem>
                ))
              )}
            </div>
            
            <DropdownMenuSeparator className="my-2" />
            
            <DropdownMenuItem
              onClick={() => {
                // Switch back to workspace view - this would close chat mode
                if (window.location.hash !== '#workspace') {
                  window.location.hash = 'workspace';
                  window.location.reload();
                }
              }}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChevronDown className="w-4 h-4 rotate-180" />
              </div>
              <span className="text-sm">Back to Dashboard</span>
            </DropdownMenuItem>
          </>
        ) : (
          // Show workspaces when not in chat mode
          <>
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
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
