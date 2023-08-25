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
    await this.loadProducts()
  }

  async ngOnDestroy() {
    window.location.reload()
  }
  
  public isEdit: boolean = false
  newUserName = ''
  users: any
  isWeb: any
  private currentUser: any
  
  constructor(private storage: StorageService, private router: Router,) { }

  async loadProducts() {
    await this.storage.loadUsers()
    this.users = await this.storage.getUsers()
  }

  async createUser(name: string) {

    if (this.isEdit) {
      await this.storage.updateUserById(this.currentUser, this.newUserName)
      this.isEdit = false
      this.currentUser = null
    } else {
      await this.storage.addUser(name.toString())
    }

    this.newUserName = ''
    await this.loadProducts()
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
    await this.initApp()
  }

  async updateUser(user: User) {
    this.newUserName = user.name
    this.isEdit = true
    this.currentUser = user
  }

  async deleteUser(user: User) {
    await this.storage.deleteUserById(user.id.toString())
    await this.loadProducts()
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
    await this.initApp()
  }

  async saveChanges() {
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
  }

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
