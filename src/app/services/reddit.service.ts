import { Injectable } from '@angular/core';
import { reddit } from 'src/environments/environment.prod';
import { HTTP } from '@ionic-native/http/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Media } from '../components/gallery/Media';
import { MediaType } from '../components/gallery/MediaType';
import { LoadingController } from '@ionic/angular';
import { ResolveEnd } from '@angular/router';

const TIME_OF_VALIDITY = 3600000;
const OVER_18 = false;
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

    loader: any;
    currentSub: string;
    subFound: string[];
    mediaList: Media[];

    constructor(
        private http: HTTP,
        private uniqueDeviceID: UniqueDeviceID,
        public loadingController: LoadingController
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

        setInterval(() => {
            console.log(`Current subreddit: ${this.currentSub}`);
        }, 2000);
  }

    // make a request to get a new token
    private refreshToken(): Promise<string> {
        console.log('Refreshing token...');
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
                include_over_18: OVER_18,
                include_advertisable: true,
                query,
            };

            this.http.post(SEARCH_SUB_ROUTE, body, {Authorization: `Bearer ${this.token}`})
                .then((res) => {
                    const data = JSON.parse(res.data);
                    console.log(`DATA: ${JSON.stringify(data)}`);
                    this.subFound = data.names;
                })
                .catch((err) => {
                    console.error(`ERROR: ${JSON.stringify(err)}`);
                });
        } catch (err) {
            console.log(err);
        }
    }

    checkToken() {
        return new Promise(async (resolve, reject) => {
            console.log(`Time before asking a new token (in seconds): ${this.timeBeforeRefreshing / 1000}`);

            let token;

            try {
                if (this.needNewToken) {
                    token = await this.refreshToken();
                    console.log(`Token has been refreshed: ${token}`);
                }
            } catch (err) {
                console.log(`An error occured while refreshing the token: ${err}`);
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
            // this.after = '';
            this.firstRefresh = false;
        } catch (err) {
            console.error(`ERROR: ${err}`);
        }
    }

    getThumbnails(): Promise<any> {
        console.log(`POST: ${SUB_ROUTE}/r/${this.currentSub}/hot?raw_json=1&after=${this.after}`);
        return new Promise((resolve, reject) => {
            if (this.firstRefresh) {
                this.showLoader();
            }
            const endpoint = `${SUB_ROUTE}/r/${this.currentSub}/hot?raw_json=1`;
            const body = {
                limit: `${LIMIT}`,
                count: `${this.count}`,
                after: `${this.after}`,
            };
            const auth = {Authorization: `Bearer ${this.token}`};

            this.http.get(endpoint, body, auth)
                .then((res) => {
                    if (this.firstRefresh) {
                        this.hideLoader();
                    }
                    const parsedData = JSON.parse(res.data);
                    const posts = parsedData.data.children;
                    // console.log(`ALL POSTS: ${JSON.stringify(posts)}`);
                    posts.forEach((post, index) => {
                        const media = Media.fromJSON(post);
                        // console.log(`post ${index}: ${JSON.stringify(post)}`);
                        if (media) {
                            this.mediaList.push(media);
                        }
                    });
                    this.count += LIMIT;
                    this.after = parsedData.data.after;
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
            });
    }

    loadMoreThumbnails(): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const length = this.mediaList.length;
            while (this.mediaList.length < length + LIMIT && this.after !== null) {
                await this.getThumbnails();
            }
            resolve(this.after === null ? -1 : 0);
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
        // console.log('Loading dismissed! ' + JSON.stringify(onDismiss));
    }

    hideLoader() {
        this.loader.dismiss();
    }
}
