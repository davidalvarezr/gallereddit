import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private nsfw = new Subject<boolean>();

    constructor() {

    }

    notifyNsfwHasChanged(nsfw: boolean) {
        this.nsfw.next(nsfw);
    }
    nsfwObservable(): Observable<boolean> {
        return this.nsfw.asObservable();
    }

}
