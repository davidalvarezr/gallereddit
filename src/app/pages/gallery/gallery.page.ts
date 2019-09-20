import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit, OnDestroy {

    private nsfwSubscription: Subscription;

    searchTerm: string;
    title: string;
    contentToShow: string; // gallery | sub_list


    constructor(
        public redditService: RedditService,
        private events: EventsService,
    ) {
        this.contentToShow = 'gallery';
    }

    ngOnInit() {
        console.log(`GalleryPage initialized`);
        this.nsfwSubscription = this.events.nsfwObservable().subscribe((nsfw) => {
            this.onSettingNsfwValueChanged(nsfw);
        });
    }
    ngOnDestroy() {
        this.nsfwSubscription.unsubscribe();
    }


    private onSettingNsfwValueChanged(nsfw: boolean) {
        // console.log('GalleryPage Receiving notification');
        if (!nsfw) {
            // delete search term
            this.searchTerm = '';
        }
    }

    public searchSubs() {
        this.redditService.searchSubs(this.searchTerm);
    }

    public putSubList() {
        this.contentToShow = 'sub_list';
    }
    public putGallery() {
        this.contentToShow = 'gallery';
    }

    public onContentToShowSublistChanged(contentToShow: string[]) {
        const [content, sub] = contentToShow;
        this.contentToShow = content;
        this.redditService.setSub(sub);
        this.title = sub;
    }
}
