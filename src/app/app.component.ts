import { Component } from '@angular/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { Platform } from '@ionic/angular'

import { Network, ConnectionStatus } from '@capacitor/network'
import { StatusBar, Style } from '@capacitor/status-bar'
import { StorageService } from './storage.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  listData = []

  constructor(

    private platform: Platform,
    private storage: StorageService,

  ) {
      this.initApp()
  }

  async initApp() {
    await this.storage.initializePlugin()
    SplashScreen.hide()
  }
 
}
