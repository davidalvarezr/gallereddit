import { Json } from '../json.model';
import { Reducers } from 'src/app/app.state';

export type Loggable = boolean | number | string | Json | Reducers;

export interface Logger {

    log(text: Loggable): void;

    logJSON(json: Json): void;

    warn(text: Loggable): void;

    err(text: Loggable): void;

    storeInfo(what: string, json: Loggable): void;

    wtf(text: Loggable): void;
}
