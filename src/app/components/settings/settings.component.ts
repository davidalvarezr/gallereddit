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

    constructor(private settings: SettingsService) { }

    ngOnInit() {
        this.getSettings();
    }

    private async getSettings() {
        this.nsfwSub = await this.settings.getNsfwSub();
        this.gallerySize = await this.settings.getGallerySize();
    }

    async setNsfwSub() {
        this.nsfwSub = await this.settings.setNsfwSub(this.nsfwSub);
    }

    async setGallerySize() {
        this.gallerySize = await this.settings.setGallerySize(this.gallerySize);
    }
}
