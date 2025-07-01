import { useState } from "react";
import { Play, MessageSquare, Star, Clock, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample copilots that would be available to end users
  const userCopilots = [
    {
      id: '1',
      name: 'Content Assistant',
      description: 'Get help with writing, editing, and content creation',
      category: 'content',
      rating: 4.8,
      totalChats: 1234,
      lastUsed: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: '2',
      name: 'Customer Support',
      description: 'Get instant help with your questions and issues',
      category: 'support',
      rating: 4.9,
      totalChats: 2156,
      lastUsed: 'Never',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: '3',
      name: 'Campaign Manager',
      description: 'Plan and optimize your marketing campaigns',
      category: 'marketing',
      rating: 4.7,
      totalChats: 987,
      lastUsed: '1 day ago',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format',
    },
  ];

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

  const filteredCopilots = userCopilots.filter(copilot => {
    const matchesSearch = copilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         copilot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || copilot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div 
        className="relative text-center py-16 text-white rounded-lg overflow-hidden" 
        style={{ 
          aspectRatio: '3/1',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-lg opacity-90">Choose an AI assistant to help you with your tasks</p>
        </div>
      </div>

      {/* Search and Filter */}
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
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="content">Content</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
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
                      src={copilot.image} 
                      alt={copilot.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        ⭐ {copilot.rating}
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
                          {copilot.totalChats.toLocaleString()} chats
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {copilot.lastUsed}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[#008062] hover:bg-[#00d2a0]">
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
                  <div className="w-8 h-8 bg-[#008062] rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {chat.copilotName.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm truncate">{chat.copilotName}</div>
                      {chat.unread && <div className="w-2 h-2 bg-[#008062] rounded-full"></div>}
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

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Conversations</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Favorite Assistant</span>
                <span className="font-semibold">Content Assistant</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Saved</span>
                <span className="font-semibold text-[#008062]">12.5 hours</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                View All Conversations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Rate Assistants
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Activity History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}