import { Json } from '../json.model';

export type MessageType = 'log' | 'warn' | 'err' | 'store' | 'wtf' | 'json';

export interface Message {
    content: string | Json;
    type: MessageType;
}

export interface DebugReducerState {
    messages: Message[];
}
