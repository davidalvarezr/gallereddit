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
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { layoutReducer } from './ngx-store/reducers/layout.reducer';
import { environment } from '../environments/environment'; // Angular CLI environment
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import devToolsEnhancer from 'remote-redux-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';


// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
    };
  }


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
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        StoreModule.forRoot({       // ngx-store
            layout: layoutReducer,
            router: routerReducer,
        }, { metaReducers }),
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
