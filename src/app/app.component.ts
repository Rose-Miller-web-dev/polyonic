import { Component, OnInit } from '@angular/core'
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { Platform } from '@ionic/angular'
import { StorageService } from './storage.service'
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite"
import { NiceComponent } from './nice/nice.component'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{

  async ngOnInit() {
    await this.initApp()
  }

  constructor(private platform: Platform, private storage: StorageService,) { }

  async initApp() {
    var sqlite:any
  try {
    const platform = Capacitor.getPlatform();

    // WEB SPECIFIC FUNCTIONALITY
    if (platform === "web") {
      sqlite = new SQLiteConnection(CapacitorSQLite)
      // Create the 'jeep-sqlite' Stencil component
      customElements.define("jeep-sqlite", JeepSqlite)
      const jeepSqliteEl = document.createElement("jeep-sqlite")
      document.body.appendChild(jeepSqliteEl)
      await customElements.whenDefined("jeep-sqlite")
      //console.log(`after customElements.whenDefined`)
      // console.log(sqlite , '#sqlite')
      // Initialize the Web store
      await sqlite.initWebStore()
      //console.log(`after initWebStore22`)
    }
    
    } catch (e) {
      console.log(e);
    }
    
    try {

      sqlite = new SQLiteConnection(CapacitorSQLite)
      var db = await sqlite.createConnection(
          "db_vite",
          false,
          "no-encryption",
          1,
          false
      );
      console.log("Database connection successful!")
  } catch (error) {
      console.error("Error creating database connection:", error)
  }
    
    await this.storage.initializePlugin()
    await this.storage.loadUsers()
    SplashScreen.hide()
  }

}
