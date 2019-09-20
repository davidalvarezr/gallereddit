import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private nsfw = new Subject<boolean>();
    private gallerySize = new Subject<'small'|'medium'>();

    constructor() {}

    notifyNsfwHasChanged(nsfw: boolean) {
        this.nsfw.next(nsfw);
    }
    nsfwObservable(): Observable<boolean> {
        return this.nsfw.asObservable();
    }

    notifyGallerySizeHasChanged(gallerySize: 'small'|'medium') {
        this.gallerySize.next(gallerySize);
    }
    gallerySizeObservable(): Observable<'small'|'medium'> {
        return this.gallerySize.asObservable();
    }

}
