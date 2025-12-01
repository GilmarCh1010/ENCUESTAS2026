
export interface UserData {
  [key: string]: string | undefined | string[];
}

export interface Option {
  value: string;
  label: string;
  description?: string; // Added for listing courses inside a cycle
  icon: string;
  category?: string; // Added for visual grouping (headers)
  bgColor?: string; // Added for custom background colors (e.g. per subsystem)
}

export interface Step {
  type: 'bot' | 'conditional';
  message?: string | ((data: UserData) => string);
  delay?: number;
  input?: string;
  validation?: 'ci' | 'text' | 'optional';
  options?: Option[] | ((data: UserData) => Option[]);
  multiselect?: boolean;
  prompts?: string[];
  action?: 'saveData';
  questionLabel?: string;
  condition?: (data: UserData) => boolean;
  ifTrue?: Step;
  externalLink?: string; // Added for the Google Drive link
}

export interface Message {
  id: number;
  type: 'incoming' | 'outgoing';
  text: string;
  isBot: boolean;
  stepIndex?: number;
}
