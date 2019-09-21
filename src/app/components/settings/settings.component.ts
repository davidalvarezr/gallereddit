import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    public nsfwSub: boolean;
    public gallerySize: 'small' | 'medium';
    public muted: boolean;

    constructor(private settings: SettingsService) { }

    ngOnInit() {
        this.getSettings();
    }

    private async getSettings() {
        [this.nsfwSub, this.gallerySize, this.muted] = await Promise.all([
            this.settings.getNsfwSub(),
            this.settings.getGallerySize(),
            this.settings.getMuted()
        ]);
    }

    async setNsfwSub() {
        this.nsfwSub = await this.settings.setNsfwSub(this.nsfwSub);
    }

    async setGallerySize() {
        this.gallerySize = await this.settings.setGallerySize(this.gallerySize);
    }

    async changeMuted() {
        this.muted = await this.settings.setMuted(this.muted);
    }
}
