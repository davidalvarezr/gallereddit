import * as LayoutActions from '../actions/layout.action';
import { Layout } from 'src/app/models/ngx-store/Layout.model';
import * as AppActions from '../actions/app.action';

const initState: Layout = {
    menuOpen: false
};

export function layoutReducer(state: Layout = initState, action: LayoutActions.Actions | AppActions.Actions): Layout {
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
