import { Action } from '@ngrx/store';
import * as LayoutActions from '../actions/layout.action';
import { Layout } from 'src/app/models/ngx-store/Layout.model';

const initState: Layout = {
    menuOpen: false
};

export function layoutReducer(state: Layout = initState, action: LayoutActions.Actions): Layout {
    switch (action.type) {
        case LayoutActions.OPEN_MENU:
            return { ...state, menuOpen: true };
        case LayoutActions.CLOSE_MENU:
            return { ... state, menuOpen: false };
        default:
            return state;
    }
}
