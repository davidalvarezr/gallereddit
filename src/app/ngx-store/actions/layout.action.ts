import { Action } from '@ngrx/store';

export const OPEN_MENU = '[LAYOUT] Open menu';
export const CLOSE_MENU = '[LAYOUT] Close menu';

export class OpenMenu implements Action {
    readonly type = OPEN_MENU;
}

export class CloseMenu implements Action {
    readonly type = CLOSE_MENU;
}


export type Actions = OpenMenu | CloseMenu;
