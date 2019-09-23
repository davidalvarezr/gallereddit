import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, createAction } from '@ngrx/store';
import { AppState } from './app.state';
import { Storage } from '@ionic/storage';
import { AppInit } from './ngx-store/actions/app.action';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private store: Store<AppState>,
        private storage: Storage,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.storage.get('state').then((stringState) => {
            const state = JSON.parse(stringState);
            this.store.dispatch(new AppInit(state));
        });
        this.store.subscribe((state) => {
            const stringState = JSON.stringify(state);
            this.storage.set('state', stringState);
        });

        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });
    }
}
