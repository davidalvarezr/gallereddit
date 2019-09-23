import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { SortService } from 'src/app/services/sort.service';
import { DrawerComponent } from 'src/app/components/menus/drawer/drawer.component';
import { LoggerService } from 'src/app/services/logger.service';


@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit, OnDestroy {

    private nsfwSubscription: Subscription;
    private sortSubscription: Subscription;
    private sortTimeSubscription: Subscription;

    searchTerm: string;
    title: string;
    contentToShow: string; // gallery | sub_list
    sort: string;
    sortTime: string;

    @ViewChild(DrawerComponent, { static: false }) menu: DrawerComponent;

    constructor(
        private logger: LoggerService,
        public redditService: RedditService,
        private events: EventsService,
        private sortService: SortService
    ) {
        this.contentToShow = 'gallery';
        this.loadSort();
    }

    ngOnInit() {
        this.logger.log(`GalleryPage initialized`);
        this.nsfwSubscription = this.events.nsfwObservable().subscribe(nsfw => {
            this.onSettingNsfwValueChanged(nsfw);
        });
        this.sortSubscription = this.events.sortObservable().subscribe(sort => {
            this.onSortValueChanged(sort);
        });
        this.sortTimeSubscription = this.events.sortTimeObservable().subscribe(sortTime => {
            this.onSortTimeValueChanged(sortTime);
        });
    }
    ngOnDestroy() {
        this.nsfwSubscription.unsubscribe();
        this.sortSubscription.unsubscribe();
        this.sortTimeSubscription.unsubscribe();
    }

    private async loadSort() {
        [this.sort, this.sortTime] = await Promise.all([
            this.sortService.getSort(),
            this.sortService.getSortTime()
        ]);
    }

    private onSettingNsfwValueChanged(nsfw: boolean) {
        this.searchSubs();
    }

    private onSortValueChanged(sort: string) {
        this.sort = sort;
    }

    private onSortTimeValueChanged(sortTime: string) {
        this.sortTime = sortTime;
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

    async changeSort() {
        await this.sortService.setSort(this.sort);
        this.redditService.resetMediaList();
        this.redditService.loadMoreThumbnails();
        this.events.notifySortHasChanged(this.sort);
    }

    async changeSortTime() {
        await this.sortService.setSortTime(this.sortTime);
        this.redditService.resetMediaList();
        this.redditService.loadMoreThumbnails();
        this.events.notifySortTimeHasChanged(this.sortTime);
    }

}
