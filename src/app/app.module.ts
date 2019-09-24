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
import { StoreModule, MetaReducer, ActionReducer, META_REDUCERS, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
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
// import * as fromRoot from './ngx-store/reducers';

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

/**
 * Injects a `LoggerService` inside a `MetaReducer`
 * @param logger a service that allows to log and store console.log() messages
 * @returns a `MetaReducer`
 */
function debugFactory(logger: LoggerService): MetaReducer<AppState> {
    return (reducer: ActionReducer<AppState, Actions>): ActionReducer<AppState, Actions> => {
        return (state, action) => {

           logger.storeInfo('ACTION', action);
           logger.storeInfo('STATE', state);

           return reducer(state, action);
        };
    };
}

/**
 * Injects a LoggerService inside the debug `MetaReducer` function
 * @param logger a service that allows to log and store console.log() messages
 * @returns A list of `MetaReducer`
 */
export function getMetaReducers(logger: LoggerService): MetaReducer<AppState>[] {
    return [debugFactory(logger)];
}


@NgModule({
    declarations: [AppComponent ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(localStorageConfig),
        StoreModule.forRoot(reducers), // FIXME: { metaReducers }
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
        PhotoViewer,
        {
            provide: USER_PROVIDED_META_REDUCERS,
            deps: [LoggerService],
            useFactory: getMetaReducers,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
