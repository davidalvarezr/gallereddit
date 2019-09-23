import { Action } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const APP_INIT = '[APP] Init';

export class AppInit implements Action {
    readonly type = APP_INIT;
    constructor(public payload: AppState) {}
}

export type Actions = AppInit;
