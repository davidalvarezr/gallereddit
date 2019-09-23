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
import { debugReducer } from './ngx-store/reducers/debug.reducer';
import { LoggerServiceComponent } from './components/logger-service/logger-service.component';
import { AppState, Actions } from './app.state';


const localStorageConfig: StorageConfig = {
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
};

const reducers = {
    layout: layoutReducer,
    preferences: preferencesReducer,
    router: routerReducer,
    debug: debugReducer,
};

// FIXME:
/**
 * console.log action and state(before action) each time an action is dipatched
 * @param reducer reducer
 */
export function debug(reducer: ActionReducer<AppState, Actions>): ActionReducer<AppState, Actions> {

    // const logger = new LoggerService(); // ERROR [1]

    return (state, action) => {

        // logger.storeInfo('ACTION', action);
        // logger.storeInfo('STATE', state);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [
    // devToolsEnhancer,
    debug
];

@NgModule({
    declarations: [AppComponent, LoggerServiceComponent],
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
