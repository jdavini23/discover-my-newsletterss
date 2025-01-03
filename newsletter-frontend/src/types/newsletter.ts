export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  url?: string;
  category?: string;
  subscribedAt?: Date;
  frequency?: 'daily' | 'weekly' | 'monthly';
  isSubscribed?: boolean;
  readCount?: number;
}

export interface EventData {
  source?: string;
  message?: string;
  severity?: 'info' | 'warning' | 'error';
  error?: string;
}
