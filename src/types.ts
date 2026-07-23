export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  avatar?: string;
  mediaUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerType: 'comment' | 'dm' | 'story_mention';
  triggerKeyword: string;
  replyText: string;
  commentReplyText?: string;
  buttonText?: string;
  buttonUrl?: string;
  isActive: boolean;
  timesTriggered: number;
}

export interface Contact {
  id: string;
  username: string;
  avatar: string;
  lastInteraction: string;
  status: 'active' | 'completed' | 'lead';
}
