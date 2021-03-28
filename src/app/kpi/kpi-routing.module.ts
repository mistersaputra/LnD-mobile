import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiPage } from './kpi.page';

const routes: Routes = [
  {
    path: '',
    component: KpiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpiPageRoutingModule {}
