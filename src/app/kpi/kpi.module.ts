import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KpiPageRoutingModule } from './kpi-routing.module';

import { KpiPage } from './kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KpiPageRoutingModule
  ],
  declarations: [KpiPage]
})
export class KpiPageModule {}
