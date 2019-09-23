import { SortType } from './SortType.type';
import { SortTime } from './SortTime.type';
import { Settings } from './Settings.model';

export interface Sort {
    sortType: SortType;
    sortTime: SortTime;
}

export interface Preferences {
    settings: Settings;
    sort: Sort;
}
