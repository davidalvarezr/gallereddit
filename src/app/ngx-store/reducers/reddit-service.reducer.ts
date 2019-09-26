import { RedditServiceReducerState } from 'src/app/models/ngx-store/RedditService.model';
import * as RedditService from '../actions/reddit-service.action';
import * as AppAction from '../actions/app.action';

const initState: RedditServiceReducerState = {
    // accessToken: null,
    // accessTokenTimestamp: 0, // those 2 will be direct in reddit service
    currentMedia: null,
    currentSubreddit: null,
    medias: [],
    subredditsFounded: [],
};

export function redditServiceReducer(
    state: RedditServiceReducerState = initState,
    action: RedditService.Actions | AppAction.Actions
): RedditServiceReducerState {
        switch (action.type) {
            case RedditService.LOAD_SUBREDDITS:
                return { ...state, subredditsFounded: [] };
            case RedditService.SUBREDDITS_LOADED_SUCCESS:
                return { ...state, subredditsFounded: action.payload };
            case RedditService.SUBREDDITS_LOADED_FAILURE:
                return state;
            case RedditService.LOAD_POSTS_FROM_ONE_SUBREDDIT:
                return { ...state, medias: [] };
            case RedditService.POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS:
                return { ...state, medias: action.payload };
            case RedditService.POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE:
                return state;
            case RedditService.LOAD_MORE_POSTS_FROM_ONE_SUBREDDIT:
                return state;
            case RedditService.MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS:
                return { ...state, medias: [ ...state.medias, ...action.payload ] };
            case RedditService.MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE:
                return state;
            case AppAction.APP_INIT:
                return action.payload ? action.payload.redditService : initState ;
            default:
                return state;
        }
}
