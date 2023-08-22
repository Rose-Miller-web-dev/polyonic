import { Injectable, signal, WritableSignal, Renderer2, RendererFactory2 } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
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

  private renderer: Renderer2;
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  private user: WritableSignal<User[]> = signal<User[]>([])
  
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  async initializeWebStore() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    // Dynamically add jeep-sqlite element to the DOM
    const jeepSqliteEl = document.createElement('jeep-sqlite');
    this.renderer.appendChild(document.body, jeepSqliteEl);

    // Wait for the custom element to be defined
    await customElements.whenDefined('jeep-sqlite');
    console.log('after customElements.whenDefined');

    // Initialize the Web store
    await sqlite.initWebStore();
    console.log('after initWebStore')
  }

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    )

    await this.db.open()

    const schema = `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );`

    await this.db.execute(schema)
    this.loadUsers()
    return true
  }

  async loadUsers() {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    )

    await this.db.open()

    const schema = `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );`

    await this.db.execute(schema)
    this.loadUsers()


    const users = await this.db.query('SELECT * FROM users;')
    this.user.set(users.values || [])
  }

  async addUser(name: string) {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    )

    await this.db.open()

    const schema = `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );`

    await this.db.execute(schema)
    this.loadUsers()


    const query = `INSERT INTTO users (name) VALUES ('${name}')`
    const result = await this.db.query(query)
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
