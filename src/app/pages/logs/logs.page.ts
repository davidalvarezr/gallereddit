import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {  Message } from 'src/app/models/ngx-store/Debug.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

    messages: Message[];

    constructor(private store: Store<AppState>) {
        store.select('debug').subscribe((debugState) => {
            this.messages = debugState.messages;
        });
    }

    ngOnInit() {

    }

}
