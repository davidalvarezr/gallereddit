import { Component, OnInit, Input } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit {

    public searchTerm: string;
    public title: string;
    public contentToShow: string; // gallery | sub_list


    constructor(
        public redditService: RedditService,
        private menuController: MenuController,
    ) {
        this.contentToShow = 'gallery';
    }

    ngOnInit() {
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
