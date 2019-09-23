import { Action } from '@ngrx/store';
import { SortType } from 'src/app/models/ngx-store/SortType.type';
import { SortTime } from 'src/app/models/ngx-store/SortTime.type';
import { Settings } from 'src/app/models/ngx-store/Settings.model';

export const CHANGE_SORT_TYPE = '[PREFERENCES] Change sort';
export const CHANGE_SORT_TIME = '[PREFERENCES] Change sort time';
export const CHANGE_SETTINGS = '[PREFERENCES] Change settings';

export class ChangeSort implements Action {
    readonly type = CHANGE_SORT_TYPE;
    constructor(public payload: SortType) {}
}

export class ChangeSortTime implements Action {
    readonly type = CHANGE_SORT_TIME;
    constructor(public payload: SortTime) {}
}

export class ChangeSettings implements Action {
    readonly type = CHANGE_SETTINGS;
    constructor(public payload: Settings) {}
}


export type Actions = ChangeSort | ChangeSortTime | ChangeSettings;
