import { Action } from '@ngrx/store';
import { Media } from 'src/app/components/gallery/Media';

export const OPEN_MENU = '[LAYOUT] Open menu';
export const CLOSE_MENU = '[LAYOUT] Close menu';

export const LOAD_THUMBNAILS = '[LAYOUT] Load Thumbnails';
export const THUMBNAILS_LOADED = '[LAYOUT] Thumbnails loaded';
export const THUMBNAIL_LOADING_FAILED = '[LAYOU] Thumbnails loading failed';

export class OpenMenu implements Action {
    readonly type = OPEN_MENU;
}

export class CloseMenu implements Action {
    readonly type = CLOSE_MENU;
}


export class LoadThumbnails implements Action {
    readonly type = LOAD_THUMBNAILS;
}

export class ThumbnailsLoaded implements Action {
    readonly type = THUMBNAILS_LOADED;
    constructor(public payload: Media[]) {}
}

export class ThumbnailsLoadingFailed implements Action {
    readonly type = THUMBNAIL_LOADING_FAILED;
    constructor(public payload: any) {}
}


export type Actions = OpenMenu | CloseMenu | ThumbnailsLoaded | LoadThumbnails | ThumbnailsLoadingFailed;
