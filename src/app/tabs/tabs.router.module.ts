import { TabsPageModule } from './tabs.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab2Page } from '../tab2/tab2.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [

      {
        path: '',
        component: TabsPage,
                
        children: [
          {
            path: '',
            redirectTo: 'tab1',
            pathMatch: 'full'
          },

          {
            path: 'tab1',
            loadChildren: () => import('./../tab1/tab1.module').then(
              m => m.Tab1PageModule
            ),
          },
        
          {
            path: 'tab2',
            loadChildren: () => import('./../tab2/tab2.module').then(
              m => m.Tab2PageModule
            )
          },

          {
            path: 'tab3',
            loadChildren: () => import('./../tab3/tab3.module').then(
              m => m.Tab3PageModule
            )
          },
        ]
      },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
