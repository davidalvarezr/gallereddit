import { Media } from 'src/app/components/gallery/Media';

export interface LayoutReducerState {
    menuOpen: boolean;
    gallery: Media[];
}
