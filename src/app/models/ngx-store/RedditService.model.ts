import { Media } from 'src/app/components/gallery/Media';


export interface RedditServiceReducerState {
    subredditsFounded: string[];
    currentSubreddit?: string;
    medias: Media[];
    currentMedia?: Media;
    // accessToken: string;
    // accessTokenTimestamp: number;
}
