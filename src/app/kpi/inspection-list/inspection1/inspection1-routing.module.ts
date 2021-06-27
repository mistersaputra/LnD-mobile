import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inspection1Page } from './inspection1.page';

const routes: Routes = [
  {
    path: '',
    component: Inspection1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inspection1PageRoutingModule {}
