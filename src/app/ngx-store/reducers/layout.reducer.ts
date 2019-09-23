import * as LayoutActions from '../actions/layout.action';
import { LayoutReducerState } from 'src/app/models/ngx-store/Layout.model';
import * as AppActions from '../actions/app.action';

const initState: LayoutReducerState = {
    menuOpen: false
};

export function layoutReducer(
        state: LayoutReducerState = initState,
        action: LayoutActions.Actions | AppActions.Actions
    ): LayoutReducerState {

        switch (action.type) {
        case LayoutActions.OPEN_MENU:
            return { ...state, menuOpen: true };
        case LayoutActions.CLOSE_MENU:
            return { ... state, menuOpen: false };
        case AppActions.APP_INIT:
            return action.payload.layout;

        default:
            return state;
    }
}
