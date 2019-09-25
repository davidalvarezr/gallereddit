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

        if (!data.hasOwnProperty('preview')
            || !data.preview.hasOwnProperty('images')
            || !data.preview.images[0].hasOwnProperty('variants')
            || data.preview.images[0].resolutions.length === 0) {

                // Here are sure the media has an accessible thumbnail
                return;
            }

        if (data.hasOwnProperty('media_embed')
            && data.media_embed.hasOwnProperty('content')
            && data.hasOwnProperty('domain')) {

                // Here we are (TODO:amlost) sure that the content is a gfycat or imgur media
                if (data.domain === 'gfycat.com') {
                    return this.gfycatMedia(data);
                }
                if (data.domain === 'i.imgur.com' || data.domain === 'imgur.com') {
                    return this.imgurMedia(data);
                }

                throw new Error(`Domain unknown: ${data.domain}`);

        }
        // Here we are sure the media has an accessible thumbnail and it is not a gycat/imgur video

        if (data.preview.images[0].variants.hasOwnProperty('gif')
            && data.preview.images[0].variants.gif.hasOwnProperty('resolutions')
            && data.preview.images[0].variants.gif.resolutions[0].hasOwnProperty('url')) {
            // Here we are sure it is a gif
            return new Media(
                MediaType.gif,
                data.preview.images[0].variants.gif.resolutions[0].url,
                data.preview.images[0].variants.gif.source.url,
                data.title
            );
        }

        if (data.domain === 'i.redd.it' || data.domain === 'i.imgur.com' || data.domain === 'imgur.com') {
            // Here it should be an image
            return new Media(
                MediaType.img,
                data.preview.images[0].resolutions[0].url,
                data.preview.images[0].source.url,
                data.title
            );
        }


    }

    private static gfycatMedia(data): Media {
        // console.log(data);
        const strToProcess: string = data.media_embed.content;
        const longName = strToProcess.split('image=https%3A%2F%2Fthumbs.gfycat.com%2F')[1]; // take after 'image...'
        if (longName === undefined || longName === null) { return; }
        const name = longName.split('-size_restricted.gif')[0]; // take before '-size_restricted.gif'
        const url = `https://thumbs.gfycat.com/${name}-mobile.mp4`;

        // It is rare, but gfycat media might not have a gif property.
        // In that case set the static image
        if (data.preview.images[0].variants.hasOwnProperty('gif')) {
            return new Media(
                MediaType.gfycat,
                data.preview.images[0].variants.gif.resolutions[0].url,
                url,
                data.title
            );
        } else {
            return new Media(
                MediaType.gfycat,
                data.preview.images[0].resolutions[0].url,
                url,
                data.title
            );
        }


    }

    private static imgurMedia(data): Media {
        if (data.preview.images[0].variants.hasOwnProperty('gif')) {
            return new Media(
                MediaType.gif,
                data.preview.images[0].variants.gif.resolutions[0].url,
                data.preview.images[0].variants.gif.source.url,
                data.title
            );
        } else {
            return new Media(
                MediaType.img,
                data.preview.images[0].resolutions[0].url,
                data.preview.images[0].source.url,
                data.title
            );
        }
    }

    toString(): string {
        return `${this.title}\ntype: ${this.type}\nthumbUrl: ${this.thumbUrl}\nmediaUrl: ${this.mediaUrl}`;
    }

    mediaType() {
        return MediaType;
    }
}
