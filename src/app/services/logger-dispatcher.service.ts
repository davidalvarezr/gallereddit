import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { LoggerService } from './logger.service';
import { AddMessage } from '../ngx-store/actions/debug.action';
import { Json, JsonMap } from '../models/json.model';
import { Logger, Loggable } from '../models/ngx-store/Logger.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerDispatcherService implements Logger {

    active = true;
    activeStore = true;

    constructor(private store: Store<AppState>, private logger: LoggerService) {}

    /**
     * Logs the text and dispatch an AddMessage action
     * @param text text to log
     */
    log(text: Loggable): void {
        this.logger.log(text);
        this.store.dispatch(new AddMessage({content: text, type: 'log'}));
    }

    /**
     * Logs the text and dispatch an AddMessage action
     * @param json json to log
     */
    logJSON(json: Json) {
        this.logger.logJSON(json);
        this.store.dispatch(new AddMessage({content: json, type: 'json'}));
    }

    /**
     * Logs the text and dispatch an AddMessage action
     * @param text text to log
     */
    warn(text: Loggable) {
        this.logger.warn(text);
        this.store.dispatch(new AddMessage({content: text, type: 'warn'}));
    }

    /**
     * Logs the text and dispatch an AddMessage action
     * @param text text to log
     */
    err(text: Loggable) {
        this.logger.err(text);
        this.store.dispatch(new AddMessage({content: text, type: 'err'}));
    }

    /**
     *
     * @param what The description of th json / what it is
     * @param json The json object to print
     */
    storeInfo(what: string, json: Loggable) {
        this.logger.storeInfo(what, json);
        this.store.dispatch(new AddMessage({content: `${what}: ${json}`, type: 'store'}));
    }

    /**
     * Logs the test in a funny way and dispatch an AddMessage action
     * @param text text to log
     */
    wtf(text: Loggable) {
        this.logger.wtf(text);
        this.store.dispatch(new AddMessage({content: text, type: 'wtf'}));

    }
}
