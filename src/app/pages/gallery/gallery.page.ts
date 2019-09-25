import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { SortService } from 'src/app/services/sort.service';
import { DrawerComponent } from 'src/app/components/menus/drawer/drawer.component';
import { LoggerService } from 'src/app/services/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PreferencesReducerState, Sort } from 'src/app/models/ngx-store/Preferences.model';
import { ChangeSort, ChangeSortTime } from 'src/app/ngx-store/actions/preferences.action';
import { LoggerDispatcherService } from 'src/app/services/logger-dispatcher.service';


@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit {

    private nsfwSubscription: Subscription;
    private sortSubscription: Subscription;
    private sortTimeSubscription: Subscription;

    searchTerm: string;
    title: string;
    contentToShow: string; // gallery | sub_list
    sort: Sort;


    @ViewChild(DrawerComponent, { static: false }) menu: DrawerComponent;

    constructor(
        private logger: LoggerDispatcherService,
        public redditService: RedditService,
        private events: EventsService,
        private sortService: SortService,
        private store: Store<AppState>
    ) {
        this.contentToShow = 'gallery';
        store.select('preferences').subscribe((preferencesState) => {
            this.sort = preferencesState.sort;
        });
    }

    ngOnInit() {
        this.logger.log(`GalleryPage initialized`);
    }


    private onSettingNsfwValueChanged(nsfw: boolean) {
        this.searchSubs();
    }

    searchSubs() {
        this.redditService.searchSubs(this.searchTerm);
    }

    putSubList() {
        this.contentToShow = 'sub_list';
    }
    putGallery() {
        this.contentToShow = 'gallery';
    }

    onContentToShowSublistChanged(contentToShow: string[]) {
        const [content, sub] = contentToShow;
        this.contentToShow = content;
        this.redditService.setSub(sub);
        this.title = sub;
    }

    async changeSort($event) {
        this.store.dispatch(new ChangeSort($event.detail.value));
        // this.redditService.resetMediaList();
        // this.redditService.loadMoreThumbnails();
    }

    async changeSortTime($event) {
        this.store.dispatch(new ChangeSortTime($event.detail.value));
        // this.redditService.resetMediaList();
        // this.redditService.loadMoreThumbnails();
    }

}
