import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {  Message } from 'src/app/models/ngx-store/Debug.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

    messages: Observable<Message[]>;

    constructor(private store: Store<AppState>) {
        this.messages = store.select('debug').pipe(
            select(debugState => debugState.messages)
        );
    }

    ngOnInit() {

    }

}
