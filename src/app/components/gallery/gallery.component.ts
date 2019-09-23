import { Component, OnInit, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { Media } from './Media';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
    private nsfwSubscription: Subscription;
    private gallerySizeSubscription: Subscription;

    gallerySize: 'small'|'medium';

    constructor(
        private logger: LoggerService,
        public redditService: RedditService,
        private router: Router,
        private events: EventsService,
        private settings: SettingsService
    ) {
        this.settings.getGallerySize()
            .then(gallerySize => {
                this.gallerySize = gallerySize;
            });
    }

    ngOnInit() {
        this.logger.log(`GalleryComponent initialized`);
        this.nsfwSubscription = this.events.nsfwObservable().subscribe((nsfw) => {
            this.onSettingNsfwValueChanged(nsfw);
        });
        this.gallerySizeSubscription = this.events.gallerySizeObservable().subscribe((newGallerySize) => {
            this.onSettingGallerySizeChanged(newGallerySize);
        });
    }
    ngOnDestroy() {
        this.nsfwSubscription.unsubscribe();
    }

    openImage(media: Media) {
        this.logger.log(`Clicked on image ${media}`);
        this.router.navigate(['/image-viewer/'], );
    }

    async loadData(event): Promise<any> {
        const status = await this.redditService.loadMoreThumbnails();
        event.target.complete();
        if (status === -1) {
            event.target.disable = true;
        }
    }

    onSettingNsfwValueChanged(nsfw: boolean) {
        if (!nsfw) {
            this.redditService.resetMediaList();
        }
    }

    onSettingGallerySizeChanged(newGallerySize: 'small'|'medium') {
        this.gallerySize = newGallerySize;
    }

    thumbClick(media: Media) {
        this.logger.log(media.mediaUrl);
        this.logger.log(media.type);
    }
}
