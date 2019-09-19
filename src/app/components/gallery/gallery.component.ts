import { Component, OnInit } from '@angular/core';
import { RedditService } from 'src/app/services/reddit.service';
import { Media } from './Media';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
    constructor(
        public redditService: RedditService,
        private router: Router,
    ) { }

    ngOnInit() {
    }

    openImage(media: Media) {
        console.log(`Clicked on image ${media}`);
        // this.photoViewer.show(media.mediaUrl);
        this.router.navigate(['/image-viewer/'], );
    }

    async loadData(event): Promise<any> {
        console.log('Begin async operation');
        const status = await this.redditService.loadMoreThumbnails();
        event.target.complete();
        if (status === -1) {
            event.target.disable = true;
        }
        console.log('Async operation has ended');
    }
}
