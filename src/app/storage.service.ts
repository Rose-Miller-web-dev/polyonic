import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Observable, of } from 'rxjs';
import { NiceComponent } from './nice/nice.component';

export interface User {
  id: number
  name: string
  active: number
}

@Injectable({
  providedIn: 'root'
})

export class StorageService implements OnInit{

  ngOnInit(): void {
  }

  private nice: NiceComponent
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  private user: any
  
  constructor() { }

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

    await this.db.execute(schema)
    return true
  }

  async loadUsers() {
    
    try {
      const respSelect = await this.db.query(`SELECT * FROM users`)
      const userArray = Array.from(respSelect.values)
      this.user = userArray.map(user => ({
        id: user.id,
        name: user.name,
      }));

    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async addUser(name: string) {

    try {
      console.log("Adding user:", name);
      const id = Math.floor(Math.random() * 1000000);
      await this.db.query(`INSERT INTO users (id, name) VALUES (?, ?)`, [id, name]);
      //console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }

    await this.loadUsers();
  }

  async updateUserById(user: any, name: string) {
   
    try {
      console.log("Updating user:", name);
      const id = Math.floor(Math.random() * 1000000);
      await this.db.query(`UPDATE users SET name=? WHERE id=?;`, [name, user.id]);
      //console.log("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }

    await this.loadUsers();
  }

  async deleteUserById(id: string) {
    const query = `DELETE FROM users WHERE id=${id}`
    const result = await this.db.query(query)

    await this.loadUsers()
    //console.log("deleted successfully")
    return result
  }

  async getUsers() {
    await this.loadUsers()
    return await this.user
  }

  async closeDB() {
    await this.sqlite.closeConnection("db_vite", false)
  }
}
