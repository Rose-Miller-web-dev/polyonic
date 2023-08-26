import { Component, OnInit } from '@angular/core'
import { ElectronService } from '../electron.service'
import { EventService } from '../events.service'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  public db: any
  public dbInfo: Object
  public electron: any

  constructor(
    public electronService: ElectronService,
    private events: EventService,
 
  ) {
    this.events.subscribe('database:available', (info) => {
      console.log('Database is now available')
      this.dbInfo = info
    })
  }

  ngOnInit () {
    const ctx = this

    ctx.electron = ctx.electronService

    if (ctx.electron.isElectronApp) {
      // ctx.db = ctx.data.db
      // ctx.data.db.info()
      // .then(info => ctx.dbInfo = info)
      // .catch(err => console.log(err))
    }
  }

}
