import { Action } from '@ngrx/store';
import { Message } from 'src/app/models/ngx-store/Debug.model';

export const ADD_MESSAGE = '[DEBUG] Add message';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    constructor(public payload: Message) {}
}

export type Actions = AddMessage;
