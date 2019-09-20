import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    constructor(private storage: Storage, private events: EventsService) {}


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
        const newNsfwSubVal = await this.set('show-nsfw-sub', val);
        console.log(`Emitting an event from setNsfwSub`);
        this.events.notifyNsfwHasChanged(newNsfwSubVal);
        return newNsfwSubVal;
    }

    async getNsfwSub(): Promise<boolean> {
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
