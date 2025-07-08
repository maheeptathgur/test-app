import { useState } from "react";
import { ChevronDown, Plus, Play, Search, Heart, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Workspace, CopilotData } from "@/lib/types";

interface WorkspaceSelectorProps {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  onWorkspaceChange: (workspace: Workspace) => void;
  onWorkspaceCreate?: (workspace: { name: string; description: string }) => void;
  copilots?: CopilotData[];
  isInChatMode?: boolean;
  onCopilotSelect?: (copilot: CopilotData) => void;
  onViewAllWorkspaces?: () => void;
}

export function WorkspaceSelector({ currentWorkspace, workspaces, onWorkspaceChange, onWorkspaceCreate, copilots, isInChatMode, onCopilotSelect, onViewAllWorkspaces }: WorkspaceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

  // Handle workspace creation
  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim() && onWorkspaceCreate) {
      onWorkspaceCreate({
        name: newWorkspaceName.trim(),
        description: newWorkspaceDescription.trim()
      });
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setShowCreateModal(false);
    }
  };

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3 bg-white/50 hover:bg-sidebar-accent mt-4">
          <div className={`w-8 h-8 ${currentWorkspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
            {currentWorkspace.id === '1' ? (
              <Zap className="w-4 h-4" />
            ) : (
              currentWorkspace.avatar
            )}
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
                  className="pl-10 border-border focus:border-[var(--theme-primary)] h-8 text-sm"
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
                    </div>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-accent-hover)';
                e.currentTarget.style.setProperty('color', 'white', 'important');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.removeProperty('color');
              }}
            >
              <div className="w-8 h-8 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
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
                className={`flex items-center gap-3 p-3 mb-1 rounded-lg cursor-pointer group ${
                  workspace.id === currentWorkspace.id ? 'bg-accent text-accent-foreground' : ''
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-accent-hover)';
                  if (workspace.id !== currentWorkspace.id) {
                    e.currentTarget.style.setProperty('color', 'white', 'important');
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = workspace.id === currentWorkspace.id ? 'var(--theme-accent)' : '';
                  e.currentTarget.style.removeProperty('color');
                }}
              >
                <div className={`w-8 h-8 ${workspace.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
                  {workspace.id === '1' ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    workspace.avatar
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{workspace.name}</div>
                </div>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator className="my-2" />
            
            {onViewAllWorkspaces && (
              <DropdownMenuItem
                onClick={onViewAllWorkspaces}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-accent-hover)';
                  e.currentTarget.style.setProperty('color', 'white', 'important');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.removeProperty('color');
                }}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--theme-primary)' }}>View All Workspaces</div>
                </div>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-accent-hover)';
                e.currentTarget.style.setProperty('color', 'white', 'important');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.removeProperty('color');
              }}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--theme-primary)' }}>Add Workspace</div>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Workspace Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your copilots and team collaboration.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              placeholder="Enter workspace name"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace-description">Description (Optional)</Label>
            <Textarea
              id="workspace-description"
              placeholder="Describe the purpose of this workspace"
              value={newWorkspaceDescription}
              onChange={(e) => setNewWorkspaceDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setNewWorkspaceName('');
                setNewWorkspaceDescription('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateWorkspace}
              disabled={!newWorkspaceName.trim()}
              style={{ backgroundColor: 'var(--theme-primary)' }}
              className="text-white hover:opacity-90"
            >
              Create Workspace
            </Button>
          </div>
        </div>
      </DialogContent>
      </Dialog>
    </>
  );
}
