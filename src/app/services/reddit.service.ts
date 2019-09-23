import { Injectable } from '@angular/core';
import { reddit } from 'src/environments/environment.prod';
import { HTTP } from '@ionic-native/http/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Media } from '../components/gallery/Media';
import { MediaType } from '../components/gallery/MediaType';
import { LoadingController } from '@ionic/angular';
import { ResolveEnd } from '@angular/router';
import { SettingsService } from './settings.service';
import { SortService } from './sort.service';
import { LoggerService } from './logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { PreferencesReducerState, Sort } from '../models/ngx-store/Preferences.model';
import { Settings } from '../models/ngx-store/Settings.model';
import * as fromPreferencesReducer from '../ngx-store/reducers/preferences.reducer';

const TIME_OF_VALIDITY = 3600000;
const LIMIT = 25;
const ACCESS_TOKEN_ROUTE = 'https://www.reddit.com/api/v1/access_token';
const GRANT_TYPE_ROUTE = 'https://oauth.reddit.com/grants/installed_client';
const SEARCH_SUB_ROUTE = 'https://oauth.reddit.com/api/search_reddit_names';
const SUB_ROUTE = 'https://oauth.reddit.com';
const MIN_NUM_TO_BE_LOADED = 20;

@Injectable({
  providedIn: 'root'
})
export class RedditService {
    private needNewToken: boolean;
    private timeBeforeRefreshing: number;
    private token: string;
    private deviceId: string;
    private after: string;
    private count: number;
    private firstRefresh: boolean;
    private settings: Settings = fromPreferencesReducer.initState.settings;
    private sort: Sort = fromPreferencesReducer.initState.sort;

    loader: any;
    currentSub: string;
    subFound: string[];
    mediaList: Media[];

    constructor(
        private logger: LoggerService,
        private http: HTTP,
        private uniqueDeviceID: UniqueDeviceID,
        public loadingController: LoadingController,
        private store: Store<AppState>
    ) {
        this.timeBeforeRefreshing = 0;
        this.needNewToken = true;
        this.mediaList = [];
        this.after = '';
        this.count = 0;
        this.firstRefresh = true;

        // Determine device id
        this.uniqueDeviceID.get()
            .then((uuid: any) => this.deviceId = uuid)
            .catch((error: any) => console.error(error));


        // Each minute, remove 60000ms to the time before refreshing
        setInterval(() => {
            this.timeBeforeRefreshing =
                this.timeBeforeRefreshing > 60000
                ? this.timeBeforeRefreshing - 60000
                : 0;
            this.needNewToken = this.timeBeforeRefreshing < 60000;
        }, 60000);


        this.store.select('preferences').subscribe((prefState: PreferencesReducerState) => {
            if (prefState !== null && prefState !== undefined) {
                this.settings = prefState.settings;
                console.log(prefState);
                if (this.sort.sortTime !== prefState.sort.sortTime
                        || this.sort.sortType !== prefState.sort.sortType) {

                    // sort has been changed, update thumbnails
                    this.resetMediaList();
                    this.getThumbnails();
                }
                this.sort = prefState.sort;
            }
        });
  }

    // make a request to get a new token
    private refreshToken(): Promise<string> {
        this.logger.log('Refreshing token...');
        return new Promise((resolve, reject) => {
            this.needNewToken = false;
            // Headers
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            this.http.setDataSerializer('urlencoded');
            this.http.useBasicAuth(reddit.client_id, reddit.secret);

            const body = {
                grant_type: GRANT_TYPE_ROUTE,
                device_id: this.deviceId,
            };

            this.http
                .post(ACCESS_TOKEN_ROUTE, body, headers)
                .then(res => {
                    const data = JSON.parse(res.data);
                    this.token = data.access_token;
                    resolve(this.token);
                })
                .catch(err => {
                    console.error(`ERROR: ${JSON.stringify(err)}`);
                    reject(err);
                });

            this.timeBeforeRefreshing = TIME_OF_VALIDITY;
        });
    }

    async searchSubs(query = null) {
        try {
            await this.checkToken();

            const body = {
                exact: false,
                include_over_18: this.settings.nsfw,
                include_advertisable: true,
                query,
            };

            this.http.post(SEARCH_SUB_ROUTE, body, {Authorization: `Bearer ${this.token}`})
                .then((res) => {
                    const data = JSON.parse(res.data);
                    this.subFound = data.names;
                })
                .catch((err) => {
                    console.error(`ERROR: ${JSON.stringify(err)}`);
                });
        } catch (err) {
            this.logger.err(err);
        }
    }

    checkToken() {
        return new Promise(async (resolve, reject) => {
            this.logger.log(`Time before asking a new token (in seconds): ${this.timeBeforeRefreshing / 1000}`);

            let token;

            try {
                if (this.needNewToken) {
                    token = await this.refreshToken();
                    this.logger.log(`Token has been refreshed: ${token}`);
                }
            } catch (err) {
                this.logger.err(`An error occured while refreshing the token: ${err}`);
                reject(err);
            }

            resolve(token);
        });
    }

    async setSub(subName) {
        try {
            await this.checkToken();
            this.currentSub = subName;
            while (this.mediaList.length < MIN_NUM_TO_BE_LOADED && this.after !== null) {
                await this.getThumbnails();
            }
            this.firstRefresh = false;
        } catch (err) {
            console.error(`ERROR: ${err}`);
        }
    }

    async getThumbnails(): Promise<any> {
        try {
            if (this.firstRefresh) {
                this.showLoader();
            }


            const endpoint = `${SUB_ROUTE}/r/${this.currentSub}/${this.sort.sortType}?raw_json=1`;
            this.logger.log(`${endpoint}&after=${this.after}`);
            const body = {
                t: `${this.sort.sortTime}`,
                limit: `${LIMIT}`,
                count: `${this.count}`,
                after: `${this.after}`,
            };
            const auth = {Authorization: `Bearer ${this.token}`};

            const res = await this.http.get(endpoint, body, auth);
            if (this.firstRefresh) {
                this.hideLoader();
            }
            const parsedData = JSON.parse(res.data);
            const posts = parsedData.data.children;
            posts.forEach((post, index) => {
                const media = post.data.hasOwnProperty('crosspost_parent_list')
                    ? Media.fromJSON(post.data.crosspost_parent_list[0])
                    : Media.fromJSON(post.data);
                if (media) {
                    this.mediaList.push(media);
                }
            });
            this.count += LIMIT;
            this.after = parsedData.data.after;
            return;
        } catch (err) {
            return err;
        }
    }

    loadMoreThumbnails(): Promise<number> {
        return new Promise(async (resolve, reject) => {
            if (this.currentSub) {
                const length = this.mediaList.length;
                while (this.mediaList.length < length + LIMIT && this.after !== null) {
                    await this.getThumbnails();
                }
                resolve(this.after === null ? -1 : 0);
            } else {
                resolve(-1);
            }
        });
    }

    resetMediaList(mediaList = []) {
        this.after = '';
        this.mediaList = mediaList;
    }

    async showLoader() {
        this.loader = await this.loadingController.create({
            message: 'Fetching images from ' + this.currentSub,
          });
        await this.loader.present();
        const onDismiss = await this.loader.onDidDismiss();
    }

    hideLoader() {
        this.loader.dismiss();
    }
}
