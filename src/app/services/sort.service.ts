import { Injectable } from '@angular/core';
import { UsesStorage } from './UsesStorage';
import { Storage } from '@ionic/storage';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class SortService extends UsesStorage {

    constructor(storage: Storage, events: EventsService) {
        super(storage);
    }

    // SORT

    async setSort(sort: string): Promise<string> {
        await this.set('sort', sort);
        return sort;
    }

    async getSort(): Promise<string> {
        const sort = await this.get('sort');
        return sort ? sort : 'best';
    }

    // SORT TIME

    async setSortTime(sortTime: string): Promise<string> {
        await this.set('sort-time', sortTime);
        return sortTime;
    }

    async getSortTime(): Promise<string> {
        const sortTime = await this.get('sort-time');
        return sortTime ? sortTime : 'day';
    }

}
