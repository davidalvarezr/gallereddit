import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
})
export class SubListComponent implements OnInit {
    @Input() subList: string[];

    @Output() contentToShow = new EventEmitter<string[]>();

    constructor(private redditService: RedditService) {
        this.subList = [];
    }

    ngOnInit() {}

    public putGallery(sub) {
        this.redditService.resetMediaList();
        this.contentToShow.emit(['gallery', sub]);
    }
}
