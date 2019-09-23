import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { Observable, Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
})
export class SubListComponent implements OnInit, OnDestroy {
    @Input() subList: string[];
    @Output() contentToShow = new EventEmitter<string[]>();

    nsfwSubscription: Subscription;

    constructor(private logger: LoggerService, private redditService: RedditService, private events: EventsService) {
        this.subList = [];
    }

    ngOnInit() {
        this.logger.log(`SubListComponent initialized`);
        this.nsfwSubscription = this.events.nsfwObservable().subscribe((nsfw) => {
            this.onSettingNsfwValueChanged(nsfw);
        });
    }
    ngOnDestroy() {
        this.nsfwSubscription.unsubscribe();
    }


    private onSettingNsfwValueChanged(nsfw: boolean) {
        if (!nsfw) {
            // delete text in search bar
            this.subList = [];
        }
    }


    putGallery(sub) {
        this.redditService.resetMediaList();
        this.contentToShow.emit(['gallery', sub]);
    }

}
