import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Preferences } from 'src/app/models/ngx-store/Preferences.model';
import { GallerySize } from 'src/app/models/ngx-store/GallerySize.type';
import { Settings } from 'src/app/models/ngx-store/Settings.model';
import { ChangeSettings } from 'src/app/ngx-store/actions/preferences.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    public settings: Settings;

    // public nsfwSub: boolean;
    // public gallerySize: GallerySize;
    // public muted: boolean;

    constructor(private store: Store<AppState>) {
        this.store.select('preferences').subscribe((state: Preferences) => {
            if (state !== null && state !== undefined) {
                // this.nsfwSub = state.settings.nsfw;
                // this.gallerySize = state.settings.gallerySize;
                // this.muted = state.settings.videoMuted;
                this.settings = state.settings;
            }
        });
    }

    ngOnInit() {
        // this.getSettings();
    }

    // private async getSettings() {
    //     [this.nsfwSub, this.gallerySize, this.muted] = await Promise.all([
    //         this.settings.getNsfwSub(),
    //         this.settings.getGallerySize(),
    //         this.settings.getMuted()
    //     ]);
    // }

    async setNsfwSub($event) {
        const v: boolean = $event.detail.checked;
        this.store.dispatch(new ChangeSettings({...this.settings, nsfw: v}));
        // this.nsfwSub = await this.settings.setNsfwSub(this.nsfwSub);
    }

    async setGallerySize($event) {
        const v: GallerySize = $event.detail.value;
        this.store.dispatch(new ChangeSettings({...this.settings, gallerySize: v}));
        // this.gallerySize = await this.settings.setGallerySize(this.gallerySize);
    }

    async changeMuted($event) {
        const v: boolean = $event.detail.checked;
        this.store.dispatch(new ChangeSettings({...this.settings, videoMuted: v}));
        // this.muted = await this.settings.setMuted(this.muted);
    }
}
