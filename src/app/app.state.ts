import { LayoutReducerState } from './models/ngx-store/Layout.model';
import { PreferencesReducerState } from './models/ngx-store/Preferences.model';
import { RouterReducerState } from '@ngrx/router-store';
import { DebugReducerState } from './models/ngx-store/Debug.model';

import * as LayoutActions from './ngx-store/actions/layout.action';
import * as PreferencesActions from './ngx-store/actions/preferences.action';
import {RouterAction} from '@ngrx/router-store';
import * as DebugActions from './ngx-store/actions/preferences.action';
import * as RedditServiceActions from './ngx-store/actions/reddit-service.action';
import { RedditServiceReducerState } from './models/ngx-store/RedditService.model';


export interface AppState {
    readonly layout: LayoutReducerState;
    readonly preferences: PreferencesReducerState;
    readonly router: RouterReducerState;
    readonly debug: DebugReducerState;
    readonly redditService: RedditServiceReducerState;
}

export type Reducers = LayoutReducerState | PreferencesReducerState | RouterReducerState | DebugReducerState | RedditServiceReducerState;

export type Actions = LayoutActions.Actions | PreferencesActions.Actions | RouterAction<any, any>
    | DebugActions.Actions | RedditServiceActions.Actions;
