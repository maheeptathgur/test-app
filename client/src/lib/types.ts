export interface Workspace {
  id: string;
  name: string;
  type: string;
  avatar: string;
  color: string;
}

export interface ProfileField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  required: boolean;
  description?: string;
  options?: string[];
}

export interface CopilotData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  avatar: string;
  avatarColor: string;
  type: string;
  favorite: boolean;
  components: Array<{
    name: string;
    type: 'agent' | 'tool' | 'workflow';
  }>;
  profileFields?: ProfileField[];
  conversationMessages?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export type NavigationSection = 'copilots' | 'agents' | 'tools' | 'workflows' | 'knowledge-base' | 'subscriptions' | 'conversations' | 'analytics' | 'users' | 'pricing' | 'workspace-settings' | 'user-view';
