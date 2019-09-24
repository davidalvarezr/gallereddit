import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { LoggerService } from './logger.service';
import { AddMessage } from '../ngx-store/actions/debug.action';
import { Json } from '../models/json.model';
import { Logger } from '../models/ngx-store/Logger.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerDispatcherService implements Logger {

    active = true;
    activeStore = true;

    constructor(private store: Store<AppState>, private logger: LoggerService) {}


    log(text: string | Json) {
        this.logger.log(text);
        this.store.dispatch(new AddMessage({content: text, type: 'log'}));
    }

    logJSON(json: Json) {
        this.logger.logJSON(json);
        this.store.dispatch(new AddMessage({content: json, type: 'json'}));
    }

    warn(text: string | Json) {
        this.logger.warn(text);
        this.store.dispatch(new AddMessage({content: text, type: 'warn'}));
    }

    err(text: string | Json) {
        this.logger.err(text);
        this.store.dispatch(new AddMessage({content: text, type: 'err'}));
    }

    storeInfo(what: string, json: Json | string) {
        this.logger.storeInfo(what, json);
        this.store.dispatch(new AddMessage({content: `${what}: ${json}`, type: 'store'}));
    }

    wtf(text: string | Json) {
        this.logger.wtf(text);
        this.store.dispatch(new AddMessage({content: text, type: 'wtf'}));

    }
}
