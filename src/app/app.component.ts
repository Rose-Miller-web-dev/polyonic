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

  constructor(

    private platform: Platform,
    private data: DataService,
    
  ) {

    this.initializeApp()
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

    //   this.data.setup()
    //   .then(info => {
    //     console.log('Database setup complete')
    //   })
    //   .catch(error => console.log('Error setting up the Database: ', error))
    // 
  }
    )
  }
}
