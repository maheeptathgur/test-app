export interface Workspace {
  id: string;
  name: string;
  type: string;
  avatar: string;
  color: string;
}

export interface CopilotData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  avatar: string;
  avatarColor: string;
  type: string;
  components: Array<{
    name: string;
    type: 'agent' | 'tool' | 'workflow';
  }>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export type NavigationSection = 'copilots' | 'agents' | 'tools' | 'workflows' | 'knowledge-base' | 'profile-fields' | 'subscriptions' | 'conversations' | 'analytics' | 'users';
