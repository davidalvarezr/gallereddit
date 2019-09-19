import { MediaType } from './MediaType';

export class Media {


    type: MediaType;
    thumbUrl: string;
    mediaUrl: string;
    title: string;

    constructor(type: MediaType, thumbUrl: string, mediaUrl: string, title: string) {
        this.type = type;
        this.thumbUrl = thumbUrl;
        this.mediaUrl = mediaUrl;
        this.title = title;
    }

    static fromJSON(post: any) {
        // console.log(`JSON received: ${JSON.stringify(post)}`);

        if (!post.data.hasOwnProperty('preview')) { return; }
        if (!post.data.preview.hasOwnProperty('images')) { return; }
        if (!post.data.preview.images[0].hasOwnProperty('variants')) { return; }
        if (!post.data.preview.images[0].variants.hasOwnProperty('gif')) {
            return new Media(
                MediaType.img,
                post.data.preview.images[0].resolutions[0].url,
                post.data.preview.images[0].source.url,
                post.data.title
            );
        }
        if (!post.data.preview.images[0].variants.gif.hasOwnProperty('resolutions')) {
            return;
        }
        if (!post.data.preview.images[0].variants.gif.resolutions[0].hasOwnProperty('url')) {
            return;
        }
        return new Media(
            MediaType.gif,
            post.data.preview.images[0].variants.gif.resolutions[0].url,
            post.data.preview.images[0].variants.gif.source.url,
            post.data.title
        );
    }

    toString(): string {
        return `${this.title}\ntype: ${this.type}\nthumbUrl: ${this.thumbUrl}\nmediaUrl: ${this.mediaUrl}`;
    }
}
