import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    constructor(private storage: Storage) {}


    private async set(key: string, val: any): Promise<any> {
        await this.storage.set(key, val);
        return val;
    }

    private async get(key: string): Promise<any> {
        try {
            const val = this.storage.get(key);
            return val;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async setNsfwSub(val: boolean): Promise<any> {
        return await this.set('show-nsfw-sub', val);
    }

    async getNsfwSub(): Promise<any> {
        const showNsfwSub = await this.get('show-nsfw-sub');
        return showNsfwSub ? showNsfwSub : false;
    }

    async setGallerySize(val: 'small' | 'medium'): Promise<any> {
        return await this.set('gallery-size', val);
    }
    async getGallerySize(): Promise<any> {
        const gallerySize = await this.get('gallery-size');
        return gallerySize ? gallerySize : 'small';
    }
}
