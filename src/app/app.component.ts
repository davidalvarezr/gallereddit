import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, createAction } from '@ngrx/store';
import { AppState } from './app.state';
import { Storage } from '@ionic/storage';
import { AppInit } from './ngx-store/actions/app.action';
import { Observable, Subscription } from 'rxjs';
import { LoggerDispatcherService } from './services/logger-dispatcher.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private storage: Storage,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private logger: LoggerDispatcherService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#000000');
        this.statusBar.styleLightContent();
        this.statusBar.show();
        this.splashScreen.hide();
        });
    }

    ngOnInit() {
        // TODO: Check if now there is no more problems when killing the app.
        // Before the app state was not correct when restarting the app.
        this.dispatchStorageInitState()
            .then(() => {
                this.subscribeToStoreChanges();
            });
    }

    /**
     * Takes the global state of the app from the local storage and put it inside the ngrx-store
     */
    private async dispatchStorageInitState(): Promise<void> {
        return this.storage.get('state').then((stringState) => {
            const state = JSON.parse(stringState);
            this.store.dispatch(new AppInit(state));
            // this.logger.log(`STATE OF THE APP HAS BEEN INITIALIZED IN NGRX-STORE`); <-- infinite dispatch...
            console.log(`STATE OF THE APP HAS BEEN INITIALIZED IN NGRX-STORE`);

        });
    }

    /**
     * Listens to ngrx-store state changes and saves it in local storage
     */
    private subscribeToStoreChanges(): void {
        this.store.subscribe((state) => {
            const stringState = JSON.stringify(state);
            this.storage.set('state', stringState).then(() => {
                console.log('STATE PUT IN LOCAL STORAGE');
            })
            .then(() => {
                // this.logger.log(`NGRX-STORE HAS BEEN SAVED IN LOCAL STORAGE`); <-- infinite dispatch...
                console.log(`NGRX-STORE HAS BEEN SAVED IN LOCAL STORAGE`);
            });
        });
    }
}
