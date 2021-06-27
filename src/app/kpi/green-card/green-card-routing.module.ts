import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreenCardPage } from './green-card.page';

const routes: Routes = [
  {
    path: '',
    component: GreenCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GreenCardPageRoutingModule {}
