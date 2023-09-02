import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { Capacitor } from '@capacitor/core'
import { StorageService, Item } from '../storage.service'
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite"
import { SplashScreen } from '@capacitor/splash-screen'

@Component({
  selector: 'app-nice',
  templateUrl: './nice.component.html',
  styleUrls: ['./nice.component.scss'],
})

export class NiceComponent  implements OnInit {
  
  async ngOnInit() {
    await this.loadDb()
  }

  async ngOnDestroy() {
    window.location.reload()
    await this.loadDb()
  }

  async ngAfterViewInit() {
    this.router.navigate(['/nice'])
    await this.loadDb()
  }
  
  public isEdit: boolean = false
  newValue = ''
  newKey=''
  items: any
  private currentItem: any
  
  constructor(private storage: StorageService, private router: Router,) { }

  async loadProducts() {
    this.items = await this.storage.getAllKeyVals()
  }

  async careateItem(value: string) {

    if (this.isEdit) {
      //edit
      await this.storage.setValue(value, this.currentItem.key, true)
      this.isEdit = false
      this.currentItem = null
    } else {
      //add
      await this.storage.setValue(value, this.newKey, false)
    }

    this.newValue = ''
    this.newKey = ''
    await this.loadProducts()
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
    await this.initWebApp()
  }

  async updateItem(item: Item) {
    this.newKey = item.key
    this.newValue = item.val
    this.isEdit = true
    this.currentItem = item
  }

  async deleteItem(item: Item) {
    await this.storage.unsetValue(item.key.toString())
    await this.loadProducts()
    await this.storage.closeDB()
    await this.initWebApp()
    this.router.navigate(['/nice'])
    
  }

  async initWebApp() {
    var sqlite:any
    try {
      const platform = Capacitor.getPlatform();

      if (platform === "web") {
        sqlite = new SQLiteConnection(CapacitorSQLite)
        customElements.get('jeep-sqlite') || customElements.define("jeep-sqlite", JeepSqlite)
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
      
  } catch (error) {
      console.error("Error creating database connection:", error)
  }
    
    await this.storage.initializePlugin()
    await this.storage.getAllKeyVals()
    SplashScreen.hide()
  }

  async loadDb() {
    await this.initWebApp()
    await this.storage.initializePlugin()
    await this.storage.getAllKeyVals()
    await this.loadProducts()
  }

}
