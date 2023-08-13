import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1PageModule } from '../tab1/tab1.module';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2PageModule } from '../tab2/tab2.module';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3PageModule } from '../tab3/tab3.module';

import { TabsPage } from './tabs.page';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
