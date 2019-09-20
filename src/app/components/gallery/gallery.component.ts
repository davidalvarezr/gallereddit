import { Component, OnInit, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { Media } from './Media';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor(
        public redditService: RedditService,
        private router: Router,
        private events: EventsService
    ) { }

    ngOnInit() {
        console.log(`GalleryComponent initialized`);
        this.subscription = this.events.nsfwObservable().subscribe((nsfw) => {
            this.onSettingNsfwValueChanged(nsfw);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openImage(media: Media) {
        console.log(`Clicked on image ${media}`);
        this.router.navigate(['/image-viewer/'], );
    }

    async loadData(event): Promise<any> {
        // console.log('Begin async operation');
        const status = await this.redditService.loadMoreThumbnails();
        event.target.complete();
        if (status === -1) {
            event.target.disable = true;
        }
        // console.log('Async operation has ended');
    }

    onSettingNsfwValueChanged(nsfw: boolean) {
        // console.log('Receiving notification');
        if (!nsfw) {
            this.redditService.resetMediaList();
        }
    }
}
