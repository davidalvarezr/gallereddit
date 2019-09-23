import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType } from 'src/app/components/gallery/MediaType';
import { SettingsService } from 'src/app/services/settings.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PreferencesReducerState } from 'src/app/models/ngx-store/Preferences.model';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {

    mediaUrl: string;
    mediaTitle: string;
    mediaType: string;
    muted: boolean;

    constructor(private activatedRoute: ActivatedRoute, private settings: SettingsService, private store: Store<AppState>) {
        // this.getSettings();
        store.select('preferences').subscribe((preferences: PreferencesReducerState) => {
            this.muted = preferences.settings.videoMuted;
        });
        this.getParams();
    }

    ngOnInit() {
    }

    // private async getSettings() {
    //     this.muted = await this.settings.getMuted();
    // }

    private getParams() {
        this.mediaUrl = this.activatedRoute.snapshot.paramMap.get('url');
        this.mediaTitle = this.activatedRoute.snapshot.paramMap.get('title');
        this.mediaType = this.activatedRoute.snapshot.paramMap.get('type');
    }
}
