import { Component, OnInit } from '@angular/core'
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { Platform } from '@ionic/angular'
import { StorageService } from './storage.service'
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{

  async ngOnInit() {
    await this.initApp()
    await this.storage.initializePlugin()
    await this.storage.loadUsers()
  }

  async ngAfterViewInit() {
    await this.initApp()
    await this.storage.initializePlugin()
    await this.storage.loadUsers()
  }

  constructor(private platform: Platform, private storage: StorageService,) { }

  async initApp() {
    var sqlite:any
    try {
      const platform = Capacitor.getPlatform();

      if (platform === "web") {
        sqlite = new SQLiteConnection(CapacitorSQLite)
        customElements.define("jeep-sqlite", JeepSqlite)
        const jeepSqliteEl = document.createElement("jeep-sqlite")
        document.body.appendChild(jeepSqliteEl)
        await customElements.whenDefined("jeep-sqlite")
        await sqlite.initWebStore()
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
