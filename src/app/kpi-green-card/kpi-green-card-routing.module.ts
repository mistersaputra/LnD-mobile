import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiGreenCardPage } from './kpi-green-card.page';

const routes: Routes = [
  {
    path: '',
    component: KpiGreenCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpiGreenCardPageRoutingModule {}
