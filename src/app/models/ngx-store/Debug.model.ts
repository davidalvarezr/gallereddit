export type MessageType = 'log' | 'warn' | 'err' | 'store' | 'wtf' | 'json';

export interface Message {
    content: string;
    type: MessageType;
}

export interface DebugReducerState {
    messages: Message[];
}
