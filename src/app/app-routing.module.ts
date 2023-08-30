import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NiceComponent } from './nice/nice.component'

const routes: Routes = [

  { 
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(
      m => m.TabsPageModule
    )
  },

  {
    path: 'nice',
    component: NiceComponent
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
