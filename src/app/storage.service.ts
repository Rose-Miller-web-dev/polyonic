import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

export interface Item {
  key: string
  val: string
}

@Injectable({
  providedIn: 'root'
})

export class StorageService implements OnInit{

  ngOnInit(): void {
  }

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  private item: any
  public editActive: boolean = false
  
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

  async getAllKeyVals() {

    try {
      const respSelect = await this.db.query(`SELECT * FROM kv_Store`)
      const userArray = Array.from(respSelect.values)
      this.item = userArray.map(res => ({
        key: res.key,
        val: res.val,
      }));

    } catch (error) {
      console.error("Error loading items:", error);
    }

    return this.item
  }

  async getVal(key: any){
    try {
      const results = await this.db.query(`SELECT * FROM kv_Store WHERE key = ?`, [key])
      return results.values[0].val || null

    } catch (err) {
      console.log("not found")
      return "not found"
    }
  }

  async setValue (val: any, key: any) {

    if (!this.editActive) {
      try {
        
        await this.db.query(`INSERT INTO kv_Store (key, val) VALUES (?, ?)`, 
        [key , val])
        
      } catch (error) {
        console.error("Error adding item:", error)
      }
  
    } else {

      try {

        await this.db.query(`UPDATE kv_Store SET val=? WHERE key=?;`, [val, key])
        
      } catch (error) {
        console.error("Error updating item:", error)
      }

    }

  }

  async unsetValue(key: any) {
    const result = await this.db.query(`DELETE FROM kv_Store WHERE key= ?`, [key])
    await this.getAllKeyVals()
  }

  async closeDB() {
    await this.sqlite.closeConnection("db_vite", false)
  }

}
