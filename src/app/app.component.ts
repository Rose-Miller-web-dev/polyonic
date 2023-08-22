import { Component } from '@angular/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { Platform } from '@ionic/angular'

import { Network, ConnectionStatus } from '@capacitor/network'
import { StatusBar, Style } from '@capacitor/status-bar'
import { StorageService } from './storage.service'
import { Capacitor } from '@capacitor/core'

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
    this.storage.loadUsers()
    await this.storage.initializePlugin()
    SplashScreen.hide()

    try {
      const platform = Capacitor.getPlatform();
      if (platform === 'web') {
        await this.storage.initializeWebStore();
      }
    } catch (e) {
      console.log(e);
    }
  
  }
 
}
