import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private nsfw = new Subject<boolean>();
    private gallerySize = new Subject<'small'|'medium'>();

    private sort = new Subject<string>();
    private sortTime = new Subject<string>();

    constructor() {}

    // NSFW

    notifyNsfwHasChanged(nsfw: boolean) {
        this.nsfw.next(nsfw);
    }
    nsfwObservable(): Observable<boolean> {
        return this.nsfw.asObservable();
    }

    // GALLERY SIZE

    notifyGallerySizeHasChanged(gallerySize: 'small'|'medium') {
        this.gallerySize.next(gallerySize);
    }
    gallerySizeObservable(): Observable<'small'|'medium'> {
        return this.gallerySize.asObservable();
    }

    // SORT

    notifySortHasChanged(sort: string) {
        this.sort.next(sort);
    }
    sortObservable(): Observable<string> {
        return this.sort.asObservable();
    }

    // SORT TIME

    notifySortTimeHasChanged(sortTime: string) {
        this.sortTime.next(sortTime);
    }
    sortTimeObservable(): Observable<string> {
        return this.sortTime.asObservable();
    }
}
