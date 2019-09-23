import * as PreferencesActions from '../actions/preferences.action';
import * as AppActions from '../actions/app.action';
import { PreferencesReducerState } from 'src/app/models/ngx-store/Preferences.model';

export const initState: PreferencesReducerState = {
    settings: {
        gallerySize: 'small',
        nsfw: false,
        videoMuted: true,
    },
    sort: {
        sortTime: 'year',
        sortType: 'best',
    }
};

export function preferencesReducer(
        state: PreferencesReducerState =  initState,
        action: PreferencesActions.Actions | AppActions.Actions
    ): PreferencesReducerState {

        switch (action.type) {
        case PreferencesActions.CHANGE_SETTINGS:
            return {
                ...state,
                settings: action.payload,
            };

        // FIXME: Maybe the two next actions could be grouped in only one...
        case PreferencesActions.CHANGE_SORT_TYPE:
            return {
                ...state,
                sort: {
                    ...state.sort,
                    sortType: action.payload,
                }
            };
        case PreferencesActions.CHANGE_SORT_TIME:
            return {
                ...state,
                sort: {
                    ...state.sort,
                    sortTime: action.payload,
                }
            };
        case AppActions.APP_INIT:
            return action.payload.preferences.sort ? action.payload.preferences : initState;
        default:
            return state;
    }
}
