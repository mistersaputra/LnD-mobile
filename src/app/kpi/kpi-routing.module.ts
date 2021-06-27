import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiPage } from './kpi.page';

const routes: Routes = [
  {
    path: '',
    component: KpiPage
  },
  {
    path: 'green-card',
    loadChildren: () => import('./green-card/green-card.module').then( m => m.GreenCardPageModule)
  },
  {
    path: 'inspection-list',
    loadChildren: () => import('./inspection-list/inspection-list.module').then( m => m.InspectionListPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpiPageRoutingModule {}
