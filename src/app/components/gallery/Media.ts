import { MediaType } from './MediaType';

export class Media {

    constructor(type: MediaType, thumbUrl: string, mediaUrl: string, title: string) {
        this.type = type;
        this.thumbUrl = thumbUrl;
        this.mediaUrl = mediaUrl;
        this.title = title;
    }


    type: MediaType;
    thumbUrl: string;
    mediaUrl: string;
    title: string;

    static fromJSON(data: any) {
        // console.log(`JSON received: ${JSON.stringify(post)}`);

        if (!data.hasOwnProperty('preview')) { return; }
        if (!data.preview.hasOwnProperty('images')) { return; }
        if (!data.preview.images[0].hasOwnProperty('variants')) { return; }
        if (!data.preview.images[0].variants.hasOwnProperty('gif')) {
            if (data.preview.images[0].resolutions.length === 0) {
                return;
            }
            return new Media(
                MediaType.img,
                data.preview.images[0].resolutions[0].url,
                data.preview.images[0].source.url,
                data.title
            );
        }
        if (!data.preview.images[0].variants.gif.hasOwnProperty('resolutions')) {
            return;
        }
        if (!data.preview.images[0].variants.gif.resolutions[0].hasOwnProperty('url')) {
            return;
        }

        // Here we are sure it's a gif or a mp4

        if (data.hasOwnProperty('domain') && data.hasOwnProperty('media_embed')) {
            if (data.domain === 'gfycat.com' && data.media_embed.hasOwnProperty('content') ) {
                return this.gfycatMedia(data);
            }
            if (data.domain === 'i.imgur.com') {
                return this.imgurMedia(data);
            }
        }

        return new Media(
            MediaType.gif,
            data.preview.images[0].variants.gif.resolutions[0].url,
            data.preview.images[0].variants.gif.source.url,
            data.title
        );
    }

    private static gfycatMedia(data): Media {
        // console.log(data);
        const strToProcess: string = data.media_embed.content;
        const longName = strToProcess.split('image=https%3A%2F%2Fthumbs.gfycat.com%2F')[1]; // take after 'image...'
        if (longName === undefined || longName === null) { return; }
        const name = longName.split('-size_restricted.gif')[0]; // take before '-size_restricted.gif'
        const url = `https://thumbs.gfycat.com/${name}-mobile.mp4`;

        return new Media(
            MediaType.gfycat,
            data.preview.images[0].variants.gif.resolutions[0].url,
            url,
            data.title
        );
    }

    private static imgurMedia(data): Media {
        return new Media(
            MediaType.gif,
            data.preview.images[0].variants.gif.resolutions[0].url,
            data.preview.images[0].variants.gif.source.url,
            data.title
        );
    }

    toString(): string {
        return `${this.title}\ntype: ${this.type}\nthumbUrl: ${this.thumbUrl}\nmediaUrl: ${this.mediaUrl}`;
    }

    mediaType() {
        return MediaType;
    }
}
