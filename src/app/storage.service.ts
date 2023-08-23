import { Injectable, signal, WritableSignal, Renderer2, RendererFactory2 } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

const DB_USERS = 'myuserdb'

export interface User {
  id: number
  name: string
  active: number
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  private user: WritableSignal<User[]> = signal<User[]>([])
  
  constructor() {
  }

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      "db_vite",
      false,
      "no-encryption",
      1,
      false
    )

    await this.db.open()

    const schema = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
      );`

    const respInsert = await this.db.query(
      `INSERT INTO users (id,name) values (?,?)`,
      [Date.now(),'NAME '+Date.now()]
    )
    //console.log(`response: ${JSON.stringify(respInsert)}`);
    // const respSelect = await this.db.query(
    //   `SELECT * FROM users`
    // )
    //console.log(`selected: ${JSON.stringify(respSelect)}`);

    await this.db.execute(schema)
    return true
  }

  async loadUsers() {
    console.log("loading users")
   
    await this.db.open();

    const queryCreateTable = `
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
      );`;

    const respCT = await this.db.execute(queryCreateTable);
    console.log(`res: ${JSON.stringify(respCT)}`);

    const respInsert = await this.db.query(`INSERT INTO users (id,name) values (?,?)`,
    [Date.now(), 'NAME '+ Date.now()]
    )
    console.log(`resInsert: ${JSON.stringify(respInsert)}`);

    const respSelect = await this.db.query(`SELECT * FROM users`)
    console.log(`resSELECT: ${JSON.stringify(respSelect)}`);

    console.log("loaded successfully!")
    await this.sqlite.closeConnection("db_vite", false);
  }

  async addUser() {

    console.log("adding users")
    await this.db.open();

    const queryCreateTable = `
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
      );`;

    const respCT = await this.db.execute(queryCreateTable);
    console.log(`res: ${JSON.stringify(respCT)}`);

    const respInsert = await this.db.query(`INSERT INTO users (id,name) values (?,?)`,
    [Date.now(), 'NAME '+ Date.now()]
    )
    console.log(`resInsert: ${JSON.stringify(respInsert)}`);

    const respSelect = await this.db.query(`SELECT * FROM users`)
    console.log(`resSELECT: ${JSON.stringify(respSelect)}`);

    console.log("added successfully!")
    await this.sqlite.closeConnection("db_vite", false);
  }

  async updateUserById(id: string, active: number) {
    const query = `UPDATE users SET active=${active} WHERE id=${id}`
    const result = await this.db.query(query)

    this.loadUsers()
    return result
  }

  async deleteUserById(id: string) {
    const query = `DELETE FROM users WHERE id=${id}`
    const result = await this.db.query(query)

    this.loadUsers()
    return result
  }

  async getUsers() {
    return this.user
  }
}
