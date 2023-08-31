import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  window.console.log = () => { }
}

jeepSqlite(window)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
