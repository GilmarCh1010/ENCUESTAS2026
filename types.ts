export interface UserData {
  [key: string]: string | undefined;
}

export interface Option {
  value: string;
  label: string;
  icon: string;
}

export interface Step {
  type: 'bot' | 'conditional';
  message?: string | ((data: UserData) => string);
  delay?: number;
  input?: string;
  validation?: 'ci' | 'text' | 'optional';
  options?: Option[];
  prompts?: string[];
  action?: 'saveData';
  questionLabel?: string;
  condition?: (data: UserData) => boolean;
  ifTrue?: Step;
}

export interface Message {
  id: number;
  type: 'incoming' | 'outgoing';
  text: string;
  isBot: boolean;
}