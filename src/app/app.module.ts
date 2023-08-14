import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Tab1Page } from './tab1/tab1.page'
import { Tab2Page } from './tab2/tab2.page'
import { Tab3Page } from './tab3/tab3.page'

@NgModule({
    declarations: [
        AppComponent,
        Tab1Page,
        Tab2Page,
        Tab3Page,
    ],

    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],

    providers: [
        
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],

    bootstrap: [
        AppComponent,
    ]
})

export class AppModule {}
