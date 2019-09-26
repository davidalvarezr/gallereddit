import { Media } from 'src/app/components/gallery/Media';

export interface LayoutReducerState {
    pageTitle: string;
    menuOpen: boolean;
    gallery: Media[]; // FIXME: put this data on a reddit service reducer
    searchValue: string;
    galleryPageShows: 'gallery' | 'sub-list' | 'nothing';
}
