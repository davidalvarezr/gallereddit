import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {

    mediaUrl: string;
    mediaTitle: string;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.mediaUrl = this.activatedRoute.snapshot.paramMap.get('url');
        this.mediaTitle = this.activatedRoute.snapshot.paramMap.get('title');
    }

}
