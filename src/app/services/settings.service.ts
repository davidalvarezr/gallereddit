import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EventsService } from './events.service';
import { UsesStorage } from './UsesStorage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends UsesStorage {

    constructor(storage: Storage, private events: EventsService) {
        super(storage);
    }

    // NSFW

    async setNsfwSub(val: boolean): Promise<any> {
        const newNsfwSubVal = await this.set('show-nsfw-sub', val);
        // console.log(`Emitting an event from setNsfwSub`);
        this.events.notifyNsfwHasChanged(newNsfwSubVal);
        return newNsfwSubVal;
    }

    async getNsfwSub(): Promise<boolean> {
        const showNsfwSub = await this.get('show-nsfw-sub');
        return showNsfwSub ? showNsfwSub : false;
    }

    // GALLERY SIZE

    async setGallerySize(val: 'small' | 'medium'): Promise<any> {
        const newGallerySize = await this.set('gallery-size', val);
        this.events.notifyGallerySizeHasChanged(newGallerySize);
        return newGallerySize;
    }
    async getGallerySize(): Promise<any> {
        const gallerySize = await this.get('gallery-size');
        return gallerySize ? gallerySize : 'small';
    }

    // MUTED

    async setMuted(val: boolean): Promise<boolean> {
        const newMutedValue = await this.set('muted', val);
        return newMutedValue;
    }
    async getMuted(): Promise<boolean> {
        const muted = await this.get('muted');
        return muted !== undefined && muted !== null ? muted : true;
    }
}
