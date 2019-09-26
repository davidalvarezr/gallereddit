import * as LayoutActions from '../actions/layout.action';
import { LayoutReducerState } from 'src/app/models/ngx-store/Layout.model';
import * as AppActions from '../actions/app.action';

const initState: LayoutReducerState = {
    pageTitle: 'Gallereddit',
    menuOpen: false,
    gallery: [],
    searchValue: '',
    galleryPageShows: 'nothing'
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
            // TODO: remove
            case LayoutActions.THUMBNAILS_LOADED:
                return { ...state, gallery: [...state.gallery, ...action.payload] };
            case LayoutActions.CHANGE_SEARCH_VALUE:
                // TODO: call a Load Subreddit effect
                return {
                    ...state,
                     searchValue: action.payload,
                     galleryPageShows: ['', undefined].includes(action.payload) ? 'gallery' : 'sub-list'
                };
            case LayoutActions.CLICK_ON_ONE_SUBREDDIT:
                // TODO: call a Load Subreddit Content effect
                return { ...state, galleryPageShows: 'gallery' };
            case LayoutActions.FOCUS_SEARCHBAR:
                return { ...state, galleryPageShows: ['', undefined].includes(action.payload) ? 'gallery' : 'sub-list'};
            case AppActions.APP_INIT:
                return action.payload !== null
                    && action.payload !== undefined
                    ? action.payload.layout
                    : initState;
            default:
                return state;
    }
}
