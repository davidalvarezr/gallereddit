import { Json } from '../json.model';

export interface Logger {

    log(text: string | Json): void;

    logJSON(json: Json): void;

    warn(text: string | Json): void;

    err(text: string | Json): void;

    storeInfo(what: string, json: Json | string): void;

    wtf(text: string | Json): void;
}
