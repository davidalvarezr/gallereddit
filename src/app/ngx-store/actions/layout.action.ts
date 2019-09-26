import { Action } from '@ngrx/store';
import { Media } from 'src/app/components/gallery/Media';

export const OPEN_MENU = '[LAYOUT] Open menu';
export const CLOSE_MENU = '[LAYOUT] Close menu';

export const LOAD_THUMBNAILS = '[LAYOUT] Load Thumbnails';
export const THUMBNAILS_LOADED = '[LAYOUT] Thumbnails loaded';
export const THUMBNAIL_LOADING_FAILED = '[LAYOUT] Thumbnails loading failed';

export const CHANGE_SEARCH_VALUE = '[LAYOUT] Change search value';
export const CLICK_ON_ONE_SUBREDDIT = '[LAYOUT] Click one one subreddit';
export const FOCUS_SEARCHBAR = '[LAYOUT] Focus search bar';

export class OpenMenu implements Action {
    readonly type = OPEN_MENU;
}

export class CloseMenu implements Action {
    readonly type = CLOSE_MENU;
}


export class LoadThumbnails implements Action {
    readonly type = LOAD_THUMBNAILS;
}

/**
 * @deprecated Check and put in reddit-service.action
 */
export class ThumbnailsLoaded implements Action {
    readonly type = THUMBNAILS_LOADED;
    constructor(public payload: Media[]) {}
}

/**
 * @deprecated Check and put in reddit-service.action
 */
export class ThumbnailsLoadingFailed implements Action {
    readonly type = THUMBNAIL_LOADING_FAILED;
    constructor(public payload: any) {}
}

export class ChangeSearchValue implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) {} // payload: search value
}

export class ClickOnOneSubreddit implements Action {
    readonly type = CLICK_ON_ONE_SUBREDDIT;
}

export class FocusSearchbar implements Action {
    readonly type = FOCUS_SEARCHBAR;
    constructor(public payload: string) {} // payload: search value
}

export type Actions = OpenMenu | CloseMenu | ThumbnailsLoaded
    | LoadThumbnails | ThumbnailsLoadingFailed | ChangeSearchValue
    | ClickOnOneSubreddit | FocusSearchbar ;
