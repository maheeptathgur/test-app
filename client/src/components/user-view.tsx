import { useState } from "react";
import { Play, MessageSquare, Star, Clock, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopilotData } from "@/lib/types";


interface UserViewProps {
  copilots: CopilotData[];
  onToggleFavorite: (copilotId: string) => void;
  onStartChat: (copilot: CopilotData) => void;
}

export function UserView({ copilots, onToggleFavorite, onStartChat }: UserViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Helper function to get copilot image based on type
  const getImageUrl = (type: string): string => {
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

  const recentChats = [
    {
      id: '1',
      copilotName: 'Content Assistant',
      lastMessage: 'Thanks for helping me with the blog post structure!',
      timestamp: '2 hours ago',
      unread: false,
    },
    {
      id: '2',
      copilotName: 'Campaign Manager',
      lastMessage: 'Can you help me analyze the performance metrics?',
      timestamp: '1 day ago',
      unread: true,
    },
    {
      id: '3',
      copilotName: 'Content Assistant',
      lastMessage: 'Perfect! The social media copy looks great.',
      timestamp: '3 days ago',
      unread: false,
    },
  ];

  const filteredCopilots = (copilots || []).filter(copilot => {
    const matchesSearch = copilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         copilot.description.toLowerCase().includes(searchTerm.toLowerCase());
    return copilot.status === 'active' && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div 
        className="relative text-center text-white rounded-lg overflow-hidden"
        style={{ aspectRatio: '3/1' }}
      >
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop&auto=format"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Mandeep!</h1>
          <p className="text-lg opacity-90">Choose an AI assistant to help you with your tasks</p>
        </div>
      </div>
      {/* Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search assistants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Assistants */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Available Assistants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCopilots.map((copilot) => (
              <Card key={copilot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full rounded-t-lg overflow-hidden">
                    <img 
                      src={getImageUrl(copilot.type)} 
                      alt={copilot.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30"
                        onClick={() => onToggleFavorite(copilot.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${copilot.favorite ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                        />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-[hsl(var(--foreground))] capitalize">
                        {copilot.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{copilot.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {copilot.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {copilot.components.length} components
                        </span>
                        <Badge variant={copilot.status === 'active' ? 'default' : 'secondary'} className="text-xs capitalize">
                          {copilot.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full theme-primary theme-primary-hover:hover"
                      onClick={() => onStartChat(copilot)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCopilots.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No assistants found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Conversations</CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 theme-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {chat.copilotName.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm truncate">{chat.copilotName}</div>
                      {chat.unread && <div className="w-2 h-2 theme-primary rounded-full"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-3">
                View All Conversations
              </Button>
            </CardContent>
          </Card>

          

          
        </div>
      </div>
    </div>
  );
}