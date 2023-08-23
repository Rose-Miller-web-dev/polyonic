import { Component, OnInit } from '@angular/core';
import { StorageService, User } from '../storage.service';

@Component({
  selector: 'app-nice',
  templateUrl: './nice.component.html',
  styleUrls: ['./nice.component.scss'],
})
export class NiceComponent  implements OnInit {

  ngOnInit() {}

  newUserName = ''
  users = this.storage.getUsers()
  isWeb: any

  constructor(private storage: StorageService) {
    
    this.loadProducts()
  }

  loadProducts() {
    this.users = this.storage.getUsers()
  }

  async createUser() {
    await this.storage.addUser()
    this.newUserName = ''
    console.log(this.users, '#users')
  }

  updateUser(user: User) {
    const active = user.active ? 1 : 0
    this.storage.updateUserById(user.id.toString(), active)
  }

  deleteUser(user: User) {
    this.storage.deleteUserById(user.id.toString())
  }
}
