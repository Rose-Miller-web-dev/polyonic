import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicStorageModule } from '@ionic/storage-angular'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { Drivers } from '@ionic/storage'
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

@NgModule({
    declarations: [
        AppComponent,
        
    ],

    imports: [
        BrowserModule,
        IonicModule.forRoot(), 
        AppRoutingModule,
        IonicStorageModule.forRoot({
            name: "polyonicDB",
            driverOrder: 
            [
                cordovaSQLiteDriver._driver,
                Drivers.IndexedDB,
                Drivers.LocalStorage,
                // Drivers.SecureStorage
            ]
        }),
    ],

    providers: [
        {
          provide: RouteReuseStrategy,
          useClass: IonicRouteStrategy 
        }
    ],

    bootstrap: [
        AppComponent,
    ]
})

export class AppModule {}
