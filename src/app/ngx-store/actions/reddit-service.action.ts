import { Action } from '@ngrx/store';
import { Media } from 'src/app/components/gallery/Media';


export const LOAD_SUBREDDITS = '[REDDIT SERVICE] Load subreddits';
export const SUBREDDITS_LOADED_SUCCESS = '[REDDIT SERVICE] Subreddits loaded --> success';
export const SUBREDDITS_LOADED_FAILURE = '[REDDIT SERVICE] Subreddits loaded --> failure';

export const LOAD_POSTS_FROM_ONE_SUBREDDIT = '[REDDIT SERVICE] Load posts from one subreddit';
export const POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS = '[REDDIT SERVICE] Posts from one subreddits loaded --> success';
export const POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE = '[REDDIT SERVICE] Posts from one subreddits loaded --> failure';

export const LOAD_MORE_POSTS_FROM_ONE_SUBREDDIT = '[REDDIT SERVICE] Load more posts from one subreddit';
export const MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS = '[REDDIT SERVICE] More posts from one subreddits loaded --> success';
export const MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE = '[REDDIT SERVICE] More posts from one subreddits loaded --> failure';

export class LoadSubreddits implements Action {
    readonly type = LOAD_SUBREDDITS;
}
export class SubredditLoadedSuccess implements Action {
    readonly type = SUBREDDITS_LOADED_SUCCESS;
    constructor(public payload: string[]) {}    // payload: list of subreddits
}
export class SubredditLoadedFailure implements Action {
    readonly type = SUBREDDITS_LOADED_FAILURE;
    constructor(public payload: any) {}         // payload: the error
}

export class LoadPostsFromOneSubreddit implements Action {
    readonly type = LOAD_POSTS_FROM_ONE_SUBREDDIT;
}
export class PostsFromOneSubredditLoadedSuccess implements Action {
    readonly type = POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS;
    constructor(public payload: Media[]) {}     // payload: the array of media
}
export class PostsFromOneSubredditLoadedFailure implements Action {
    readonly type = POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE;
    constructor(public payload: any) {}         // payload: the error
}

export class LoadMorePostsFromOneSubreddit implements Action {
    readonly type = LOAD_MORE_POSTS_FROM_ONE_SUBREDDIT;
}
export class MorePostsFromOneSubredditLoadedSuccess implements Action {
    readonly type = MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_SUCCESS;
    constructor(public payload: Media[]) {}     // payload: the new media
}
export class MorePostsFromOneSubredditLoadedFailure implements Action {
    readonly type = MORE_POSTS_FROM_ONE_SUBREDDIT_LOADED_FAILURE;
    constructor(public payload: any) {}     // payload: the error
}

export type Actions = LoadSubreddits | SubredditLoadedSuccess | SubredditLoadedFailure
    | LoadPostsFromOneSubreddit | PostsFromOneSubredditLoadedSuccess | PostsFromOneSubredditLoadedFailure
    | LoadMorePostsFromOneSubreddit | MorePostsFromOneSubredditLoadedSuccess | MorePostsFromOneSubredditLoadedFailure ;
