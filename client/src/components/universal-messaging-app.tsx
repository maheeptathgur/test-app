import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Mail, 
  MessageSquare, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Slack, 
  Send, 
  Archive, 
  Star, 
  MoreHorizontal,
  ArrowLeft,
  Circle,
  ChevronDown,
  Filter,
  Hash,
  AtSign,
  Users,
  X
} from "lucide-react";
import { SiLinkedin, SiWhatsapp, SiTelegram, SiDiscord } from "react-icons/si";

interface Message {
  id: string;
  platform: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  unread: boolean;
  thread?: Message[];
  channel?: string;
}

interface Channel {
  id: string;
  name: string;
  platform: string;
  icon: React.ReactNode;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  type: 'direct' | 'group' | 'channel';
}

const platforms = [
  { id: 'gmail', name: 'Gmail', icon: <Mail className="w-4 h-4" />, color: '#EA4335' },
  { id: 'linkedin', name: 'LinkedIn', icon: <SiLinkedin className="w-4 h-4" />, color: '#0A66C2' },
  { id: 'whatsapp', name: 'WhatsApp', icon: <SiWhatsapp className="w-4 h-4" />, color: '#25D366' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-4 h-4" />, color: '#1877F2' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter className="w-4 h-4" />, color: '#1DA1F2' },
  { id: 'slack', name: 'Slack', icon: <Slack className="w-4 h-4" />, color: '#4A154B' },
  { id: 'telegram', name: 'Telegram', icon: <SiTelegram className="w-4 h-4" />, color: '#0088CC' },
  { id: 'discord', name: 'Discord', icon: <SiDiscord className="w-4 h-4" />, color: '#5865F2' }
];

const sampleChannels: Channel[] = [
  {
    id: '1',
    name: 'sarah.marketing@company.com',
    platform: 'gmail',
    icon: <Mail className="w-4 h-4" />,
    unreadCount: 3,
    lastMessage: 'Q1 campaign performance looks great! The conversion rates...',
    lastTimestamp: '10:30 AM',
    type: 'direct'
  },
  {
    id: '2',
    name: 'John Mitchell',
    platform: 'linkedin',
    icon: <SiLinkedin className="w-4 h-4" />,
    unreadCount: 1,
    lastMessage: 'Thanks for connecting! Would love to discuss potential collaboration opportunities.',
    lastTimestamp: '9:45 AM',
    type: 'direct'
  },
  {
    id: '3',
    name: 'Team Marketing',
    platform: 'whatsapp',
    icon: <SiWhatsapp className="w-4 h-4" />,
    unreadCount: 7,
    lastMessage: 'Lisa: Can we schedule the campaign review for tomorrow?',
    lastTimestamp: '9:20 AM',
    type: 'group'
  },
  {
    id: '4',
    name: 'Alex Chen',
    platform: 'instagram',
    icon: <Instagram className="w-4 h-4" />,
    unreadCount: 2,
    lastMessage: 'Love the new product shots! 📸',
    lastTimestamp: '8:55 AM',
    type: 'direct'
  },
  {
    id: '5',
    name: '#general',
    platform: 'slack',
    icon: <Slack className="w-4 h-4" />,
    unreadCount: 12,
    lastMessage: 'mike.dev: The new feature deployment is complete ✅',
    lastTimestamp: '8:30 AM',
    type: 'channel'
  },
  {
    id: '6',
    name: 'Client Feedback',
    platform: 'facebook',
    icon: <Facebook className="w-4 h-4" />,
    unreadCount: 0,
    lastMessage: 'Great work on the latest project! The client loved it.',
    lastTimestamp: 'Yesterday',
    type: 'group'
  },
  {
    id: '7',
    name: '@TechStartupHub',
    platform: 'twitter',
    icon: <Twitter className="w-4 h-4" />,
    unreadCount: 1,
    lastMessage: 'Interested in featuring your startup in our next newsletter?',
    lastTimestamp: 'Yesterday',
    type: 'direct'
  },
  {
    id: '8',
    name: 'Development Team',
    platform: 'telegram',
    icon: <SiTelegram className="w-4 h-4" />,
    unreadCount: 4,
    lastMessage: 'Code review completed, ready for deployment',
    lastTimestamp: '2 hours ago',
    type: 'group'
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    platform: 'gmail',
    sender: 'Sarah Williams',
    senderAvatar: 'SW',
    content: 'Hi! The Q1 campaign performance looks fantastic. Our conversion rates have increased by 23% compared to last quarter. I\'ve attached the detailed analytics report for your review.',
    timestamp: '10:30 AM',
    unread: true
  },
  {
    id: '2',
    platform: 'gmail',
    sender: 'Sarah Williams',
    senderAvatar: 'SW',
    content: 'Also, I wanted to discuss the budget allocation for the upcoming Q2 campaigns. Do you have time for a quick call this afternoon?',
    timestamp: '10:32 AM',
    unread: true
  },
  {
    id: '3',
    platform: 'linkedin',
    sender: 'John Mitchell',
    senderAvatar: 'JM',
    content: 'Thanks for connecting! I saw your recent post about AI in marketing - really insightful stuff. Would love to discuss potential collaboration opportunities between our companies.',
    timestamp: '9:45 AM',
    unread: true
  },
  {
    id: '4',
    platform: 'whatsapp',
    sender: 'Lisa Parker',
    senderAvatar: 'LP',
    content: 'Can we schedule the campaign review for tomorrow? I have some new insights to share.',
    timestamp: '9:20 AM',
    unread: true,
    channel: 'Team Marketing'
  },
  {
    id: '5',
    platform: 'slack',
    sender: 'mike.dev',
    senderAvatar: 'MD',
    content: 'The new feature deployment is complete ✅ All tests are passing and it\'s live in production.',
    timestamp: '8:30 AM',
    unread: true,
    channel: '#general'
  }
];

export function UniversalMessagingApp({ onClose }: { onClose?: () => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [view, setView] = useState<'channels' | 'conversation'>('channels');

  const getPlatformColor = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.color || '#6B7280';
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.icon || <MessageSquare className="w-4 h-4" />;
  };

  const filteredChannels = sampleChannels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = !selectedPlatform || channel.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const totalUnreadCount = sampleChannels.reduce((sum, channel) => sum + channel.unreadCount, 0);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    setView('conversation');
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would implement actual message sending
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getChannelTypeIcon = (type: string) => {
    switch (type) {
      case 'group': return <Users className="w-3 h-3" />;
      case 'channel': return <Hash className="w-3 h-3" />;
      default: return <AtSign className="w-3 h-3" />;
    }
  };

  if (view === 'conversation' && selectedChannel) {
    const channelMessages = sampleMessages.filter(msg => 
      msg.platform === selectedChannel.platform && 
      (msg.channel === selectedChannel.name || !msg.channel)
    );

    return (
      <div className="h-full bg-card flex flex-col">
        {/* Conversation Header */}
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('channels')}
              className="p-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div style={{ color: getPlatformColor(selectedChannel.platform) }}>
              {getPlatformIcon(selectedChannel.platform)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                {getChannelTypeIcon(selectedChannel.type)}
                <h3 className="font-semibold text-sm">{selectedChannel.name}</h3>
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">
                {selectedChannel.platform} • {selectedChannel.type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {channelMessages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-card-foreground flex-shrink-0"
                  style={{ backgroundColor: getPlatformColor(message.platform) }}
                >
                  {message.senderAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.sender}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{message.timestamp}</span>
                    {message.unread && <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />}
                  </div>
                  <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-[hsl(var(--border))]">
          <div className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${selectedChannel.name}...`}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
        <div>
          <h2 className="font-semibold text-lg">Universal Messaging</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {totalUnreadCount} unread across all platforms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {filteredChannels.length} conversations
          </Badge>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 space-y-3 border-b border-[hsl(var(--border))]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10"
          />
        </div>
        
        {/* Platform Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedPlatform === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform(null)}
            className="whitespace-nowrap"
          >
            All Platforms
          </Button>
          {platforms.map((platform) => {
            const unreadForPlatform = sampleChannels
              .filter(c => c.platform === platform.id)
              .reduce((sum, c) => sum + c.unreadCount, 0);
            
            return (
              <Button
                key={platform.id}
                variant={selectedPlatform === platform.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
                className="whitespace-nowrap flex items-center gap-2"
              >
                <div style={{ color: selectedPlatform === platform.id ? 'white' : platform.color }}>
                  {platform.icon}
                </div>
                {platform.name}
                {unreadForPlatform > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-red-100 text-red-800 text-xs">
                    {unreadForPlatform}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-4 hover:bg-[hsl(var(--muted))] cursor-pointer transition-colors"
              onClick={() => handleChannelSelect(channel)}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div style={{ color: getPlatformColor(channel.platform) }}>
                    {getPlatformIcon(channel.platform)}
                  </div>
                  {getChannelTypeIcon(channel.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm truncate">{channel.name}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{channel.lastTimestamp}</span>
                      {channel.unreadCount > 0 && (
                        <Badge variant="default" className="bg-blue-500 text-card-foreground text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{channel.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground capitalize">{channel.platform}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-muted-foreground capitalize">{channel.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive All
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <Badge variant="outline" className="text-xs">
            Updated 2 min ago
          </Badge>
        </div>
      </div>
    </div>
  );
}