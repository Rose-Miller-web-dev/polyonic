import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { StorageService, User } from '../storage.service';

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
    //console.log("nice users: ", this.users)
  }

  async createUser(name: string) {

    if (this.isEdit) {
      console.log("update")
      await this.storage.updateUserById(this.currentUser, this.newUserName)
      this.newUserName = ''
      await this.loadProducts()

    } else {

      await this.storage.addUser(name.toString())
      this.newUserName = ''
      await this.loadProducts()
      console.log(this.users, '#users')

    }

  }

  async updateUser(user: User) {
    this.newUserName = user.name
    this.isEdit = true
    this.currentUser = user
  }

  async deleteUser(user: User) {
    await this.storage.deleteUserById(user.id.toString())
    await this.loadProducts()
  }

  async saveChanges() {
    await this.storage.closeDB()
    this.router.navigate(['/nice'])
  }
}
