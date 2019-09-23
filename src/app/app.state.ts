import { LayoutReducerState } from './models/ngx-store/Layout.model';
import { PreferencesReducerState } from './models/ngx-store/Preferences.model';
import { RouterReducerState } from '@ngrx/router-store';
import { DebugReducerState } from './models/ngx-store/Debug.model';

import * as LayoutActions from './ngx-store/actions/layout.action';
import * as PreferencesActions from './ngx-store/actions/preferences.action';
import {RouterAction} from '@ngrx/router-store';
import * as DebugActions from './ngx-store/actions/preferences.action';


export interface AppState {
    readonly layout: LayoutReducerState;
    readonly preferences: PreferencesReducerState;
    readonly router: RouterReducerState;
    readonly debug: DebugReducerState;
}

export type Reducers = LayoutReducerState | PreferencesReducerState | RouterReducerState | DebugReducerState;

export type Actions = LayoutActions.Actions | PreferencesActions.Actions | RouterAction<any, any> | DebugActions.Actions;
