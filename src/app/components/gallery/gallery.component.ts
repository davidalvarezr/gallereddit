import { Component, OnInit } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { Media } from './Media';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PreferencesReducerState } from 'src/app/models/ngx-store/Preferences.model';
import { Observable } from 'rxjs';
import { LoggerDispatcherService } from 'src/app/services/logger-dispatcher.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

    gallery$: Observable<Media[]>;
    gallerySize: 'small'|'medium';

    constructor(
        private logger: LoggerDispatcherService,
        public redditService: RedditService,
        private router: Router,
        private store: Store<AppState>
    ) {
        store.select('preferences').subscribe((preferences: PreferencesReducerState) => {
            this.gallerySize = preferences.settings.gallerySize;
        });
    }

    ngOnInit() {
        this.logger.log(`GalleryComponent initialized`);
        this.gallery$ = this.store.pipe(
            select(state => state.layout.gallery)
        );
    }

    async loadData($event): Promise<any> {
        const status = await this.redditService.loadMoreThumbnails();
        // TODO: Dispatch action
        $event.target.complete();
        // if (status === -1) {
        //     $event.target.disable = true;
        // }
    }

    thumbClick(media: Media) {
        this.logger.log(media.mediaUrl);
        this.logger.log(media.type);
    }
}
