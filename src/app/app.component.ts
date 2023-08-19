import { Component } from '@angular/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { Platform } from '@ionic/angular'
import { DataService } from './data.service'

import { Network, ConnectionStatus } from '@capacitor/network'
import { StatusBar, Style } from '@capacitor/status-bar'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  listData = []

  constructor(

    private platform: Platform,
    private data: DataService,
    
  ) {

    this.initializeApp()
    this.loadData()
  }

  initializeApp() {

    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      const color = status.connected ? 'blue' : 'red';
      StatusBar.setBackgroundColor({ color });
    });

    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        
        // StatusBar.setStyle()
        SplashScreen.hide()
        
      }

   
  }
    )
  }

  async loadData() {
    this.data.getData().subscribe(res => {
      this.listData = res
    })
  }

  async addData() {
    await this.data.addData(`Polyonic db test ${Math.ceil(Math.random() * 200)}`)
    this.loadData()
  }

  async removeItem(index) {
    this.data.removeItem(index)
    this.listData.splice(index , 1)
  }
}
