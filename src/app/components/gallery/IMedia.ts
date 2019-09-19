import { MediaType } from './MediaType';

// interface IGif {

// }

interface IMediaContent {
    type: 'gif' | 'img';
    staticThumbUrl: string;
    mediaUrl: string;

    // The image to show before mp4 is loaded
    mediaCoverUrl?: string;
    mp4ThumbUrl?: string;
}

export interface IMedia {
    title: string;
    content: IMediaContent;
}
