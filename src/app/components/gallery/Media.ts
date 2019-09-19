import { MediaType } from './MediaType';
import { IMedia } from './IMedia';

export class Media {

    title: string;
    type: 'img' | 'gif';
    staticThumbUrl: string;
    mediaUrl: string;
    mediaCoverUrl?: string;
    mp4ThumbUrl?: string;

    constructor(media: IMedia) {
        this.title = media.title;
        this.type = media.content.type;
        this.staticThumbUrl = media.content.staticThumbUrl;
        this.mediaUrl = media.content.mediaUrl;
        this.mediaCoverUrl = media.content.mediaCoverUrl;
        this.mp4ThumbUrl = media.content.mp4ThumbUrl;
    }

    static fromJSON(post: any) {
        // console.log(`JSON received: ${JSON.stringify(post)}`);

        if (!post.data.hasOwnProperty('preview')) { return; }
        if (!post.data.preview.hasOwnProperty('images')) { return; }
        if (!post.data.preview.images[0].hasOwnProperty('variants')) { return; }
        if (!post.data.preview.images[0].variants.hasOwnProperty('gif')) {
            return new Media({
                title: post.data.title,
                content: {
                    type: 'img',
                    staticThumbUrl: post.data.preview.images[0].resolutions[0].url,
                    mediaUrl: post.data.preview.images[0].source.url,
                }
            });
        }
        if (!post.data.preview.images[0].variants.gif.hasOwnProperty('resolutions')) {
            return;
        }
        if (!post.data.preview.images[0].variants.gif.resolutions[0].hasOwnProperty('url')) {
            return;
        }

        return new Media({
            title: post.data.title,
            content: {
                type: 'gif',
                staticThumbUrl: post.data.preview.images[0].resolutions[0].url,
                mediaUrl: post.data.preview.images[0].variants.mp4.source.url,
                mp4ThumbUrl: post.data.preview.images[0].variants.mp4.resolutions[0].url,
                mediaCoverUrl: post.data.preview.images[0].source.url
            }
        });
    }

    toString(): string {
        return `${this.type}`;
    }
}
