import { useState } from "react";
import { Play, MessageSquare, Star, Clock, Filter, Search, ChevronDown, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserView() {
  const [selectedCopilot, setSelectedCopilot] = useState("Content Assistant");

  // Available copilots for the dropdown
  const availableCopilots = [
    {
      id: '1',
      name: 'Content Assistant',
      description: 'Get help with writing, editing, and content creation',
      avatar: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=40&h=40&fit=crop&auto=format',
    },
    {
      id: '2',
      name: 'Customer Support',
      description: 'Get instant help with your questions and issues',
      avatar: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=40&h=40&fit=crop&auto=format',
    },
    {
      id: '3',
      name: 'Campaign Manager',
      description: 'Plan and optimize your marketing campaigns',
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40&h=40&fit=crop&auto=format',
    },
  ];

  // Recent conversations grouped by month
  const recentConversations = {
    'January 2025': [
      {
        id: '1',
        title: 'Blog post structure help',
        lastMessage: 'Thanks for helping me with the blog post structure!',
        timestamp: '2 hours ago',
        unread: false,
      },
      {
        id: '2',
        title: 'Social media campaign ideas',
        lastMessage: 'Can you help me analyze the performance metrics?',
        timestamp: '1 day ago',
        unread: true,
      },
      {
        id: '3',
        title: 'Content calendar planning',
        lastMessage: 'Perfect! The social media copy looks great.',
        timestamp: '3 days ago',
        unread: false,
      },
      {
        id: '4',
        title: 'Email newsletter draft',
        lastMessage: 'The newsletter template works perfectly now.',
        timestamp: '1 week ago',
        unread: false,
      },
    ],
    'December 2024': [
      {
        id: '5',
        title: 'Holiday campaign strategy',
        lastMessage: 'The holiday campaign performed really well!',
        timestamp: '2 weeks ago',
        unread: false,
      },
      {
        id: '6',
        title: 'Year-end report help',
        lastMessage: 'Thanks for helping with the annual summary.',
        timestamp: '3 weeks ago',
        unread: false,
      },
    ],
    'November 2024': [
      {
        id: '7',
        title: 'Product launch content',
        lastMessage: 'The launch announcement was perfect.',
        timestamp: '1 month ago',
        unread: false,
      },
    ],
  };

  const currentCopilot = availableCopilots.find(c => c.name === selectedCopilot) || availableCopilots[0];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 flex flex-col bg-[#e6eeef]">
        {/* Current Copilot */}
        <div className="p-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full p-3 h-auto bg-white hover:bg-gray-50 text-left justify-start border"
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentCopilot.avatar} alt={currentCopilot.name} />
                    <AvatarFallback>{currentCopilot.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{currentCopilot.name}</div>
                    <div className="text-xs text-gray-500 truncate">{currentCopilot.description}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {availableCopilots.map((copilot) => (
                <DropdownMenuItem 
                  key={copilot.id}
                  onClick={() => setSelectedCopilot(copilot.name)}
                  className="p-3"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={copilot.avatar} alt={copilot.name} />
                      <AvatarFallback className="text-xs">{copilot.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{copilot.name}</div>
                      <div className="text-xs text-gray-500 truncate">{copilot.description}</div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Recent Conversations */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Conversations</h3>
          
          {Object.entries(recentConversations).map(([month, conversations]) => (
            <div key={month} className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">{month}</h4>
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className="w-full h-auto p-3 text-left justify-start hover:bg-white/50"
                  >
                    <div className="flex items-start gap-2 w-full">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate mb-1">
                          {conversation.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2 mb-1">
                          {conversation.lastMessage}
                        </div>
                        <div className="text-xs text-gray-400">
                          {conversation.timestamp}
                        </div>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-[#008062] rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans Button and User Profile */}
        <div className="p-6 space-y-3">
          {/* Pricing Plans Button */}
          <Button 
            variant="outline"
            className="w-full bg-white border-2 border-[#008062] text-[#008062] hover:bg-[#008062] hover:text-white transition-colors"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Pricing Plans
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full p-3 h-auto bg-[#008062] hover:bg-[#00d2a0] text-white justify-start"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format&face=center" 
                      alt="John Doe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-medium text-white truncate">John Doe</div>
                    <div className="text-xs text-white/80 truncate">john.doe@company.com</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/80" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Welcome Header */}
        <div 
          className="relative text-center text-white rounded-lg overflow-hidden m-6"
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
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-lg opacity-90">Continue your conversation with {currentCopilot.name}</p>
          </div>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-[#008062]" />
                <h3 className="text-sm font-medium">New Chat</h3>
                <p className="text-xs text-muted-foreground">Start fresh conversation</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-[#008062]" />
                <h3 className="text-sm font-medium">Favorites</h3>
                <p className="text-xs text-muted-foreground">Access saved chats</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-[#008062]" />
                <h3 className="text-sm font-medium">History</h3>
                <p className="text-xs text-muted-foreground">View past conversations</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Search className="w-8 h-8 mx-auto mb-2 text-[#008062]" />
                <h3 className="text-sm font-medium">Search</h3>
                <p className="text-xs text-muted-foreground">Find specific content</p>
              </CardContent>
            </Card>
          </div>

          {/* Start Chat Section */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage src={currentCopilot.avatar} alt={currentCopilot.name} />
                <AvatarFallback className="text-xl">{currentCopilot.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{currentCopilot.name}</h2>
              <p className="text-muted-foreground mb-6">{currentCopilot.description}</p>
              <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white px-8 py-3 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Start New Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}