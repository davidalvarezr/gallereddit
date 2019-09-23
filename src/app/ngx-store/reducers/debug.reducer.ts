import { DebugReducerState } from 'src/app/models/ngx-store/Debug.model';
import * as DebugActions from '../actions/debug.action';
import * as AppActions from '../actions/app.action';

const initState: DebugReducerState = {
    messages: [{content: 'lol', type: 'log'}]
};

export function debugReducer(state: DebugReducerState = initState, action: DebugActions.Actions | AppActions.Actions): DebugReducerState {
    switch (action.type) {
        case DebugActions.ADD_MESSAGE:
        // console.log('');
        return {
                messages: [...state.messages, action.payload]
            };
        case AppActions.APP_INIT:
            return action.payload.debug;
        default:
            return state;
    }
}
