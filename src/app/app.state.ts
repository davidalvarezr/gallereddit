import { Layout } from './models/ngx-store/Layout.model';
import { Preferences } from './models/ngx-store/Preferences.model';
import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
    readonly layout: Layout;
    readonly preferences: Preferences;
    readonly router: RouterReducerState;
}
