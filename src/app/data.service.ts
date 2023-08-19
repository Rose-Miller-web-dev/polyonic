import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { environment } from '../environments/environment'
import { ElectronService } from './electron.service'
import { EventService } from './events.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public db: any
  public dbInfo: any

  constructor(
    public electron: ElectronService,
    private events: EventService,
    private platform: Platform
  ) {}

  //database usage
}
