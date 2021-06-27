import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionListPage } from './inspection-list.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionListPage
  },
  {
    path: 'inspection1',
    loadChildren: () => import('./inspection1/inspection1.module').then( m => m.Inspection1PageModule)
  },
  {
    path: 'inspection2',
    loadChildren: () => import('./inspection2/inspection2.module').then( m => m.Inspection2PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionListPageRoutingModule {}
