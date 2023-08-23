import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { Capacitor } from "@capacitor/core"
import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite"
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite"

window.addEventListener("DOMContentLoaded", async () => {
  // var sqlite:any
  // try {
  //   const platform = Capacitor.getPlatform();

  //   // WEB SPECIFIC FUNCTIONALITY
  //   if (platform === "web") {
  //     sqlite = new SQLiteConnection(CapacitorSQLite)
  //     // Create the 'jeep-sqlite' Stencil component
  //     customElements.define("jeep-sqlite", JeepSqlite)
  //     const jeepSqliteEl = document.createElement("jeep-sqlite")
  //     document.body.appendChild(jeepSqliteEl)
  //     await customElements.whenDefined("jeep-sqlite")
  //     console.log(`after customElements.whenDefined`)
  //     console.log(sqlite , '#sqlite')
  //     // Initialize the Web store
  //     await sqlite.initWebStore()
  //     console.log(`after initWebStore22`)
  //   }
    
  //   } catch (e) {
  //     console.log(e);
  //   }
    
  //   try {

  //     sqlite = new SQLiteConnection(CapacitorSQLite)
  //     var db = await sqlite.createConnection(
  //         "db_vite",
  //         false,
  //         "no-encryption",
  //         1,
  //         false
  //     );
  //     console.log("Database connection successful!")
  // } catch (error) {
  //     console.error("Error creating database connection:", error)
  // }
    
    
  //   console.log(db, '#this db')

  //   await db.open();
  //   console.log(`db: db_vite opened44`)
  //   const queryCreateTable = `
  //     CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY NOT NULL,
  //     name TEXT NOT NULL
  //     );`;

  //   const respCT = await db.execute(queryCreateTable);
  //   console.log(`res: ${JSON.stringify(respCT)}`);

  //   const respInsert = await db.query(`INSERT INTO users (id,name) values (?,?)`,
  //   [Date.now(), 'NAME '+ Date.now()]
  //   )
  //   console.log(`resInsert: ${JSON.stringify(respInsert)}`)

  //   const respSelect = await db.query(`SELECT * FROM users`)
  //   console.log(`resSELECT: ${JSON.stringify(respSelect)}`)

  //   await sqlite.closeConnection("db_vite", false)

  })

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))
