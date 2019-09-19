export class Subbreddit {

    name: string;
    nsfw: boolean;

    constructor(name, nsfw) {
        this.name = name;
        this.nsfw = nsfw;
    }

    toString(): string {
        return `${this.name}${this.nsfw ? '/NSFW/' : '' }`;
    }
}
