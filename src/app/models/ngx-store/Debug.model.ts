import { Json } from '../json.model';
import { Loggable } from './Logger.model';

export type MessageType = 'log' | 'warn' | 'err' | 'store' | 'wtf' | 'json';

export interface Message {
    content: Loggable;
    type: MessageType;
}

export interface DebugReducerState {
    messages: Message[];
}
