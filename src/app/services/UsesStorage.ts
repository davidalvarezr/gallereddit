import { Storage } from '@ionic/storage';

export class UsesStorage {

    /**
     *
     * @param storage to access the local storage
     */
    constructor(private storage: Storage) {

    }

    /**
     * Puts a new entry in the local storage
     * @param key key
     * @param val value
     */
    protected async set(key: string, val: any): Promise<any> {
        await this.storage.set(key, val);
        return val;
    }

    /**
     * Get the value associated with the key from local storage
     * @param key key
     */
    protected async get(key: string): Promise<any> {
        const val = this.storage.get(key);
        return val;
    }

}
