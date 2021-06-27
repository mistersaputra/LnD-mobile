import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inspection2Page } from './inspection2.page';

const routes: Routes = [
  {
    path: '',
    component: Inspection2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inspection2PageRoutingModule {}
