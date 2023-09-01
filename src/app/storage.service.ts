import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Observable, of } from 'rxjs';
import { NiceComponent } from './nice/nice.component';

export interface User {
  key: string
  name: string
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

    const schema = `CREATE TABLE IF NOT EXISTS kv_Store (
      key TEXT PRIMARY KEY NOT NULL,
      val TEXT NOT NULL
      );`

    await this.db.execute(schema)
    return true
  }

  async loadUsers() {

    try {
      const respSelect = await this.db.query(`SELECT * FROM kv_Store`)
      const userArray = Array.from(respSelect.values)
      this.user = userArray.map(user => ({
        key: user.key,
        name: user.val,
      }));

    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async addUser(name: string) {

    try {
      console.log("Adding user:", name)
      const id = Math.floor(Math.random() * 1000000)

      await this.db.query(`INSERT INTO kv_Store (key, val) VALUES (?, ?)`, 
      ['dessert' + String(id) , name])
      
    } catch (error) {
      console.error("Error adding user:", error)
    }

    await this.loadUsers()
  }

  async updateUserByKey(key: any, name: string) {
   
    try {

      const id = Math.floor(Math.random() * 1000000)
      await this.db.query(`UPDATE kv_Store SET val=? WHERE key=?;`, [name, key])
      
    } catch (error) {
      console.error("Error updating user:", error)
    }

    await this.loadUsers()
  }

  async deleteUserByKey(key: any) {
    const result = await this.db.query(`DELETE FROM kv_Store WHERE key= ?`, [key])

    await this.loadUsers()
    return result
  }

  async getUsers() {
    await this.loadUsers()
    return await this.user
  }

  async closeDB() {
    await this.sqlite.closeConnection("db_vite", false)
  }

  async getValue(key: any){
    try {
      const results = await this.db.query(`SELECT val FROM kv_Store WHERE key = ?`, [key])
      return results.values[0].val || null

    } catch(err) {
      console.log("not found")
      return "not found"
    }

  }

  async getKey(val: any){
    try {
      const results = await this.db.query(`SELECT key FROM kv_Store WHERE val = ?`, [val])
      return results.values[0].key || null

    } catch (err) {
      console.log("not found")
      return "not found"
    }
  }

  async setKey(newkey: any, prevkey: any) {
    
   try {

    await this.db.query(`UPDATE kv_Store SET key=? WHERE key=?;`, [newkey, prevkey])

   } catch (err) {
    console.log("couldn't change the key, try another key")
   }

  }

  // async setValue(key: any, value: any){
  //   await this.db.execute(`UPDATE kv_Store SET val=? WHERE key=?;`, [value, key]);
  // }

}
