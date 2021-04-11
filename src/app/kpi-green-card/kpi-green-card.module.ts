import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KpiGreenCardPageRoutingModule } from './kpi-green-card-routing.module';

import { KpiGreenCardPage } from './kpi-green-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KpiGreenCardPageRoutingModule
  ],
  declarations: [KpiGreenCardPage]
})
export class KpiGreenCardPageModule {}
