import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inspection1PageRoutingModule } from './inspection1-routing.module';

import { Inspection1Page } from './inspection1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Inspection1PageRoutingModule
  ],
  declarations: [Inspection1Page]
})
export class Inspection1PageModule {}
