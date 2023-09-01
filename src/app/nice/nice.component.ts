import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { StorageService, User } from '../storage.service';
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite"
import { SplashScreen } from '@capacitor/splash-screen';

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
  newUserName = ''
  newKey=''
  newVal=''
  foundKey: any
  foundVal: any
  resetKey: any
  resetVal: any
  users: any
  private currentUser: any
  
  constructor(private storage: StorageService, private router: Router,) { }

  async loadProducts() {
    await this.storage.loadUsers()
    this.users = await this.storage.getUsers()
  }

  async createUser(name: string) {

    if (this.isEdit) {
      await this.storage.updateUserByKey(this.currentUser.key, this.newUserName)
      this.isEdit = false
      this.currentUser = null
    } else {
      await this.storage.addUser(name.toString())
    }

    this.newUserName = ''
    await this.loadProducts()
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
    await this.initWebApp()
  }

  async updateUser(user: User) {
    this.newUserName = user.name
    this.isEdit = true
    this.currentUser = user
  }

  async getKeyByValue(val: any) {
    this.foundKey =  await this.storage.getKey(val)
    console.log(this.foundKey, 'key found!')
    this.newVal = ''
  }

  async getValueByKey(key: any) {
    this.foundVal = await this.storage.getValue(key)
    console.log(this.foundVal, 'val found!')
    this.newKey = ''
  }

  async setKey(newkey: any, prevkey: any) {
    this.storage.setKey(newkey, prevkey)
  }

  async setVal(val: any) {
    await this.storage.updateUserByKey(this.newKey, this.resetVal)
  }

  async deleteUser(user: User) {
    await this.storage.deleteUserByKey(user.key.toString())
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
    await this.storage.loadUsers()
    SplashScreen.hide()
  }

  async loadDb() {
    await this.initWebApp()
    await this.storage.initializePlugin()
    await this.storage.loadUsers()
    await this.loadProducts()
  }

}
