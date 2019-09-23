import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { IonicStorageModule, Storage, StorageConfig } from '@ionic/storage';
import { StoreModule, MetaReducer, ActionReducer, Action } from '@ngrx/store';
import { layoutReducer } from './ngx-store/reducers/layout.reducer';
import { environment } from '../environments/environment'; // Angular CLI environment
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import devToolsEnhancer from 'remote-redux-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { LoggerService } from './services/logger.service';
import { preferencesReducer } from './ngx-store/reducers/preferences.reducer';

const localStorageConfig: StorageConfig = {
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
};

const initState = {
    layout: layoutReducer,
    preferences: preferencesReducer,
    router: routerReducer,
};

function appReducer(state = initState, action: Action) {
    console.log('INSIDE MAIN REDUCER');
    return state;
}

const reducers = {
    layout: layoutReducer,
    preferences: preferencesReducer,
    router: routerReducer,
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    const logger = new LoggerService();
    return (state, action) => {

        logger.storeInfo('ACTION', action);
        logger.storeInfo('STATE', state);

        return reducer(state, action);
    };
}

export function storeReplacer(reducer: ActionReducer<any>): ActionReducer<any> {

    return (state, action) => {
        return reducer(state, action);
    };
}

// TODO: create meta reducer to save preferences in local storage
// export function saveLocal(reducer: ActionReducer<any>): ActionReducer<any> {
//     const storage = new Storage(localStorageConfig);
//     const logger = new LoggerService();
//     return (state, action) => {
//         // FIXME: Can I save JSON ?
//         // const stringState = JSON.stringify(state);
//         storage.set('state', state).then(() => {
//             logger.log('local state updated');
//         });

//         return reducer(state, action);
//     };
// }

export const metaReducers: MetaReducer<any>[] = [
    // devToolsEnhancer,
    debug
];

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(localStorageConfig),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot(), // Connects RouterModule with StoreModule
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        HTTP,
        UniqueDeviceID,
        PhotoViewer
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
